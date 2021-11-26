import debounce from 'lodash/debounce';
import path from 'path';
import { copyFile, readFile } from 'fs/promises';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Modal from 'antd/lib/modal';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { InstallationState, InstalledApp } from '@/model/installation';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import ScrollPanel from '@/component/scroll-panel';
import { CommandType, SocketType } from '@/schema/socket';
import DetailModal from './detail-modal';
import { ValidList } from '../batch/styled/valid-list';
import { InstallationProp, SearchForm } from './prop';
import { getColumn } from './column';

let memoValue = '';
let mobileList: string[] = []; //保存手机号
const { Fetch } = SocketType;
const { Option } = Select;
const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { useForm, Item } = Form;

/**
 * 安装应用查询
 */
const Installation: FC<InstallationProp> = () => {
	const [formRef] = useForm<SearchForm>();
	const dispatch = useDispatch();
	const { data, detail, loading } = useSelector<any, InstallationState>(
		(state) => state.installation
	);

	const searchClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath, type } = getFieldsValue();

			if (helper.isNullOrUndefined(tempFilePath) || tempFilePath === '') {
				message.destroy();
				message.warn('请选择模板文件');
				return;
			}

			memoValue = tempFilePath;
			const txt = await readFile(tempFilePath, { encoding: 'utf8' });
			const [errorList, passList] = helper.validateMobileList(txt.split('\n'));
			mobileList = passList.map((i) => i.value);
			if (errorList.length === 0) {
				Modal.confirm({
					onOk() {
						dispatch({ type: 'reading/setReading', payload: true });
						console.log({
							cmd: CommandType.Installation,
							msg: { list: mobileList, type }
						});
						send(Fetch, {
							cmd: CommandType.Installation,
							msg: { list: mobileList, type }
						});
						//legacy: Mock数据
						// dispatch({
						// 	type: 'installation/setData',
						// 	payload: [
						// 		{
						// 			ieid: null,
						// 			pid: null,
						// 			isid: null,
						// 			oiid: null,
						// 			appList: '',
						// 			lastUpdateTimeList: '',
						// 			apppkgList: 'com.tencent.news,com.kuaiduizuoye.scan',
						// 			appNameList: '腾讯新闻,快对作业',
						// 			lastActiveTime30List: ',',
						// 			activeDay30List: ','
						// 		},
						// 		{
						// 			ieid: null,
						// 			pid: null,
						// 			isid: null,
						// 			oiid: null,
						// 			appList: '',
						// 			lastUpdateTimeList: '',
						// 			apppkgList: 'com.tencent.news',
						// 			appNameList: '腾讯新闻',
						// 			lastActiveTime30List: ',',
						// 			activeDay30List: ','
						// 		},
						// 		{
						// 			ieid: null,
						// 			pid: null,
						// 			isid: null,
						// 			oiid: null,
						// 			appList: '',
						// 			lastUpdateTimeList: '',
						// 			apppkgList:
						// 				'com.tencent.news,com.kuaiduizuoye.scan,com.tencent.news,com.kuaiduizuoye.scan,com.tencent.news,com.kuaiduizuoye.scan,com.tencent.news,com.kuaiduizuoye.scan',
						// 			appNameList: '腾讯新闻',
						// 			lastActiveTime30List: ',',
						// 			activeDay30List: ','
						// 		}
						// 	]
						// });
						// dispatch({ type: 'reading/setReading', payload: false });
					},
					title: '查询提示',
					content: (
						<div>
							<ScrollPanel>
								{mobileList.map((i, index) => (
									<div key={`L_${index}`}>{i}</div>
								))}
							</ScrollPanel>
							<div>
								共查询{mobileList.length}个手机号，将
								<strong style={{ color: '#ff0000' }}>
									使用
									{mobileList.length}次
								</strong>
								查询，确定？
							</div>
						</div>
					),
					okText: '是',
					cancelText: '否'
				});
			} else {
				Modal.warn({
					title: '手机号格式有误，请修正',
					content: (
						<>
							<ValidList>
								{errorList.map((item, index) => {
									return (
										<li className="err" key={`E_${index}`}>
											{item}
										</li>
									);
								})}
							</ValidList>
						</>
					),
					okText: '确定'
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * 选择文件
	 * @param defaultPath 默认路径
	 */
	const selectFileHandle = async (defaultPath?: string) => {
		const { setFieldsValue } = formRef;
		const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke(
			'select-file',
			defaultPath
		);
		if (filePaths.length > 0) {
			const [filePath] = filePaths;
			setFieldsValue({ tempFilePath: filePath });
		}
	};

	/**
	 * 下载模板Click
	 */
	const downloadClick = debounce(
		async (event: MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			const { filePath }: SaveDialogReturnValue = await ipcRenderer.invoke('save-temp-file');

			if (filePath) {
				const srcPath = isDev
					? path.join(cwd, './asset/手机号模板.txt')
					: path.join(cwd, './resources/asset/手机号模板.txt');
				try {
					await copyFile(srcPath, filePath);
					message.success('下载成功');
				} catch (error) {
					console.log(error);
					message.error('下载失败');
				}
				//todo: 在此将模板文件拷到目标路径
			}
		},
		500,
		{ leading: true, trailing: false }
	);

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="tempFilePath" label="选择模板" initialValue={memoValue}>
						<Input
							onClick={() => selectFileHandle(__dirname)}
							placeholder="请选择模板文件"
							readOnly={true}
							style={{ width: '260px' }}
						/>
					</Item>
					<Item
						name="type"
						label="查询类型"
						initialValue="PHONE"
						style={{ width: '160px' }}>
						<Select>
							<Option value="PHONE">PHONE</Option>
							<Option value="IMEI">IMEI</Option>
							<Option value="IMSI">IMSI</Option>
							<Option value="OAID">OAID</Option>
						</Select>
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
					<Item>
						<Button onClick={downloadClick} type="default">
							<DownloadOutlined />
							<span>下载模板</span>
						</Button>
					</Item>
					{/* <Item>
						<Button onClick={() => {}} disabled={true} type="default">
							<PieChartOutlined />
							<span>命中统计</span>
						</Button>
					</Item> */}
				</Form>
			</PadBox>

			<Table<InstalledApp>
				dataSource={data}
				columns={getColumn(dispatch)}
				pagination={false}
				// pagination={{
				// 	total: data.length,
				// 	pageSize: PAGESIZE,
				// 	current: pageIndex,
				// 	onChange: onPageChange
				// }}
				rowKey={'apppkgList'}
				scroll={{ x: 'max-content' }}
				loading={loading}
			/>
			<DetailModal visible={detail !== null} data={detail} />
		</RootPanel>
	);
};
export default Installation;

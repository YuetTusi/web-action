import debounce from 'lodash/debounce';
import path from 'path';
import { copyFile, readFile } from 'fs/promises';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector, useLocation } from 'dva';
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
import { Document } from '@/schema/document';
import DetailModal from './detail-modal';
import { ValidList } from '../batch/styled/valid-list';
import { InstallationProp, SearchForm } from './prop';
import { getColumn } from './column';

let memoValue = '';
let searchType = '';
let keywordList: Array<{ md5: string; value: string }> = []; //保存查询值与md5对应表
const { Fetch } = SocketType;
const { Option } = Select;
const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { useForm, Item } = Form;
let isBatch = false;

/**
 * 安装应用查询
 */
const Installation: FC<InstallationProp> = () => {
	const { search } = useLocation(); //type参数为batch为批量查询
	const [formRef] = useForm<SearchForm>();
	const dispatch = useDispatch();
	const { data, detail, loading } = useSelector<any, InstallationState>(
		(state) => state.installation
	);

	isBatch = search.split('=')[1] === 'batch';

	useEffect(() => {
		//legacy: Mock数据
		dispatch({
			type: 'installation/setData',
			payload: [
				{
					activeDay30List: ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
					appNameList:
						'迷你世界,腾讯新闻,电子邮件,WiFi万能钥匙,视频,作业帮,便签,视频,天气,华为主题动态引擎,指南针,游戏中心,纳米盒,计算器,15日天气预报,QQ,和平精英,爱奇艺,我要学,钱包,抖音,快对作业,多彩引擎,保卫萝卜3,酷狗音乐,汤姆猫跑酷,腾讯视频,阅读,百度,墨迹天气,阅达教育,快游戏,小游戏',
					apppkgList:
						'com.minitech.miniworld,com.tencent.news,com.android.email,com.snda.wifilocating,com.tencent.tvoem,com.baidu.homework,com.nearme.note,com.coloros.yoli,com.coloros.weather,com.ibimuyu.lockscreen,com.coloros.compass,com.nearme.gamecenter,com.jinxin.namibox,com.android.calculator2,com.tianqiyubao2345,com.tencent.mobileqq,com.tencent.tmgp.pubgmhd,com.qiyi.video,com.sh.iwantstudy,com.coloros.wallet,com.ss.android.ugc.aweme,com.kuaiduizuoye.scan,com.heytap.colorfulengine,com.feiyu.carrot3,com.kugou.android,com.outfit7.talkingtomgoldrun,com.tencent.qqlive,com.oppo.reader,com.baidu.searchbox,com.moji.mjweather,com.k12n,com.heytap.xgame,com.nearme.play',
					ieid: '13d6aaaa46515135fd92f019b7e8e84a',
					isid: '09a88ec4e59071a4dafa3ac82604a4dd',
					lastActiveTime30List: ',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',
					lastUpdateTime: '',
					oiid: '',
					pid: '77cead680b92491deb51e1830d30bb78'
				}
			]
		});
		dispatch({ type: 'reading/setReading', payload: false });
		return () => {
			dispatch({ type: 'installation/setData', payload: [] });
		};
	}, []);

	/**
	 * 查询Click
	 */
	const searchClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		// installationResult(dispatch,temp);
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath, mobile, type } = getFieldsValue();

			searchType = type;

			if (isBatch) {
				//批量
				if (helper.isNullOrUndefined(tempFilePath) || tempFilePath === '') {
					message.destroy();
					message.warn('请选择模板文件');
					return;
				}

				memoValue = tempFilePath;
				const txt = await readFile(tempFilePath, { encoding: 'utf8' });
				const [errorList, passList] = helper.validateMobileList(txt.split('\n'));
				if (errorList.length === 0) {
					keywordList = passList;
					Modal.confirm({
						onOk() {
							dispatch({ type: 'reading/setReading', payload: true });
							console.log({
								cmd: CommandType.Installation,
								msg: {
									list: keywordList.map((i) => i.md5),
									value: keywordList.map((i) => i.value),
									type,
									table: Document.AppInstallLog
								}
							});
							send(Fetch, {
								cmd: CommandType.Installation,
								msg: {
									list: keywordList.map((i) => i.md5),
									value: keywordList.map((i) => i.value),
									type,
									table: Document.AppInstallLog
								}
							});
						},
						title: '查询提示',
						content: (
							<div>
								<ScrollPanel>
									{keywordList.map((i, index) => (
										<div key={`L_${index}`}>{i.value}</div>
									))}
								</ScrollPanel>
								<div>
									共查询{keywordList.length}个手机号，将
									<strong style={{ color: '#ff0000' }}>
										使用
										{keywordList.length}次
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
			} else {
				//非批量
				if (helper.isNullOrUndefined(mobile) || mobile === '') {
					message.destroy();
					message.warn('请选填写手机号');
					return;
				}
				const [errorList, passList] = helper.validateMobileList([mobile]);
				if (errorList.length === 0) {
					keywordList = passList;
					Modal.confirm({
						onOk() {
							dispatch({ type: 'reading/setReading', payload: true });
							console.log({
								cmd: CommandType.Installation,
								msg: {
									list: keywordList.map((i) => i.md5),
									value: keywordList.map((i) => i.value),
									type,
									table: Document.AppInstallLog
								}
							});
							send(Fetch, {
								cmd: CommandType.Installation,
								msg: {
									list: keywordList.map((i) => i.md5),
									value: keywordList.map((i) => i.value),
									type,
									table: Document.AppInstallLog
								}
							});
						},
						title: '查询提示',
						content: (
							<div>
								<ScrollPanel>
									{keywordList.map((i, index) => (
										<div key={`L_${index}`}>{i.value}</div>
									))}
								</ScrollPanel>
								<div>
									共查询{keywordList.length}个手机号，将
									<strong style={{ color: '#ff0000' }}>
										使用
										{keywordList.length}次
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
					{isBatch ? (
						<Item name="tempFilePath" label="选择模板" initialValue={memoValue}>
							<Input
								onClick={() => selectFileHandle(__dirname)}
								placeholder="请选择模板文件"
								readOnly={true}
								style={{ width: '260px' }}
							/>
						</Item>
					) : (
						<Item label="手机号" name="mobile">
							<Input style={{ width: '260px' }} />
						</Item>
					)}
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
					{isBatch ? (
						<Item>
							<Button onClick={downloadClick} type="default">
								<DownloadOutlined />
								<span>下载模板</span>
							</Button>
						</Item>
					) : null}
				</Form>
			</PadBox>

			<Table<InstalledApp>
				dataSource={data}
				columns={getColumn(dispatch, keywordList, searchType)}
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

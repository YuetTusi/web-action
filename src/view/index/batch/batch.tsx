import debounce from 'lodash/debounce';
import { copyFile, readFile } from 'fs/promises';
import path from 'path';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import message from 'antd/lib/message';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { Document } from '@/schema/document';
import { CommandType, SocketType } from '@/schema/socket';
import { CaseSort } from '@/schema/common';
import { SearchLogEntity } from '@/schema/search-log-entity';
import { BatchDataSource, BatchState } from '@/model/batch';
import CategoryModal from './category-modal';
import ChartModal from './chart-modal';
import { getColumn } from './column';
import { BatchProp } from './prop';
import { ValidList } from './styled/valid-list';
import ScrollPanel from '@/component/scroll-panel';

const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { Fetch } = SocketType;
const { Item, useForm } = Form;
let memoValue = '';
let mobileList: Array<{ md5: string; value: string }> = []; //保存手机号与md5对应表

const convertToArray = (data: Record<string, BatchDataSource>) => {
	if (helper.isNullOrUndefined(data)) {
		return [];
	} else {
		return Object.entries(data).map(([k, v]) => ({ mobile: k, category: v }));
	}
};

/**
 * 批量查询
 */
const Batch: FC<BatchProp> = () => {
	const dispatch = useDispatch();
	const { data, loading } = useSelector<any, BatchState>((state) => state.batch);
	const [type, setType] = useState<CaseSort>();
	const [mobile, setMobile] = useState<string>('');
	const [currentSpecialData, setCurrentSpecialData] = useState<BatchDataSource>();
	const [chartModalVisible, setChartModalVisible] = useState<boolean>(false);
	const [formRef] = useForm<{ tempFilePath: string }>();
	const list = convertToArray(data);

	useEffect(() => {
		let next: SearchLogEntity[] = [];
		const kv = Object.entries(data);
		for (let [k, v] of kv) {
			const { value } = mobileList.find((i) => i.md5 === k)!;
			if (value) {
				next.push({
					type: Document.AimBatch,
					keyword: value,
					result: v
				});
			}
		}
		if (next.length > 0) {
			dispatch({ type: 'searchLog/insert', payload: next });
		}
	}, [data]);

	useEffect(() => {
		return () => {
			dispatch({ type: 'batch/setData', payload: {} });
		};
	}, []);

	/**
	 * 查询Click
	 */
	const searchClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath } = getFieldsValue();

			if (helper.isNullOrUndefined(tempFilePath) || tempFilePath === '') {
				message.destroy();
				message.warn('请选择模板文件');
				return;
			}

			memoValue = tempFilePath;
			const txt = await readFile(tempFilePath, { encoding: 'utf8' });
			const [errorList, passList] = helper.validateMobileList(txt.split('\n'));
			mobileList = passList;
			if (errorList.length === 0) {
				Modal.confirm({
					onOk() {
						dispatch({ type: 'reading/setReading', payload: true });
						console.log({
							cmd: CommandType.GetMultiple,
							msg: { list: mobileList.map((i) => i.md5) }
						});
						send(Fetch, {
							cmd: CommandType.GetMultiple,
							msg: { list: mobileList.map((i) => i.md5) }
						});
						//legacy: Mock数据
						// dispatch({
						// 	type: 'batch/setData',
						// 	payload: {
						// 		'6ea21f8fd01c3c17fc2779850d212b34': {
						// 			涉黄: {
						// 				lastLogin: '无数据',
						// 				isReg: 1
						// 			},
						// 			传销: {
						// 				ParticipatingWebsiteCount: 'N',
						// 				lastLogin: '无数据',
						// 				regTime: '1',
						// 				isReg: 0,
						// 				haveBindBankCard: 'N'
						// 			},
						// 			涉赌: {
						// 				lastLogin: '无数据',
						// 				participatingFunds: '0',
						// 				isAgent: 'N',
						// 				isReg: 0,
						// 				participatingWebsiteCount: 'N',
						// 				haveBindBankCard: 'N'
						// 			}
						// 		},
						// 		'197a25cd11a4cd3f49e92069e0bb2208': {
						// 			涉黄: {
						// 				lastLogin: '无数据',
						// 				isReg: 0
						// 			},
						// 			传销: {
						// 				ParticipatingWebsiteCount: 'N',
						// 				lastLogin: '无数据',
						// 				regTime: '1',
						// 				isReg: 1,
						// 				haveBindBankCard: 'N'
						// 			},
						// 			涉赌: {
						// 				lastLogin: '无数据',
						// 				participatingFunds: '0',
						// 				isAgent: 'N',
						// 				isReg: 1,
						// 				participatingWebsiteCount: 'N',
						// 				haveBindBankCard: 'N'
						// 			}
						// 		},
						// 		'841b2f6f36c367dbe88c1eb2403873b0': {
						// 			涉黄: {
						// 				lastLogin: '无数据',
						// 				isReg: 0
						// 			},
						// 			传销: {
						// 				ParticipatingWebsiteCount: 'N',
						// 				lastLogin: '无数据',
						// 				regTime: '1',
						// 				isReg: 1,
						// 				haveBindBankCard: 'N'
						// 			},
						// 			涉赌: {
						// 				lastLogin: '无数据',
						// 				participatingFunds: '0',
						// 				isAgent: 'N',
						// 				isReg: 0,
						// 				participatingWebsiteCount: 'N',
						// 				haveBindBankCard: 'N'
						// 			}
						// 		},
						// 		a4e26368c53208ec1dff1d972fab4828: {
						// 			涉黄: {
						// 				lastLogin: '无数据',
						// 				isReg: 0
						// 			},
						// 			传销: {
						// 				ParticipatingWebsiteCount: 'N',
						// 				lastLogin: '无数据',
						// 				regTime: '1',
						// 				isReg: 0,
						// 				haveBindBankCard: 'N'
						// 			},
						// 			涉赌: {
						// 				lastLogin: '无数据',
						// 				participatingFunds: '0',
						// 				isAgent: 'N',
						// 				isReg: 0,
						// 				participatingWebsiteCount: 'N',
						// 				haveBindBankCard: 'N'
						// 			}
						// 		}
						// 	}
						// });
						// dispatch({ type: 'reading/setReading', payload: false });
					},
					title: '查询提示',
					content: (
						<div>
							<ScrollPanel>
								{mobileList.map((i, index) => (
									<div key={`L_${index}`}>{i.value}</div>
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
	 * 图表Click
	 */
	const chartClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setChartModalVisible(true);
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
	 * 分类Click
	 * @param type 分类
	 * @param data 数据
	 */
	const onSortClick = (data: BatchDataSource, type: CaseSort, mobile: string) => {
		setType(type);
		setMobile(mobile);
		setCurrentSpecialData(data);
	};

	/**
	 * 取消Click
	 */
	const categoryCancel = () => {
		setCurrentSpecialData(void 0);
	};

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 */
	// const onPageChange = (pageIndex: number) =>
	// 	dispatch({ type: 'batch/setPageIndex', payload: pageIndex });

	// console.log(
	// 	Object.entries(data).map(([k, v]) => {
	// 		return { mobile: k, category: v };
	// 	})
	// );

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					{/* initialValue="D:\手机号.txt" */}
					<Item name="tempFilePath" label="选择模板" initialValue={memoValue}>
						<Input
							onClick={() => selectFileHandle(__dirname)}
							readOnly={true}
							style={{ width: '260px' }}
						/>
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
					<Item>
						<Button onClick={chartClick} disabled={list.length === 0} type="default">
							<PieChartOutlined />
							<span>命中统计</span>
						</Button>
					</Item>
				</Form>
			</PadBox>

			<Table<{ mobile: string; category: BatchDataSource }>
				dataSource={list}
				columns={getColumn(dispatch, onSortClick, mobileList)}
				pagination={false}
				// pagination={{
				// 	total: data.length,
				// 	pageSize: PAGESIZE,
				// 	current: pageIndex,
				// 	onChange: onPageChange
				// }}
				loading={loading}
				rowKey={'mobile'}
			/>
			<CategoryModal
				onCancel={categoryCancel}
				specialData={currentSpecialData}
				type={type!}
				mobile={mobile}
			/>
			<ChartModal
				data={list}
				visible={chartModalVisible}
				onCancel={() => setChartModalVisible(false)}
			/>
		</RootPanel>
	);
};

export default Batch;

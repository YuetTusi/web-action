import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';
import { BatchDataSource, BatchState } from '@/model/batch';
import CategoryModal from './category-modal';
import ChartModal from './chart-modal';
import { getColumn } from './column';
import { BatchProp } from './prop';
import { CaseSort } from '@/schema/common';
import { OnlyNumber } from '@/utility/regex';

const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { Fetch } = SocketType;
const { Item, useForm } = Form;
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
	const [currentSpecialData, setCurrentSpecialData] = useState<BatchDataSource>();
	const [chartModalVisible, setChartModalVisible] = useState<boolean>(false);
	const [formRef] = useForm<{ tempFilePath: string }>();
	const list = convertToArray(data);

	/**
	 * 查询Click
	 */
	const searchClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath } = getFieldsValue();
			const txt = await fs.promises.readFile(tempFilePath, { encoding: 'utf8' });

			mobileList = txt
				.split('\n')
				.filter((item) => OnlyNumber.test(item))
				.map((item) => ({ md5: md5(item), value: item }));

			if (helper.isNullOrUndefined(tempFilePath)) {
				message.destroy();
				message.warn('请选择模板文件');
			} else {
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
	const downloadClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { filePath }: SaveDialogReturnValue = await ipcRenderer.invoke('save-temp-file');

		if (filePath) {
			const srcPath = isDev
				? path.join(cwd, './asset/手机号模板.txt')
				: path.join(cwd, './resources/asset/手机号模板.txt');
			try {
				await fs.promises.copyFile(srcPath, filePath);
				message.success('下载成功');
			} catch (error) {
				console.log(error);
				message.error('下载失败');
			}
			//todo: 在此将模板文件拷到目标路径
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
			console.log(filePath);
			setFieldsValue({ tempFilePath: filePath });
		}
	};

	/**
	 * 分类Click
	 * @param type 分类
	 * @param data 数据
	 */
	const onSortClick = (data: BatchDataSource, type: CaseSort) => {
		setType(type);
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
					<Item initialValue="D:\手机号.txt" name="tempFilePath" label="选择模板">
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

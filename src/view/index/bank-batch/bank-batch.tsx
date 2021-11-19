import { copyFile, readFile } from 'fs/promises';
import path from 'path';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import PieChartOutlined from '@ant-design/icons/PieChartOutlined';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { Document } from '@/schema/document';
import { CommandType, SocketType } from '@/schema/socket';
import { CardResult } from '@/model/bank-batch';
import { BankBatchState } from '@/model/bank-batch';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { OnlyNumber } from '@/utility/regex';
import CategoryModal from './category-modal';
import { getColumn, RowType } from './column';
import ChartModal from './chart-modal';
import { SearchLogEntity } from '@/schema/search-log-entity';

const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { Item, useForm } = Form;
let memoValue = '';

/**
 * 银行卡对象数据转为表格数据
 */
const mapToTableData = (data: Record<string, CardResult>) =>
	Object.entries(data).map(([k, v]) => ({
		card: k,
		result: v
	}));

/**
 * 汇总各分类下的命中数据
 */
const totalHitData = (data: Record<string, CardResult>) => {
	let porn = 0;
	let bet = 0;
	let pyramidSales = 0;

	Object.values(data).forEach((item) => {
		if (item['涉黄']?.isReg === 1) {
			porn++;
		}
		if (item['传销']?.isReg === 1) {
			pyramidSales++;
		}
		if (item['涉赌']?.isReg === 1) {
			bet++;
		}
	});

	return [
		{ name: '涉黄', value: porn },
		{ name: '传销', value: pyramidSales },
		{ name: '涉赌', value: bet }
	];
};

/**
 * 银行卡批量查询
 */
const BankBatch: FC<{}> = () => {
	const dispatch = useDispatch();
	const [chartModalVisible, setChartModalVisible] = useState<boolean>(false);
	const [specialData, setSpecialData] = useState<Record<string, any>>();
	const { data } = useSelector<any, BankBatchState>((state) => state.bankBatch); //hit_gambling, hit_pyramid, hits,
	const [formRef] = useForm();

	useEffect(() => {
		const kv = Object.entries(data);
		let next: SearchLogEntity[] = [];
		if (kv.length > 0) {
			for (let [k, v] of kv) {
				next.push({
					type: Document.BankBatch,
					keyword: k,
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
			dispatch({ type: 'bankBatch/setData', payload: {} });
		};
	}, []);

	/**
	 * 点击分类handle
	 */
	const actionHandle = (type: string, result: CardResult) => {
		setSpecialData(result[type]);
	};

	/**
	 * 下载模板Click
	 */
	const downloadClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { filePath }: SaveDialogReturnValue = await ipcRenderer.invoke('save-temp-file');

		if (filePath) {
			const srcPath = isDev
				? path.join(cwd, './asset/银行卡模板.txt')
				: path.join(cwd, './resources/asset/银行卡模板.txt');
			try {
				await copyFile(srcPath, filePath);
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
			setFieldsValue({ tempFilePath: filePath });
		}
	};

	/**
	 * 查询Click
	 * @param event
	 */
	const onSearchClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath } = getFieldsValue();

			if (helper.isNullOrUndefined(tempFilePath)) {
				message.destroy();
				message.warn('请选择模板文件');
			} else {
				memoValue = tempFilePath;
				const txt = await readFile(tempFilePath, { encoding: 'utf8' });
				const list = txt.split('\n').filter((item) => OnlyNumber.test(item));
				dispatch({ type: 'reading/setReading', payload: true });
				console.log({
					cmd: CommandType.BankBatch,
					msg: { list }
				});
				send(SocketType.Fetch, {
					cmd: CommandType.BankBatch,
					msg: { list }
				});
				dispatch({
					type: 'searchLog/insert',
					payload: {
						_id: helper.newId(),
						type: Document.BankBatch,
						content: list.join(',')
					}
				});
			}
			//legacy: 测试数据
			// dispatch({
			// 	type: 'bankBatch/setData',
			// 	payload: {
			// 		'6216727500000238961': {
			// 			传销: {
			// 				ParticipatingWebsiteCount: 'N',
			// 				haveBindBankCard: 'N',
			// 				isReg: 1,
			// 				lastLogin: '无数据',
			// 				regTime: '1'
			// 			},
			// 			涉赌: {
			// 				haveBindBankCard: 'N',
			// 				isAgent: 'N',
			// 				isReg: 1,
			// 				lastLogin: '无数据',
			// 				participatingFunds: '0',
			// 				participatingWebsiteCount: 'N'
			// 			},
			// 			涉黄: {
			// 				isReg: 1,
			// 				lastLogin: '无数据'
			// 			}
			// 		},
			// 		'6217562600001515155': {
			// 			传销: {
			// 				ParticipatingWebsiteCount: 'N',
			// 				haveBindBankCard: 'N',
			// 				isReg: 1,
			// 				lastLogin: '无数据',
			// 				regTime: '1'
			// 			},
			// 			涉赌: {
			// 				haveBindBankCard: 'N',
			// 				isAgent: 'N',
			// 				isReg: 0,
			// 				lastLogin: '无数据',
			// 				participatingFunds: '0',
			// 				participatingWebsiteCount: 'N'
			// 			},
			// 			涉黄: {
			// 				isReg: 0,
			// 				lastLogin: '无数据'
			// 			}
			// 		},
			// 		'9559980868435875811': {
			// 			传销: {
			// 				ParticipatingWebsiteCount: 'N',
			// 				haveBindBankCard: 'N',
			// 				isReg: 1,
			// 				lastLogin: '无数据',
			// 				regTime: '1'
			// 			},
			// 			涉赌: {
			// 				haveBindBankCard: 'N',
			// 				isAgent: 'N',
			// 				isReg: 0,
			// 				lastLogin: '无数据',
			// 				participatingFunds: '0',
			// 				participatingWebsiteCount: 'N'
			// 			},
			// 			涉黄: {
			// 				isReg: 0,
			// 				lastLogin: '无数据'
			// 			}
			// 		},
			// 		'9559980868435875812': {
			// 			传销: {
			// 				ParticipatingWebsiteCount: 'N',
			// 				haveBindBankCard: 'N',
			// 				isReg: 1,
			// 				lastLogin: '无数据',
			// 				regTime: '1'
			// 			},
			// 			涉赌: {
			// 				haveBindBankCard: 'N',
			// 				isAgent: 'N',
			// 				isReg: 0,
			// 				lastLogin: '无数据',
			// 				participatingFunds: '0',
			// 				participatingWebsiteCount: 'N'
			// 			},
			// 			涉黄: {
			// 				isReg: 0,
			// 				lastLogin: '无数据'
			// 			}
			// 		},
			// 		'9559980868435875813': {
			// 			传销: {
			// 				ParticipatingWebsiteCount: 'N',
			// 				haveBindBankCard: 'N',
			// 				isReg: 0,
			// 				lastLogin: '无数据',
			// 				regTime: '1'
			// 			},
			// 			涉赌: {
			// 				haveBindBankCard: 'N',
			// 				isAgent: 'N',
			// 				isReg: 0,
			// 				lastLogin: '无数据',
			// 				participatingFunds: '0',
			// 				participatingWebsiteCount: 'N'
			// 			},
			// 			涉黄: {
			// 				isReg: 0,
			// 				lastLogin: '无数据'
			// 			}
			// 		},
			// 		'9559980868435875814': {
			// 			传销: {
			// 				ParticipatingWebsiteCount: 'N',
			// 				haveBindBankCard: 'N',
			// 				isReg: 0,
			// 				lastLogin: '无数据',
			// 				regTime: '1'
			// 			},
			// 			涉赌: {
			// 				haveBindBankCard: 'N',
			// 				isAgent: 'N',
			// 				isReg: 0,
			// 				lastLogin: '无数据',
			// 				participatingFunds: '0',
			// 				participatingWebsiteCount: 'N'
			// 			},
			// 			涉黄: {
			// 				isReg: 0,
			// 				lastLogin: '无数据'
			// 			}
			// 		}
			// 	}
			// });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					{/* initialValue="D:\银行卡.txt" */}
					<Item name="tempFilePath" label="选择模板" initialValue={memoValue}>
						<Input
							onClick={() => selectFileHandle(__dirname)}
							readOnly={true}
							style={{ width: '260px' }}
						/>
					</Item>
					<Item>
						<Button onClick={onSearchClick} type="primary">
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
						<Button
							disabled={Object.entries(data).length === 0}
							onClick={() => setChartModalVisible(true)}
							type="default">
							<PieChartOutlined />
							<span>命中统计</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<Table<RowType>
				dataSource={mapToTableData(data)}
				columns={getColumn(dispatch, actionHandle)}
				pagination={false}
				rowKey="card"
			/>
			<ChartModal
				data={totalHitData(data)}
				visible={chartModalVisible}
				onCancel={() => setChartModalVisible(false)}
			/>
			<CategoryModal specialData={specialData} onCancel={() => setSpecialData(void 0)} />
			{/* {renderCards()} */}
		</RootPanel>
	);
};

export default BankBatch;

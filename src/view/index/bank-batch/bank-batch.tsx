import debounce from 'lodash/debounce';
import { copyFile, readFile } from 'fs/promises';
import path from 'path';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
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
import CategoryModal from './category-modal';
import { getColumn, RowType } from './column';
import ChartModal from './chart-modal';
import { SearchLogEntity } from '@/schema/search-log-entity';
import ScrollPanel from '@/component/scroll-panel';
import { ValidList } from '../batch/styled/valid-list';

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
	// let porn = 0;
	let bet = 0;
	let pyramidSales = 0;

	Object.values(data).forEach((item) => {
		// if (item['涉黄']?.isReg === 1) {
		// 	porn++;
		// }
		if (item['pyramid']?.isReg === 1) {
			pyramidSales++;
		}
		if (item['gambling']?.isReg === 1) {
			bet++;
		}
	});

	return [
		// { name: '涉黄', value: porn },
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
	const [card, setCard] = useState<string>(''); //卡号
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
	const actionHandle = (type: string, result: CardResult, card: string) => {
		setSpecialData(result[type]);
		setCard(card);
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
	 * 查询Click
	 * @param event
	 */
	const onSearchClick = async (event: MouseEvent<HTMLButtonElement>) => {
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
			const [errorList, passList] = helper.validateCardList(txt.split('\n'));

			if (errorList.length === 0) {
				Modal.confirm({
					onOk() {
						dispatch({ type: 'reading/setReading', payload: true });
						console.log({
							cmd: CommandType.BankBatch,
							msg: { list: passList.map((i) => i.value) }
						});
						send(SocketType.Fetch, {
							cmd: CommandType.BankBatch,
							msg: { list: passList.map((i) => i.value) }
						});
						//legacy: 测试数据
						// dispatch({
						// 	type: 'bankBatch/setData',
						// 	payload: {
						// 		'6213363479902259472': {
						// 			gambling: {
						// 				hit: 0
						// 			},
						// 			pyramid: {
						// 				hit: 0
						// 			}
						// 		},
						// 		'6222032106001274118': {
						// 			gambling: {
						// 				hit: 0
						// 			},
						// 			pyramid: {
						// 				hit: 0
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
								{passList.map((i, index) => (
									<div key={`L_${index}`}>{i.value}</div>
								))}
							</ScrollPanel>
							<div>
								共查询{passList.length}个卡号，将
								<strong style={{ color: '#ff0000' }}>
									使用
									{passList.length}次
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
					title: '银行卡号格式有误，请修正',
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

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					{/* initialValue="D:\银行卡.txt" */}
					<Item name="tempFilePath" label="选择模板" initialValue={memoValue}>
						<Input
							onClick={() => selectFileHandle(__dirname)}
							placeholder="请选择模板文件"
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
			<CategoryModal
				specialData={specialData}
				card={card}
				onCancel={() => setSpecialData(void 0)}
			/>
			{/* {renderCards()} */}
		</RootPanel>
	);
};

export default BankBatch;

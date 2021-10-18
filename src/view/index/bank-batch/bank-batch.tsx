import fs from 'fs';
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
import { CaseSort } from '@/schema/common';
import { CommandType, SocketType } from '@/schema/socket';
import { CardResult, Gambling, Pyramid } from '@/model/bank';
import { BankBatchState } from '@/model/bank-batch';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import CategoryModal from './category-modal';
import { getColumn, RowType } from './column';
import ChartModal from './chart-modal';

const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { Item, useForm } = Form;

/**
 * 银行卡对象数据转为表格数据
 */
const mapToTableData = (data: CardResult) =>
	Object.entries(data).map(([k, v]) => ({
		mobile: k,
		...v
	}));

/**
 * 汇总各分类下的命中数据
 */
const totalHitData = (data: CardResult) =>
	Object.entries(data).reduce(
		(acc, [, v]) => {
			acc[0].value += v?.pyramid?.hit ?? 0;
			acc[1].value += v?.gambling?.hit ?? 0;
			return acc;
		},
		[
			{ name: '传销', value: 0 },
			{ name: '涉赌', value: 0 }
		]
	);

/**
 * 银行卡批量查询
 */
const BankBatch: FC<{}> = () => {
	const dispatch = useDispatch();
	const [chartModalVisible, setChartModalVisible] = useState<boolean>(false);
	const [specialData, setSpecialData] = useState<Gambling | Pyramid>();
	const { hit_gambling, hit_pyramid, hits, result } = useSelector<any, BankBatchState>(
		(state) => state.bankBatch
	);
	useEffect(() => {
		//legacy: 测试数据
		dispatch({
			type: 'bankBatch/setData',
			payload: {
				hits: 0,
				hit_gambling: 0,
				hit_pyramid: 0,
				result: {
					//银行卡号
					'6213363479902259472': {
						//赌博数据
						gambling: {
							hit: 3,
							reg_count: 3,
							balance: 0,
							login_time: 2,
							reg_time: 0,
							is_agent: 1
						},
						//传销数据
						pyramid: {
							hit: 0
						}
					},
					'6222032106001274118': {
						gambling: {
							hit: 0
						},
						pyramid: {
							hit: 1,
							reg_count: 1,
							balance: 1,
							login_time: 0,
							reg_time: 0,
							is_agent: 0
						}
					},
					'6222032106001274115': {
						gambling: {
							hit: 0
						},
						pyramid: {
							hit: 1,
							reg_count: 1,
							balance: 1,
							login_time: 0,
							reg_time: 0,
							is_agent: 0
						}
					}
				}
			}
		});
	}, []);

	const [formRef] = useForm();

	/**
	 * 点击分类handle
	 */
	const actionHandle = (type: CaseSort, data: RowType) => {
		switch (type) {
			case CaseSort.Bet:
				setSpecialData(data.gambling);
				break;
			case CaseSort.PyramidSales:
				setSpecialData(data.pyramid);
				break;
		}
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
			setFieldsValue({ tempFilePath: filePath });
		}
	};

	/**
	 * 查询Click
	 * @param event
	 */
	const onSearchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath } = getFieldsValue();
			if (helper.isNullOrUndefined(tempFilePath)) {
				message.destroy();
				message.warn('请选择模板文件');
			} else {
				console.log({ cmd: CommandType.BankBatch, msg: { path: tempFilePath } });
				send(SocketType.Fetch, { cmd: CommandType.BankBatch, msg: { path: tempFilePath } });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="tempFilePath" label="选择模板">
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
							disabled={Object.entries(result).length === 0}
							onClick={() => setChartModalVisible(true)}
							type="default">
							<PieChartOutlined />
							<span>占比统计</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<Table<RowType>
				dataSource={mapToTableData(result)}
				columns={getColumn(dispatch, actionHandle)}
				pagination={false}
				rowKey="mobile"
			/>
			<ChartModal
				data={totalHitData(result)}
				visible={chartModalVisible}
				onCancel={() => setChartModalVisible(false)}
			/>
			<CategoryModal specialData={specialData} onCancel={() => setSpecialData(void 0)} />
			{/* {renderCards()} */}
		</RootPanel>
	);
};

export default BankBatch;

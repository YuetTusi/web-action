import fs from 'fs';
import path from 'path';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Tag from 'antd/lib/tag';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { helper, PAGESIZE } from '@/utility/helper';
import { BatchDataSource, BatchState, SpecialData } from '@/model/batch';
import { ActionPanel } from './styled/batch-style';
import CategoryModal from './category-modal';
import { BatchProp } from './prop';
import { CaseSort } from '@/schema/common';

const cwd = process.cwd();
const isDev = process.env['NODE_ENV'] === 'development';
const { Item, useForm } = Form;
const { Column } = Table;

const Batch: FC<BatchProp> = () => {
	const dispatch = useDispatch();
	const { data, pageIndex, loading } = useSelector<any, BatchState>((state) => state.batch);
	const [currentSpecialData, setCurrentSpecialData] = useState<SpecialData>();
	const [formRef] = useForm<{ tempFilePath: string }>();

	/**
	 * 查询Click
	 */
	const searchClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath } = await getFieldsValue();
			if (helper.isNullOrUndefined(tempFilePath)) {
				message.destroy();
				message.warn('请选择模板文件');
			} else {
				const chunk = await fs.promises.readFile(tempFilePath);
				console.log(chunk);
			}
		} catch (error) {
			console.log(error);
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
	const actionClick = (type: number, data: SpecialData[]) => {
		setCurrentSpecialData(data.find((i) => i.special_type === type));
		console.log(data);
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
	const onPageChange = (pageIndex: number) =>
		dispatch({ type: 'batch/setPageIndex', payload: pageIndex });

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
				</Form>
			</PadBox>
			<div>
				<Table<BatchDataSource>
					dataSource={[]}
					pagination={{
						total: data.length,
						pageSize: PAGESIZE,
						current: pageIndex,
						onChange: onPageChange
					}}
					loading={loading}
					rowKey={'mobile'}>
					<Column
						title="序号"
						dataIndex="no"
						key="no"
						width="50"
						render={(value, record, index) => (pageIndex - 1) * PAGESIZE + index + 1}
					/>
					<Column title="查询时间" dataIndex="gmt_create" key="gmt_create" />
					<Column title="目标帐号" dataIndex="mobile" key="mobile" />
					<Column
						title="查询结果"
						dataIndex="detail"
						key="detail"
						width="200"
						render={(value, { special_data }: BatchDataSource) => (
							<ActionPanel>
								<Tag
									onClick={() => actionClick(CaseSort.Bet, special_data)}
									color="#1d39c4">
									涉赌
								</Tag>
								<Tag
									onClick={() => actionClick(CaseSort.Porn, special_data)}
									color="#faad14">
									涉黄
								</Tag>
								<Tag
									onClick={() => actionClick(CaseSort.PyramidSales, special_data)}
									color="#389e0d">
									传销
								</Tag>
							</ActionPanel>
						)}
					/>
				</Table>
			</div>
			<CategoryModal onCancel={categoryCancel} specialData={currentSpecialData} />
		</RootPanel>
	);
};

export default Batch;

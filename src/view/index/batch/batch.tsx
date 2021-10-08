import fs from 'fs';
import path from 'path';
import { ipcRenderer, OpenDialogReturnValue, SaveDialogReturnValue } from 'electron';
import React, { FC, MouseEvent } from 'react';
import { useDispatch } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DashOutlined from '@ant-design/icons/DashOutlined';
import DownloadOutlined from '@ant-design/icons/DownloadOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import message from 'antd/lib/message';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { helper } from '@/utility/helper';

const { Item, useForm } = Form;
const { Column } = Table;

const Batch: FC<{}> = () => {
	const dispatch = useDispatch();
	const [formRef] = useForm<{ tempFilePath: string }>();

	const searchClick = async (event: MouseEvent<HTMLButtonElement>) => {
		const { getFieldsValue } = formRef;
		try {
			const { tempFilePath } = await getFieldsValue();
			if (helper.isNullOrUndefined(tempFilePath)) {
				message.destroy();
				message.warn('请选择模板文件');
			}
		} catch (error) {
			console.log(error);
		}
	};
	//save-temp-file
	const downloadClick = async (event: MouseEvent<HTMLButtonElement>) => {
		const { filePath }: SaveDialogReturnValue = await ipcRenderer.invoke('save-temp-file');

		if (filePath) {
			fs.copyFile(path.join(process.cwd(), './asset/手机号模板.txt'), filePath, (err) => {
				if (err) {
					console.log(err);
					message.error('下载失败');
				} else {
					message.success('下载成功');
				}
			});
			console.log(process.cwd());
			console.log(filePath);
			//todo: 在此将模板文件拷到目标路径
		}
	};

	/**
	 * 选择文件
	 * @param defaultPath
	 */
	const selectFileHandle = async (defaultPath?: string) => {
		const { setFieldsValue } = formRef;
		const { filePaths }: OpenDialogReturnValue = await ipcRenderer.invoke('select-file');
		if (filePaths.length > 0) {
			const [filePath] = filePaths;
			console.log(filePath);
			setFieldsValue({ tempFilePath: filePath });
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
				<Table<any>>
					<Column title="序号" dataIndex="0" key="0" width="50" />
					<Column title="查询时间" dataIndex="1" key="1" />
					<Column title="目标帐号" dataIndex="2" key="2" />
					<Column title="查询结果" dataIndex="3" key="3" />
				</Table>
			</div>
		</RootPanel>
	);
};

export default Batch;

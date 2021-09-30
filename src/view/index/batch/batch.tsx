import { ipcRenderer, OpenDialogReturnValue } from 'electron';
import React, { FC, MouseEvent, useEffect } from 'react';
import { routerRedux, useDispatch } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DashOutlined from '@ant-design/icons/DashOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';

const { Item } = Form;
const { Column } = Table;

const Batch: FC<{}> = () => {
	const dispatch = useDispatch();

	useEffect(() => {
	}, []);

	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {};

	/**
	 * 选择文件
	 * @param defaultPath
	 */
	const selectFileHandle = (defaultPath?: string) => {
		ipcRenderer.invoke('select-file').then((val: OpenDialogReturnValue) => {
			console.log(val);
		});
	};

	return (
		<RootPanel>
			<PadBox>
				<Form layout="inline">
					<Item label="选择文件">
						<Input
							onClick={() => selectFileHandle(__dirname)}
							readOnly={true}
							addonAfter={<DashOutlined />}
						/>
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<div>
				<Table<any>>
					<Column title="查询时间" dataIndex="0" key="0" />
					<Column title="目标帐号" dataIndex="1" key="1" />
					<Column title="查询结果" dataIndex="2" key="2" />
				</Table>
			</div>
		</RootPanel>
	);
};

export default Batch;

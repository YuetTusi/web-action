import React, { FC, MouseEvent } from 'react';
import { useDispatch } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Table from 'antd/lib/table';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';

const { Item } = Form;
const { Option } = Select;
const { Column } = Table;

/**
 * 操作日志
 */
const OpLog: FC<{}> = () => {
	const dispatch = useDispatch();

	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {};

	const resetClick = (event: MouseEvent<HTMLButtonElement>) => {};

	return (
		<RootPanel>
			<PadBox>
				<Form layout="inline">
					<Item label="过滤项">
						<Input onClick={() => {}} />
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
					<Item>
						<Button onClick={resetClick} type="default">
							<SyncOutlined />
							<span>重置</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<div>
				<Table<any>>
					<Column title="日志序号" dataIndex="0" key="0" />
					<Column title="操作内容" dataIndex="1" key="1" />
					<Column title="操作人" dataIndex="2" key="2" />
					<Column title="操作状态" dataIndex="3" key="3" />
					<Column title="操作时间" dataIndex="4" key="4" />
				</Table>
			</div>
		</RootPanel>
	);
};

export default OpLog;

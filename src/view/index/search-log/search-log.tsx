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
 * 查询日志
 */
const SearchLog: FC<{}> = () => {
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
					<Item label="专题类型">
						<Select mode="multiple" style={{ width: '200px' }}>
							<Option value="1">涉黄</Option>
							<Option value="2">传销</Option>
							<Option value="3">涉赌</Option>
						</Select>
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
					<Column title="查询时间" dataIndex="1" key="1" />
					<Column title="查询类型" dataIndex="2" key="2" />
					<Column title="目标账号" dataIndex="3" key="3" />
					<Column title="查询结果" dataIndex="4" key="4" />
				</Table>
			</div>
		</RootPanel>
	);
};

export default SearchLog;

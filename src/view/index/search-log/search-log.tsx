import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Table from 'antd/lib/table';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { CaseSort } from '@/schema/common';
import { SearchLogData, SearchLogState } from '@/model/search-log';
import { helper, PAGESIZE } from '@/utility/helper';
import { getColumn } from './column';
import { FormValue, SearchLogProp } from './props';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';

const { Item, useForm } = Form;
const { Option } = Select;

/**
 * 查询日志
 */
const SearchLog: FC<SearchLogProp> = () => {

	const { data, pageIndex, pageSize, total, loading } = useSelector<any, SearchLogState>(
		(state) => state.searchLog
	);
	const [formRef] = useForm<FormValue>();

	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		const { getFieldsValue } = formRef;
		const { keyword, special_type } = getFieldsValue();
		// dispatch({ type: 'reading/setReading', payload: true });
		send(SocketType.Fetch, {
			cmd: CommandType.QueryLog,
			msg: {
				keyword: keyword ?? '',
				special_type: helper.isNullOrUndefined(special_type) ? '' : special_type.join(','),
				pageIndex,
				pageSize
			}
		});
	};

	const resetClick = (event: MouseEvent<HTMLButtonElement>) => {};

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const onPageChange = (pageIndex: number, pageSize?: number) => {
		const { getFieldsValue } = formRef;
		const { keyword, special_type } = getFieldsValue();
		// dispatch({ type: 'reading/setReading', payload: true });
		send(SocketType.Fetch, {
			cmd: CommandType.QueryLog,
			msg: {
				keyword: keyword ?? '',
				special_type: helper.isNullOrUndefined(special_type) ? '' : special_type.join(','),
				pageIndex,
				pageSize: pageSize ?? PAGESIZE
			}
		});
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="keyword" label="过滤项">
						<Input onClick={() => {}} />
					</Item>
					<Item name="special_type" label="专题类型">
						<Select mode="multiple" style={{ width: '200px' }}>
							<Option value={CaseSort.Porn}>涉黄</Option>
							<Option value={CaseSort.PyramidSales}>传销</Option>
							<Option value={CaseSort.Bet}>涉赌</Option>
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
				<Table<SearchLogData>
					pagination={{
						current: pageIndex,
						pageSize,
						total,
						onChange: onPageChange
					}}
					columns={getColumn()}
					dataSource={data}
					loading={loading}
					rowKey="query_id"
				/>
			</div>
		</RootPanel>
	);
};

export default SearchLog;

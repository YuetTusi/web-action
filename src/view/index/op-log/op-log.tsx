import React, { FC, MouseEvent } from 'react';
import { useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import SyncOutlined from '@ant-design/icons/SyncOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Table from 'antd/lib/table';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { OpLogData, OpLogState } from '@/model/op-log';
import { CommandType, SocketType } from '@/schema/socket';
import { PAGESIZE } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { getColumn } from './column';

const { Item, useForm } = Form;

/**
 * 操作日志
 */
const OpLog: FC<{}> = () => {
	const { data, pageIndex, pageSize, total } = useSelector<any, OpLogState>(
		(state) => state.opLog
	);
	const [formRef] = useForm<{ keyword: string }>();

	/**
	 * 查询Click
	 */
	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		const { getFieldsValue } = formRef;
		const { keyword } = getFieldsValue();
		// dispatch({ type: 'reading/setReading', payload: true });
		send(SocketType.Fetch, {
			cmd: CommandType.OperationLog,
			msg: {
				keyword: keyword ?? '',
				pageIndex,
				pageSize: pageSize ?? PAGESIZE
			}
		});
	};

	/**
	 * 重置Click
	 */
	const resetClick = (event: MouseEvent<HTMLButtonElement>) => {};

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const onPageChange = (pageIndex: number, pageSize?: number) => {
		const { getFieldsValue } = formRef;
		const { keyword } = getFieldsValue();
		// dispatch({ type: 'reading/setReading', payload: true });
		send(SocketType.Fetch, {
			cmd: CommandType.OperationLog,
			msg: {
				keyword: keyword ?? '',
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
						<Input />
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
				<Table<OpLogData>
					pagination={{
						current: pageIndex,
						pageSize,
						total,
						onChange: onPageChange
					}}
					columns={getColumn()}
					dataSource={data}
					rowKey="log_id"
				/>
			</div>
		</RootPanel>
	);
};

export default OpLog;

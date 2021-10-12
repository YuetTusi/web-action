import React, { FC, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'dva';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Table from 'antd/lib/table';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { RoleState } from '@/model/role';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';
import EditModal from './edit-modal';
import { getColumn } from './column';
import { RoleProp, SearchFormValue } from './prop';

const { Fetch } = SocketType;
const { Item, useForm } = Form;

/**
 * 角色管理
 */
const Role: FC<RoleProp> = () => {
	const dispatch = useDispatch();
	const { data, loading, pageIndex, pageSize, total, tree } = useSelector<any, RoleState>(
		(state) => state.role
	);
	const [formRef] = useForm<SearchFormValue>();

	/**
	 * 查询Click
	 */
	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		const { roleName } = getFieldsValue();
		send(Fetch, { cmd: CommandType.QueryRole, msg: { roleName: roleName ?? '' } });
	};

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const onPageChange = (pageIndex: number, pageSize?: number) => {
		const { getFieldsValue } = formRef;
		const { roleName } = getFieldsValue();
		// dispatch({ type: 'reading/setReading', payload: true });
		send(Fetch, { cmd: CommandType.QueryRole, msg: { roleName: roleName ?? '' } });
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="roleName" label="过滤项">
						<Input />
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<>
				<Table
					pagination={{
						current: pageIndex,
						pageSize,
						total,
						onChange: onPageChange
					}}
					columns={getColumn(dispatch)}
					dataSource={data}
					loading={loading}
					rowKey="role_id"
					scroll={{ x: 'max-content' }}
				/>
			</>
			<EditModal
				onOk={() => {}}
				onCancel={() => dispatch({ type: 'role/setTree', payload: [] })}
				visible={tree.length !== 0}
				data={tree}
			/>
		</RootPanel>
	);
};

export default Role;

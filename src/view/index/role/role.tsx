import React, { FC, MouseEvent, useEffect } from 'react';
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
import { PAGESIZE } from '@/utility/helper';
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
	const { data, loading, pageIndex, pageSize, total, tree, roleId, checkedKeys } = useSelector<
		any,
		RoleState
	>((state) => state.role);
	const [formRef] = useForm<SearchFormValue>();

	useEffect(() => {
		query('', 1);
	}, []);

	/**
	 * 查询
	 * @param condition 条件
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const query = (condition: string, pageIndex: number, pageSize: number = PAGESIZE) => {
		send(Fetch, {
			cmd: CommandType.QueryRole,
			msg: { roleName: condition ?? '', pageIndex, pageSize }
		});
	};

	/**
	 * 查询Click
	 */
	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		const { roleName } = getFieldsValue();
		query(roleName, pageIndex, pageSize);
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
		query(roleName, pageIndex, pageSize);
	};

	const closeModal = () => {
		dispatch({ type: 'role/setRoleId', payload: '' });
		dispatch({ type: 'role/setCheckedKeys', payload: [] });
		dispatch({ type: 'role/setTree', payload: [] });
	};

	/**
	 * 保存
	 */
	const onOk = (keys: string[]) => {
		console.log({
			cmd: CommandType.UpdateRoleMenu,
			msg: {
				role_id: roleId,
				menu: keys
			}
		});
		send(Fetch, {
			cmd: CommandType.UpdateRoleMenu,
			msg: {
				role_id: roleId,
				menu: keys
			}
		});
		closeModal();
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
			<EditModal
				onOk={onOk}
				onCancel={() => closeModal()}
				checkedKeys={checkedKeys}
				visible={tree.length !== 0}
				data={tree}
			/>
		</RootPanel>
	);
};

export default Role;

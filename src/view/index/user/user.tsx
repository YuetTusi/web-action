import React, { FC, MouseEvent, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'dva';
import debounce from 'lodash/debounce';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import TreeSelect from 'antd/lib/tree-select';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import PlusCircleOutlined from '@ant-design/icons/PlusCircleOutlined';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { UserData, UserState } from '@/model/user';
import { PAGESIZE } from '@/utility/helper';
import RechargeModal from './recharge-modal';
import EditModal from './edit-modal';
import { ActionType, SearchFormValue, UserProp } from './prop';
import { getColumn } from './column';

const { Fetch } = SocketType;
const { Item, useForm } = Form;

/**
 * 帐户管理
 */
const User: FC<UserProp> = () => {
	const dispatch = useDispatch();
	const userId = useRef<string>('');
	const userData = useRef<UserData | null>(null);
	const [formRef] = useForm<SearchFormValue>();
	const [rechargeModalVisible, setRechargeModalVisible] = useState(false);
	const [editModalVisible, setEditModalVisible] = useState(false);
	const { data, pageIndex, pageSize, total, loading } = useSelector<any, UserState>(
		(state) => state.user
	);

	/**
	 * 查询Click
	 */
	const searchClick = debounce(
		(event: MouseEvent<HTMLButtonElement>) => {
			const { getFieldsValue } = formRef;
			event.preventDefault();
			const values = getFieldsValue();

			send(Fetch, {
				cmd: CommandType.QueryUserByDept,
				msg: {
					keyword: values.keyword ?? '',
					fil_deptId: values.fil_deptId ?? '',
					pageIndex,
					pageSize: pageSize ?? PAGESIZE
				}
			});
		},
		400,
		{ leading: true, trailing: false }
	);

	const addClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setEditModalVisible(true);
	};

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const onPageChange = (pageIndex: number, pageSize: number = PAGESIZE) => {
		const { getFieldsValue } = formRef;
		const { keyword, fil_deptId } = getFieldsValue();
		// dispatch({ type: 'reading/setReading', payload: true });
		send(Fetch, {
			cmd: CommandType.QueryUserByDept,
			msg: {
				keyword: keyword ?? '',
				fil_deptId: fil_deptId ?? '',
				pageIndex,
				pageSize: pageSize ?? PAGESIZE
			}
		});
	};

	/**
	 * 功能点击handle
	 * @param id 用户id
	 * @param type 动作类型
	 */
	const actionHandle = (data: UserData, type: ActionType) => {
		userId.current = data.user_id;
		switch (type) {
			case ActionType.Recharge:
				setRechargeModalVisible(true);
				break;
			case ActionType.Freeze:
				Modal.confirm({
					onOk() {
						send(Fetch, {
							cmd: CommandType.UserIsEnable,
							msg: {
								user_id: userId.current,
								is_enabled: data.is_enabled === '1' ? '0' : '1'
							}
						});
					},
					title: data.is_enabled === '0' ? '确定启用？' : '确定禁用？',
					okText: '是',
					cancelText: '否'
				});
				break;
			case ActionType.ResetPassword:
				Modal.confirm({
					onOk() {
						send(Fetch, {
							cmd: CommandType.ResetPassword,
							msg: {
								user_id: userId.current
							}
						});
					},
					title: '确定重置密码？',
					okText: '是',
					cancelText: '否'
				});
				break;
			case ActionType.Edit:
				userData.current = data;
				setEditModalVisible(true);
				break;
			case ActionType.Del:
				Modal.confirm({
					onOk() {
						send(Fetch, {
							cmd: CommandType.DelUser,
							msg: {
								user_id: userId.current
							}
						});
					},
					title: '确定删除用户？',
					content: '删除用户不可恢复',
					okText: '是',
					cancelText: '否'
				});
				break;
		}
	};

	/**
	 * 充值
	 */
	const onRechargeOk = (values: { recharge_amount: number }) => {
		console.log({ user_id: userId.current, recharge_amount: values.recharge_amount });
		send(Fetch, {
			cmd: CommandType.Recharge,
			msg: { user_id: userId.current, recharge_amount: values.recharge_amount }
		});
	};

	/**
	 * 保存handle
	 * @param data 帐户数据
	 */
	const saveHandle = (data: UserData) => {
		if (userData.current === null) {
			console.log({ cmd: CommandType.AddUser, msg: data });
			send(Fetch, { cmd: CommandType.AddUser, msg: data });
		} else {
			console.log({ cmd: CommandType.UpdateUser, msg: data });
			send(Fetch, { cmd: CommandType.UpdateUser, msg: data });
		}
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="keyword" label="过滤项">
						<Input />
					</Item>
					<Item name="fil_deptId" label="部门" style={{ width: '200px' }}>
						<TreeSelect treeData={[]} />
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
					<Item>
						<Button onClick={addClick} type="primary">
							<PlusCircleOutlined />
							<span>添加</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<Table<UserData>
				pagination={{
					onChange: onPageChange,
					current: pageIndex,
					pageSize,
					total
				}}
				columns={getColumn(dispatch, actionHandle)}
				dataSource={data}
				loading={loading}
				rowKey={(row) => row.user_id}
				scroll={{ x: 'max-content' }}
			/>
			<RechargeModal
				onOk={onRechargeOk}
				onCancel={() => setRechargeModalVisible(false)}
				visible={rechargeModalVisible}
			/>
			<EditModal
				onOk={saveHandle}
				onCancel={() => {
					userData.current = null;
					setEditModalVisible(false);
				}}
				data={userData.current}
				visible={editModalVisible}
			/>
		</RootPanel>
	);
};

export default User;

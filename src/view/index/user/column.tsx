import React from 'react';
import { Dispatch } from 'redux';
import Tag from 'antd/lib/tag';
import { UserData } from '@/model/user';
import { ColumnsType } from 'antd/lib/table';
import { ButtonCell } from './styled/button-cell';
import { ActionType } from './prop';

const getColumn = (
	dispatch: Dispatch,
	actionHandle: (data: UserData, type: ActionType) => void
): ColumnsType<UserData> => {
	return [
		{
			title: '姓名',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: '警员编号',
			dataIndex: 'police_code',
			key: 'police_code'
		},
		{
			title: '身份证',
			dataIndex: 'idcard',
			key: 'idcard'
		},
		{
			title: '手机号',
			dataIndex: 'phonenum',
			key: 'phonenum'
		},
		{
			title: '角色',
			dataIndex: 'role_names',
			key: 'role_names',
			render(value: string[]) {
				return value.map((item, index) => (
					<Tag color="blue" key={`T_${index}`}>
						{item}
					</Tag>
				));
			}
		},
		{
			title: '有效期',
			dataIndex: 'validate',
			key: 'validate',
			align: 'center',
			width: 150
		},
		{
			title: '使用次数',
			dataIndex: 'frequency_limit',
			key: 'frequency_limit'
		},
		{
			title: '部门',
			dataIndex: 'dept_name',
			key: 'dept_name'
		},
		{
			title: '账户类型',
			dataIndex: 'user_type',
			key: 'user_type',
			align: 'center',
			width: 100,
			render(value: number) {
				switch (value) {
					case 1:
						return <Tag color="cyan">正常账户</Tag>;
					case 2:
						return <Tag color="purple">试用账户</Tag>;
					default:
						return <Tag>其他</Tag>;
				}
			}
		},
		{
			title: '备注',
			dataIndex: 'remark',
			key: 'remark'
		},
		{
			title: '操作',
			dataIndex: 'user_id',
			key: 'user_id',
			align: 'center',
			fixed: 'right',
			width: 280,
			render(id, record) {
				return (
					<ButtonCell>
						<a
							onClick={() => {
								actionHandle(record, ActionType.Recharge);
							}}>
							充值
						</a>
						<a
							onClick={() => {
								actionHandle(record, ActionType.Freeze);
							}}>
							{record.is_enabled === '0' ? '启用' : '禁用'}
						</a>
						<a
							onClick={() => {
								actionHandle(record, ActionType.ResetPassword);
							}}>
							重置密码
						</a>
						<a
							onClick={() => {
								actionHandle(record, ActionType.Edit);
							}}>
							编辑
						</a>
						<a
							onClick={() => {
								actionHandle(record, ActionType.Del);
							}}>
							删除
						</a>
					</ButtonCell>
				);
			}
		}
	];
};

export { getColumn };

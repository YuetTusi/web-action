import React from 'react';
import { Dispatch } from 'dva';
import { ColumnsType } from 'antd/lib/table';
import { RoleData } from '@/model/role';

/**
 * 表头
 * @returns 列头定义
 */
const getColumn = (dispatch: Dispatch): ColumnsType<RoleData> => {
	return [
		{
			title: '角色名',
			dataIndex: 'role_name',
			key: 'role_name'
		},
		{
			title: '角色类型',
			dataIndex: 'role_type_name',
			key: 'role_type_name'
		},
		{
			title: '菜单权限',
			dataIndex: 'menuName',
			key: 'menuName',
			render(value: string[]) {
				return value.join('，');
			}
		},
		{
			title: '描述',
			dataIndex: 'description',
			key: 'description'
		},
		{
			title: '创建时间',
			dataIndex: 'gmt_create',
			key: 'gmt_create',
			align: 'center',
			width: 160
		},
		{
			title: '更新时间',
			dataIndex: 'gmt_modified',
			key: 'gmt_modified',
			align: 'center',
			width: 160
		},
		{
			title: '编辑',
			dataIndex: 'role_id',
			key: 'role_id',
			align: 'center',
			width: 60,
			fixed: 'right',
			render(value: string, { menu_code }) {
				return (
					<a
						onClick={() => {
							dispatch({ type: 'role/setRoleId', payload: value });
							dispatch({
								type: 'role/setCheckedKeys',
								payload: menu_code
							});
							dispatch({
								type: 'role/fetchMenu'
							});
						}}>
						编辑
					</a>
				);
			}
		}
	];
};

export { getColumn };

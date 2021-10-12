import React from 'react';
import { Dispatch } from 'dva';
import { ColumnsType } from 'antd/lib/table';
import { RoleData } from '@/model/role';
import { DataNode } from 'antd/lib/tree';

/**
 * 返回树结构数据
 * @param menuCode 结点编码数组
 * @param menuName 结点名称数组
 * @returns Antd树形数据
 */
const getTree = (menuCode: string[], menuName: string[]) => {
	if (menuCode.length !== menuName.length) {
		throw new Error('树形数据错误');
	}

	let nodes: DataNode[] = [];

	for (let i = 0; i < menuCode.length; i++) {
		if (menuCode[i].length === 3) {
			nodes.push({
				title: menuName[i],
				key: menuCode[i],
				children: menuCode.reduce((ac: DataNode[], current, index) => {
					if (current.length !== 3 && current.startsWith(menuCode[i])) {
						ac.push({
							title: menuName[index],
							key: current
						});
					}
					return ac;
				}, [])
			});
		}
	}
	return nodes;
};

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
			render(value: string, { menuName, menu_code }) {
				return (
					<a
						onClick={() => {
							dispatch({
								type: 'role/setTree',
								payload: getTree(menu_code, menuName)
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

import React, { FC, useEffect, useState, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'dva';
import Button from 'antd/lib/button';
import Tree, { EventDataNode } from 'antd/lib/tree';
import { Key } from 'antd/es/table/interface';
import RootPanel from '@/component/root';
import { DepartmentState } from '@/model/department';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';
import { FormBox, FullPanel, LeftBox, MainBox, TopBox, TreeBox } from './styled/full-panel';
import DeptForm from './dept-form';
import { getDeptTree, getRegionTree } from './helper';
import { DepartmentProp, TopFormValue } from './prop';

const { Fetch } = SocketType;
const { Group } = Button;

/**
 * 部门管理
 */
const Department: FC<DepartmentProp> = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState(false);
	const [isTop, setIsTop] = useState(true);
	const { tree, region, editDept } = useSelector<any, DepartmentState>(
		(state) => state.department
	);

	useEffect(() => {
		send(Fetch, { cmd: CommandType.QueryDeptByParent, msg: null });
		send(Fetch, { cmd: CommandType.Region, msg: null });
	}, []);

	const onTreeSelect = (
		selectedKeys: Key[],
		info: {
			node: EventDataNode;
		}
	) => {
		if ((info.node as any).dept_id === '-1') {
			setIsTop(true);
		} else {
			setIsTop(false);
		}
		setIsEdit(true);
		dispatch({ type: 'department/setEditDept', payload: info.node });
	};

	/**
	 * 添加一级部门Click
	 */
	const onAddTopDeptClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsEdit(false);
		setIsTop(true);
		dispatch({ type: 'department/setEditDept', payload: null });
	};

	/**
	 * 添加子级部门Click
	 */
	const onAddSubDeptClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		setIsEdit(false);
		setIsTop(false);
		dispatch({ type: 'department/setEditDept', payload: null });
	};

	/**
	 * 一级部门表单Valid
	 */
	const onTopFormValid = (values: TopFormValue, isEdit: boolean, isTop: boolean) => {
		if (helper.isNullOrUndefined(values.parent_id)) {
			values.parent_id = '-1';
		}
		if (isEdit) {
			console.log('编辑');
			console.log({ cmd: CommandType.UpdateDept, msg: values });
			send(Fetch, { cmd: CommandType.UpdateDept, msg: values });
		} else {
			console.log('添加');
			console.log({ cmd: CommandType.AddDept, msg: values });
			send(Fetch, { cmd: CommandType.AddDept, msg: values });
		}
		console.log(values);
	};

	/**
	 * 删除部门
	 */
	const onTopFormDel = (values: TopFormValue) => {
		console.log('删除');
		console.log({ cmd: CommandType.DelDept, msg: { dept_id: values.dept_id } });
		send(Fetch, { cmd: CommandType.DelDept, msg: { dept_id: values.dept_id } });
	};

	return (
		<RootPanel>
			<FullPanel>
				<LeftBox>
					<TopBox>
						<Group>
							<Button onClick={onAddTopDeptClick} type="primary">
								添加一级部门
							</Button>
							<Button onClick={onAddSubDeptClick} type="primary">
								添加子级部门
							</Button>
						</Group>
					</TopBox>
					<TreeBox>
						<Tree
							onSelect={onTreeSelect}
							treeData={getDeptTree(tree)}
							defaultExpandAll={true}
						/>
					</TreeBox>
				</LeftBox>
				<MainBox>
					<TopBox>部门详情</TopBox>
					<FormBox>
						<DeptForm
							onValid={onTopFormValid}
							onDel={onTopFormDel}
							isEdit={isEdit}
							isTop={isTop}
							data={editDept}
							deptTree={getDeptTree(tree)}
							regionTree={getRegionTree(region)}
						/>
					</FormBox>
				</MainBox>
			</FullPanel>
		</RootPanel>
	);
};

export default Department;

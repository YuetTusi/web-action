import React, { FC, useEffect } from 'react';
import { useSelector } from 'dva';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import TreeSelect from 'antd/lib/tree-select';
import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import RollbackOutlined from '@ant-design/icons/RollbackOutlined';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import { TopFormProp, TopFormValue } from './prop';
import { DeptTreeState } from '@/model/dept-tree';
import { helper } from '@/utility/helper';

const { TextArea } = Input;
const { Group } = Button;
const { Item, useForm } = Form;

/**
 * 一级部门表单
 */
const DeptForm: FC<TopFormProp> = ({
	isEdit,
	isTop,
	regionTree,
	data,
	onValid,
	onDel
}) => {
	const { treeData } = useSelector<any, DeptTreeState>((state) => state.deptTree);
	const [formRef] = useForm<TopFormValue>();

	useEffect(() => {
		const { setFieldsValue } = formRef;
		formRef.resetFields();
		if (isEdit) {
			//# 编辑操作
			setFieldsValue(data!);
		}
	}, [isEdit, data, onValid]);

	/**
	 * 提交
	 * @param isEdit 是否是编辑操作
	 */
	const onSubmit = async () => {
		const { validateFields } = formRef;

		try {
			const values = await validateFields();
			if (isEdit) {
				values.dept_id = data?.dept_id ?? '';
			}
			onValid(values, isEdit, isTop);
		} catch (error) {
			console.log(error);
		}
	};

	/**
	 * 重置
	 */
	const onReset = async () => {
		const { resetFields } = formRef;
		resetFields();
	};

	/**
	 * 删除
	 */
	const onDeptDel = () => {
		const { getFieldsValue } = formRef;
		const values = getFieldsValue();
		values.dept_id = data?.dept_id!;
		Modal.confirm({
			onOk() {
				onDel(values);
			},
			okText: '是',
			cancelText: '否',
			title: `确定删除「${values.dept_name}」？`,
			content: '删除后无法恢复'
		});
	};

	return (
		<Form form={formRef} layout="vertical">
			<Item
				rules={[
					{
						required: true,
						message: '请填写部门名称'
					}
				]}
				name="dept_name"
				label="部门名称">
				<Input />
			</Item>
			{isTop ? null : (
				<Item
					rules={[
						{
							required: true,
							message: '请选择上级部门'
						}
					]}
					name="parent_id"
					label="上级部门">
					<TreeSelect treeData={helper.getDeptTree(treeData)} />
				</Item>
			)}
			<Item
				rules={[
					{
						required: true,
						message: '请选择地区'
					}
				]}
				name="city_code"
				label="地区">
				<TreeSelect treeData={regionTree} />
			</Item>
			<Item name="description" label="备注">
				<TextArea />
			</Item>

			{isEdit ? (
				<Group>
					<Button onClick={() => onSubmit()} type="primary">
						<CheckCircleOutlined />
						<span>修改</span>
					</Button>
					<Button onClick={() => onDeptDel()} type="primary" danger={true}>
						<DeleteOutlined />
						<span>删除</span>
					</Button>
				</Group>
			) : (
				<Group>
					<Button onClick={() => onSubmit()} type="primary">
						<CheckCircleOutlined />
						<span>确定</span>
					</Button>
					<Button onClick={onReset} type="default">
						<RollbackOutlined />
						<span>重置</span>
					</Button>
				</Group>
			)}
		</Form>
	);
};

export default DeptForm;

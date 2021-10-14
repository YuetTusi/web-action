import React, { FC, MouseEvent, useEffect } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import DatePicker from 'antd/lib/date-picker';
import Select from 'antd/lib/select';
import TreeSelect from 'antd/lib/tree-select';
import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import dayjs from 'dayjs';
import { EditFormValue, EditModalProp } from './prop';
import { ChineseIdNumber, MobileNumber, PoliceNumber } from '@/utility/regex';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';

const { Fetch } = SocketType;
const { Item, useForm } = Form;
const { Password, TextArea } = Input;
const { Option } = Select;

/**
 * 用户添加/编辑
 */
const EditModal: FC<EditModalProp> = ({ visible, data, onCancel, onOk }) => {
	const [formRef] = useForm<EditFormValue>();

	useEffect(() => {
		const { setFieldsValue } = formRef;
		if (data !== null) {
			//# Modify
			setFieldsValue({
				...data,
				validate: dayjs(data.validate)
			});
		}
	}, [data]);

	/**
	 * 提交
	 */
	const onSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { validateFields } = formRef;
		try {
			const values = await validateFields();
			values.phonenum = values.phonenum ?? '';
			values.remark = values.remark ?? '';
			values.validate = values.validate.format('YYYY-MM-DD HH:mm:ss');
			if (data === null) {
				//# 添加
				onOk(values);
			} else {
				//# 编辑
				onOk({ ...data, ...values });
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			footer={[
				<Button
					onClick={() => {
						formRef.resetFields();
						onCancel();
					}}
					type="default"
					key="B_0">
					<CheckCircleOutlined />
					取消
				</Button>,
				<Button onClick={onSubmit} type="primary" key="B_1">
					<CloseCircleOutlined />
					确定
				</Button>
			]}
			visible={visible}
			onCancel={() => {
				formRef.resetFields();
				onCancel();
			}}
			title={data === null ? '添加帐户' : '编辑帐户'}
			maskClosable={false}
			destroyOnClose={true}
			forceRender={true}
			width={800}
			centered={true}>
			<Form form={formRef} layout="vertical">
				<Row gutter={16}>
					<Col span={12}>
						<Item
							rules={[{ required: true, message: '请选择帐户类型' }]}
							name="user_type"
							label="帐户类型">
							<Select>
								<Option value={1} key="K_1">
									正常账户
								</Option>
								<Option value={2} key="K_2">
									试用账户
								</Option>
							</Select>
						</Item>
					</Col>
					<Col span={12}>
						<Item
							rules={[{ pattern: MobileNumber, message: '请输入正确的手机号' }]}
							name="phonenum"
							label="手机号">
							<Input maxLength={13} />
						</Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Item
							rules={[
								{ required: true, message: '请填写警员编号' },
								{ pattern: PoliceNumber, message: '6位数字' }
							]}
							name="police_code"
							label="警员编号">
							<Input maxLength={6} placeholder="6位数字" />
						</Item>
					</Col>
					<Col span={12}>
						<Item
							rules={[{ required: true, message: '请填写警员姓名' }]}
							name="name"
							label="警员姓名">
							<Input />
						</Item>
					</Col>
				</Row>
				{data === null ? (
					<Row gutter={16}>
						<Col span={12}>
							<Item
								rules={[
									{ required: true, message: '请填写密码' },
									{ pattern: /^.{6,40}$/, message: '密码需6位以上' }
								]}
								name="password"
								label="密码">
								<Password maxLength={40} placeholder="6位以上" />
							</Item>
						</Col>
						<Col span={12}>
							<Item
								dependencies={['password']}
								rules={[
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												helper.isNullOrUndefined(
													getFieldValue('password')
												) ||
												getFieldValue('password') === value
											) {
												return Promise.resolve();
											} else {
												return Promise.reject(
													new Error('请与密码填写一致')
												);
											}
										}
									})
								]}
								name="confirm_password"
								label="确认密码">
								<Password placeholder="与密码填写一致" />
							</Item>
						</Col>
					</Row>
				) : null}

				<Row gutter={16}>
					<Col span={12}>
						<Item
							rules={[
								{ pattern: ChineseIdNumber, message: '请填写正确的公民身份证号' }
							]}
							name="idcard"
							label="身份证号">
							<Input maxLength={18} placeholder="18位公民身份证号码" />
						</Item>
					</Col>
					<Col span={12}>
						<Item
							initialValue={dayjs().add(3, 'year')}
							rules={[{ required: true, message: '请选择有效期' }]}
							name="validate"
							label="有效期">
							<DatePicker
								showTime={true}
								format="YYYY-MM-DD HH:mm:ss"
								style={{ width: '100%' }}
							/>
						</Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={12}>
						<Item
							rules={[{ required: true, message: '请选择部门' }]}
							name="dept_id"
							label="部门">
							<TreeSelect treeData={[]} />
						</Item>
					</Col>
					<Col span={12}>
						<Item
							rules={[{ required: true, message: '请选择角色' }]}
							name="roleIds"
							label="角色">
							<Select mode="multiple">
								<Option value="73a58b36c708fa123af605de12361588" key="R_1">
									试用用户
								</Option>
								<Option value="a0d71c6ca20dbf6a73c73af52e65d7d1" key="R_2">
									普通用户
								</Option>
								<Option value="c8c440884cb47b589a9dda3ff455990d" key="R_3">
									部门管理员
								</Option>
							</Select>
						</Item>
					</Col>
				</Row>
				<Row gutter={16}>
					<Col span={24}>
						<Item name="remark" label="备注">
							<TextArea />
						</Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

EditModal.defaultProps = {
	visible: false,
	onOk: () => {},
	onCancel: () => {}
};

export default EditModal;

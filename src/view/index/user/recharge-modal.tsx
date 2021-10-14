import React, { FC } from 'react';
import Button from 'antd/lib/button';
import InputNumber from 'antd/lib/input-number';
import Form from 'antd/lib/form';
import Modal from 'antd/lib/modal';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { RechargeModalProp } from './prop';

const { Item, useForm } = Form;

/**
 * 充值
 */
const RechargeModal: FC<RechargeModalProp> = ({ visible, onCancel, onOk }) => {
	const [formRef] = useForm<{ recharge_amount: number }>();

	const onSubmit = async () => {
		const { validateFields } = formRef;
		try {
			const values = await validateFields();
			onOk(values);
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
					<CloseCircleOutlined />
					取消
				</Button>,
				<Button onClick={() => onSubmit()} type="primary" key="B_1">
					<CheckCircleOutlined />
					确定
				</Button>
			]}
			visible={visible}
			onCancel={onCancel}
			title="充值"
			maskClosable={false}
			destroyOnClose={true}>
			<Form form={formRef} layout="vertical">
				<Item
					rules={[{ required: true, message: '请填写充值数量' }]}
					name="recharge_amount"
					label="充值数量">
					<InputNumber min={1} maxLength={20} style={{ width: '100%' }} />
				</Item>
			</Form>
		</Modal>
	);
};

RechargeModal.defaultProps = {
	visible: false,
	onOk: () => {},
	onCancel: () => {}
};

export default RechargeModal;

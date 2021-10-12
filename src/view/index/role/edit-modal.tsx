import React, { FC, useEffect, useRef } from 'react';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Tree from 'antd/lib/tree';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import { EditModalProp } from './prop';
import { Key } from 'antd/es/table/interface';

/**
 * 编辑框
 */
const EditModal: FC<EditModalProp> = ({ visible, data, checkedKeys, onCancel, onOk }) => {
	const keys = useRef<string[]>([]);
	useEffect(() => {
		keys.current = checkedKeys ?? [];
	}, [checkedKeys]);

	const onTreeCheck = (checked: Key[] | { checked: Key[]; halfChecked: Key[] }) => {
		keys.current = checked as string[];
	};

	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="default" key="B_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>,
				<Button onClick={() => onOk(keys.current)} type="primary" key="B_1">
					<CheckCircleOutlined />
					<span>确定</span>
				</Button>
			]}
			onCancel={onCancel}
			title="修改权限"
			visible={visible}
			maskClosable={false}
			destroyOnClose={true}>
			<Tree
				onCheck={onTreeCheck}
				treeData={data}
				defaultCheckedKeys={checkedKeys}
				checkable={true}
				defaultExpandAll={true}
			/>
		</Modal>
	);
};

EditModal.defaultProps = {
	checkedKeys: [],
	onCancel: () => {},
	onOk: () => {}
};

export default EditModal;

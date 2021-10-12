import React, { FC } from 'react';
import Modal from 'antd/lib/modal';
import Button from 'antd/lib/button';
import Tree from 'antd/lib/tree';
import { EditModalProp } from './prop';

/**
 * 编辑框
 */
const EditModal: FC<EditModalProp> = ({ visible, data, checkedKeys, onCancel, onOk }) => {
	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="default">
					取消
				</Button>,
				<Button onClick={() => onOk()} type="primary">
					确定
				</Button>
			]}
			onCancel={onCancel}
			title="修改权限"
			visible={visible}
			maskClosable={false}
			destroyOnClose={true}>
			<Tree
				treeData={data}
				checkedKeys={checkedKeys}
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

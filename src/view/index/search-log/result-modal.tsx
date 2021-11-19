import React, { FC } from 'react';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import CloseCircleOutlined from '@ant-design/icons/CloseCircleOutlined';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import Desc from './desc';
import { ResultModalProp } from './props';

/**
 * 结果展示弹框
 */
const ResultModal: FC<ResultModalProp> = ({ visbile, data, onCancel }) => {
	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel!()} key="B_0">
					<CloseCircleOutlined />
					<span>取消</span>
				</Button>
			]}
			title="查询结果"
			visible={visbile}
			onCancel={onCancel}
            width={800}
			destroyOnClose={true}
			centered={true}
			maskClosable={false}>
			<Desc data={data} />
		</Modal>
	);
};

ResultModal.defaultProps = {
	visbile: false,
	onCancel: () => {}
};

export default ResultModal;

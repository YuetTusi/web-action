import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import HitChart from '@/component/hit-chart';

interface ChartModalProp {
    /**
     * 数据（顺序：涉黄->传销->涉赌）
     */
	data: Array<{ name: string; value: number }>;
	/**
	 * 显示
	 */
	visible: boolean;
	/**
	 * 取消click
	 */
	onCancel: () => void;
}

/**
 * 图表Modal
 */
const ChartModal: FC<ChartModalProp> = ({ data, visible, onCancel }) => {
	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="primary" key="B_1">
					<CheckCircleOutlined />
					<span>确定</span>
				</Button>
			]}
			onCancel={onCancel}
			visible={visible}
			title={'命中统计'}
			width={840}
			centered={true}
			maskClosable={false}
			closable={true}>
			<HitChart data={data} />
		</Modal>
	);
};

export default ChartModal;

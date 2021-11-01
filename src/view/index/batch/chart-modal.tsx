import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import HitChart from '@/component/hit-chart';
import { BatchDataSource } from '@/model/batch';

interface ChartModalProp {
	/**
	 * 数据（顺序：涉黄->传销->涉赌）
	 */
	data: Array<{ mobile: string; category: Record<string, BatchDataSource> }>;
	/**
	 * 显示
	 */
	visible: boolean;
	/**
	 * 取消click
	 */
	onCancel: () => void;
}

const toChartData = (
	data: {
		mobile: string;
		category: Record<string, BatchDataSource>;
	}[]
) => {
	let porn = 0;
	let bet = 0;
	let pyramidSales = 0;

	for (let i = 0; i < data.length; i++) {
		if (data[i].category['涉黄']?.isReg === 1) {
			porn++;
		}
		if (data[i].category['传销']?.isReg === 1) {
			pyramidSales++;
		}
		if (data[i].category['涉赌']?.isReg === 1) {
			bet++;
		}
	}
	return [
		{ name: '涉黄', value: porn },
		{ name: '传销', value: pyramidSales },
		{ name: '涉赌', value: bet }
	];
};

/**
 * 图表Modal
 */
const ChartModal: FC<ChartModalProp> = ({ data, visible, onCancel }) => {
	// console.log(toChartData(data));

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
			<HitChart data={toChartData(data)} />
		</Modal>
	);
};

export default ChartModal;

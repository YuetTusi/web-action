import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import React, { FC, useEffect } from 'react';
import Empty from 'antd/lib/empty';
import { helper } from '@/utility/helper';

echarts.use([
	TitleComponent,
	TooltipComponent,
	LegendComponent,
	PieChart,
	CanvasRenderer,
	LabelLayout
]);

const option: Record<string, any> = {
	tooltip: {
		trigger: 'item',
		formatter: '{b}数量：{c}<br/>占比：{d}%'
	},
	legend: {
		orient: 'vertical',
		left: 'right'
	},
	series: [
		{
			name: '命中统计',
			type: 'pie',
			emphasis: {
				itemStyle: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: 'rgba(54, 46, 46, 0.5)'
				}
			}
		}
	]
};

/**
 * 命中统计饼图
 */
const HitChart: FC<{ data: Array<{ name: string; value: number }> }> = ({ data }) => {
	const colors = ['#faad14', '#52c41a', '#1d39c4'];

	useEffect(() => {
		const $chartRoot = document.getElementById('chart-root');
		console.log(data);
		if ($chartRoot !== null && !helper.isNullOrUndefined(data) && data.length > 0) {
			const chart = echarts.init($chartRoot);
			if (data.length === 2) {
				colors.shift();
			}
			option.color = colors;
			option.series[0].data = data.map((i) => ({
				...i,
				label: { show: true, formatter: '{b}数量：{c}' }
			}));
			chart.setOption(option);
		}
	}, [data]);

	return (
		<div id="chart-root" style={{ width: '800px', height: '460px' }}>
			<Empty
				image={Empty.PRESENTED_IMAGE_SIMPLE}
				style={{ paddingTop: '200px' }}
				description="暂无统计数据"
			/>
		</div>
	);
};

export default HitChart;

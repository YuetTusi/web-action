import countBy from 'lodash/countBy';
import debounce from 'lodash/debounce';
import styled from 'styled-components';
import React, { FC, useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import Empty from 'antd/lib/empty';
import { helper } from '@/utility/helper';
import { AppCategoryChartProp } from './prop';
import { InstalledApp } from '@/model/installation';
import { ChartRoot, EmptyListBox } from './styled/pie';

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
	legend: false,
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
 * 分类统计
 */
const categoryTotal = (data: InstalledApp) => {
	const { cateNameList } = data;
	const categoryList = (
		helper.isNullOrUndefined(cateNameList) ? [] : cateNameList.split(',')
	).map((item) => (item === '' ? '未知' : item));

	const nv = Object.entries(countBy(categoryList));
	let total: { value: number; name: string }[] = [];
	for (let [k, v] of nv) {
		total.push({ name: k, value: v });
	}
	return total;
};

/**
 * 将包名、应用名、分类联合成数组
 */
const combine = (data: InstalledApp | null) => {
	if (data === null) {
		return [];
	}
	const { cateNameList, apppkgList, appNameList } = data;
	const category = (helper.isNullOrUndefined(cateNameList) ? [] : cateNameList.split(',')).map(
		(item) => (item === '' ? '未知' : item)
	);
	const pkg = helper.isNullOrUndefined(apppkgList) ? [] : apppkgList.split(',');
	const name = helper.isNullOrUndefined(appNameList) ? [] : appNameList.split(',');
	let next: { pkg: string; name: string; category: string }[] = [];

	for (let i = 0, len = appNameList.length; i < len; i++) {
		next.push({ name: name[i], pkg: pkg[i], category: category[i] });
	}

	return next;
};

/**
 * 应用分类统计图
 */
const AppCategoryChart: FC<AppCategoryChartProp> = ({ data }) => {
	const [category, setCategory] = useState<string>(); //当前分类
	const [detailList, setDetailList] = useState<{ pkg: string; name: string; category: string }[]>(
		[]
	); //当前展示列表

	useEffect(() => {
		if (!helper.isNullOrUndefined(data)) {
			const $chartRoot = document.getElementById('chart-root');
			const chart = echarts.init($chartRoot!);
			chart.on('click', (event) => {
				const { name } = event.data as any;
				onPieClick(name);
			});
			if ($chartRoot !== null) {
				option.series[0].data = categoryTotal(data!);
				chart.setOption(option);
			}
		}
	}, [data]);

	/**
	 * 饼图Click
	 * @param name 分类名称
	 */
	const onPieClick = debounce(
		(name: string) => {
			setCategory(name);
			setDetailList(combine(data).filter((item) => item.category === name));
		},
		400,
		{ leading: true, trailing: false }
	);

	const renderLi = (data: { pkg: string; name: string; category: string }[]) => {
		if (data.length === 0) {
			return (
				<EmptyListBox>
					<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无统计数据" />
				</EmptyListBox>
			);
		} else {
			return (
				<ul>
					{data
						.map(({ name, pkg }, i) => {
							return <li key={`K_${i}`}>{`${name}（${pkg}）`}</li>;
						})}
				</ul>
			);
		}
	};

	return (
		<ChartRoot>
			<div id="chart-root" className="chart-box"></div>

			<div className="list-box">
				<div className="list-panel">
					<div className="caption">{category === undefined ? '应用列表' : category}</div>
					<div className="list">{renderLi(detailList)}</div>
				</div>
			</div>
		</ChartRoot>
	);
};

export default AppCategoryChart;

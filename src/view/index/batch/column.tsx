import React from 'react';
import { Dispatch } from 'dva';
import { ColumnsType } from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import { ActionPanel } from './styled/batch-style';
import { BatchDataSource, SpecialData } from '@/model/batch';
import { CaseSort } from '@/schema/common';

/**
 * 表头
 * @returns 列头定义
 */
const getColumn = (
	dispatch: Dispatch,
	onSortClick: (data?: SpecialData) => void
): ColumnsType<BatchDataSource> => {
	return [
		{
			title: '查询时间',
			dataIndex: 'gmt_create',
			key: 'gmt_create'
		},
		{
			title: '目标帐号',
			dataIndex: 'mobile',
			key: 'mobile'
		},
		{
			title: '查询结果',
			dataIndex: 'special_data',
			key: 'special_data',
			width: 180,
			align: 'center',
			render(value: SpecialData[]) {
				return (
					<ActionPanel>
						<Tag
							onClick={() => {
								const next = value.find((i) => i.special_type === CaseSort.Bet);
								onSortClick(next);
							}}
							color="#1d39c4">
							涉赌
						</Tag>
						<Tag
							onClick={() => {
								const next = value.find((i) => i.special_type === CaseSort.Porn);
								onSortClick(next);
							}}
							color="#faad14">
							涉黄
						</Tag>
						<Tag
							onClick={() => {
								const next = value.find(
									(i) => i.special_type === CaseSort.PyramidSales
								);
								onSortClick(next);
							}}
							color="#389e0d">
							传销
						</Tag>
					</ActionPanel>
				);
			}
		}
	];
};

export { getColumn };

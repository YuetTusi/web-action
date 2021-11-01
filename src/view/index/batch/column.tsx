import React from 'react';
import { Dispatch } from 'dva';
import { ColumnsType } from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import { ActionPanel } from './styled/batch-style';
import { BatchDataSource } from '@/model/batch';
import { CaseSort } from '@/schema/common';

/**
 * 表头
 * @returns 列头定义
 */
const getColumn = (
	dispatch: Dispatch,
	onSortClick: (data: BatchDataSource, type: CaseSort) => void
): ColumnsType<{ mobile: string; category: BatchDataSource }> => {
	return [
		{
			title: '目标帐号',
			dataIndex: 'mobile',
			key: 'mobile'
		},
		{
			title: '查询结果',
			dataIndex: 'category',
			key: 'category',
			width: 180,
			align: 'center',
			render(value) {
				return (
					<ActionPanel>
						<Tag
							onClick={() => {
								onSortClick(value['涉黄'], CaseSort.Porn);
							}}
							color="#faad14">
							涉黄
						</Tag>
						<Tag
							onClick={() => {
								onSortClick(value['传销'], CaseSort.PyramidSales);
							}}
							color="#389e0d">
							传销
						</Tag>
						<Tag
							onClick={() => {
								onSortClick(value['涉赌'], CaseSort.Bet);
							}}
							color="#1d39c4">
							涉赌
						</Tag>
					</ActionPanel>
				);
			}
		}
	];
};

export { getColumn };

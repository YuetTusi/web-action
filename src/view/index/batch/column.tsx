import React from 'react';
import { Dispatch } from 'dva';
import { ColumnsType } from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import { ActionPanel } from './styled/batch-style';
import { BatchDataSource } from '@/model/batch';
import { CaseSort } from '@/schema/common';

const renderTag = (
	data: Record<string, BatchDataSource>,
	onSortClick: (data: BatchDataSource, type: CaseSort) => void
) => {
	return (
		<>
			<Tag
				onClick={() => {
					onSortClick(data['涉黄'], CaseSort.Porn);
				}}
				color={data['涉黄'].isReg !== 0 ? '#faad14' : 'default'}>
				涉黄
			</Tag>
			<Tag
				onClick={() => {
					onSortClick(data['传销'], CaseSort.PyramidSales);
				}}
				color={data['传销'].isReg !== 0 ? '#389e0d' : 'default'}>
				传销
			</Tag>
			<Tag
				onClick={() => {
					onSortClick(data['涉赌'], CaseSort.Bet);
				}}
				color={data['涉赌'].isReg !== 0 ? '#1d39c4' : 'default'}>
				涉赌
			</Tag>
		</>
	);
};

/**
 * 表头
 * @returns 列头定义
 */
const getColumn = (
	dispatch: Dispatch,
	onSortClick: (data: BatchDataSource, type: CaseSort) => void,
	mobileList: Array<{ md5: string; value: string }> = []
): ColumnsType<{ mobile: string; category: BatchDataSource }> => {
	return [
		{
			title: '手机号',
			dataIndex: 'mobile',
			key: 'mobile',
			render(md5: string) {
				return mobileList.find((i) => i.md5 === md5)?.value ?? '';
			}
		},
		{
			title: '查询结果',
			dataIndex: 'category',
			key: 'category',
			width: 180,
			align: 'center',
			render(value) {
				return <ActionPanel>{renderTag(value, onSortClick)}</ActionPanel>;
			}
		}
	];
};

export { getColumn };

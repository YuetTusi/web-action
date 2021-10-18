import React from 'react';
import { Dispatch } from 'redux';
import { ColumnType } from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import { Gambling, Pyramid } from '@/model/bank';
import { CaseSort } from '@/schema/common';
import { ActionPanel } from './styled/action-panel';

interface RowType {
	/**
	 * 手机号
	 */
	mobile: string;
	/**
	 * 涉赌数据
	 */
	gambling: Gambling;
	/**
	 * 传销数据
	 */
	pyramid: Pyramid;
}

/**
 * 表头定义
 */
function getColumn(
	dispatch: Dispatch,
	actionHandle: (type: CaseSort, data: RowType) => void
): ColumnType<RowType>[] {
	const columns: ColumnType<RowType>[] = [
		{
			title: '银行卡号',
			dataIndex: 'mobile',
			key: 'mobile'
		},
		{
			title: '查询结果',
			dataIndex: 'action',
			key: 'action',
			width: 140,
			align: 'center',
			render(value, record) {
				return (
					<ActionPanel>
						<Tag
							onClick={() => actionHandle(CaseSort.PyramidSales, record)}
							color="#52c41a">
							传销
						</Tag>
						<Tag onClick={() => actionHandle(CaseSort.Bet, record)} color="#1d39c4">
							涉赌
						</Tag>
					</ActionPanel>
				);
			}
		}
	];
	return columns;
}

export { getColumn, RowType };

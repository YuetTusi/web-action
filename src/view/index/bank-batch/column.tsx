import React from 'react';
import { Dispatch } from 'redux';
import { ColumnType } from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import { CardResult } from '@/model/bank-batch';
import { CaseSort } from '@/schema/common';
import { ActionPanel } from './styled/action-panel';

type RowType = {
	card: string;
	result: CardResult;
};

/**
 * 表头定义
 */
function getColumn(
	dispatch: Dispatch,
	actionHandle: (type: string, data: CardResult) => void
): ColumnType<RowType>[] {
	const columns: ColumnType<RowType>[] = [
		{
			title: '银行卡号',
			dataIndex: 'card',
			key: 'card'
		},
		{
			title: '查询结果',
			dataIndex: 'card',
			key: 'card',
			width: 180,
			align: 'center',
			render(value: string, { result }: RowType) {
				return (
					<ActionPanel>
						<Tag
							onClick={() => actionHandle('涉黄', result)}
							color={result['涉黄'].isReg !== 0 ? '#faad14' : 'default'}>
							涉黄
						</Tag>
						<Tag
							onClick={() => actionHandle('传销', result)}
							color={result['传销'].isReg !== 0 ? '#389e0d' : 'default'}>
							传销
						</Tag>
						<Tag
							onClick={() => actionHandle('涉赌', result)}
							color={result['涉赌'].isReg !== 0 ? '#1d39c4' : 'default'}>
							涉赌
						</Tag>
					</ActionPanel>
				);
			}
		}
	];
	return columns;
}
//							// color={record[value]. === 0 ? 'default' : '#52c41a'}>
export { getColumn, RowType };

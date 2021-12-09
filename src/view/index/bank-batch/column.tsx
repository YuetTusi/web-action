import React from 'react';
import { Dispatch } from 'redux';
import { ColumnType } from 'antd/lib/table';
import Tag from 'antd/lib/tag';
import { CardResult } from '@/model/bank-batch';
import { ActionPanel } from './styled/action-panel';
import { helper } from '@/utility/helper';

type RowType = {
	card: string;
	result: CardResult;
};

/**
 * 表头定义
 */
function getColumn(
	dispatch: Dispatch,
	actionHandle: (type: string, data: CardResult, card: string) => void
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
			width: 140,
			align: 'center',
			render(value: string, { result }: RowType) {
				return (
					<ActionPanel>
						{/* <Tag
							onClick={() => actionHandle('涉黄', result, value)}
							color={
								helper.isNullOrUndefined(result['涉黄']?.isReg)
									? 'default'
									: result['涉黄']?.isReg === 0
									? 'default'
									: '#faad14'
							}>
							涉黄
						</Tag> */}
						<Tag
							onClick={() => actionHandle('pyramid', result, value)}
							color={
								helper.isNullOrUndefined(result['pyramid']?.isReg)
									? 'default'
									: result['pyramid']?.isReg === 0
									? 'default'
									: '#389e0d'
							}>
							传销
						</Tag>
						<Tag
							onClick={() => {
								actionHandle('gambling', result, value);
							}}
							color={
								helper.isNullOrUndefined(result['gambling']?.isReg)
									? 'default'
									: result['gambling']?.isReg === 0
									? 'default'
									: '#1d39c4'
							}>
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

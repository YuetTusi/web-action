import dayjs from 'dayjs';
import React from 'react';
import Tag from 'antd/lib/tag';
import { ColumnsType } from 'antd/lib/table';
import { Document } from '@/schema/document';
import { CaseSort } from '@/schema/common';
import { SearchLogEntity } from '@/schema/search-log-entity';

const getColumn = (
	type: CaseSort[] = [1, 2, 3],
	...handles: Function[]
): ColumnsType<SearchLogEntity> => {
	const [setType, setResult, setRecord, setResultModalVisible] = handles;

	let columns: ColumnsType<SearchLogEntity> = [
		{
			title: '查询内容（手机号 / 银行卡号）',
			dataIndex: 'keyword',
			key: 'keyword'
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type',
			align: 'center',
			width: 140,
			render: (type: Document) => {
				switch (type) {
					case Document.Aim:
						return <Tag style={{ marginRight: 0 }}>手机号查询</Tag>;
					case Document.AimBatch:
						return <Tag style={{ marginRight: 0 }}>手机号批量查询</Tag>;
					case Document.Bank:
						return <Tag style={{ marginRight: 0 }}>银行卡查询</Tag>;
					case Document.BankBatch:
						return <Tag style={{ marginRight: 0 }}>银行卡批量查询</Tag>;
				}
			}
		},
		{
			title: '查询时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'center',
			width: 160,
			render: (value: Date) => <span>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</span>
		}
	];

	if (type.length !== 0) {
		columns = columns.concat(
			type.map((item) => {
				switch (item) {
					case CaseSort.Porn:
						return {
							title: '涉黄',
							dataIndex: 'result',
							key: 'porn',
							align: 'center',
							width: 60,
							render(data: any, record: any) {
								return (
									<Tag
										onClick={() => {
											setType(CaseSort.Porn);
											setResult(data['涉黄']);
											setRecord(record);
											setResultModalVisible(true);
										}}
										color={data['涉黄']?.isReg !== 0 ? '#faad14' : 'default'}
										style={{ marginRight: 0, cursor: 'pointer' }}>
										涉黄
									</Tag>
								);
							}
						};
					case CaseSort.PyramidSales:
						return {
							title: '传销',
							dataIndex: 'result',
							key: 'pyramidSales',
							align: 'center',
							width: 60,
							render(data: any, record: any) {
								return (
									<Tag
										onClick={() => {
											setType(CaseSort.PyramidSales);
											setResult(data['传销']);
											setRecord(record);
											setResultModalVisible(true);
										}}
										color={data['传销']?.isReg !== 0 ? '#389e0d' : 'default'}
										style={{ marginRight: 0, cursor: 'pointer' }}>
										传销
									</Tag>
								);
							}
						};
					case CaseSort.Bet:
						return {
							title: '涉赌',
							dataIndex: 'result',
							key: 'bet',
							align: 'center',
							width: 60,
							render(data: any, record: any) {
								return (
									<Tag
										onClick={() => {
											setType(CaseSort.Bet);
											setResult(data['涉赌']);
											setRecord(record);
											setResultModalVisible(true);
										}}
										color={data['涉赌']?.isReg !== 0 ? '#1d39c4' : 'default'}
										style={{ marginRight: 0, cursor: 'pointer' }}>
										涉赌
									</Tag>
								);
							}
						};
				}
			})
		);
	}

	return columns;
};

export { getColumn };

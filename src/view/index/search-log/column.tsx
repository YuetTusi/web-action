import dayjs from 'dayjs';
import React from 'react';
import Tag from 'antd/lib/tag';
import { ColumnsType } from 'antd/lib/table';
import { Document } from '@/schema/document';
import { SearchLogEntity } from '@/schema/search-log-entity';

const getColumn = (): ColumnsType<SearchLogEntity> => {
	return [
		{
			title: '查询时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'center',
			width: 160,
			render: (value: Date) => <span>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</span>
		},
		{
			title: '查询类型',
			dataIndex: 'type',
			key: 'type',
			align: 'center',
			width: 180,
			render: (type: Document) => {
				switch (type) {
					case Document.Aim:
						return <Tag>手机号查询</Tag>;
					case Document.AimBatch:
						return <Tag>手机号批量查询</Tag>;
					case Document.Bank:
						return <Tag>银行卡查询</Tag>;
					case Document.BankBatch:
						return <Tag>银行卡批量查询</Tag>;
				}
			}
		},
		{
			title: '查询内容',
			dataIndex: 'content',
			key: 'content'
		}
		// {
		// 	title: '查询结果',
		// 	dataIndex: 'query_id',
		// 	key: 'query_id',
		// 	render() {
		// 		return '';
		// 	}
		// }
	];
};

export { getColumn };

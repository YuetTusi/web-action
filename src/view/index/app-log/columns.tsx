import dayjs from 'dayjs';
import React from 'react';
import { ColumnsType } from 'antd/lib/table';
import { SearchLogEntity } from '@/schema/search-log-entity';

const getColumn = (...handles: Function[]): ColumnsType<SearchLogEntity> => {
	const [setInstallDetailModalVisible, setAppDetail] = handles;

	let columns: ColumnsType<SearchLogEntity> = [
		{
			title: '查询内容（手机号/值）',
			dataIndex: 'keyword',
			key: 'keyword'
		},
		{
			title: '类型',
			dataIndex: 'type',
			key: 'type',
			align: 'center',
			width: 100,
			render(value: string, record: any) {
				return record.result?.type ?? '';
			}
		},
		{
			title: '查询时间',
			dataIndex: 'createdAt',
			key: 'createdAt',
			align: 'center',
			width: 160,
			render: (value: Date) => <span>{dayjs(value).format('YYYY-MM-DD HH:mm:ss')}</span>
		},
		{
			title: '详情',
			dataIndex: 'pid',
			key: 'pid',
			align: 'center',
			width: 60,
			render: (value: string, record: SearchLogEntity) => (
				<a
					onClick={() => {
						setAppDetail(record);
						setInstallDetailModalVisible(true);
					}}>
					详情
				</a>
			)
		}
	];

	return columns;
};

export { getColumn };

import { SearchLogData } from '@/model/search-log';
import { ColumnsType } from 'antd/lib/table';

const getColumn = (): ColumnsType<SearchLogData> => {
	return [
		{
			title: '查询时间',
			dataIndex: 'gmt_create',
			key: 'gmt_create',
			align: 'center',
			width: 160
		},
		{
			title: '查询类型',
			dataIndex: 'query_type',
			key: 'query_type',
			render(value) {
				switch (value) {
					case 1:
						return '手机号查询';
					case 2:
						return '手机号批量查询';
					default:
						return '其他';
				}
			}
		},
		{
			title: '目标账号',
			dataIndex: 'phone_num',
			key: 'phone_num',
			width: 140
		},
		{
			title: '查询结果',
			dataIndex: 'query_id',
			key: 'query_id',
			render() {
				return '';
			}
		}
	];
};

export { getColumn };

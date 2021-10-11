import { OpLogData } from '@/model/op-log';
import { ColumnsType } from 'antd/lib/table';

/**
 * 表头
 * @returns 列头定义
 */
const getColumn = (): ColumnsType<OpLogData> => {
	return [
		{
			title: '操作内容',
			dataIndex: 'operation_name',
			key: 'operation_name'
		},
		{
			title: '操作人',
			dataIndex: 'username',
			key: 'username'
		},
		{
			title: '操作状态',
			dataIndex: 'status',
			key: 'status',
			align: 'center',
			width: 120,
			render(value) {
				switch (value) {
					case 1:
						return '成功';
					default:
						return '失败';
				}
			}
		},
		{
			title: '操作时间',
			dataIndex: 'gmt_create',
			key: 'gmt_create',
			align: 'center',
			width: 160,
		}
	];
};

export { getColumn };

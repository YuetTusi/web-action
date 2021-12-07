import { Dayjs } from 'dayjs';
import React, { FC, useEffect, MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import { SearchLogEntity } from '@/schema/search-log-entity';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { AppLogState } from '@/model/app-log';
import { PAGESIZE } from '@/utility/helper';
import InstallDetailModal from './install-detail-modal';
import { getColumn } from './columns';
import { AppLogProp, FormValue } from './prop';

const { Item, useForm } = Form;
const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * 安装应用日志
 */
const AppLog: FC<AppLogProp> = () => {
	const dispatch = useDispatch();
	const { data, pageIndex, pageSize, total, loading } = useSelector<any, AppLogState>(
		(state) => state.appLog
	);
	const [installDetailModalVisible, setInstallDetailModalVisible] = useState<boolean>(false);
	const [appDetail, setAppDetail] = useState<SearchLogEntity>();
	const [formRef] = useForm<FormValue>();

	useEffect(() => {
		dispatch({
			type: 'appLog/queryData',
			payload: {
				condition: { type: 'all' },
				pageIndex: 1,
				pageSize: PAGESIZE
			}
		});
	}, []);

	/**
	 * 查询Click
	 */
	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		const { type = 'all', range } = getFieldsValue();
		let start: Dayjs | undefined;
		let end: Dayjs | undefined;
		if (range) {
			start = range[0];
			end = range[1];
		}

		dispatch({
			type: 'appLog/queryData',
			payload: { condition: { type, start, end }, pageIndex: 1, pageSize: PAGESIZE }
		});
	};

	/**
	 * 清除日志
	 */
	const onDelClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		Modal.confirm({
			onOk() {
				dispatch({ type: 'appLog/del', payload: null });
			},
			title: '清除日志',
			content: '日志将全部清除，确认吗？',
			okText: '是',
			cancelText: '否'
		});
	};

	/**
	 * 翻页Change
	 * @param pageIndex 当前页
	 * @param pageSize 页尺寸
	 */
	const onPageChange = (pageIndex: number, pageSize?: number) => {
		const { getFieldsValue } = formRef;
		const { type, range } = getFieldsValue();
		let start: Dayjs | undefined;
		let end: Dayjs | undefined;
		if (range) {
			start = range[0];
			end = range[1];
		}
		dispatch({
			type: 'appLog/queryData',
			payload: { condition: { type, start, end }, pageIndex, pageSize }
		});
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="type" label="类型" initialValue="all">
						<Select style={{ width: '100px' }}>
							<Option value="all">全部</Option>
							<Option value="PHONE">PHONE</Option>
							<Option value="IMEI">IMEI</Option>
							<Option value="IMSI">IMSI</Option>
							<Option value="OAID">OAID</Option>
						</Select>
					</Item>
					<Item name="range" label="查询时间">
						<RangePicker format="YYYY-MM-DD HH:mm:ss" showTime={true} />
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
					<Item>
						<Button onClick={onDelClick} danger={true}>
							<DeleteOutlined />
							<span>清除</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<div>
				<Table<SearchLogEntity>
					pagination={{
						current: pageIndex,
						pageSize,
						total,
						onChange: onPageChange,
						showSizeChanger: false
					}}
					columns={getColumn(setInstallDetailModalVisible, setAppDetail)}
					scroll={{ x: 'max-content' }}
					dataSource={data}
					loading={loading}
					rowKey="_id"
				/>
			</div>
			<InstallDetailModal
				visible={installDetailModalVisible}
				keyword={appDetail?.keyword}
				data={appDetail?.result}
				onCancel={() => setInstallDetailModalVisible(false)}
			/>
		</RootPanel>
	);
};

export default AppLog;

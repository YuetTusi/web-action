import { Dayjs } from 'dayjs';
import React, { FC, MouseEvent, useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import DatePicker from 'antd/lib/date-picker';
import Form from 'antd/lib/form';
import Button from 'antd/lib/button';
import Select from 'antd/lib/select';
import Table from 'antd/lib/table';
import Modal from 'antd/lib/modal';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { CaseSort } from '@/schema/common';
import { SearchLogEntity } from '@/schema/search-log-entity';
import { SearchLogState } from '@/model/search-log';
import { PAGESIZE } from '@/utility/helper';
import ResultModal from './result-modal';
import { getColumn } from './column';
import { FormValue, SearchLogProp } from './props';

const { Item, useForm } = Form;
const { RangePicker } = DatePicker;
const { Option } = Select;

/**
 * 查询日志
 */
const SearchLog: FC<SearchLogProp> = () => {
	const dispatch = useDispatch();
	const [resultModalVisible, setResultModalVisible] = useState(false);
	const [type, setType] = useState();
	const [record, setRecord] = useState<SearchLogEntity>();
	const [result, setResult] = useState<Record<string, any>>();
	const typeRef = useRef<CaseSort[]>([CaseSort.Porn, CaseSort.PyramidSales, CaseSort.Bet]);
	const { data, pageIndex, pageSize, total, loading } = useSelector<any, SearchLogState>(
		(state) => state.searchLog
	);
	const [formRef] = useForm<FormValue>();

	useEffect(() => {
		dispatch({
			type: 'searchLog/queryData',
			payload: {
				condition: { type: [CaseSort.Porn, CaseSort.PyramidSales, CaseSort.Bet] },
				pageIndex: 1,
				pageSize: PAGESIZE
			}
		});
	}, []);

	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const { getFieldsValue } = formRef;
		const { type = [], range } = getFieldsValue();
		let start: Dayjs | undefined;
		let end: Dayjs | undefined;
		if (range) {
			start = range[0];
			end = range[1];
		}
		typeRef.current =
			type.length === 0 ? [CaseSort.Porn, CaseSort.PyramidSales, CaseSort.Bet] : type;
		dispatch({
			type: 'searchLog/queryData',
			payload: { condition: { type, start, end }, pageIndex: 1, pageSize: PAGESIZE }
		});
	};

	const delClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		Modal.confirm({
			onOk() {
				dispatch({ type: 'searchLog/del' });
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
			type: 'searchLog/queryData',
			payload: { condition: { type, start, end }, pageIndex, pageSize }
		});
	};

	const onResultModalCancel = () => setResultModalVisible(false);

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="type" label="结果类型">
						<Select mode="multiple" style={{ width: '195px' }}>
							<Option value={CaseSort.Porn}>涉黄</Option>
							<Option value={CaseSort.PyramidSales}>传销</Option>
							<Option value={CaseSort.Bet}>涉赌</Option>
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
						<Button onClick={delClick} danger={true}>
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
					columns={getColumn(
						typeRef.current,
						setType,
						setResult,
						setRecord,
						setResultModalVisible
					)}
					scroll={{ x: 'max-content' }}
					dataSource={data}
					loading={loading}
					rowKey="_id"
				/>
			</div>
			<ResultModal
				visbile={resultModalVisible}
				type={type}
				data={result}
				record={record}
				onCancel={onResultModalCancel}
			/>
		</RootPanel>
	);
};

export default SearchLog;

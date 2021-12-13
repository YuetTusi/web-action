import dayjs from 'dayjs';
import React, { FC } from 'react';
import Tag from 'antd/lib/tag';
import Empty from 'antd/lib/empty';
import { helper } from '@/utility/helper';
import { CaseSort } from '@/schema/common';
import { SearchLogEntity } from '@/schema/search-log-entity';
import Watermark from '@/component/watermark';
import { BoxItem, ResultList } from './styled/list-style';

const username = sessionStorage.getItem('username');

interface DescProp {
	/**
	 * 类型
	 */
	type?: CaseSort;
	/**
	 * 数据
	 */
	data: Record<string, any>;
	/**
	 * 日志数据
	 */
	record?: SearchLogEntity;
}

const getItem = (v: Record<string, any>) => {
	if (helper.isNullOrUndefined(v)) {
		return null;
	}

	const kv = Object.entries(v);

	return kv.map((kv, index) => {
		const [k, v] = transferKeyValue(kv);
		return (
			<li key={`L_${index}`}>
				<label>{k}</label>
				<span>{v ?? '--'}</span>
			</li>
		);
	});
};

const transferKeyValue = ([k, v]: [string, any]): [string, any] => {
	switch (k) {
		case 'isReg':
			return [
				'注册状态',
				v === 0 ? <Tag color="red">未注册</Tag> : <Tag color="green">已注册</Tag>
			];
		case 'lastLogin':
			return ['登录信息', helper.getLastLoginText(v)];
		case 'participatingWebsiteCount':
		case 'ParticipatingWebsiteCount':
			return ['帐号个数', helper.getParticipatingWebsiteCountText(v)];
		case 'haveBindBankCard':
			return ['是否绑定银行卡', helper.getHaveBindBankCardText(v)];
		case 'participatingFunds':
			return ['涉及资金', helper.getParticipatingFunds(v)];
		case 'is_agent':
		case 'isAgent':
			return ['是否代理', helper.getIsAgentText(v)];
		case 'hit':
			return ['命中数量', v];
		case 'reg_count':
			return ['注册数量', v];
		case 'reg_time':
		case 'regTime':
			return ['注册时间', helper.getRegTimeText(v)];
		case 'login_time':
			return ['登录时间', v];
		case 'balance':
			return ['余额', v];
		default:
			return [k, v];
	}
};

const toDisplay = (data: Record<string, any>, record?: SearchLogEntity) => {
	let actionTime: any = helper.isNullOrUndefined(record?.createdAt)
		? '--'
		: dayjs(record?.createdAt).format('YYYY-MM-DD HH:mm:ss');

	if (helper.isNullOrUndefined(data)) {
		return (
			<BoxItem>
				<Empty description="无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
			</BoxItem>
		);
	} else {
		return (
			<BoxItem>
				<ResultList>
					{getItem(data)?.concat([
						<li key="K_T">
							<label>查询时间</label>
							<span>{actionTime}</span>
						</li>
					])}
				</ResultList>
				<Watermark mark={username!} />
			</BoxItem>
		);
	}
};

const Desc: FC<DescProp> = ({ type, data, record }) => {
	switch (type) {
		case CaseSort.Porn:
			return toDisplay(data, record);
		case CaseSort.PyramidSales:
			return toDisplay(data, record);
		case CaseSort.Bet:
			return toDisplay(data, record);
		default:
			return <Empty description="无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
	}
};

export default Desc;

import React, { FC } from 'react';
import Tag from 'antd/lib/tag';
import Empty from 'antd/lib/empty';
import { helper } from '@/utility/helper';
import { BoxItem, DescBox, ResultList } from './styled/list-style';

interface DescProp {
	data?: Record<string, any>;
}

const getItem = (v: Record<string, any>) => {
	if (helper.isNullOrUndefined(v)) {
		return null;
	}

	const kv = Object.entries(v);

	return kv.map(([k, v], index) => {
		return (
			<li key={`L_${index}`}>
				<label>{transferKey(k)}</label>
				<span>{v ?? '--'}</span>
			</li>
		);
	});
};

const transferKey = (k: string) => {
	switch (k) {
		case 'isReg':
			return '注册状态';
		case 'lastLogin':
			return '登录信息';
		case 'participatingWebsiteCount':
		case 'ParticipatingWebsiteCount':
			return '帐号个数';
		case 'haveBindBankCard':
			return '是否绑定银行卡';
		case 'participatingFunds':
			return '涉及资金';
		case 'isAgent':
			return '是否代理';
		case 'hit':
			return '命中数量';
		case 'reg_count':
			return '注册数量';
		case 'reg_time':
		case 'regTime':
			return '注册时间';
		case 'login_time':
			return '登录时间';
		case 'balance':
			return '余额';
		case 'is_agent':
			return '是否代理';
		default:
			return k;
	}
};

const getTag = (type: string) => {
	switch (type) {
		case '涉黄':
			return <Tag color="#faad14">{type}</Tag>;
		case '传销':
			return <Tag color="#389e0d">{type}</Tag>;
		case '涉赌':
			return <Tag color="#1d39c4">{type}</Tag>;
		default:
			return <Tag>{type}</Tag>;
	}
};

const toDisplay = (data: Record<string, any>) => {
	const kv = Object.entries(data);

	return kv.map(([k, v], index) => {
		return (
			<BoxItem key={`K_${index}`}>
				<legend>{getTag(k)}</legend>
				<ResultList>{getItem(v)}</ResultList>
			</BoxItem>
		);
	});
};

const Desc: FC<DescProp> = ({ data }) => {
	if (data) {
		return <DescBox>{toDisplay(data)}</DescBox>;
	} else {
		return <Empty description="无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
	}
};

export default Desc;

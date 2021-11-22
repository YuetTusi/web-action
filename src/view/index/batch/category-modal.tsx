import dayjs from 'dayjs';
import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Tag from 'antd/lib/tag';
import Modal from 'antd/lib/modal';
import { CategoryList } from './styled/category-list';
import { CaseSort } from '@/schema/common';
import { BatchDataSource } from '@/model/batch';
import { helper } from '@/utility/helper';

interface CategoryModalProp {
	/**
	 * 手机号
	 */
	mobile: string;
	/**
	 * 分类
	 */
	type: CaseSort;
	/**
	 * 分类数据
	 */
	specialData?: BatchDataSource;
	/**
	 * 取消click
	 */
	onCancel: () => void;
}

const getTitle = (type: number) => {
	switch (type) {
		case CaseSort.Porn:
			return '涉黄';
		case CaseSort.PyramidSales:
			return '传销';
		case CaseSort.Bet:
			return '涉赌';
		default:
			return '其他';
	}
};

/**
 * 分类查看Modal
 */
const CategoryModal: FC<CategoryModalProp> = ({ specialData, onCancel, type, mobile }) => {
	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="primary" key="B_1">
					确定
				</Button>
			]}
			onCancel={onCancel}
			visible={specialData !== undefined}
			title={`${getTitle(type)} ${mobile}`}
			maskClosable={false}
			closable={true}>
			<CategoryList>
				<li>
					<label>注册状态</label>
					<span>
						{helper.isNullOrUndefined(specialData?.isReg) ? (
							'--'
						) : specialData?.isReg === 0 ? (
							<Tag color="red">未注册</Tag>
						) : (
							<Tag color="green">已注册</Tag>
						)}
					</span>
				</li>
				<li>
					<label>账号个数</label>
					<span>{specialData?.participatingWebsiteCount ?? '--'}</span>
				</li>
				<li>
					<label>登录信息</label>
					<span>{specialData?.lastLogin ?? '--'}</span>
				</li>
				<li>
					<label>是否绑定银行卡</label>
					<span>
						{helper.isNullOrUndefined(specialData?.haveBindBankCard)
							? '--'
							: specialData?.haveBindBankCard === 'N'
							? '否'
							: '是'}
					</span>
				</li>
				<li>
					<label>涉及资金</label>
					<span>{specialData?.participatingFunds ?? '--'}</span>
				</li>
				<li>
					<label>是否代理</label>
					<span>
						{helper.isNullOrUndefined(specialData?.isAgent)
							? '--'
							: specialData?.isAgent === 'N'
							? '否'
							: '是'}
					</span>
				</li>
				<li>
					<label>查询时间</label>
					<span>{dayjs().format('YYYY-MM-DD HH:mm:ss')}</span>
				</li>
			</CategoryList>
		</Modal>
	);
};

export default CategoryModal;

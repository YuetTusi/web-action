import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Tag from 'antd/lib/tag';
import Modal from 'antd/lib/modal';
import { CategoryList } from './styled/category-list';
import { SpecialData } from '@/model/batch';
import { CaseSort } from '@/schema/common';

interface CategoryModalProp {
	/**
	 * 分类数据
	 */
	specialData?: SpecialData;
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
const CategoryModal: FC<CategoryModalProp> = (data) => {
	const { specialData, onCancel } = data;
	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="primary" key="B_1">
					确定
				</Button>
			]}
			onCancel={onCancel}
			visible={specialData !== undefined}
			title={getTitle(specialData?.special_type!)}
			maskClosable={false}
			closable={true}>
			<CategoryList>
				<li>
					<label>注册状态</label>
					<span>
						{specialData?.is_reg === 0 ? (
							<Tag color="red">未注册</Tag>
						) : (
							<Tag color="green">已注册</Tag>
						)}
					</span>
				</li>
				<li>
					<label>账号个数</label>
					<span>--</span>
				</li>
				<li>
					<label>登录信息</label>
					<span>--</span>
				</li>
				<li>
					<label>是否绑定银行卡</label>
					<span>--</span>
				</li>
				<li>
					<label>涉及资金</label>
					<span>--</span>
				</li>
				<li>
					<label>是否代理</label>
					<span>--</span>
				</li>
			</CategoryList>
		</Modal>
	);
};

export default CategoryModal;

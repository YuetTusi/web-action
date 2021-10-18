import React, { FC } from 'react';
import Button from 'antd/lib/button';
import Modal from 'antd/lib/modal';
import CheckCircleOutlined from '@ant-design/icons/CheckCircleOutlined';
import { CategoryList } from './styled/category-list';
import { CaseSort } from '@/schema/common';
import { Gambling, Pyramid } from '@/model/bank';
import { helper } from '@/utility/helper';

interface CategoryModalProp {
	/**
	 * 分类数据
	 */
	specialData?: Gambling | Pyramid;
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
const CategoryModal: FC<CategoryModalProp> = ({ specialData, onCancel }) => {
	return (
		<Modal
			footer={[
				<Button onClick={() => onCancel()} type="primary" key="B_1">
					<CheckCircleOutlined />
					<span>确定</span>
				</Button>
			]}
			onCancel={onCancel}
			visible={specialData !== undefined}
			title={'查询结果'}
			maskClosable={false}
			closable={true}>
			<CategoryList>
				<li>
					<label>命中数量</label>
					<span>{specialData?.hit ?? '--'}</span>
				</li>
				<li>
					<label>注册数量</label>
					<span>{(specialData as Gambling)?.reg_count ?? '--'}</span>
				</li>
				<li>
					<label>注册时间</label>
					<span>{(specialData as Gambling)?.reg_time ?? '--'}</span>
				</li>
				<li>
					<label>登录时间</label>
					<span>{(specialData as Gambling)?.login_time ?? '--'}</span>
				</li>
				<li>
					<label>余额</label>
					<span>{(specialData as Gambling)?.balance ?? '--'}</span>
				</li>
				<li>
					<label>是否代理</label>
					<span>
						{helper.isNullOrUndefined((specialData as Gambling)?.is_agent)
							? '--'
							: (specialData as Gambling)?.is_agent === 0
							? '否'
							: '是'}
					</span>
				</li>
			</CategoryList>
		</Modal>
	);
};

export default CategoryModal;

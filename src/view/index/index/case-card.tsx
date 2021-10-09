import React, { FC, memo } from 'react';
import Col from 'antd/lib/col';
import Badge from 'antd/lib/badge';
import Card from 'antd/lib/card';
import Tag from 'antd/lib/tag';
import { SingleDataSource, SpecialData } from '@/model/single';
import { CaseSort } from '@/schema/common';
import { CardTitle } from './styled/card-title';
import { CardItemList } from './styled/card-item';
import { helper } from '@/utility/helper';

const { Ribbon } = Badge;

const getCaption = (type: number) => {
	switch (type) {
		case CaseSort.Bet:
			return '涉赌';
		case CaseSort.Porn:
			return '涉黄';
		case CaseSort.PyramidSales:
			return '传销';
		default:
			return '其他';
	}
};

const getColor = (type: number) => {
	switch (type) {
		case CaseSort.Bet:
			return 'geekblue';
		case CaseSort.Porn:
			return 'gold';
		case CaseSort.PyramidSales:
			return 'green';
		default:
			return 'gray';
	}
};

const CaseCard: FC<{ data: SingleDataSource[] }> = ({ data }) => {
	let next: Partial<SpecialData>[] = [];

	if (data.length === 0) {
		next = [
			{ special_type: CaseSort.Porn },
			{ special_type: CaseSort.PyramidSales },
			{ special_type: CaseSort.Bet }
		];
	} else {
		next = data[0].special_data;
	}

	return (
		<>
			{next.map((item, index) => (
				<Col span={8} key={`K_${index}`}>
					<Ribbon
						text={getCaption(item.special_type!)}
						placement="start"
						color={getColor(item.special_type!)}>
						<Card title={<CardTitle>目标结果</CardTitle>} size="small">
							<CardItemList>
								<li>
									<label>注册状态</label>
									<span>
										{helper.isNullOrUndefined(item?.is_reg) ? (
											'--'
										) : item.is_reg === 0 ? (
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
							</CardItemList>
						</Card>
					</Ribbon>
				</Col>
			))}
		</>
	);
};

export default memo(CaseCard);

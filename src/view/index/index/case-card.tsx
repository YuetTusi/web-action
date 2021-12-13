import dayjs from 'dayjs';
import React, { FC, memo } from 'react';
import Col from 'antd/lib/col';
import Badge from 'antd/lib/badge';
import Card from 'antd/lib/card';
import Tag from 'antd/lib/tag';
import { SingleDataSource } from '@/model/single';
import { CardTitle } from './styled/card-title';
import { CardItemList } from './styled/card-item';
import { helper } from '@/utility/helper';
import Watermark from '@/component/watermark';
import { CardPanel } from './styled/card-panel';

const { Ribbon } = Badge;
const username = sessionStorage.getItem('username');

interface CaseCardProp {
	data: Record<string, SingleDataSource>;
	mobile: string;
	actionTime: null | Date;
}

const CaseCard: FC<CaseCardProp> = ({ data, mobile, actionTime }) => {
	return (
		<>
			<Col span={8}>
				<Ribbon text="涉黄" placement="start" color="gold">
					<Card
						title={<CardTitle>目标结果{mobile ? `（${mobile}）` : ''}</CardTitle>}
						size="small">
						<CardPanel>
							<CardItemList>
								<li>
									<label>注册状态</label>
									<span>
										{helper.isNullOrUndefined(data['涉黄']?.isReg) ? (
											'--'
										) : data['涉黄']?.isReg === 0 ? (
											<Tag color="red">未注册</Tag>
										) : (
											<Tag color="green">已注册</Tag>
										)}
									</span>
								</li>
								<li>
									<label>账号个数</label>
									<span>
										{helper.getParticipatingWebsiteCountText(
											data['涉黄']?.participatingWebsiteCount
										)}
									</span>
								</li>
								<li>
									<label>登录信息</label>
									<span>{helper.getLastLoginText(data['涉黄']?.lastLogin)}</span>
								</li>
								<li>
									<label>是否绑定银行卡</label>
									<span>
										{helper.getHaveBindBankCardText(
											data['涉黄']?.haveBindBankCard
										)}
									</span>
								</li>
								<li>
									<label>涉及资金</label>
									<span>
										{helper.getParticipatingFunds(
											data['涉黄']?.participatingFunds
										)}
									</span>
								</li>
								<li>
									<label>是否代理</label>
									<span>{helper.getIsAgentText(data['涉黄']?.isAgent)}</span>
								</li>
								<li>
									<label>查询时间</label>
									<span>
										{actionTime
											? dayjs(actionTime).format('YYYY-MM-DD HH:mm:ss')
											: '--'}
									</span>
								</li>
							</CardItemList>
							<Watermark mark={username!} />
						</CardPanel>
					</Card>
				</Ribbon>
			</Col>
			<Col span={8}>
				<Ribbon text="传销" placement="start" color="green">
					<Card
						title={<CardTitle>目标结果{mobile ? `（${mobile}）` : ''}</CardTitle>}
						size="small">
						<CardPanel>
							<CardItemList>
								<li>
									<label>注册状态</label>
									<span>
										{helper.isNullOrUndefined(data['传销']?.isReg) ? (
											'--'
										) : data['传销']?.isReg === 0 ? (
											<Tag color="red">未注册</Tag>
										) : (
											<Tag color="green">已注册</Tag>
										)}
									</span>
								</li>
								<li>
									<label>账号个数</label>
									<span>
										{helper.getParticipatingWebsiteCountText(
											data['传销']?.participatingWebsiteCount
										)}
									</span>
								</li>
								<li>
									<label>登录信息</label>
									<span>{helper.getLastLoginText(data['传销']?.lastLogin)}</span>
								</li>
								<li>
									<label>是否绑定银行卡</label>
									<span>
										{helper.getHaveBindBankCardText(
											data['传销']?.haveBindBankCard
										)}
									</span>
								</li>
								<li>
									<label>涉及资金</label>
									<span>
										{helper.getParticipatingFunds(
											data['传销']?.participatingFunds
										)}
									</span>
								</li>
								<li>
									<label>是否代理</label>
									<span>{helper.getIsAgentText(data['传销']?.isAgent)}</span>
								</li>
								<li>
									<label>查询时间</label>
									<span>
										{actionTime
											? dayjs(actionTime).format('YYYY-MM-DD HH:mm:ss')
											: '--'}
									</span>
								</li>
							</CardItemList>
							<Watermark mark={username!} />
						</CardPanel>
					</Card>
				</Ribbon>
			</Col>
			<Col span={8}>
				<Ribbon text="涉赌" placement="start" color="geekblue">
					<Card
						title={<CardTitle>目标结果{mobile ? `（${mobile}）` : ''}</CardTitle>}
						size="small">
						<CardPanel>
							<CardItemList>
								<li>
									<label>注册状态</label>
									<span>
										{helper.isNullOrUndefined(data['涉赌']?.isReg) ? (
											'--'
										) : data['涉赌']?.isReg === 0 ? (
											<Tag color="red">未注册</Tag>
										) : (
											<Tag color="green">已注册</Tag>
										)}
									</span>
								</li>
								<li>
									<label>账号个数</label>
									<span>
										{helper.getParticipatingWebsiteCountText(
											data['涉赌']?.participatingWebsiteCount
										)}
									</span>
								</li>
								<li>
									<label>登录信息</label>
									<span>{helper.getLastLoginText(data['涉赌']?.lastLogin)}</span>
								</li>
								<li>
									<label>是否绑定银行卡</label>
									<span>
										{helper.getHaveBindBankCardText(
											data['涉赌']?.haveBindBankCard
										)}
									</span>
								</li>
								<li>
									<label>涉及资金</label>
									<span>
										{helper.getParticipatingFunds(
											data['涉赌']?.participatingFunds
										)}
									</span>
								</li>
								<li>
									<label>是否代理</label>
									<span>{helper.getIsAgentText(data['涉赌']?.isAgent)}</span>
								</li>
								<li>
									<label>查询时间</label>
									<span>
										{actionTime
											? dayjs(actionTime).format('YYYY-MM-DD HH:mm:ss')
											: '--'}
									</span>
								</li>
							</CardItemList>
							<Watermark mark={username!} />
						</CardPanel>
					</Card>
				</Ribbon>
			</Col>
		</>
	);
};

export default memo(CaseCard);

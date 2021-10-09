import React, { FC, MouseEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'dva';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import Card from 'antd/lib/card';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { BankState, Gambling, Pyramid } from '@/model/bank';
import { BankCardNumber } from '@/utility/regex';
import message from 'antd/lib/message';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import { send } from '@/utility/tcp-server';
import { CommandType, SocketType } from '@/schema/socket';
import { CardTitle } from '../index/styled/card-title';
import { CardItemList } from '../index/styled/card-item';
import { helper } from '@/utility/helper';

const { Item, useForm } = Form;
const { Ribbon } = Badge;

const getCard = (result: Record<string, { gambling: Gambling; pyramid: Pyramid }>) => {
	const next = Object.entries(result);
	if (next.length === 0) {
		return [];
	} else {
		let cards: Array<{ cardNo: string; gambling: Gambling; pyramid: Pyramid }> = [];
		for (let [k, v] of next) {
			cards.push({ cardNo: k, ...v });
		}
		return cards;
	}
};

const Bank: FC<{}> = () => {
	const dispatch = useDispatch();
	const { hits, hit_gambling, hit_pyramid, result } = useSelector<any, BankState>(
		(state) => state.bank
	);
	const [formRef] = useForm();
	const card = getCard(result);

	// useEffect(() => {
	// 	//legacy: 测试数据
	// 	dispatch({
	// 		type: 'bank/setData',
	// 		payload: {
	// 			hits: 2,
	// 			hit_gambling: 1,
	// 			hit_pyramid: 1,
	// 			result: {
	// 				'6213363479902259472': {
	// 					gambling: {
	// 						hit: 1,
	// 						reg_count: 3,
	// 						balance: 0,
	// 						login_time: 2,
	// 						reg_time: 0,
	// 						is_agent: 1
	// 					},
	// 					pyramid: {
	// 						hit: 1
	// 					}
	// 				}
	// 			}
	// 		}
	// 	});
	// }, []);

	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const { getFieldValue } = formRef;
		const value = getFieldValue('mobile');

		if (!BankCardNumber.test(value)) {
			message.destroy();
			message.warn('请输入正确的银行卡号');
			return;
		} else {
			dispatch({ type: 'reading/setReading', payload: true });
			send(SocketType.Fetch, { cmd: CommandType.GetSingle, msg: { mobile: value } });
			setTimeout(() => {
				dispatch({ type: 'reading/setReading', payload: false });
			}, 1000);
		}
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					<Item name="mobile" label="卡号">
						<Input />
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>查询</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<Row gutter={[16, 24]}>
				<Col span={12}>
					<Ribbon text="涉赌" placement="start" color="geekblue">
						<Card title={<CardTitle>目标结果</CardTitle>} size="small">
							<CardItemList>
								<li>
									<label>命中数量</label>
									<span>{card[0]?.gambling?.hit ?? '--'}</span>
								</li>
								<li>
									<label>注册数量</label>
									<span>{card[0]?.gambling?.reg_count ?? '--'}</span>
								</li>
								<li>
									<label>注册时间</label>
									<span>{card[0]?.gambling?.reg_time ?? '--'}</span>
								</li>
								<li>
									<label>登录时间</label>
									<span>{card[0]?.gambling?.login_time ?? '--'}</span>
								</li>
								<li>
									<label>余额</label>
									<span>{card[0]?.gambling?.balance ?? '--'}</span>
								</li>
								<li>
									<label>是否代理</label>
									<span>
										{helper.isNullOrUndefined(card[0]?.gambling?.is_agent)
											? '--'
											: card[0]?.gambling?.is_agent === 0
											? '否'
											: '是'}
									</span>
								</li>
							</CardItemList>
						</Card>
					</Ribbon>
				</Col>
				<Col span={12}>
					<Ribbon text="传销" placement="start" color="green">
						<Card title={<CardTitle>目标结果</CardTitle>} size="small">
							<CardItemList>
								<li>
									<label>命中数量</label>
									<span>{card[0]?.pyramid?.hit ?? '--'}</span>
								</li>
								<li>
									<label>注册数量</label>
									<span>--</span>
								</li>
								<li>
									<label>注册时间</label>
									<span>--</span>
								</li>
								<li>
									<label>登录时间</label>
									<span>--</span>
								</li>
								<li>
									<label>余额</label>
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
			</Row>
		</RootPanel>
	);
};

export default Bank;

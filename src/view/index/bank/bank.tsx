import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import Card from 'antd/lib/card';
import message from 'antd/lib/message';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import Watermark from '@/component/watermark';
import { BankState, Gambling, Pyramid } from '@/model/bank';
import { BankCardNumber } from '@/utility/regex';
import { helper } from '@/utility/helper';
import { send } from '@/utility/tcp-server';
import { Document } from '@/schema/document';
import { CommandType, SocketType } from '@/schema/socket';
import { CardTitle } from '../index/styled/card-title';
import { CardItemList } from '../index/styled/card-item';
import { SearchLogEntity } from '@/schema/search-log-entity';
import { CardPanel } from '../index/styled/card-panel';
import dayjs from 'dayjs';

const { Item, useForm } = Form;
const { Ribbon } = Badge;
const username = sessionStorage.getItem('username');
let memoValue = '';

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
	const [mobile, setMobile] = useState<string>('');
	const [actionTime, setActionTime] = useState<null | Date>(null);
	const { result } = useSelector<any, BankState>((state) => state.bank);
	const [formRef] = useForm();
	const card = getCard(result);

	useEffect(() => {
		const { getFieldValue } = formRef;
		const cardNo = getFieldValue('cardNo');
		const next: SearchLogEntity[] = [];

		if (result[cardNo]) {
			next.push({
				type: Document.Bank,
				keyword: cardNo,
				result: {
					??????: result[cardNo].gambling,
					??????: result[cardNo].pyramid
				}
			});
		}
		if (next.length > 0) {
			dispatch({ type: 'searchLog/insert', payload: next });
		}
	}, [result]);

	useEffect(() => {
		return () => {
			dispatch({
				type: 'bank/setData',
				payload: {
					hits: 0,
					hit_gambling: 0,
					hit_pyramid: 0,
					result: {}
				}
			});
		};
	}, []);

	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const { getFieldValue } = formRef;
		const value = getFieldValue('cardNo');

		if (!BankCardNumber.test(value)) {
			message.destroy();
			message.warn('??????????????????????????????');
			return;
		} else {
			memoValue = value;
			dispatch({ type: 'reading/setReading', payload: true });
			console.log({ cmd: CommandType.Bank, msg: { number: value } });
			send(SocketType.Fetch, { cmd: CommandType.Bank, msg: { number: value } });
			setActionTime(new Date());
			setMobile(value);

			//legacy: ????????????
			// dispatch({
			// 	type: 'bank/setData',
			// 	payload: {
			// 		hits: 0,
			// 		result: {
			// 			'6213363479902259472': {
			// 				gambling: {
			// 					hit: 20
			// 				},
			// 				pyramid: {
			// 					hit: 0
			// 				}
			// 			}
			// 		},
			// 		hit_gambling: 0,
			// 		hit_pyramid: 0
			// 	}
			// });

			// dispatch({ type: 'reading/setReading', payload: false });
		}
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					{/* initialValue={'6213363479902259472'} initialValue={memoValue}*/}
					<Item name="cardNo" label="??????" initialValue={memoValue}>
						<Input />
					</Item>
					<Item>
						<Button onClick={searchClick} type="primary">
							<SearchOutlined />
							<span>??????</span>
						</Button>
					</Item>
				</Form>
			</PadBox>
			<Row gutter={[16, 24]}>
				<Col span={12}>
					<Ribbon text="??????" placement="start" color="green">
						<Card
							title={<CardTitle>????????????{mobile ? `???${mobile}???` : ''}</CardTitle>}
							size="small">
							<CardPanel>
								<CardItemList>
									<li>
										<label>????????????</label>
										<span>{card[0]?.pyramid?.hit ?? '--'}</span>
									</li>
									<li>
										<label>????????????</label>
										<span>--</span>
									</li>
									<li>
										<label>????????????</label>
										<span>--</span>
									</li>
									<li>
										<label>????????????</label>
										<span>--</span>
									</li>
									<li>
										<label>??????</label>
										<span>--</span>
									</li>
									<li>
										<label>????????????</label>
										<span>--</span>
									</li>
									<li>
										<label>????????????</label>
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
				<Col span={12}>
					<Ribbon text="??????" placement="start" color="geekblue">
						<Card
							title={<CardTitle>????????????{mobile ? `???${mobile}???` : ''}</CardTitle>}
							size="small">
							<CardPanel>
								<CardItemList>
									<li>
										<label>????????????</label>
										<span>{card[0]?.gambling?.hit ?? '--'}</span>
									</li>
									<li>
										<label>????????????</label>
										<span>{card[0]?.gambling?.reg_count ?? '--'}</span>
									</li>
									<li>
										<label>????????????</label>
										<span>
											{helper.getRegTimeText(card[0]?.gambling?.reg_time)}
										</span>
									</li>
									<li>
										<label>????????????</label>
										<span>{card[0]?.gambling?.login_time ?? '--'}</span>
									</li>
									<li>
										<label>??????</label>
										<span>{card[0]?.gambling?.balance ?? '--'}</span>
									</li>
									<li>
										<label>????????????</label>
										<span>
											{helper.getIsAgentText(card[0]?.gambling?.is_agent)}
										</span>
									</li>
									<li>
										<label>????????????</label>
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
			</Row>
		</RootPanel>
	);
};

export default Bank;

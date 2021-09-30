import React, { FC, MouseEvent } from 'react';
import { routerRedux, useDispatch } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Badge from 'antd/lib/badge';
import Card from 'antd/lib/card';
import RootPanel from '@/component/root-panel';
import { PadBox } from '@/component/widget/box';
import { CardTitle } from './styled/card-title';
import { CardItemList } from './styled/card-item';

const { Item } = Form;
const { Ribbon } = Badge;

const Index: FC<{}> = () => {
	const dispatch = useDispatch();

	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		dispatch({ type: 'reading/setReading', payload: true });
		setTimeout(() => {
			dispatch({ type: 'reading/setReading', payload: false });
		}, 1000);
	};

	return (
		<RootPanel>
			<PadBox>
				<Form layout="inline">
					<Item label="目标手机号">
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
				<Col span={8}>
					<Ribbon text="涉赌" placement="start" color="geekblue">
						<Card title={<CardTitle>目标结果</CardTitle>} size="small">
							<CardItemList>
								<li>
									<label>注册状态</label>
									<span>--</span>
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
				<Col span={8}>
					<Ribbon text="涉黄" placement="start" color="gold">
						<Card title={<CardTitle>目标结果</CardTitle>} size="small">
							<CardItemList>
								<li>
									<label>注册状态</label>
									<span>--</span>
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
				<Col span={8}>
					<Ribbon text="传销" placement="start" color="green">
						<Card title={<CardTitle>目标结果</CardTitle>} size="small">
							<CardItemList>
								<li>
									<label>注册状态</label>
									<span>--</span>
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
			</Row>
		</RootPanel>
	);
};

export default Index;

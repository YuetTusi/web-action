import md5 from 'md5';
import React, { FC, MouseEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import SearchOutlined from '@ant-design/icons/SearchOutlined';
import Row from 'antd/lib/row';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import RootPanel from '@/component/root';
import { PadBox } from '@/component/widget/box';
import { MobileNumber } from '@/utility/regex';
import { send } from '@/utility/tcp-server';
import { Document } from '@/schema/document';
import { CommandType, SocketType } from '@/schema/socket';
import { SearchLogEntity } from '@/schema/search-log-entity';
import { SingleState } from '@/model/single';
import CaseCard from './case-card';

const { Item, useForm } = Form;
let memoValue = '';

/**
 * 手机号查询
 */
const Index: FC<{}> = () => {
	const dispatch = useDispatch();
	const [mobile, setMobile] = useState<string>('');
	const [actionTime, setActionTime] = useState<null | Date>(null);
	const { data } = useSelector<any, SingleState>((state) => state.single);
	const [formRef] = useForm();

	useEffect(() => {
		const { getFieldValue } = formRef;
		const mobile = getFieldValue('mobile');
		if (data && Object.keys(data).length > 0) {
			const next = new SearchLogEntity();
			next.type = Document.Aim;
			next.keyword = mobile;
			next.result = data;
			dispatch({ type: 'searchLog/insert', payload: [next] });
		}
	}, [data]);

	useEffect(() => {
		return () => {
			dispatch({ type: 'single/setData', payload: {} });
		};
	}, []);

	const searchClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		const { getFieldValue } = formRef;
		const value = getFieldValue('mobile');

		if (!MobileNumber.test(value)) {
			message.destroy();
			message.warn('请输入正确的手机号');
			return;
		} else {
			memoValue = value;
			dispatch({ type: 'reading/setReading', payload: true });
			console.log({ cmd: CommandType.GetSingle, msg: { number: md5(value) } });
			send(SocketType.Fetch, { cmd: CommandType.GetSingle, msg: { number: md5(value) } });
			setMobile(value);
			setActionTime(new Date());

			// dispatch({
			// 	type: 'single/setData',
			// 	payload: {
			// 		涉黄: {
			// 			actionTime: new Date(),
			// 			lastLogin: '无数据',
			// 			isReg: 0
			// 		},
			// 		传销: {
			// 			actionTime: new Date(),
			// 			ParticipatingWebsiteCount: 'N',
			// 			lastLogin: '无数据',
			// 			regTime: '1',
			// 			isReg: 0,
			// 			haveBindBankCard: 'N'
			// 		},
			// 		涉赌: {
			// 			actionTime: new Date(),
			// 			lastLogin: 0,
			// 			participatingFunds: '0',
			// 			isAgent: 'N',
			// 			isReg: 1,
			// 			participatingWebsiteCount: '2',
			// 			haveBindBankCard: 'Y'
			// 		}
			// 	}
			// });
			// dispatch({ type: 'reading/setReading', payload: false });
		}
	};

	return (
		<RootPanel>
			<PadBox>
				<Form form={formRef} layout="inline">
					{/* initialValue="17674147732" initialValue={memoValue}*/}
					<Item name="mobile" label="目标手机号" initialValue={memoValue}>
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
				<CaseCard data={data} mobile={mobile} actionTime={actionTime} />
			</Row>
		</RootPanel>
	);
};

export default Index;

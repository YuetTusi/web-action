import React, { FC } from 'react';
import { routerRedux, useDispatch } from 'dva';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import RootPanel from '@/component/root-panel';

const { Item } = Form;
const { Search } = Input;

const Index: FC<{}> = () => {
	const dispatch = useDispatch();

	return (
		<RootPanel>
			<Form layout="inline">
				<Item label="目标手机号">
					<Input />
				</Item>
				<Item>
					<Button type="primary">查询</Button>
				</Item>
			</Form>
		</RootPanel>
	);
};

export default Index;

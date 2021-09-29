import React, { FC, MouseEvent } from 'react';
import { LoginBg, LoginBox } from './styled/login-style';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { useDispatch, useSelector } from 'react-redux';
import { routerRedux } from 'dva';

const { Password } = Input;
const { Item, useForm } = Form;

const Login: FC<{}> = () => {
	const login = useSelector((state: any) => state.login);
	console.log(login);
	const dispatch = useDispatch();
	const [fromRef] = useForm();

	const submitClick = async (event: MouseEvent<HTMLButtonElement>) => {
		const { validateFields } = fromRef;
		event.preventDefault();
		try {
			const values = await validateFields();
			console.log(values);
			sessionStorage.setItem('username', values.username);
			dispatch(routerRedux.push('/index'));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<LoginBg>
			<LoginBox>
				<h2>网络行为查询系统</h2>
				<Form form={fromRef}>
					<Item
						rules={[{ required: true, message: '请填写用户' }]}
						name="username"
						label="用户">
						<Input />
					</Item>
					<Item
						rules={[{ required: true, message: '请填写密码' }]}
						name="password"
						label="密码">
						<Password />
					</Item>
				</Form>
				<div className="btn-box">
					<Button onClick={submitClick} type="primary">
						登录
					</Button>
				</div>
			</LoginBox>
		</LoginBg>
	);
};

export default Login;

import React, { FC } from 'react';
import { LoginBg, LoginBox } from './styled/login-style';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';

const { Password } = Input;
const { Item, useForm } = Form;

const Login: FC<{}> = () => {
	const [fromRef] = useForm();

	return (
		<LoginBg>
			<LoginBox>
				<h2>网络行为查询系统</h2>
				<Form form={fromRef}>
					<Item label="用户">
						<Input />
					</Item>
					<Item label="密码">
						<Password />
					</Item>
				</Form>
				<div className="btn-box">
					<Button type="primary">登录</Button>
				</div>
			</LoginBox>
		</LoginBg>
	);
};

export default Login;

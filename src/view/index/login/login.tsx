import React, { FC, MouseEvent } from 'react';
import { LoginBg, LoginBox } from './styled/login-style';
import { useDispatch, useSelector } from 'react-redux';
import KeyOutlined from '@ant-design/icons/KeyOutlined';
import LoadingOutlined from '@ant-design/icons/LoadingOutlined';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import { LoginState } from '@/model/login';
import { routerRedux } from 'dva';

const { Password } = Input;
const { Item, useForm } = Form;

const Login: FC<{}> = () => {
	const { loading } = useSelector<any, LoginState>((state: any) => state.login);
	const dispatch = useDispatch();
	const [fromRef] = useForm();

	const submitClick = async (event: MouseEvent<HTMLButtonElement>) => {
		const { validateFields } = fromRef;
		event.preventDefault();
		try {
			const values = await validateFields();
			sessionStorage.setItem('username', values.username);
			dispatch({ type: 'login/login', payload: values });
			dispatch({ type: 'userInfo/setData', payload: { frequency_limit: 999 } });
			dispatch(routerRedux.push('/targetInquire'));
		} catch (error) {
			console.log(error);
		} finally {
			setTimeout(() => {
				dispatch({ type: 'login/setLoading', payload: false });
			}, 5000);
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
					<Button disabled={loading} onClick={submitClick} type="primary">
						{loading ? <LoadingOutlined /> : <KeyOutlined />}
						<span>登录</span>
					</Button>
				</div>
			</LoginBox>
		</LoginBg>
	);
};

export default Login;

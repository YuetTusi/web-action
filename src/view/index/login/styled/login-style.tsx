import styled from 'styled-components';
import loginBm from './images/login-bm.png';

const LoginBg = styled.div`
	position: absolute;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	color: red;
	background-image: url(${loginBm});
	background-repeat: no-repeat;
	background-size: cover;
`;

const LoginBox = styled.div`
	width: 600px;
	margin-top: 10%;
	margin-left: auto;
	margin-right: auto;
	padding: 40px 50px;
	border: 4px solid #6acbe6f2;
	border-radius: 3px;
	box-shadow: 0 0 20px 10px #6acbe6;
	h2 {
		color: #fff;
		text-align: center;
		padding-bottom: 20px;
	}
	label {
		color: #fff !important;
	}
	.btn-box {
		text-align: right;
	}
`;

export { LoginBg, LoginBox };

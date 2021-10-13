import styled from 'styled-components';

const FullPanel = styled.div`
	display: flex;
	flex-direction: row;
	position: absolute;
	top: 10px;
	left: 10px;
	bottom: 10px;
	right: 10px;
	background-color: #fff;
	border: 1px solid #f1f1f1;
`;

const LeftBox = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	flex: none;
	width: 280px;
	border-right: 1px solid #f1f1f1;
`;

const MainBox = styled.div`
	position: relative;
	display: flex;
	flex: 1;
`;

const TopBox = styled.div`
	height: 50px;
	width: 100%;
	border-bottom: 1px solid #f1f1f1;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const TreeBox = styled.div`
	position: absolute;
	top: 50px;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: auto;
`;

const FormBox = styled.div`
	position: absolute;
	top: 50px;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 20px 50px;
`;

export { FullPanel, LeftBox, MainBox, TopBox, TreeBox, FormBox };

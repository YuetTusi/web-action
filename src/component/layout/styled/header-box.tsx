import styled from 'styled-components';

const HeaderBox = styled.div`
	display: flex;
	flex-direction: row;
	height: 64px;
	background-color: #fff;

	.caption {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #1890ff;
		color: #fff;
		font-size: 20px;
		width: 240px;
		text-align: center;
	}
	.fn {
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.brd {
		font-size: 1.2rem;
		padding-left: 1rem;
		& > span {
			margin-left: 4px;
		}
	}
	.info {
		label {
			&:after {
				content: '：';
			}
		}
		span {
			color: #1890ff;
			font-weight: bold;
			margin-right: 20px;
		}
		a {
			color: #1890ff;
			font-weight: bold;
			margin-right: 10px;
		}
	}
`;

export { HeaderBox };

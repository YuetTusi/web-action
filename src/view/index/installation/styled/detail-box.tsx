import styled from 'styled-components';

const DetailPanel = styled.div`
	position: relative;
	.ant-row {
		margin-bottom: 10px;
	}
	.ant-row:last-child {
		margin-bottom: 0;
	}
`;

const EmptyBox = styled.div`
	width: 100%;
	height: 400px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const DetailBox = styled.div`
	width: 100%;
	border: 1px solid #f0f0f0;
	border-radius: 2px;
	.list {
		position: relative;
		height: 460px;
		overflow-y: auto;
		ul,
		li {
			margin: 0;
			padding: 0;
		}
		li {
			padding: 5px 10px;
			border-bottom: 1px solid #f0f0f0;
			list-style-type: none;
			&:hover {
				background-color: #1890ff;
				color: #fff;
			}
			&:nth-child(odd) {
				background-color: #fbfbfb;
				&:hover {
					background-color: #1890ff;
					color: #fff;
				}
			}
		}
	}
`;

export { DetailPanel, EmptyBox, DetailBox };

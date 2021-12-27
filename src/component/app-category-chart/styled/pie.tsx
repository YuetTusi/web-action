import styled from 'styled-components';

const ChartRoot = styled.div`
	width: 100%;
	height: 460px;
	display: flex;
	flex-direction: row;
	.chart-box {
		flex: 3;
		width: auto;
		height: 460px;
	}
	.list-box {
		flex: 2;
		width: auto;

		.list-panel {
			height: 460px;
			border: 1px solid #f0f0f0;
			border-radius: 2px;
			position: relative;
			.caption {
				padding: 8px;
				background-color: #fbfbfb;
				border-bottom: 1px solid #f0f0f0;
			}
			.list {
				position: absolute;
				top: 40px;
				left: 0;
				right: 0;
				bottom: 0;
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
					&:nth-child(even) {
						background-color: #fbfbfb;
					}
				}
			}
		}
	}
`;

const EmptyListBox = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export { ChartRoot, EmptyListBox };

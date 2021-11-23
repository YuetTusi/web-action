import styled from 'styled-components';

export const ErrorMessageRoot = styled.div`
	.error-message-root {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		background-color: #bbc8cb;

		.err-info-scrollbox {
			max-height: 380px;
			overflow-y: auto;
			margin-bottom: 10px;
			padding-right: 20px;
		}

		.warn-bg {
			position: absolute;
			top: 100px;
			left: 100px;
			right: 100px;
			bottom: 100px;
			border: 1px solid #1890ff;
			border-radius: 5px;
			background-color: #fff;
			box-shadow: 1px 1px 15px #fff;

			display: flex;
			flex-direction: column;

			.err-caption {
				font-size: 2rem;
				color: #1890ff;
				height: 80px;
				line-height: 80px;
				text-align: center;
				border-bottom: 1px solid #1890ff;
				& > div {
					width: 1000px;
					margin: 0 auto;
					text-align: center;
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
				}
			}
			.err-message {
				flex: 1;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;

				.err-info-box {
					flex: 1;
					ul {
						padding: 0;
						margin: 0;
					}
					li {
						list-style-type: none;
						margin: 0;
					}
				}

				.err-info-icon {
					padding: 0 40px;
					color: #fff3db;
					.anticon {
						font-size: 18rem;
					}
				}
			}
		}
	}
`;

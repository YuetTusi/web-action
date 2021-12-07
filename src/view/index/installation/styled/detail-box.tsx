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

const DetailBox = styled.div`
	width: 100%;
	height: auto;

	border: 1px solid #f0f0f0;
	border-radius: 2px;
	.caption {
		padding: 5px 10px;
		font-weight: bold;
		border-bottom: 1px solid #f0f0f0;
	}
	.list {
		height: 120px;
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
		}
	}
`;

export { DetailPanel, DetailBox };

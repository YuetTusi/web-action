import styled from 'styled-components';

const DescBox = styled.div`
	display: flex;
	flex-direction: row;
`;

const BoxItem = styled.fieldset`
	flex: 1;
	margin: 2px;
	border: 1px solid #f0f0f0;
	legend {
		width: auto;
		margin-left: 10px;
		.ant-tag {
			margin-right: 0 !important;
		}
	}
`;

const ResultList = styled.ul`
	margin: 0;
	padding: 0;
	background-color: #fff;

	li {
		margin: 0;
		padding: 5px 10px;
		list-style-type: none;
		span {
		}
		label {
			font-weight: bold;
			color: #000000a6;
			&:after {
				content: '：';
			}
		}
	}
`;

export { DescBox, BoxItem, ResultList };

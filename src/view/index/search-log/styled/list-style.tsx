import styled from 'styled-components';

const BoxItem = styled.fieldset`
	padding: 10px;
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

export { BoxItem, ResultList };

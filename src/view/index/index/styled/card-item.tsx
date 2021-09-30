import styled from 'styled-components';

const CardItemList = styled.ul`
	padding: 0;
	margin: 0;
	& > li {
		padding: 3px;
		margin: 0;
		list-style-type: none;
		& > label {
			color: #000000a6;
			font-weight: bolder;
			&::after {
				content: '：';
			}
		}
	}
`;

export { CardItemList };

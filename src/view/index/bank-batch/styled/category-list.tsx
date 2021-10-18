import styled from 'styled-components';

const CategoryList = styled.ul`
	margin: 0;
	padding: 0;

	li {
		list-style-type: none;
		margin: 0;
		padding: 5px;
		label {
			color: #000000a6;
			font-weight: bolder;
			&::after {
				content: '：';
			}
			span {
			}
		}
	}
`;

export { CategoryList };

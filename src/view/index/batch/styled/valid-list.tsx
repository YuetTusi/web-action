import styled from 'styled-components';

const ValidList = styled.ul`
	margin: 0;
	padding: 0;
	li {
		margin: 0;
		padding: 4px;
		list-style-type: none;
		&.err {
			color: #ff0000;
		}
	}
`;

export { ValidList };

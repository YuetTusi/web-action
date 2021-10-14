import styled from 'styled-components';

const ButtonCell = styled.span`
	display: flex;
	flex-direction: row;
	a {
		padding: 0 8px;
		border-right: 1px solid #efefef;
		&:last-child {
			border-right: none;
		}
	}
`;

export { ButtonCell };

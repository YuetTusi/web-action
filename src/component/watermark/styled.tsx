import styled from 'styled-components';

const WaterMark = styled.div`
	color: rgba(177, 177, 177, 0.333333);
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	font-size: 20px;
	font-weight: normal;
	font-family: Arial, Helvetica, sans-serif;

	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	span {
		transform: rotate(-50deg);
	}
`;

export { WaterMark };

import styled from 'styled-components';

const CardPanel = styled.div`
	position: relative;
`;

const WaterMark = styled.div`
	color: rgba(177, 177, 177, 0.5);
	position: absolute;
	bottom: 40%;
	right: 40%;
	z-index: 10;
    font-size: 1.4rem;
	font-weight: bold;
    font-family: Arial, Helvetica, sans-serif;
	transform: rotate(-45deg);
`;

export { CardPanel, WaterMark };

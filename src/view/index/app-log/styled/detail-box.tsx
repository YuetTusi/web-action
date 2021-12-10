import styled from 'styled-components';

const DetailPanel = styled.div`
	position: relative;
	.water-mark {
		position: absolute;
		color: rgba(177, 177, 177, 0.333333);
		z-index: 1;
		font-size: 20px;
		top: 55%;
		transform: rotate(-50deg);
		&:nth-child(1) {
			left: 15%;
		}
		&:nth-child(2) {
			left: 45%;
		}
		&:nth-child(3) {
			left: 75%;
		}
	}
`;


const EmptyBox = styled.div`
	width: 100%;
	height: 400px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
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
		position: relative;
		height: 460px;
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

export { DetailPanel, DetailBox, EmptyBox };

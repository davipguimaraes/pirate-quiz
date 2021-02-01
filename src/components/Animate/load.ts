import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
`;
export const LoadSpin = styled.div`
	display: inline-block;
	top: 50%;
	left: 50%;
	font-size: 0;
	border: 2px solid ${({ theme }) => theme.colors.contrastText};
	border-top-color: ${({ theme }) => theme.colors.primary};
	border-radius: 50%;
	width: 14px;
	height: 14px;
	animation: ${spin} 0.25s linear infinite;
`;

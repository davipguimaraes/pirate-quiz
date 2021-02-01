import styled from 'styled-components';

type InputProp = {
	onChange: Function;
	placeholder: string;
	value?: string | any;
	name?: string | any;
};

export const InputBase = styled.input<InputProp>`
	width: 100%;
	padding: 15px;
	font-size: 14px;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	color: ${({ theme }) => theme.colors.contrastText};
	background-color: ${({ theme }) => theme.colors.mainBg};
	border-radius: ${({ theme }) => theme.borderRadius};
	outline: 0;
	margin-bottom: 25px;
`;

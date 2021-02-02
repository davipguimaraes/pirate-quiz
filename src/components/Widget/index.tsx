import styled from 'styled-components';

export const Widget = styled.div`
	margin-top: 24px;
	margin-bottom: 24px;
	border: 1px solid ${({ theme }) => theme.colors.primary};
	background-color: ${({ theme }) => {
		return theme.colors.mainBg;
	}};
	border-radius: 4px;
	overflow: hidden;

	h1,
	h2,
	h3 {
		font-size: 16px;
		font-weight: 700;
		line-height: 1;
		margin-bottom: 0;
	}
	p {
		font-size: 14px;
		font-weight: 400;
		line-height: 1;
	}
`;

export const WidgetHeader = styled.header`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 18px 32px;
	background-color: ${({ theme }) => theme.colors.primary};

	* {
		margin: 0;
	}
`;

export const WidgetContent = styled.div`
	padding: 24px 32px 32px 32px;
	& > *:first-child {
		margin-top: 0;
	}
	& > *:last-child {
		margin-bottom: 0;
	}
	ul {
		list-style: none;
		padding: 0;
	}
`;

type WidgetTopicProps = {
	disabled?: boolean;
	isCorrect?: boolean;
	isAwnserChoice?: boolean;
};
export const WidgetTopic = styled.a<WidgetTopicProps>`
	outline: 0;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.contrastText};

	margin-bottom: 8px;
	cursor: pointer;
	transition: 0.3s;
	display: block;

	&:hover {
		opacity: 0.75;
	}

	label {
		padding: 10px 15px;
		border-radius: ${({ theme }) => theme.borderRadius};
		display: block;
		opacity: ${({ disabled }) => (disabled ? '0.9' : '1')};
		background-color: ${({ theme }) => `${theme.colors.primary}40}`};
	}
	input {
		display: none;
		&:checked + label {
			background-color: ${({ theme, isCorrect, isAwnserChoice }) => {
				if (isAwnserChoice) {
					if (isCorrect) {
						return `${theme.colors.success}`;
					}
					return `${theme.colors.wrong}`;
				}
				return `${theme.colors.primary}dd`;
			}};
		}
	}
`;

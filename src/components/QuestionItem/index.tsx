import React from 'react';
import styled from 'styled-components';
import { Widget, WidgetHeader, WidgetContent, WidgetTopic } from '../Widget';
import Button from '../Button';
import QuestionInterface from '../../../model/questions.interface';

const Status = styled.span`
	padding: 10px 15px;
	margin-top: 8px;
	display: block;
	background-color: ${({ theme }) => `${theme.colors.primary}30`};
	border-radius: ${({ theme }) => theme.borderRadius};
	border-left: ${({ theme }) => theme.borderRadius} solid transparent;

	&.correct {
		border-left-color: ${({ theme }) => theme.colors.success};
	}
	&.incorrect {
		border-left-color: ${({ theme }) => theme.colors.wrong};
	}
`;
interface QuestionItem {
	question: QuestionInterface;
	questionIndex: number;
	totalQuestions: number;
	onSubmit: Function;
}
export function QuestionWidget(questaoItem: QuestionItem) {
	const questionId = `question__${questaoItem.questionIndex}`;

	const [selectedAlternative, setSelectedAlternative] = React.useState(-1);
	const [isAnswerChoice, setIsAnswerChoice] = React.useState(false);
	const isCorrect = selectedAlternative == questaoItem.question.answer;

	const timeToSubmit = 3000;

	return (
		<Widget>
			<WidgetHeader>
				<h3>{`Pergunta ${questaoItem.questionIndex + 1} de ${
					questaoItem.totalQuestions
				}`}</h3>
			</WidgetHeader>

			<img
				alt="Descrição"
				style={{
					width: '100%',
					height: '150px',
					objectFit: 'cover',
				}}
				src={questaoItem.question.image}
			/>
			<WidgetContent>
				<h2>{questaoItem.question.title}</h2>
				<p>{questaoItem.question.description}</p>

				<form
					onSubmit={(infosDoEvento) => {
						infosDoEvento.preventDefault();
						setIsAnswerChoice(true);

						setTimeout(() => {
							questaoItem.onSubmit();

							setTimeout(() => {
								setIsAnswerChoice(false);
								setSelectedAlternative(-1);
							}, 1);
						}, timeToSubmit);
					}}
				>
					{questaoItem.question.alternatives.map(
						(alternative: string, alternativeIndex: number) => {
							const alternativeId = `alternative__${alternativeIndex}`;
							return (
								<WidgetTopic
									as="label"
									htmlFor={alternativeId}
									key={alternativeIndex}
									disabled={isAnswerChoice}
								>
									<input
										id={alternativeId}
										name={questionId}
										type="radio"
										onChange={() => {
											setSelectedAlternative(
												alternativeIndex,
											);
										}}
										checked={
											alternativeIndex ==
											selectedAlternative
										}
									/>
									<span> {alternative}</span>
								</WidgetTopic>
							);
						},
					)}

					<Button type="submit" disabled={selectedAlternative < 0}>
						Confirmar
					</Button>

					{isAnswerChoice && isCorrect && (
						<Status className="correct">Certou mizeraviiii</Status>
					)}
					{isAnswerChoice && !isCorrect && (
						<Status className="incorrect">Errooooooouuuuu</Status>
					)}
				</form>
			</WidgetContent>
		</Widget>
	);
}

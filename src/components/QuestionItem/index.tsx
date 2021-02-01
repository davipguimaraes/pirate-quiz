import React from 'react';
import styled from 'styled-components';
import { Widget, WidgetHeader, WidgetContent, WidgetTopic } from '../Widget';
import Button from '../Button';
import QuestionInterface from '../../../model/questions.interface';

const Status = styled.span`
	padding: 10px 15px;
	margin-bottom: 8px;
	display: block;
	background-color: ${({ theme }) => `${theme.colors.primary}dd`};
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
	const [isQuestionSelected, setIsQuestionSelected] = React.useState(false);
	const isCorrect = selectedAlternative == questaoItem.question.answer;

	const timeToSubmit = 3000;
	let [timerToSubmit, setTimerSubmit] = React.useState(0);

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
						questaoItem.onSubmit();
					}}
				>
					{questaoItem.question.alternatives.map(
						(alternative: string, alternativeIndex: number) => {
							const alternativeId = `alternative__${alternativeIndex}`;
							const isSelected =
								selectedAlternative == alternativeIndex;
							return (
								<WidgetTopic
									as="label"
									htmlFor={alternativeId}
									key={alternativeIndex}
								>
									<input
										// style={{ display: 'none' }}
										id={alternativeId}
										name={questionId}
										type="radio"
										checked={isSelected}
										onChange={() => {
											setSelectedAlternative(
												alternativeIndex,
											);

											if (!!timerToSubmit) {
												clearTimeout(timerToSubmit);
											}
											setTimerSubmit(
												setTimeout(() => {
													setIsQuestionSelected(true);
												}, timeToSubmit),
											);
										}}
										disabled={isQuestionSelected}
									/>
									<span> {alternative}</span>
								</WidgetTopic>
							);
						},
					)}

					{isQuestionSelected && isCorrect && (
						<Status className="correct">Vocẽ acertou</Status>
					)}
					{isQuestionSelected && !isCorrect && (
						<Status className="incorrect">Errou</Status>
					)}
					<Button type="submit" disabled={!isQuestionSelected}>
						Confirmar
					</Button>
				</form>
			</WidgetContent>
		</Widget>
	);
}

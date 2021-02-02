import React from 'react';
import { Widget, WidgetHeader, WidgetContent, WidgetTopic } from '../Widget';
import Button from '../Button';
import QuestionInterface from '../../../model/questions.interface';

interface QuestionItem {
	question: QuestionInterface;
	questionIndex: number;
	totalQuestions: number;
	onSubmit: Function;
}
export function QuestionWidget(questaoItem: QuestionItem) {
	const questionId = `question__${questaoItem.questionIndex}`;

	const [
		selectedAlternative,
		setSelectedAlternative,
	] = React.useState<number>(-1);
	const [isAnswerChoice, setIsAnswerChoice] = React.useState(false);
	const isCorrect = selectedAlternative == questaoItem.question.answer;

	const timeToSubmit = 1200;

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
							let alternative = selectedAlternative;

							setSelectedAlternative(-1);
							setIsAnswerChoice(false);

							questaoItem.onSubmit(alternative);
						}, timeToSubmit);
					}}
				>
					{questaoItem.question.alternatives.map(
						(alternative: string, alternativeIndex: number) => {
							const alternativeId = `alternative__${alternativeIndex}`;

							return (
								<WidgetTopic
									key={alternativeIndex}
									disabled={isAnswerChoice}
									isAwnserChoice={isAnswerChoice}
									isCorrect={isCorrect}
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
										disabled={isAnswerChoice}
									/>
									<label htmlFor={alternativeId}>
										{alternative}
									</label>
								</WidgetTopic>
							);
						},
					)}

					<Button
						type="submit"
						disabled={selectedAlternative < 0 || isAnswerChoice}
					>
						Confirmar
					</Button>
				</form>
			</WidgetContent>
		</Widget>
	);
}

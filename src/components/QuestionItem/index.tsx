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
									/>
									<span>{alternative}</span>
								</WidgetTopic>
							);
						},
					)}

					<Button type="submit">Confirmar</Button>
				</form>
			</WidgetContent>
		</Widget>
	);
}

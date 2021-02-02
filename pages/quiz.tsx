import React from 'react';
import db from '../db.json';
import { Widget, WidgetHeader, WidgetContent } from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuestionInterface from '../model/questions.interface';
import { QuestionWidget } from '../src/components/QuestionItem';
import { LoadSpin } from '../src/components/Animate/load';
import styled from 'styled-components';

const ResultItem = styled.li<{ correct: boolean }>`
	padding: 10px 15px;
	margin-top: 8px;
	display: block;
	background-color: ${({ theme }) => `${theme.colors.primary}aa`};
	border-radius: ${({ theme }) => theme.borderRadius};
	span {
		display: inline-block;
		padding: 6px;
		margin: 4px;
		border-radius: 4px;
		line-height: 1;
		background-color: ${({ theme, correct }) =>
			`${correct ? theme.colors.success : theme.colors.wrong}aa`};
		font-size: 0.65em;
		text-transform: uppercase;
	}
`;

function LoadingWidget() {
	return (
		<Widget>
			<WidgetHeader>Carregando...</WidgetHeader>

			<WidgetContent>
				<em>Desafio do Loading </em> <LoadSpin />
			</WidgetContent>
		</Widget>
	);
}

const screenStates = {
	QUIZ: 'QUIZ',
	LOADING: 'LOADING',
	RESULT: 'RESULT',
};
export default function QuizPage() {
	const [screenState, setScreenState] = React.useState(screenStates.LOADING);
	const totalQuestions: number = db.questions.length;
	const [currentQuestion, setCurrentQuestion] = React.useState(0);
	const questionIndex: number = currentQuestion;
	const question: QuestionInterface = db.questions[questionIndex];
	let [results, setResult] = React.useState<boolean[]>([]);

	// [React chama de: Efeitos || Effects]
	// React.useEffect
	// atualizado === willUpdate
	// morre === willUnmount
	React.useEffect(() => {
		// fetch() ...
		setTimeout(() => {
			setScreenState(screenStates.QUIZ);
		}, 1 * 500);
		// nasce === didMount
	}, []);

	function handleSubmitQuiz(answer: number) {
		//count result
		results[questionIndex] = question.answer == answer;
		setResult([...results]);

		const nextQuestion = questionIndex + 1;
		if (nextQuestion < totalQuestions) {
			setCurrentQuestion(nextQuestion);
		} else {
			setScreenState(screenStates.RESULT);
		}
	}

	return (
		<QuizBackground backgroundImage={db.bg}>
			<QuizContainer>
				<QuizLogo />
				{screenState === screenStates.QUIZ && (
					<QuestionWidget
						question={question}
						questionIndex={questionIndex}
						totalQuestions={totalQuestions}
						onSubmit={handleSubmitQuiz}
					/>
				)}

				{screenState === screenStates.LOADING && <LoadingWidget />}

				{screenState === screenStates.RESULT && QuizResults()}
			</QuizContainer>
		</QuizBackground>
	);

	function QuizResults(): React.ReactNode {
		return (
			<Widget>
				<WidgetHeader>
					<h3>Seus resultados!</h3>
				</WidgetHeader>
				<WidgetContent>
					<ul>
						{results.map(
							(resultado: boolean, idQuestao: number) => {
								return (
									<ResultItem
										key={idQuestao}
										correct={resultado}
									>
										<strong>#0{idQuestao + 1}</strong> -
										Resultado:
										<span>
											{resultado ? 'acertou' : 'errou'}
										</span>
									</ResultItem>
								);
							},
						)}
					</ul>
				</WidgetContent>
			</Widget>
		);
	}
}

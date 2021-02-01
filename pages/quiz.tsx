import React from 'react';
import db from '../db.json';
import { Widget, WidgetHeader, WidgetContent } from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import QuestionInterface from '../model/questions.interface';
import { QuestionWidget } from '../src/components/QuestionItem';
import { LoadSpin } from '../src/components/Animate/load';

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

	function handleSubmitQuiz() {
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

				{screenState === screenStates.RESULT && (
					<div>Você acertou X questões, parabéns!</div>
				)}
			</QuizContainer>
		</QuizBackground>
	);
}

import styled from 'styled-components';
import db from '../db.json';
import {Widget, WidgetHeader, WidgetContent} from '../src/components/Widget';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';

export const QuizContainer = styled.div`
	width: 100%;
	max-width: 350px;
	padding-top: 45px;
	margin: auto 10%;
	@media screen and (max-width: 500px) {
		margin: auto;
		padding: 15px;
	}
`;

export default function Home() {
	return (
		<QuizBackground backgroundImage={db.bg}>
			<QuizContainer>
				<QuizLogo />
				<Widget>
					<WidgetHeader>
						<h1>{db.title}</h1>
					</WidgetHeader>
					<WidgetContent>
						<p>{db.description}</p>
					</WidgetContent>
				</Widget>

				<Widget>
					<WidgetContent>
						<h1>Quizes da Galera</h1>

						<p>lorem ipsum dolor sit amet...</p>
					</WidgetContent>
				</Widget>
				<Footer />
			</QuizContainer>
			<GitHubCorner projectUrl="https://github.com/davipguimaraes/pirate-quiz" />
		</QuizBackground>
	);
}

export default interface QuestionInterface {
	image: string;
	title: string;
	description: string;
	answer: number;
	alternatives: Array<string>;
}

import {QuestionBase} from './base-question.class';

export class SelectQuestion extends QuestionBase<string> {
	controlType: string = 'select';
	options: {key: string, value: string}[] = [];

	constructor(options: {} = {}) {

		super(options);
		this.options = options['options'] || [];
	}
}
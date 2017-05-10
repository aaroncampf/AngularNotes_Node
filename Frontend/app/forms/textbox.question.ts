import {QuestionBase} from './base-question.class';

export class TextboxQuestion extends QuestionBase<string> {
	public controlType = 'textbox';
	public type: string;
	constructor(options: {} ={}) {
		super(options);
		this.type = options['type'] || '';
	}
}
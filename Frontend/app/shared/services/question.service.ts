import {Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Injectable()
export class QuestionService {
	constructor() {}
	private labelMaker(key, replacmentLabels): string {
		for (let item of replacmentLabels){
			if (item.key === key){
				return item.replace;
			}
		}
		return key;
	}

	public initQuestions(models: {}[]): {}[] {
		if(Array.isArray(models)) {
			const REQUIRED = ['email', 'name'];
			const RESTRICT_KEYS = ['id', 'created_at', 'updated_at', 'deleted_at', 'user_id', 'company_id', 'companyId', 'quoteLines', 'modelType', 'contactId', 'contact_id', ''];
			const REPLACMENT_LABELS = [{ key: 'addressOne', replace: 'address'}, { key: 'addressTwo', replace: 'address cont.'}];
			// todo refactor select condition
			let questions: any[] = [];
			if(models && models.length > 0) {
				for (let model of models) {
					for (let key of Object.keys(model)) {
						let question: any = {};
						let label = this.labelMaker(key, REPLACMENT_LABELS);
						if (RESTRICT_KEYS.indexOf(key) === -1) {
							Object.assign(question, {
								key: key,
								label: label[0].toUpperCase() + label.slice(1),
								required: REQUIRED.indexOf(key) !== -1,
								value: model[key]
							});
							questions.push(question)
						}
					}
					Object.assign(model,{questions: questions});
					questions = [];
				}
			} else {
				return models;
			}
		}
			return models;
	}

	public initControlsFromQuestions(questions: any[]): {[name: string]: FormControl} {
		let group: { [name: string]: FormControl} = {};
		questions.forEach(question => {
			group[question.key] = question.required
				? new FormControl(question.value || '', Validators.required)
				: new FormControl(question.value || '');
		});
		return group;
	}
}

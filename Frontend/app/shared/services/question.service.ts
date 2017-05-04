    import {Injectable} from '@angular/core';
	import {AbstractControl, FormControl, Validators} from '@angular/forms';
	@Injectable()
	export class QuestionService {
		constructor() {}

		public initQuestions(items: any): any[] {
			const RESTRICT_KEYS = ['id', 'created_at', 'updated_at', 'deleted_at', 'user_id', 'company_id', 'companyId', 'quoteLines', 'modelType'];
			// todo refactor select condition
			let questions: any[] = [];
			if(items && items.length > 0){
				for (let key of Object.keys(items[0])) {
					if (RESTRICT_KEYS.indexOf(key) === -1) {
						console.log('questions service', key);
						questions.push(new Object({
							key: key,
							label: key[0].toUpperCase() + key.slice(1),
							required: ['email'].indexOf(key) !== -1,
							value: null
						}))
					}
				}
			} else {
				return void 0;
			}
			return questions;
		}

		public initControlsFromQuestions(questions: any[]): { [name: string]: FormControl } {
			let group: { [name: string]: FormControl; } = {};
			questions.forEach(question => {
				group[question.key] = question.required
					? new FormControl(question.value || '', Validators.required)
					: new FormControl(question.value || '');
			});
			return group;
		}
	}
	export interface QuestionControls {
		[key: string]: AbstractControl
	}
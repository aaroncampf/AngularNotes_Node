import {Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {REPLACMENT_LABELS, REQUIRED, RESTRICTED_KEYS} from '../settings/dynamic-forms.config';

export interface ListControls {
	[name: string]: FormControl;
}

export interface List {
	items: any[];
	controls: ListControls;
	groupName: string;
	title: string;
	subLists?: List[];
}

@Injectable()
export class QuestionService {
	constructor(){}

	private labelMaker(key, replacmentLabels): string {
		for (let item of replacmentLabels){
			if (item.key === key){
				return item.replace;
			}
		}
		return key;
	}

	public buildList(models: {}[]): List {
		let list: List = <List>{};
		list.items = this.initQuestions(models);
		list.controls = this.initControlsFromQuestions(list.items);
		return list;
	}

	public initQuestions(models: {}[]): {}[] {
		if(Array.isArray(models)) {
			// todo refactor select condition
			let questions: any[] = [];
			if(models && models.length > 0) {
				for (let model of models) {
					for (let key of Object.keys(model)) {
						let question: any = {};
						let label = this.labelMaker(key, REPLACMENT_LABELS);
						if (RESTRICTED_KEYS.indexOf(key) === -1) {
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
				//todo error message
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

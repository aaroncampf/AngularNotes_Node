import {Injectable} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {REPLACMENT_LABELS, REQUIRED, RESTRICTED_KEYS} from '../settings/dynamic-forms.config';
import {List, ListItems} from '../models/lists.model';


@Injectable()
export class FormsService {

	private labelMaker(key, replacmentLabels): string {
		for (let item of replacmentLabels){
			if (item.key === key){
				return item.replace;
			}
		}
		return key;
	}

	public ListBuilder(models: any[] = []): Promise<List> {
		return new Promise((resolve) => {
		let list: List;
			list = this.QuestionsFactory(models);
			list.controls = this.ControlsFactory(list.questions);
			list.subLists = this.buildSubLists(list);
			if(list){
				resolve(list)
			}
		})
	}

	public QuestionsFactory(models: any[] = []): List {
		let list: List = <List>{};
			// todo refactor select condition
			let questions: any[] = [];
			if(!!models) {
				list.items = models;
				for (let model of models) {
					for (let key of Object.keys(model)) {
						let question: any = {};
						let label = this.labelMaker(key, REPLACMENT_LABELS);
						if (RESTRICTED_KEYS.indexOf(key) === -1) {
							Object.assign(question, {
								key: key,
								label: label[0].toUpperCase() + label.slice(1),
								required: REQUIRED.indexOf(key) !== -1,
								value: model[key],
							});
							questions.push(question)
						}
					}
					list = Object.assign(list,{questions: questions});
					questions = [];
				}
			} else {
				//todo error message
				return list;
			}
			return list;
	}

	public ControlsFactory(questions: any ): {[name: string]: FormControl} {
		let group: { [name: string]: FormControl} = {};
		for(let item of questions) {
			//todo Controls Assignments
				Object.assign(group, {[item.key]: item.required
					? new FormControl(item.key || '', Validators.required)
					: new FormControl(item.key || '')
				})
		}
		return group;
	}

	public buildSubLists(list: List): ListItems[] {
		const MODELS = ['contacts', 'quotes', 'notes', 'companies'];
		let subList: ListItems = <ListItems>{};
		let subLists: any[] = [];
		for (let entry of list.items) {
			for (let key of Object.keys(entry)) {
				if (MODELS.indexOf(key) !== -1 ) {
					for(let owned of entry[key]) {
						subList.items = owned;
						subList.title = key.charAt(0).toUpperCase() + key.slice(1);
					}
					//todo should remove superfluous assignment? May be convenient
					subLists.push({
						title: key.charAt(0).toUpperCase() + key.slice(1),
						items: subList,
						controls: this.ControlsFactory(subLists)
					});
					subList = <ListItems>{};
				}
			}
			Object.assign(entry, {
				owned: subLists
			});

		}
		return subLists;
	}
}

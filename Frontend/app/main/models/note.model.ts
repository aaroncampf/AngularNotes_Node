import {_baseListItem} from './base-model.model';
/**
 * Created by aaron on 3/14/2017.
 * edited by Rd
 */

export interface Note extends _baseListItem{
	id: string;
	contactId: string;
	name: string
	title: string;
	text: string;
	modelType: 'notes';
	singular: 'Note';
}

export function newNote(): Note {
	let note: Note = <Note>{
		id: null,
		contactId: null,
		name: null,
		title: null,
		text: null,
		modelType: 'notes',
		singular: 'Note'
	};
	return note;
}


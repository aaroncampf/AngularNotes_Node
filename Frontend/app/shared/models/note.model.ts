/**
 * Created by aaron on 3/14/2017.
 * edited by Rd
 */

export interface Note {
	id: string;
	contactId: string;
	name: string
	title: string;
	text: string;
	modelType: 'note'
}

export function newNote(): Note {
	let note: Note = <Note>{
		id: null,
		contactId: null,
		name: null,
		title: null,
		text: null,
		modelType: null,
	};
	return note;
}


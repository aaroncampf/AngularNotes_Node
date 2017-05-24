import {FormControl} from '@angular/forms';

export const LIST_INITIAL_STATE = {
	controls: <ListControls>{},
	items: [],
	questions: [],
	subLists: []
};

export interface ListControls {
	[name: string]: FormControl;
}

export interface List {
	items: any[];
	questions: any[];
	controls?: ListControls;
	groupName?: string;
	title?: string;
	subLists?: ListItems[];
}

export interface ListItems {
	items: ListItems[];
	controls: {[name: string]: FormControl};
	questions: any[];
	title: string;
	key: string;
}




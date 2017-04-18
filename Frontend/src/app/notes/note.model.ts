import {Contact} from "../contacts/contact.model";
/**
 * Created by aaron on 3/14/2017.
 */
export interface Note {
    id: string;
    contactId: string;
    date: string;
    title: string;
    text: string;
}

export function newNote(): Note {
    let date = new Date().toISOString();
    let note: Note = <Note>{};
    note.date = date;
    return note;
}

import {Contact} from "./contact.model";
/**
 * Created by aaron on 3/14/2017.
 */
export interface Note {
    ID?: number;
    /**
     * The date the note was created
     */
    Date?: string;

    /**
     * The note's display title
     */
    Title: string;

    /**
     * The text/body of the quote
     */
    Text: string;

    /**
     * The contact this note was written for
     */
    Contact?: Contact;
}

export interface _NewNote {
    Title: string;
    Text: string;
}

export interface NewNote extends _NewNote {
    Date: Date
}

export const newNote = {
    Date: new Date(Date.now()).toISOString(),
    Title: void 0,
    Text: void 0
}

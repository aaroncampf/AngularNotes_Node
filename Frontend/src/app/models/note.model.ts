import {Contact} from "./contact.model";
/**
 * Created by aaron on 3/14/2017.
 */
export interface Note {
    ID: number;

    /**
     * The date the note was created
     */
    Date: Date;

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
    Contact: Contact;
}

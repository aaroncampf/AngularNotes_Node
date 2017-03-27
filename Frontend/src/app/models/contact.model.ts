import {Company} from "./company.model";
import {Note} from "./note.model";
/**
 * Created by aaron on 3/14/2017.
 */
export interface Contact {
    ID: number;
    Name: string;
    Phone: string;
    Email: string;
    Position: string;

    /**
     * The company that this contact belongs to
     */
    Company?: Company;

    /**
     * All notesCollection written for this contact
     */
    Notes?: Note[];
}

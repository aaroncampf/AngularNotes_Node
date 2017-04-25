import {Company} from "../companies/company.model";
/**
 * Created by aaron on 3/14/2017.
 * edited by Rd on 4/17/2017
 */

export interface QuoteLine {
    id?: string;
    quoteId: string;
    weight?: number;
    isCentered?: Boolean;
    unit: string;
    cost: string;
    desc: string;
}

export interface Quote {
    id?: string;
    companyId: string;
    date: string;
    name: string;
    quoteLines: QuoteLine[];
    updated_at?: string;
    created_at?: string;
}

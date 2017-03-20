import {Component, OnInit, trigger, state, style, transition, animate, OnDestroy, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../services/companies.service';
import {Company} from '../models/company.model';
import '../styles/main.scss';
//TODO Testing
import {Quote} from "../models/quote.model";
import {QuoteLine} from "../models/quotelines.model";

@Component({
    selector: 'home-component',
	animations: [
		trigger('contentState', [
			state('active', style({
				opacity: '1',
				transform: 'translateX(0%)',
			})),
			state('inactive', style({
				opacity: '0',
				transform: 'translateX(-100%)',
			})),
			transition('inactive => active', animate('250ms, ease-in')),
			//TODO figure out how to outro
			// transition('active => inactive', animate('1000ms, ease-in'))
		])
	],
    template: `
	<div class="container">
		<b>AngularBro's Notes</b>
		<input type="search" placeholder="search"/>
		<content-area>
			<ul class="nav nav-tabs">
				 <li [class.active]="tab === COMPANIES">
					 <a class="tab" [routerLink]="['/companies']">
						<tab-heading>Companies</tab-heading>
					</a>
				 </li>
				 <li [class.active]="tab === CONTACTS">
					 <a class="tab" [routerLink]="['/contacts']">
						<tab-heading>Contacts</tab-heading>
					</a>
				 </li>
				 <li [class.active]="tab === QUOTES">
					 <a [routerLink]="['/quotes']">
						 <tab-heading>Quotes</tab-heading>
					</a>
				 </li>
			</ul>
			<div class="tab-content">
				<companies-component [@contentState]="companies" [(companySelected)]="activeCompany" class="tab-pane" role="tabpanel" [class.active]="tab===COMPANIES"></companies-component>
				<contacts-component [@contentState]="contacts" class="tab-pane" role="tabpanel" [class.active]="tab===CONTACTS"></contacts-component>
				<quotes-component [@contentState]="quotes" class="tab-pane" role="tabpanel" [class.active]="tab===QUOTES"></quotes-component>
			</div>
		</content-area>
			
			<!--TODO Fix button ;)-->
			<!--<br><br><br><br><br>-->
			<!--<button (click)="OpenTestQuote"/>-->
	</div>
`
})
export class HomeComponent implements OnInit, OnChanges {
	public get COMPANIES(): string {
		return 'companies';
	}
	public get QUOTES(): string {
		return 'quotes';
	}
	public get CONTACTS(): string {
		return 'contacts';
	}
	public toggleState(state: string): void {

	};
	public quotes: string;
	public companies: string;
	public contacts: string;
	public activeCompany: boolean;
	public tab: string;
	public companiesData: Company[];
	public selectedCompany: Company = <Company>{};
    constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

    public ngOnInit(): void {
    	console.log(this.companies, this.contacts, this.quotes);
		this.route.params.subscribe(params => {
			this.tab = params['tab'];
			this.companies = 'inactive';
			this.quotes= 'inactive';
			this.contacts = 'inactive';
			this[params['tab']] = 'active';
			console.log(this.companies, this.contacts, this.quotes);
		});

		this.companyService.getCompanies()
			.subscribe(response => {
				console.log(response);
				this.companiesData = response;
			});
	}

	public ngOnChanges(): void {
    	console.log('des');

	}

	// public toggleState(state: string): void {
    	// this.quotesState = 'inactive';
    	// this.contactsState = 'inactive';
    	// this.companyState = 'inactive';
	// 	console.log(this[state]);
    	// this[state] = 'active';
	// 	console.log(this[state]);
	// }



	//TODO I will not touch other peopls code, I will not touch other peoples code, I ...
	public OpenTestQuote(): void {
        let _Quote: Quote = {
            ID : 1,
            Date : null,
            Name : "Hello World",
            Company : null,
            Lines: null
        };
        let _Company: Company = {
            ID: 1,
            Name: "",
            Address: "",
            City: "",
            Zip: "",
            Phone: "",
            Misc: "",
            Contacts:null,
            Quotes:null
        };

        let _QuoteLines: QuoteLine[] = [];
        _QuoteLines.push({
            ID: 1,
            Display: 1,
            UNIT: "",
            COST: "",
            DESC: "",
            IsCentered: false,
            Quote: null
        });
    }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../services/companies.service';
import {Company} from '../models/company.model';
import '../styles/main.scss';
//Testing
import {Quote} from "../models/quote.model";
import {QuoteLine} from "../models/quotelines.model";

@Component({
    selector: 'home-component',
    template: `
	<div class="container">
		<b>AngularBro's Notes</b>
		<input type="search" placeholder="search"/>
		<content-area>
			<ul class="nav nav-tabs nav-tabs-justified nav-pills">
				 <li ngClass="active:tab === COMPANIES">
					 <a class="tab" [routerLink]="['/companies']">
						<tab-heading>Companies</tab-heading>
					</a>
				 </li>
				 <li ngClass="active:tab === CONTACTS">
					 <a class="tab" [routerLink]="['/contacts']">
						<tab-heading>Contacts</tab-heading>
					</a>
				 </li>
				 <li ngClass="active:tab === QUOTES">
					 <a [routerLink]="['/quotes']">
						 <tab-heading>Quotes</tab-heading>
					</a>
				 </li>
			</ul>
			<div class="tab-content">
				<companies-component class="tab-pane" role="tabpanel" [class.active]="tab===COMPANIES"></companies-component>
				<contacts-component class="tab-pane" role="tabpanel" [class.active]="tab===CONTACTS"></contacts-component>
				<quotes-component class="tab-pane" role="tabpanel" [class.active]="tab===QUOTES"></quotes-component>
			</div>
		</content-area>
			
			<!--TODO Fix button ;)-->
			<!--<br><br><br><br><br>-->
			<!--<button (click)="OpenTestQuote"/>-->
	</div>
`
})
export class HomeComponent implements OnInit {
	public get COMPANIES(): string {
		return 'companies';
	}
	public get QUOTES(): string {
		return 'quotes';
	}
	public get CONTACTS(): string {
		return 'contacts';
	}
	public tab: string;
	public companies: Company[];
	public selectedCompany: Company = <Company>{};
    constructor(private route: ActivatedRoute, private companyService: CompanyService) {}

    public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tab = params['tab'];
		});
		this.companyService.getCompanies().subscribe(response => {
			console.log(response);
			this.companies = response;
		});
	}

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

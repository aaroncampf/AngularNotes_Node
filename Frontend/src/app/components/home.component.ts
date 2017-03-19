import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../services/company.service';
import {Company} from '../models/company.model';
import '../styles/main.scss';
//Testing
import {Quote} from "../models/quote.model";
import {QuoteLine} from "../models/quotelines.model";

@Component({
    selector: 'home-component',
    template: `
	<div class="container">
	 	<div class="navbar navbar-default navbar-fixed-top" role="navigation" title="AngularBros' Notes">
			<ul class="col-xs-12">
				<li class="pull-right">
					<div class="dropdown">
						<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Options<span class="caret"></span></button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
							<div *ngIf="tab===CONTACTS">
								<li>
									<a href="#">Download</a>
								</li>
							</div>
							<div *ngIf="tab===QUOTES">
								<li>
									<a href="#">Add</a>
								</li>
								<li>
									<a href="#">Download</a>
								</li>
								<li>
								<a href="#">Remove</a>
								</li>
							</div>
						</ul>
					</div>
				</li>
				<li class="">
					<input type="search" placeholder="search"/>
				</li>
			</ul>
		</div>
		<content-area (click)="sideMenu = false">
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
	public sideMenu: boolean = false;
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
	public sideMenuClick(): void {
		this.sideMenu = !this.sideMenu;
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

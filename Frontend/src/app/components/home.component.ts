import {Component, OnInit, trigger, state, style, transition, animate, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../services/companies.service';
import {Company} from '../models/company.model';
import '../styles/main.scss';
//TODO Testing
import {Quote} from "../models/quote.model";
import {QuoteLine} from "../models/quotelines.model";
import {Overlay} from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {Setting} from '../models/setting.model';
import {Contact} from "../models/contact.model";


@Component({
    selector: 'home-component',
	animations: [
		trigger('contentState', [
			state('active', style({
				opacity: '1',
				transform: 'translateY(0%)',
			})),
			state('inactive', style({
				opacity: '0',
				transform: 'translateY(100%)',
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
				 <li [class.active]="tab === NOTES">
					 <a class="tab" [routerLink]="['/notes']">
						<tab-heading>Notes</tab-heading>
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
				<quotes-printout-component class="tab-pane" role="tabpanel" [class.active]="tab===QUOTE_PRINT"[_Quote]="quote" [_Company]="company" [_QuoteLines]="quoteLines" [_Settings]="settings" [_Contact]="contact"></quotes-printout-component>
				<notes-component [@contentState]="notes" class="tab-pane" role="tabpanel" [class.active]="tab===NOTES"></notes-component>
			</div>
		</content-area>
		<hr>
		<button  class="btn btn-block" [routerLink]="['/' + QUOTE_PRINT]">Test Quote</button>
	</div>
`
})
export class HomeComponent implements OnInit {
	public get COMPANIES(): string {
		return 'companies';
	}
	public get NOTES(): string {
		return 'notes';
	}
	public get QUOTE_PRINT(): string {
		return 'quote_print';
	}
	public get QUOTES(): string {
		return 'quotes';
	}
	public get CONTACTS(): string {
		return 'contacts';
	}
	public quotes: string;
	public companies: string;
	public contacts: string;
	public notes: string;
	public activeCompany: boolean;
	public tab: string;
	public companiesData: Company[];
	public selectedCompany: Company = <Company>{};
    constructor(private overlay: Overlay, private vcRef: ViewContainerRef, public modal: Modal, private route: ActivatedRoute, private companyService: CompanyService) {
		overlay.defaultViewContainer = vcRef;
	}

	// public onClick() {
	// 	this.modal.alert()
	// 		.size('lg')
	// 		.showClose(true)
	// 		.title('A simple Alert style modal window')
	// 		.body(`
     //            <quotes-printout-component [_Quote]="quote" [_Company]="company" [_QuoteLines]="quoteLines" [_Settings]=""></quotes-printout-component>
	// 		`)
	// 		.open();
	// }

    public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tab = params['tab'];
			this.companies = 'inactive';
			this.quotes= 'inactive';
			this.contacts = 'inactive';
			this[params['tab']] = 'active';
		});
		this.companyService.getCompanies()
			.subscribe(response => {
				this.companiesData = response;
			});
	}

}

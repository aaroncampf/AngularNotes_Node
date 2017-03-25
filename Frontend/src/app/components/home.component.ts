import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../models/company.model';
import '../styles/main.scss';

@Component({
    selector: 'home-component',
    template: `
		<div class="container">
			<b>AngularBro's Notes - an Angular 2 CRM</b> 
			<input type="search" placeholder="search -WIP-"/>
			<content-area>
				<ul class="nav nav-tabs">
					<li [class.active]="tab === COMPANIES">
						<a class="tab" [routerLink]="['/companies/main']">
							<tab-heading>Companies</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === CONTACTS">
						<a disabled class="tab" [routerLink]="['/contacts/main']">
							<tab-heading>Contacts</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === NOTES">
						<a class="tab" [routerLink]="['/notes/main']">
							<tab-heading>Notes</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === QUOTES">
						<a class="tab" [routerLink]="['/quotes/main']">
							<tab-heading>Quotes</tab-heading>
						</a>
					</li>
				</ul>
				<div class="tab-content">
					<companies-component
					 	class="tab-pane"
					 	role="tabpanel" 
					 	[class.active]="tab===COMPANIES">
					</companies-component>
					<contacts-component 
						class="tab-pane"
						role="tabpanel" 
						[class.active]="tab===CONTACTS">
					</contacts-component>
					<quotes-component 
						class="tab-pane" 
						role="tabpanel"
						[class.active]="tab===QUOTES">
					</quotes-component>
					<!--//todo move quote prints to a modal-->
					<quotes-printout-component 
						class="tab-pane" 
					   	role="tabpanel"
				   		[class.active]="tab===QUOTE_PRINT">
					</quotes-printout-component>
					<notes-component 
					 	class="tab-pane" 
					 	role="tabpanel"
					 	[class.active]="tab===NOTES">
					</notes-component>
				</div>
			</content-area>
			<hr>
			<button class="btn btn-block" [routerLink]="['/' + QUOTE_PRINT, 0]">Test Quote</button>
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
	public activeCompany: Company = <Company>{};
	public companyId: string;
	public tab: string;
	public companySelected: any;
    constructor(private route: ActivatedRoute, private router: Router) {
	}

    public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tab = params['tab'];
			this.companyId = params['id'];
		});
	}
}

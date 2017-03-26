import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {Company} from '../models/company.model';
import {Contact} from '../models/contact.model';
import {SelectionService} from '../services/selection.service';
import '../styles/main.scss';

@Component({
	selector: 'main',
	template: `
		<div class='container'>
			<h4><b>AngularBro's Notes</b><small>- an Angular 2 CRM</small></h4>
			<input type="search" placeholder="search -WIP-"/>
			<div class="col-xs-4">
				<side-panel (currentCompanyChange)="updateSelectedCompany($event)"></side-panel>
			</div>
			<div class="col-xs-offset-1 col-xs-7">
				<div class="row">
					<ul class="nav nav-tabs">
						<li [class.active]="tab === COMPANY">
							<a class="tab" [routerLink]="[COMPANY]">
								<tab-heading>Company</tab-heading>
							</a>
						</li>
						<li [class.active]="tab === CONTACT">
							<a class="tab" [routerLink]="[CONTACT]">
								<tab-heading>Contacts</tab-heading>
							</a>
						</li>
						<li [class.active]="tab === NOTES">
							<a class="tab" [routerLink]="[NOTES]">
								<tab-heading>Notes</tab-heading>
							</a>
						</li>
						<li [class.active]="tab === QUOTES">
							<a class="tab" [routerLink]="[QUOTES]">
								<tab-heading>Quotes</tab-heading>
							</a>
						</li>
					</ul>
				</div>
				<router-outlet></router-outlet>
			</div>
		</div>

	`,
	})

export class MainComponent implements OnInit, OnChanges {
	public CONTACT: string = 'contact';
	public COMPANY: string = 'company';
	public NOTES: string = 'notes';
	public QUOTES: string = 'quotes';
	public tab: string;
	public selectedCompany: Company = <Company>{};
	public selectedContact: Contact = <Contact>{};
	constructor(private router: Router, private selectionService: SelectionService){}

	public ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
	}

	public ngOnInit(): void {
		this.selectionService.sendCompany(this.selectedCompany);

	}
	public updateSelectedContact(contact: Contact): void {

	}
	public updateSelectedCompany(company: Company): void {
		this.selectionService.sendCompany(company);
		console.log('updated', company);
		this.selectedCompany = company;
	}
}

import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../models/company.model';
import {Contact} from '../models/contact.model';
import {DataShareService} from '../services/data-share.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import '../styles/main.scss';

@Component({
	selector: 'main',
	template: `
		<div class='container'>
			<h4><b>AngularBro's Notes</b><small> an Angular 4 CRM</small></h4>
			<input type="search" placeholder="search -WIP-"/>
			<div class="col-sm-4 col-xs-12">
				<side-panel (currentCompanyChange)="updateSelectedCompany($event)" (currentContactChange)="updateSelectedContact($event)"></side-panel>
			</div>
			<div class="col-sm-8 col-xs-12">
				<div class="row">
					<ul class="nav nav-tabs">
						<li [class.active]="tab === COMPANY">
							<a class="tab" [routerLink]="[COMPANY]">
								<tab-heading>Company</tab-heading>
							</a>
						</li>
						<li [class.active]="tab === CONTACT">
							<a class="tab" [routerLink]="[CONTACT]">
								<tab-heading>Contact</tab-heading>
							</a>
						</li>
						<li [class.active]="tab === NOTES">
							<a class="tab" [class.disabled]="!selectedContact" [routerLink]="[NOTES]">
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

export class MainComponent implements OnInit {
	public CONTACT: string = 'contact';
	public COMPANY: string = 'company';
	public NOTES: string = 'notes';
	public QUOTES: string = 'quotes';
	public tab: string;
	public selectedCompany: Company = <Company>{};
	public selectedContact: Contact = <Contact>{};
	constructor(public toastr: ToastsManager,
				public vcr: ViewContainerRef,
				private router: Router,
				private route: ActivatedRoute,
				private dataShareService: DataShareService
	){
		this.toastr.setRootViewContainerRef(vcr);
	}

	public ngOnInit(): void {
		this.route.params.subscribe(params => this.tab = params['tab']);
		this.dataShareService.sendCompany(this.selectedCompany);
	}

	public updateSelectedContact(contact: Contact): void {
		this.dataShareService.sendContact(contact);
		this.selectedContact = contact;
	}

	public updateSelectedCompany(company: Company): void {
		this.dataShareService.sendCompany(company);
		this.selectedCompany = company;
	}
}

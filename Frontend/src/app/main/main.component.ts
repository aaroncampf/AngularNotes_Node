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
		<div *ngIf="!!navVisible">
			<h4><b>AngularBro's Notes</b><small> with Angular</small></h4>
			<input type="search" placeholder="search -WIP-"/>
			<div class="col-sm-4 col-xs-12">
				<side-panel (currentCompanyChange)="updateSelectedCompany($event)" (currentContactChange)="updateSelectedContact($event)"></side-panel>
			</div>
		</div>
		<div [class.col-sm-8]="!!navVisible" class="col-xs-12">
			<div *ngIf="!!navVisible" class="row">
				<ul class="nav nav-tabs">
					<li [class.active]="tab === COMPANY">
						<a class="tab" (click)="routeTo(COMPANY)">
							<tab-heading>Company</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === CONTACT">
						<a class="tab" (click)="routeTo(CONTACT)">
							<tab-heading>Contact</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === NOTES">
						<a class="tab" (click)="routeTo(NOTES)">
							<tab-heading>Notes</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === QUOTES">
						<a class="tab" (click)="routeTo(QUOTES)">
							<tab-heading>Quotes</tab-heading>
						</a>
					</li>
				</ul>
			</div>
			<router-outlet></router-outlet>
		</div>
		<i [routerLink]="['/settings']" class="glyphicon glyphicon-cog pull-right"></i>
	</div>
	`,
	})

export class MainComponent implements OnInit {
	public navVisible: boolean = true;
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
				private dataShareService: DataShareService
	){
		this.toastr.setRootViewContainerRef(vcr);
	}

	public routeTo(tab: string): void {
		if (tab === 'contact' && !this.selectedContact.ID){
			this.toastr.warning('Please chose a contact for their details.');
		} else {
			this.router.navigate(['/' + tab]);
			this.tab = tab;
		}
	}

	public ngOnInit(): void {
		this.dataShareService.navVisible$
			.subscribe(state => this.navVisible = state);
		this.tab = this.COMPANY;
		this.router.navigate([this.COMPANY]);
		this.dataShareService.sendCompany(this.selectedCompany);
	}

	public updateSelectedContact(contact: Contact): void {
		this.tab = this.CONTACT;
		this.dataShareService.sendContact(contact);
		this.selectedContact = contact;
	}

	public updateSelectedCompany(company: Company): void {
		this.dataShareService.sendCompany(company);
		this.selectedCompany = company;
	}
}

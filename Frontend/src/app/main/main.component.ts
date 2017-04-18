import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Router} from '@angular/router';
import {Company} from '../models/company.model';
import {Contact} from '../models/contact.model';
import {DataShareService} from '../global/data-share.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import '../styles/main.scss';

@Component({
	selector: 'main',
	template: `
	<div class='container'>
		<router-outlet></router-outlet>
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
		//this.tab = this.COMPANY;
		//this.router.navigate([this.COMPANY]);
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

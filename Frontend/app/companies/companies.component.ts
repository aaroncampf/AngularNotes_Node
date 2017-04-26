import {Component, OnInit} from '@angular/core';
import {RESTService} from '../global/services/rest.service';
import {Company} from './company.model';
import {UsersServices} from '../users/users.services';
import {TWT} from '../users/user.model';

@Component({
	selector: 'companies-component',
	template: `
		<button class="btn btn-block" (click)="mode === CREATE ? mode = LIST : mode = CREATE">
			<span *ngIf="mode === CREATE">List Companies</span>
			<span *ngIf="mode === LIST">Add A Company</span></button>
		<list-component optionOne="Quotes" optionTwo="Contacts" *ngIf="mode === LIST"
						[listItems]="companies"></list-component>
		<create-company-component *ngIf="mode === CREATE"></create-company-component>
		<quotes-component *ngIf="mode === QUOTES"></quotes-component>
		<contacts-component *ngIf="mode === CONTACTS"></contacts-component>
	`,
})

export class CompaniesComponent implements OnInit {
	public CREATE(): string { return 'create'};
	public LIST(): string { return 'list'};
	public QUOTES(): string { return 'quotes'};
	public CONTACTS(): string { return 'contacts'};
	public mode: string = this.LIST();
	public companies: Company[] = [];
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/companies`;
	private twt: TWT = <TWT>{};
	// public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/companies/${this.currentID}`;

	constructor(private restService: RESTService,
				private userService: UsersServices) {}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath)
			.subscribe((res: Company[]) => {
			console.log('company res',res);
			return this.companies = res
			});
		this.userService.userState$.subscribe((twt: TWT) => {
			this.twt = twt;
			this.mode = this.twt.focus.mode;
		})
	}
}
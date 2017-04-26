import {Component, OnInit} from '@angular/core';
import {RESTService} from '../global/services/rest.service';
import {Company} from './company.model';
import {UsersServices} from '../users/users.services';
import {TWT} from '../users/user.model';

@Component({
	selector: 'companies-component',
	template: `
		<button class="btn btn-block" (click)="toggle('create')">Add New Company</button>
		<list-component optionOne="Quotes" optionTwo="Contacts" *ngIf="mode === 'list'" [listData]="companies"></list-component>
		<create-company-component *ngIf="mode === 'create'"></create-company-component>
		<quotes-component *ngIf="mode === 'quotes'"></quotes-component>
		<contacts-component *ngIf="mode === 'contacts'"></contacts-component>
	`,
})

export class CompaniesComponent implements OnInit {
	public mode: string = 'list';
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
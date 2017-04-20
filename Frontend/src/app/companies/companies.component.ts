import {Component, OnInit} from '@angular/core';
import {RESTService} from '../global/services/rest.service';
import {Router} from '@angular/router';

@Component({
	selector: 'companies-component',
	template: `
	<button class="btn btn-block" (click)="toggle('create')">Add New Company</button>
	<list-component *ngIf="mode === 'list'" (onSelect)="onSelection($event)" [listData]="companies"></list-component>
	<create-company-component *ngIf="mode === 'create'"></create-company-component>
	`,
})

export class CompaniesComponent implements OnInit {
	public mode: string = 'list';
	public companies: {}[] = [{}];
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/companies`;
	public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/companies/${this.currentID}`;

	constructor(private restService: RESTService,
				private router: Router) {}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath)
			.subscribe((response:{}[]) => {
				console.log(response);
				this.companies = response;
		})
	}

	public onSelection(event): void {
		this.currentID = event;

	}

	public toggle(mode): void {
		this.mode = mode;
	}
}
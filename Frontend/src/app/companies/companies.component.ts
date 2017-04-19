import {Component, OnInit} from '@angular/core';
import {ListData, newListData} from '../common/components/list.component';
import {RESTService} from '../common/services/rest.service';

@Component({
	selector: 'companies-component',
	template: `
	<list-component (onSelect)="onSelection($event)" [listData]="companies"></list-component>
	`,
})

export class CompaniesComponent implements OnInit {
	public companies: ListData = <ListData>{};
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/companies`;
	public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/companies/${this.currentID}`;

	constructor(private restService: RESTService) {}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath, {})
			.subscribe((response: any[]) => {
			this.companies = newListData(response, void 0, 'updated at: Stardate, 4321:0532' );
		})
	}

	public onSelection(e): void {
		this.currentID = e;
	}
}
import {Component, OnInit} from '@angular/core';
import {ListData} from '../common/components/list.component';

@Component({
	selector: 'companies-component',
	template: `
	<list-component (onSelect)="onSelection($event)" [listData]="companies"></list-component>
	`,
})

export class CompaniesComponent implements OnInit {
	public companies: ListData = <ListData>{
		headers: ['Companies'],
		items:[
			['companyOne'],
			['companyOne'],
			['companyOne'],
		],
		footer: 'Updated Last 12/34/1234'
	};

	public ngOnInit(): void {}

	public onSelection(e): void {
	console.log(e);
	}
}
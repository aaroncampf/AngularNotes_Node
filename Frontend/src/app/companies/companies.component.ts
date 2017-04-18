import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'companies-component',
	template: `
	<list-component (onSelect)="onSelction($event)" [items]="companies" title="Companies">loading list..</list-component>
	`,
})

export class CompaniesComponent implements OnInit {
	public companies = [{
		content: 'companyOne'
	}, {
		content: 'companyTwo'
	}, {
		content: 'companyThree'
	}];

	public ngOnInit(): void {}

	// public onSelection(e): void {
	// console.log(e);
	// }
}
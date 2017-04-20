import {Component, OnInit} from '@angular/core';
import {RESTService} from '../global/services/rest.service';
import {Quote} from './quote.model';

@Component({
	selector: 'quotes-component',
	template: `
		<list-component (onSelect)="onSelection($event)" [listData]="quotes"></list-component>
	`,
})

export class QuotesComponent implements OnInit {
	public quotes = {};
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Quotes`;
	public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Quotes/${this.currentID}`;

	constructor(private restService: RESTService){}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath, <Quote>{})
			.subscribe((response: any) => {
				this.quotes = response;
			})
	}

	public onSelection(e): void {
		this.currentID = e;
		console.log(e);
	}
}
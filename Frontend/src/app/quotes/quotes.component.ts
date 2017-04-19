import {Component, OnInit} from '@angular/core';
import {ListData, newListData} from '../common/components/list.component';
import {RESTService} from '../common/services/rest.service';

@Component({
	selector: 'quotes-component',
	template: `
		<list-component (onSelect)="onSelection($event)" [listData]="quotes"></list-component>

	`,
})

export class QuotesComponent implements OnInit {
	public quotes: ListData = <ListData>{};
	public currentID: string;
	public getPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Quotes`;
	public setPath: string = `http://angularnotes-angularbros.azurewebsites.net/api/Quotes/${this.currentID}`;

	constructor(private restService: RESTService){}

	public ngOnInit(): void {
		this.restService.callPath('get', this.getPath, {})
			.subscribe((response: any) => {
				this.quotes = newListData(response, void 0, 'Updated at Just Now!')
			})
	}

	public onSelection(e): void {
		this.currentID = e;
		console.log(e);
	}
}
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CRMTypes} from '../models/CRMTypes.type';

export interface ListData {
	title: string;
	footer: string;
	headers: string[];
	items: string[][];
}

export function newListData(responseOrigin: CRMTypes[],  title?: string, footer?: string ):ListData {
	let responseAlpha: string[] = [];
	if(responseOrigin[0]) {
		let response: ListData = <ListData>{
			items: [],
			headers: []
		};
		for (let key of Object.keys(responseOrigin[0])) {
			//todo make id dynamic
			if ('ID' !== key ) {
				response.headers.push(key);
			}
		}
		for (let i = 0, k = responseOrigin.length; i < k; i++) {
			responseAlpha = [];
			for (let value of response.headers) {
				responseAlpha.push(responseOrigin[i][value]);
			}
			response.items.push(responseAlpha);
			response.footer = footer;
			response.title = title;
		}
		return response;
	}
}

@Component({
	selector: 'list-component',
	template: `		
	<table class="table table-bordered table-hover">
		<div class="col-xs-12" *ngIf="listData.title">{{listData.title}}</div>
	<thead>
		<tr>
			<th *ngFor="let headerValue of listData.headers" >{{headerValue}}</th>
		</tr>
	</thead>
	<tbody>
		<tr *ngFor="let item of listData.items">
			<td *ngFor="let value of item" (click)="onClick(value)">{{value}}</td>
		</tr>
	</tbody>
	</table>
	<div class="col-xs-12" *ngIf="listData.footer">{{listData.footer}}</div>
	`
})

export class ListComponent {
	@Output()
	public onSelect: EventEmitter<string> = new EventEmitter<string>();
	@Input()
	public listData: ListData;

	public onClick(content): void {
		this.onSelect.emit(content);
	}
}
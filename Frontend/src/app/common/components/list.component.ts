import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface ListData {
	title: string;
	headers: string[];
	items: string[][];
	footer: string;
}

@Component({
	selector: 'list-component',
	template: `		
	<table class="table table-bordered table-hover">
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
		<tfoot>
			<span *ngIf="listData.footer">{{listData.footer}}</span>
		</tfoot>
	</table>
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
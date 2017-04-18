import {Component, EventEmitter, Input, Output} from '@angular/core';

export interface ListItem {
	prefix: string;
	content: string;
}

export interface ListData {
	title: string;
	items: ListItem[];
	footer: string;
}
@Component({
	selector: 'list-component',
	template: `
	<list-header class="col-xs-12">{{title}}</list-header>
	<list-body class="row">
		<list-item class="col-xs-12" *ngFor="let item of items" (click)="onClick(item.content)">
			<list-prefix class="col-xs-3" *ngIf="item.prefix">{{item.prefix}}</list-prefix>
			<list-content [class.col-xs-9]="">{{item.content}}</list-content>
		</list-item>
	</list-body>
	<list-footer *ngIf="item.footer" class="row">{{item.footer}}</list-footer>
	`
})

export class ListComponent {
	@Output()
	public onSelect: EventEmitter<string> = new EventEmitter<string>();
	@Input()
	public items: ListItem[];
	@Input()
	public title: string;

	public onClick(content): void {
		this.onSelect.emit(content);
	}
}
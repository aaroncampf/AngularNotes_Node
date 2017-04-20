import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'list-component',
	template: `
	<div class="col-xs-12" *ngIf="title">{{title}}</div>
	<table class="table table-bordered table-hover">
		<thead>
			<
		</thead>
		<tbody>
		<tr *ngFor="let item of listData">
				<tr (click)="onClick(item)">
					<td>{{item.Name || item.Title}}</td>
				</tr>
				<tr *ngIf="item.ID === currentSelect.ID">
					<td *ngFor="let key of keys">
						<input-component [label]="key" [(model)]="item[key]" (onBlur)="blurrySave($event, key)"></input-component>
					</td>
				</tr>
		</tbody>
	</table>
	`
})

export class ListComponent implements OnInit, OnChanges {
	@Output()
	public onSelect: EventEmitter<string> = new EventEmitter<string>();
	@Input()
	public listData: any[] = [];
	public keys: any[] = [];
	@Input()
	public title: string;
	@Input()
	public header: string;
	// public currentSelect: Subscription = new Subscription;
	public currentSelect: any = <any>{};
	public ngOnInit(): void {
	}

	public ngOnChanges(): void {
		this.keys = [];
		this.keys.push(Object.keys(this.listData[0]));
		console.log('keys',this.keys);

	}
	public onClick(content): void {
		this.onSelect.emit(content);
		this.currentSelect = content;
	}
}
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {TWT} from '../../users/user.model';
@Component({
	selector: 'side-menu',
	template: `
		<h1>Welcome<small>CRM Demo</small>To Our</h1>
		<button (click)="">Contacts Resources Manager</button>
		<list-component *ngIf="!!twtRef?.listItems" title="Company Select" [listItems]="twtRef.listItems" [selected]="twtRef.selected" [createContext]="twtRef.viewContext" (action)="action.emit($event)" [details]="twtRef.details"
								  		  [controls]="twtRef.listItems.controls">loading items</list-component>
	`
})

export class SideMenuComponent implements OnChanges{
	@Input()
	public UIState: any = <any>{};
	@Output()
	public action: EventEmitter<{}> = new EventEmitter<{}>();

	constructor(){}


}
import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
	selector: 'input-component',
	template: `
	<div class="row">
		<div *ngIf="!!label" class="col-xs-3">
			<strong>{{label}}</strong>
		</div>
		<div *ngIf="!!label" class="col-xs-9">
			<input type="text"  class="form-control" [ngModel]="model" (blur)="modelChange.emit($event.target.value)" [formControl]="control" [placeholder]="placeholder"/>
		</div>
		<div *ngIf="!label" class="col-xs-12">
			 <input type="text" class="form-control" [ngModel]="model" (blur)="modelChange.emit($event.target.value)" [formControl]="control" [placeholder]="placeholder"/>
		</div>
	</div>
	`
})

export class InputComponent {
	@Input()
	public model: string;
	@Input()
	public placeholder: string = '';
	@Input()
	public label: string;
	@Input()
	public control: FormControl = new FormControl;
	@Output()
	public modelChange: EventEmitter<any> = new EventEmitter<any>();
}

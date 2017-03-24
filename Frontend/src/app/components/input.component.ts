import {Component, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
	selector: 'input-component',
	template: `
		<div class="row">
			<div *ngIf="!!label" class="col-xs-2 pull-left">
				<strong>{{label}}</strong>
			</div>
			<div *ngIf="!!label" class="col-xs-10">
				<input type="text" class="form-control" [ngModel]="model" (ngModelChange)="modelChange.emit($event)" [formControl]="control" [placeholder]="placeholder"/>
			</div>
			<div *ngIf="!label" class="col-xs-12">
				<input type="text" class="form-control" [ngModel]="model" (ngModelChange)="modelChange.emit($event)" [formControl]="control" [placeholder]="placeholder"/>
			</div>
		</div>
	`
})

export class InputComponent {
	@Input()
	public placeholder: string = '';
	@Input()
	public label: string;
	@Input()
	public control: FormControl = new FormControl;
	@Input()
	public model: string;
	@Output()
	public modelChange: EventEmitter<string> = new EventEmitter<string>();
}

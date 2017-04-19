import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
	selector: 'input-component',
	template: `
	<div class="row">
		<div *ngIf="!!label" class="col-xs-1">
			<strong>{{label}}</strong>
		</div>
		<div *ngIf="!!label" class="col-xs-11">
			<!--<input [type]="password ? 'password' : 'text'" class="form-control" [(ngModel)]="model" (ngModelChange)="modelChange.emit($event.target.value)" [formControl]="control" [placeholder]="placeholder"/>-->
			<input [type]="password ? 'password' : 'text'" class="form-control" [(ngModel)]="model" (blur)="blurred($event)" [formControl]="control" [placeholder]="placeholder"/>
		</div>
		<div *ngIf="!label" class="col-xs-12">
		 	<input [type]="password ? 'password' : 'text'" class="form-control" [(ngModel)]="model" (blur)="blurred($event)" [formControl]="control" [placeholder]="placeholder"/>
		</div>
	</div>
	`
})

export class InputComponent {
	@Output()
	public onBlur: EventEmitter<string> = new EventEmitter<string>();
	@Input()
	public password: boolean;
	@Input()
	public model: string;
	@Input()
	public placeholder: string = '';
	@Input()
	public label: string;
	@Input()
	public control: FormControl;
	@Output()
	public modelChange: EventEmitter<any> = new EventEmitter<any>();
	public blurred(event): void {
		this.onBlur.emit(event.target.value);
	}
}

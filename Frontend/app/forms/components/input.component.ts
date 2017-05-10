import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
	selector: 'input-component',
	template: `
		<div class="row">
			<div *ngIf="!!label" class="col-xs-3">
				<strong>{{label}}</strong>
			</div>
			<div *ngIf="!!label" class="col-xs-9">
				<!--<input [type]="password ? 'password' : 'text'" class="form-control" [(ngModel)]="model" (ngModelChange)="modelChange.emit($event.target.value)" [formControl]="control" [placeholder]="placeholder"/>-->
				<input [formControl]="control" [type]="password ? 'password' : 'text'" [(ngModel)]="model" (ngModelChange)="modelChange.emit($event)" class="form-control" [formControl]="control"  (blur)="blurred($event)" [placeholder]="placeholder"/>
			</div>
			<div *ngIf="!label" class="col-xs-12">
				<input [formControl]="control" [type]="password ? 'password' : 'text'" [(ngModel)]="model" (ngModelChange)="modelChange.emit($event)" class="form-control"  (blur)="blurred($event)" [placeholder]="placeholder"/>
			{{model}}
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
	public control: FormControl = new FormControl;
	@Output()
	public modelChange: EventEmitter<any> = new EventEmitter<any>();
	public blurred(event): void {
		this.onBlur.emit(event.target.value);
	}

}

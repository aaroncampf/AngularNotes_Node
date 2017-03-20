import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
	selector: 'input-component',
	template: `
	<div class="row">
		<div class="col-xs-3">
			<strong>{{label}}</strong>
		</div>
		<div class="col-xs-9">
			<input type="text" class="form-control" [(ngModel)]="model" [formControl]="control" />
		</div>
	</div>
`
})
export class InputComponent {
	@Input()
	public label: string;
	@Input()
	public model: string;
	@Input()
	public control: FormControl = new FormControl;
	@Output()
	public changeModel: EventEmitter<string> = new EventEmitter<string>();

}

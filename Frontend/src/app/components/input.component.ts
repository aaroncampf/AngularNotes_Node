import {Component, Input, Output, EventEmitter} from '@angular/core';
@Component({
	selector: 'input-component',
	template: `
	<div class="row">
		<div class="col-xs-3">
			<strong>{{label}}</strong>
		</div>
		<div class="col-xs-9">
			<input type="text" [(ngModel)]="model"/>
		</div>
	</div>
`
})
export class InputComponent {
	@Input()
	public label: string;
	@Input()
	public model: string;
	@Output()
	public changeModel: EventEmitter<string> = new EventEmitter<string>();

}

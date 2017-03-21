import {Component} from '@angular/core';
@Component({
	selector: 'quotes-component',
	template: `
	<div class="row">
		<div class="col-xs-12">
			Created:
		</div>	
		<div class="col-xs-12">
			Title: 
		</div>
	</div>
	<div class="row">
		<div class="col-xs-4">
			Something
		</div>
		<div class="col-xs-8">
			Something else
		</div>
	</div>
	<div class="row">
		<input-component class="col-xs-10" label="Description"></input-component>
		<input-component class="col-xs-10" label="Unit"></input-component>
		<input-component class="col-xs-10" label="Cost"></input-component>
		<button class="col-xs-1">-</button>
		<button class="col-xs-1">+</button>
	</div>
	<button  class="btn btn-block" [routerLink]="['/' + QUOTE_PRINT]">Test Quote</button>

`
})

export class QuotesComponent {

}


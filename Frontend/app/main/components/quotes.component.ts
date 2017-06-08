import {Component} from '@angular/core';
@Component({
	selector: 'quotes-component',
	template: `
	<h4>QUOTES</h4>
	<div class="row">
		<quote-header>
			<div class="pull-left">Quote Date</div>
			<button class="btn-danger pull-right">Remove</button>
			<div class="text-center">Quote Title</div>
		</quote-header>
		<quote-body>
			<quote-line class="row">
				<quote-line-description class="col-xs-12">Quote Line Description</quote-line-description>
				<quote-line-qty class="col-xs-4">42</quote-line-qty>
				<quote-line-price class="col-xs-8">$163.00</quote-line-price>
			</quote-line>
		</quote-body>
	</div>
	`
})
export class QuotesComponent {}
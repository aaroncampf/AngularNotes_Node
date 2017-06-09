import {Component} from '@angular/core';
@Component({
	selector: 'quote-component',
	template: `
	<h4>QUOTES</h4>
	<quote-header>
		<div class="row">
				<div class="col-xs-6 pull-left">Quote Date</div>
				<button class="col-xs-6 btn-danger pull-right">Remove Quote</button>
				<div class="col-xs-12 text-center">Quote Title</div>
				<span class=" col-xs-12 pull-right icon icon-printer" [routerLink]="['/Quote-Template/contact_id/quote_id']"></span>
				<hr>
		</div>
	</quote-header>
	<quote-body>
		<div class="row">
			<div class="row">
				<quote-line-description class="col-xs-8">Quote Line Description</quote-line-description>
				<span class="col-xs-4 icon icon-cross"></span>
			</div>
			<div class="row">
				<quote-line-qty class="col-xs-4">42</quote-line-qty>
				<quote-line-price class="col-xs-8">$163.00</quote-line-price>
			</div>
		</div>
	
		<div class="row">
			<div class="row">
				<quote-line-description class="col-xs-8">Quote Line Description</quote-line-description>
				<span class="col-xs-4 icon icon-cross"></span>
			</div>
			<div class="row">
				<quote-line-qty class="col-xs-4">42</quote-line-qty>
				<quote-line-price class="col-xs-8">$163.00</quote-line-price>
			</div>
		</div>
	
		<div class="row">
			<div class="row">
				<quote-line-description class="col-xs-8">Quote Line Description</quote-line-description>
				<span class="col-xs-4 icon icon-cross"></span>
			</div>
			<div class="row">
				<quote-line-qty class="col-xs-4">42</quote-line-qty>
				<quote-line-price class="col-xs-8">$163.00</quote-line-price>
			</div>
		</div>
	</quote-body>
	<quote-footer>
		<div class="row">
			<hr>
			<textarea-component label="Description"></textarea-component>
			<textarea-component label="Unit Qty."></textarea-component>
			<textarea-component label="Cost"></textarea-component>
			<button class="btn btn-lg">Add</button>
		</div>
	</quote-footer>
	`
})
export class QuoteComponent {}
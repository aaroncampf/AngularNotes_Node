import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'create-quote-component',
	template: `
		<h1>Add Quote</h1>
		<hr>
		<quote-header>
			<div class="row">
				<div class="col-xs-12 text-center">Quote Title</div>
				<textarea-component></textarea-component>
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
				<textarea-component label="Desc."></textarea-component>
				<textarea-component label="Unit Qty."></textarea-component>
				<textarea-component label="Cost"></textarea-component>
				<button class="btn btn-lg">Add Line</button>
			</div>
		</quote-footer>
		<hr>
		<button class="btn-success btn-lg pull-right">Save Quote</button>
		<button class="btn-warning btn-lg pull-right">Cancel</button>
	`
})
export class AddQuoteComponent {}
import {Component} from '@angular/core';

@Component({
	selector: 'create-quote-component',
	template: `
		<h1>Add Quote</h1>
		<hr>
		<quote-header>
			<div class="row">
				<div class="col-xs-12 text-center">Quote Title</div>
				<single-line-text-input-component></single-line-text-input-component>
				<hr>
			</div>
		</quote-header>
		<quote-body>
			<ul class="quote-list">
				<li class="quote-list-line">
					<span class="icon icon-cross pull-right"></span>
					<div class="quote-list-line-title-wrapper">
						<strong>Quote Line Description</strong>
					</div>
					<div class="quote-list-line-details">
						QTY
						<single-line-text-input-component [model]="'42'"></single-line-text-input-component>
						$
						<single-line-text-input-component [model]="'163.00'"></single-line-text-input-component>
						<quote-line-options>
							<span class="icon icon-arrow-up"></span>
							<span class="icon icon-arrow-down"></span>
						</quote-line-options>
					</div>
				</li>
				<li class="quote-list-line">
					<span class="icon icon-cross pull-right"></span>
					<div class="quote-list-line-title-wrapper">
						<strong>Quote Line Description</strong>
					</div>
					<div class="quote-list-line-details">
						QTY
						<single-line-text-input-component [model]="'42'"></single-line-text-input-component>
						$
						<single-line-text-input-component [model]="'163.00'"></single-line-text-input-component>
						<quote-line-options>
							<span class="icon icon-arrow-up"></span>
							<span class="icon icon-arrow-down"></span>
						</quote-line-options>
					</div>
				</li>
				<li class="quote-list-line">
					<span class="icon icon-cross pull-right"></span>
					<div class="quote-list-line-title-wrapper">
						<strong>Quote Line Description</strong>
					</div>
					<div class="quote-list-line-details">
						QTY
						<single-line-text-input-component [model]="'42'"></single-line-text-input-component>
						$
						<single-line-text-input-component [model]="'163.00'"></single-line-text-input-component>
						<quote-line-options>
							<span class="icon icon-arrow-up"></span>
							<span class="icon icon-arrow-down"></span>
						</quote-line-options>
					</div>
				</li>
			</ul>
		</quote-body>
		<quote-footer>
			<div class="row">
				<hr>
				<single-line-text-input-component label="Desc."></single-line-text-input-component>
				<single-line-text-input-component label="Unit Qty."></single-line-text-input-component>
				<single-line-text-input-component label="Cost"></single-line-text-input-component>
				<button class="btn btn-lg">Add Line</button>
			</div>
		</quote-footer>
		<hr>
		<button class="btn-warning btn-lg pull-right">Cancel</button>
		<button class="btn-success btn-lg pull-right">Save</button>
	`
})
export class AddQuoteComponent {}
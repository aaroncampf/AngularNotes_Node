import {Component} from '@angular/core';
@Component({
	selector: 'quote-component',
	template: `
		<h5>Quote</h5>
		<quote-header>
			<div class="row">
				<div class="col-xs-6 pull-left">Quote Date</div>
				<button class="btn btn-sm btn-default dropdown-toggle pull-right" type="button" id="quoteDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
					<span class="icon icon-share"></span>
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu quote" aria-labelledby="quoteDropDown">
					<li>Contact 1</li>
					<li>Contact 1</li>
					<li>Contact 1</li>
					<li>Contact 1</li>
				</ul>
				<div class="col-xs-12 text-center">Quote Title</div>
			</div>
			<hr>
		</quote-header>
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
		<quote-footer>
			<div class="row">
				<hr>
				<single-line-text-input-component label="Description"></single-line-text-input-component>
				<single-line-text-input-component label="Unit Qty."></single-line-text-input-component>
				<single-line-text-input-component label="Cost"></single-line-text-input-component>
				<button class="btn btn-lg">Add</button>
			</div>
		</quote-footer>
	`
})
export class QuoteComponent {}
import {Component} from '@angular/core';
@Component({
	selector: 'quotes-component',
	template: `
	<h1>QUOTES</h1>
	<div class="row">
		
	</div>
	<div class="row">
		<div class="col-xs-4">
			<table class="table table-bordered table-hover">
				<thead>
					<tr>
						<th>Quotes</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Quote Items</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="col-xs-8"></div>
		
	</div>
	<div class="row">
		<input-component label="Description"></input-component>
		<input-component label="Unit"></input-component>
		<input-component label="Cost"></input-component>
	</div>
	`
})
export class QuotesComponent {}
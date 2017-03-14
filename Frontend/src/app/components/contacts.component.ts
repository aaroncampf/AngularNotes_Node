import {Component} from '@angular/core';

@Component({
	selector: 'contacts-component',
	template: `
	<div class="row">
		<div class="col-xs-6">
			<input-component label="Name:"></input-component>
			<input-component label="Phone:"></input-component>
			<input-component label="Email:"></input-component>
			<input-component label="Position:"></input-component>
		</div>
		<div class="col-xs-6">
			<table class="table table-bordered table-striped table-hover">
				<tr>
					<th>Date</th>
					<th>Title</th>
				</tr>
			</table>
				<tr>
					<td>3/13/2017</td>
					<td>Title 1</td>
				</tr>
				<tr>
					<td>3/13/2017</td>
					<td>Title 1</td>
				</tr>
				<tr>
					<td>3/13/2017</td>
					<td>Title 1</td>
				</tr>
		</div>
	</div>
	<div class="row">
	Notes
		<div class="row">
			<input-component label="Title"></input-component>
		</div>
		<text-area placeholder="Text"></text-area>
	</div>
`


})
	export class ContactsComponent {}

import {Component} from '@angular/core';
@Component({
	selector: 'contact-component',
	template: `
	<h1>CONTACT</h1>
		<div class="row">
			<div class="col-xs-6">
				<input-component label="Name"></input-component>
				<input-component label="Phone"></input-component>
				<input-component label="Email"></input-component>
				<input-component label="Position"></input-component>
			</div>
			<div class="col-xs-6">
				<list-component [listItems]="notesList"></list-component>
			</div>
		</div>
		<div class="row">
			<div class="card">
				<div class="card-header">Title</div>
				<div class="card-body">Text</div>
			</div>
		</div>
	`
})
export class ContactComponent {}
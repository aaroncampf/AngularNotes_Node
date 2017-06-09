import {Component} from '@angular/core';
@Component({
	selector: 'settings',
	template: `
	<h5>Your Settings:</h5>
	<textarea-component label="Name"></textarea-component>
	<textarea-component label="Email"></textarea-component>
	<textarea-component label="Address"></textarea-component>
	<textarea-component label="WebSite"></textarea-component>
	<textarea-component label="Phone"></textarea-component>
	<textarea-component label="Fax"></textarea-component>
	<button class="btn-success btn-lg pull-right" [routerLink]="['/Home']">OK</button>
	<button class="btn-warning btn-lg pull-right">Cancel</button>
	`
})
export class UserSettingsComponent {}
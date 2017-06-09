import {Component} from '@angular/core';
@Component({
	selector: 'settings',
	template: `
		<h5>Your Settings:</h5>
		<single-line-text-input-component label="Name"></single-line-text-input-component>
		<single-line-text-input-component label="Email"></single-line-text-input-component>
		<single-line-text-input-component label="Address"></single-line-text-input-component>
		<single-line-text-input-component label="WebSite"></single-line-text-input-component>
		<single-line-text-input-component label="Phone"></single-line-text-input-component>
		<single-line-text-input-component label="Fax"></single-line-text-input-component>
		<button class="btn-warning btn-lg pull-right">Cancel</button>
		<button class="btn-success btn-lg pull-right" [routerLink]="['/Home']">Save</button>
	`
})
export class UserSettingsComponent {}
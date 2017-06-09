import {Component} from '@angular/core';
@Component({
	selector: 'company-details-component',
	template: `
		Company Details
		<single-line-text-input-component label="Name"></single-line-text-input-component>
		<single-line-text-input-component label="Address"></single-line-text-input-component>
		<single-line-text-input-component label="City"></single-line-text-input-component>
		<single-line-text-input-component label="Zip"></single-line-text-input-component>
		<single-line-text-input-component label="Phone"></single-line-text-input-component>
		<single-line-text-input-component label="Web"></single-line-text-input-component>
		<single-line-text-input-component label="Misc"></single-line-text-input-component>
		<button type="button" class="btn-success btn-lg pull-right">Save</button>
		<button type="button" class="btn-warning btn-lg pull-right">Cancel</button>
	`
})
export class CompanyDetailsComponent {}
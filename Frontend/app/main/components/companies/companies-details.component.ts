import {Component} from '@angular/core';
@Component({
	selector: 'company-details-component',
	template: `
		Company Details
		<textarea-component label="Name"></textarea-component>
		<textarea-component label="Address"></textarea-component>
		<textarea-component label="City"></textarea-component>
		<textarea-component label="Zip"></textarea-component>
		<textarea-component label="Phone"></textarea-component>
		<textarea-component label="Web"></textarea-component>
		<textarea-component label="Misc"></textarea-component>
		<button type="button" class="btn-success btn-lg pull-right">Save</button>
		<button type="button" class="btn-warning btn-lg pull-right">Cancel</button>
	`
})
export class CompanyDetailsComponent {}
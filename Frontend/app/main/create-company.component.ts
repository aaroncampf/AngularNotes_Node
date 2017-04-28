import {Component} from '@angular/core';
import {Company} from '../companies/company.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmailRegEx} from '../shared/regex/email.regex';
import {RESTService} from '../shared/services/rest.service';
import {ToastsManager} from 'ng2-toastr';

@Component({
	selector: 'create-company-component',
	template: `
	<h4>Create Company</h4>
	<form [formGroup]="companyGroup" (ngSubmit)="onSave(companyGroup.value)">
		<input-component [(model)]="company.name" [control]="nameControl" placeholder="Name"></input-component>
		<input-component [(model)]="company.phone" [control]="phoneControl" placeholder="Phone Number"></input-component>
		<input-component [(model)]="company.email" [control]="emailControl" placeholder="Email"></input-component>
		<input-component [(model)]="company.addressOne" [control]="addressOneControl" placeholder="Address One"></input-component>
		<input-component [(model)]="company.addressTwo" [control]="addressTwoControl" placeholder="Address Two"></input-component>
		<input-component [(model)]="company.city" [control]="cityControl" placeholder="City"></input-component>
		<input-component [(model)]="company.zip" [control]="zipControl" placeholder="Zipcode"></input-component>
		<input-component [(model)]="company.web" [control]="webControl" placeholder="Web"></input-component>
		<input-component [(model)]="company.fax" [control]="faxControl" placeholder="Fax"></input-component>
		<input-component [(model)]="company.misc" [control]="miscControl" placeholder="Misc"></input-component>
		<button class="btn btn-lg" role="button" type="submit">Create</button>
	</form>
	`
})

export class CreateCompanyComponent {
	public company: Company = <Company>{};
	public path: string = `http://angularnotes-angularbros.azurewebsites.net/api/companies`;
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public phoneControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public emailControl: FormControl = new FormControl('', [Validators.required, Validators.pattern(EmailRegEx)]);
	public addressOneControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public addressTwoControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public cityControl: FormControl = new FormControl('', [Validators.maxLength(255)]);
	public zipControl: FormControl = new FormControl('', [Validators.maxLength(24)]);
	public webControl: FormControl = new FormControl('', []);
	public faxControl: FormControl = new FormControl('', [Validators.maxLength(24)]);
	public miscControl: FormControl = new FormControl('', []);
	public companyGroup: FormGroup = new FormGroup({
		name: this.nameControl,
		phone: this.phoneControl,
		email: this.emailControl,
		addressOne: this.addressOneControl,
		addressTwo: this.addressTwoControl,
		city: this.cityControl,
		zip: this.zipControl,
		web: this.webControl,
		fax: this.faxControl,
		misc: this.miscControl
	});
	constructor(private restService: RESTService,
				public toastr: ToastsManager){}

	public onSave(company): void {
		console.log(JSON.stringify(company));
		// this.restService.callPath('post', this.path, company).subscribe((response:Company) => {
		this.restService.createPath(<Company>company, this.path).subscribe((response:Company) => {
			this.toastr.success(response.name + ' has been created!');
		}, error => this.toastr.error( 'Sorry, there was a problem with company creation.'))
	}
}
import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {CRMService} from '../services/crm.service';
import {Company} from '../models/company.model';
import {ToastsManager} from 'ng2-toastr';
@Component({
	selector: 'create-company-component',
	template: `
	<h1>Add Company</h1>
	<form [formGroup]="addForm">
		<input-component label="Name" [(model)]="newCompany.name"  [control]="nameControl"></input-component>
		<input-component label="Address" [(model)]="newCompany.addressOne" [control]="addressOneControl"></input-component>
		<input-component label="City" [(model)]="newCompany.city" [control]="cityControl"></input-component>
		<input-component label="Zip" [(model)]="newCompany.zip" [control]="zipControl"></input-component>
		<input-component label="Phone" [(model)]="newCompany.phone" [control]="phoneControl"></input-component>
		<input-component label="Fax" [(model)]="newCompany.fax" [control]="faxControl"></input-component>
		<input-component label="Web Site" [(model)]="newCompany.web" [control]="webControl"></input-component>
		<button type="button" class="btn pull-right" (click)="onSubmit(addForm.value)">Submit</button>
		<button type="reset" class="btn-warning pull-right">Clear</button>
	</form>
	`
})
export class AddCompanyComponent {
	public newCompany: Company = <Company>{};
	public nameControl: FormControl = new FormControl('', []);
	public addressOneControl: FormControl = new FormControl('', []);
	public addressTwoControl: FormControl = new FormControl('', []);
	public cityControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public webControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public faxControl: FormControl = new FormControl('', []);
	public addForm: FormGroup = new FormGroup({
		name: this.nameControl,
		addressOne: this.addressOneControl,
		addressTwo: this.addressTwoControl,
		city: this.cityControl,
		zip: this.zipControl,
		phone: this.phoneControl,
		web: this.webControl,
		misc: this.miscControl,
		fax: this.faxControl,
	});
	constructor(
		public toastr: ToastsManager,
		private router: Router,
		private crmService: CRMService
	){}

	public onSubmit(values): void {
		this.crmService.newCompany({props: values}).then(res => {
			this.toastr.success(res.name + ' added!');
			this.router.navigate(['/Companies']);
		}).catch(err => {
			this.toastr.error('Oh No! Error with adding company.');
			console.log(err)
		});
	}
}
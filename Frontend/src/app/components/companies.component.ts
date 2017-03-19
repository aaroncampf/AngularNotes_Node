import {Component} from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Company} from '../models/company.model';
@Component({
	selector: 'companies-component',
	template: `
		<div class="row">
			<div class="col-xs-12">Companies:</div>
			<div class="col-xs-12">
				<select [(ngModel)]="selectedCompany" class="form-control">
					<option *ngFor="let company of companies" [ngValue]="company">{{company.Name}}</option>
				</select>
			</div>
		</div>
		<form [formGroup]="companiesGroup" (ngSubmit)="companiesSave()">
			<input-component label="Name" [(model)]="selectedCompany.Name" [control]="nameControl"></input-component>
			<input-component label="Address" [(model)]="selectedCompany.Address" [control]="addressControl"></input-component>
			<input-component label="City" [(model)]="selectedCompany.City" [control]="cityControl"></input-component>
			<input-component label="ZipCode" [(model)]="selectedCompany.Zip" [control]="zipControl"></input-component>
			<input-component label="Phone" [(model)]="selectedCompany.Phone" [control]="phoneControl"></input-component>
			<div class="row">
				Misc: <textarea class="form-control"></textarea>
			</div>
			<div class="row">
				 <table class="table table-bordered table-hover">
					<thead>
						<tr>
							<th>Contacts</th>
						</tr>	
					</thead>
					<tbody>
						<tr>
							<td>Contact 2</td> 	
						</tr>	
						<tr>
							<td>Contact 1</td> 	
						</tr>
						<tr>
							<td>Contact 3</td> 	
						</tr>	
					</tbody>
				</table>
			</div>
			<button class="btn btn-lg" type="submit">Save</button>
		</form>
`
})

export class CompaniesComponent {
	public companyForm: any;
	public selectedCompany = <Company>{};
	public nameControl: FormControl = new FormControl('', [Validators.required]);
	public addressControl: FormControl = new FormControl('', []);
	public cityControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public companiesGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		addressControl: this.addressControl,
		cityControl: this.cityControl,
		zipControl: this.zipControl,
	});

	constructor(){};

	public companiesSave(): void {

	}

}
import {Component, OnInit} from '@angular/core';
import {CompanyService} from '../services/companies.service';
import {Company} from '../models/company.model';
import {FormControl, Validators, FormGroup} from '@angular/forms';

@Component({
	selector: 'contacts-component',
	template: `
	<div class="row">
		<div class="col-xs-6">
			<input-component label="Name:" [control]="nameControl"></input-component>
			<input-component label="Phone:" [control]="phoneControl"></input-component>
			<input-component label="Email:" [control]="emailControl"></input-component>
			<input-component label="Position:" [control]="positionControl"></input-component>
		</div>
		<div class="col-xs-6">
			<table class="table table-bordered table-striped table-hover">
				<tr>
					<th>Date</th>
					<th>Title</th>
				</tr>
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
			</table>
		</div>
	</div>
	<div class="row">
	Notes
		<div class="row">
			<input-component label="Title" [control]="titleControl"></input-component>
		</div>
		<textarea class="form-control"></textarea>
	</div>
`


})

export class ContactsComponent implements OnInit{
	public CompaniesData: Company[];
	public nameControl: FormControl = new FormControl('', []);
	public emailControl: FormControl = new FormControl('', []);
	public titleControl: FormControl = new FormControl('', []);
	public positionControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public contactsGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		emailControl: this.emailControl,
		positionControl: this.positionControl,
		phoneControl: this.phoneControl,
		titleControl: this.titleControl
	});
	constructor(private companiesService: CompanyService) {}

	public ngOnInit(): void {
		this.companiesService.getCompanies()
			.subscribe(response => this.CompaniesData = response)
	}


}

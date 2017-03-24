import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {Router} from '@angular/router';
import {slideTransitions} from '../animations/transitions.animation';

@Component({
	selector: 'create-company-component',
	template: `
		<div class="container" [@contentState]="animateState">
			<button type="button" class="btn-danger pull-left" (click)="animateNavigation('/companies/main')">Cancel</button>
			<h4>Add A Company To Your List</h4>
			<form [formGroup]="companiesGroup" (ngSubmit)="companySave()">
				<input-component label="Name" [(model)]="company.Name" [control]="nameControl"></input-component>
				<input-component label="Phone" [(model)]="company.Phone" [control]="phoneControl"></input-component>
				<input-component label="Address" [(model)]="company.Address" [control]="addressControl"></input-component>
				<input-component label="City" [(model)]="company.City" [control]="cityControl"></input-component>
				<input-component label="ZipCode" [(model)]="company.Zip" [control]="zipControl"></input-component>
				<div class="row">
					<span class="col-lg-3">Misc:</span>
					<textarea [(ngModel)]="company.Misc" class="form-control col-xs-9" [formControl]="miscControl"></textarea>
				</div>
				<button type="submit" class="btn btn-large pull-right">Save</button>
			</form>
		</div>
	`,
	animations: [slideTransitions()],
	host: {'[@contentState]': 'animateState'},
})

export class CreateCompanyComponent {
	public animateState: string = 'in';
	public company: Company = <Company>{};
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public addressControl: FormControl = new FormControl('', []);
	public cityControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public companiesGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		addressControl: this.addressControl,
		miscControl: this.miscControl,
		cityControl: this.cityControl,
		zipControl: this.zipControl,
		phoneControl: this.phoneControl,
	});

	constructor(private companyService: CompanyService, private router: Router){}

	public companySave(): void {
		this.companyService.saveCompany(this.company).subscribe(company => {
			this.animateState = 'out';
			this.router.navigate(['/companies', company.ID]);
		})
	}

	public animateNavigation(path: string): void {
		this.animateState = 'out';
		setTimeout(() => {
			this.router.navigate([path]);
		}, 500)
	}
}
import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../models/company.model';
import {CompanyService} from '../services/companies.service';
import {slideTransitions} from '../animations/transitions.animation';

@Component({
	selector: 'edit-company-component',
	animations: [slideTransitions()],
	host: {'[@contentState]': ''},
	template: `
		<div class="container" [@contentState]="animateState">
			<div class="navbar navbar-fixed-top">
				<button type="reset" class="btn-danger pull-left" (click)="animateNavigation('/companies/' + company.ID)">Cancel</button>
			</div>
			<h4>Edit Company</h4>
			<form [formGroup]="companyGroup" (ngSubmit)="saveCompany()">
				<input-component label="Name" [(model)]="company.Name" [control]="nameControl"></input-component>
				<input-component label="Phone" [(model)]="company.Phone" [control]="phoneControl"></input-component>
				<input-component label="Address" [(model)]="company.Address" [control]="addressControl"></input-component>
				<input-component label="City" [(model)]="company.City" [control]="cityControl"></input-component>
				<input-component label="Zip" [(model)]="company.Zip" [control]="zipControl"></input-component>
				<button type="submit" class="btn btn-large pull-right">Save</button>
			</form>
		</div>
	`,
})

export class EditCompanyComponent implements OnInit{
	public animateState: string = 'in';
	public companyId: string;
	public company: Company = <Company>{};
	public nameControl: FormControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
	public cityControl: FormControl = new FormControl('', []);
	public addressControl: FormControl = new FormControl('', []);
	public zipControl: FormControl = new FormControl('', []);
	public phoneControl: FormControl = new FormControl('', []);
	public miscControl: FormControl = new FormControl('', []);
	public companyGroup: FormGroup = new FormGroup({
		nameControl: this.nameControl,
		addressControl: this.addressControl,
		miscControl: this.miscControl,
		cityControl: this.cityControl,
		phoneControl: this.phoneControl,
		zipControl: this.zipControl,
	});

	constructor(private companyService: CompanyService, private router: Router, private route: ActivatedRoute){}

	public saveCompany(): void {
		console.log('saving', this.company);
		this.companyService.saveCompany(this.company, +this.company.ID).subscribe(response => {
			console.log('company was saved: ', response);
			this.animateNavigation('/companies' + this.company.ID);
		});
	}

	public ngOnInit() {
		this.route.params.subscribe(params => {
			this.companyService.getCompany(params['id']).subscribe(company => {
				console.log('retrieved: ', company);
				this.company = company;
			});
		});
	}

	public animateNavigation(path: string): void {
		this.animateState = 'out';
		setTimeout(() => {
			this.router.navigate([path]);
		}, 500)
	}

}
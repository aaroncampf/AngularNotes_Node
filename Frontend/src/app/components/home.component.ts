import {Component, OnInit} from '@angular/core';
import '../styles/main.scss';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../services/company.service';

@Component({
	selector: 'home-component',
	template: `
	<div class="container">
	 	<div class="navbar navbar-default navbar-fixed-top" role="navigation">
			<ul class="col-xs-12">
				<li class="pull-left">
				 	<button (click)="sideMenuClick()" [class.active]="sideMenu" class="btn btn-default" type="button">Menu</button>
			 	</li>
				<li class="pull-right">
					<div class="dropdown">
						<button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Options<span class="caret"></span></button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
							<div *ngIf="tab===CONTACTS">
								<li>
									<a href="#">Download</a>
								</li>
							</div>
							<div *ngIf="tab===QUOTES">
								<li>
									<a href="#">Add</a>
								</li>
								<li>
									<a href="#">Download</a>
								</li>
								<li>
								<a href="#">Remove</a>
								</li>
							</div>
						</ul>
					</div>
				</li>
			</ul>
			<input  type="search" placeholder="search" />
		</div>
		<content-area (click)="sideMenu = false">
			<ul class="nav nav-tabs nav-tabs-justified nav-pills">
				 <li ngClass="active:tab === CONTACTS">
					 <a class="tab" [routerLink]="['/contacts']">
						<tab-heading>Contacts</tab-heading>
					</a>
				 </li>
				 <li ngClass="active:tab=== QUOTES">
					 <a [routerLink]="['/quotes']">
						 <tab-heading>Quotes</tab-heading>
					</a>
				 </li>
			</ul>
			<div class="tab-content">
				<contacts-component class="tab-pane" role="tabpanel" [class.active]="tab===CONTACTS"></contacts-component>
				<quotes-component class="tab-pane" role="tabpanel" [class.active]="tab===QUOTES"></quotes-component>
			</div>
		</content-area>
		<div [class.active]="sideMenu" class="side-menu">
			<div class="row">
				<div class="col-xs-12">Companies:</div>
				<div class="col-xs-12">
					<select class="form-control">
						<option>Company 1</option>
						<option>Company 1</option>
						<option>Add Company...</option>
					</select>
				</div>
			</div> 
			<input-component label="Name"></input-component>
			<input-component label="Address"></input-component>
			<input-component label="City"></input-component>
			<input-component label="ZipCode"></input-component>
			<input-component label="Phone"></input-component>
			<div class="row">
				Misc: <textarea></textarea>
			</div>
			<div class="row">
				 <table class="table table-bordered table-hover">
					<tr>
						<th>Contact</th>
					</tr>	
					<tr>
						<td>Contact 1</td> 	
					</tr>
					<tr>
						<td>Contact 2</td> 	
					</tr>	
					<tr>
						<td>Contact 3</td> 	
					</tr>	
				</table>
			</div>
		</div>
	</div>
`
})
export class HomeComponent implements OnInit {
	public get QUOTES(): string {
		return 'quotes';
	}
	public get CONTACTS(): string {
		return 'contacts';
	}
	public tab: string;
	public sideMenu: boolean = false;

	constructor(private route: ActivatedRoute, private companies:CompanyService) {
	}

	public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tab = params['tab'];
		})
		this.companies.getCompanies().subscribe(res => console.log('res', res));
	}

	public sideMenuClick(): void {
		this.sideMenu = !this.sideMenu;
	}


}

import {Component, ViewContainerRef, OnInit} from '@angular/core';
import '../styles/main.scss';
import {ActivatedRoute} from '@angular/router';
import {ContactsComponent} from '../components/contacts.component';
import {QuotesComponent} from '../components/quotes.component';

@Component({
	selector: 'home-component',
	template: `
	<div class="container">
	 	<div class="navbar navbar-default navbar-fixed-top" role="navigation">
			<ul>
				<li>
					<button (click)="sideMenuClick()" class="btn">Menu</button>
				</li>
				<li>
					<input type="search" />
				</li>
				<li>
					<button class="btn">Options</button>
				</li>
			</ul>
		</div>
		<ul class="nav nav-tabs">
			 <li ngClass="active:tab === CONTACTS">
				 <a class="tab" [routerLink]="['/contacts']">
					<tab-heading>Contacts</tab-heading>
				</a>
			 </li>
			 <li ngClass="active:tab === QUOTES">
				 <a [routerLink]="['/quotes']">
					 <tab-heading>Quotes</tab-heading>
				</a>
			 </li>
		</ul>
		<div *ngIf="sideMenu" class="row">
		
		<div class="row">
		Companies:
				<select class="form-control">
					<option>Company 1</option>
					<option>Company 1</option>
					<option>Company 1</option>
				</select>
		
		</div> 
			<input-component label="Name"></input-component>
			<input-component label="Address"></input-component>
			<input-component label="City"></input-component>
			<input-component label="ZipCode"></input-component>
			<input-component label="Phone"></input-component>
		<div class="row">
			Misc: <text-area></text-area>
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
		
		<div class="tab-content">
			<contacts-component class="tab-pane" role="tabpanel" [class.active]="tab===CONTACTS"></contacts-component>
			<quotes-component class="tab-pane" role="tabpanel" [class.active]="tab===QUOTES"></quotes-component>
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
	public sideMenu: boolean = true;

	constructor(private route: ActivatedRoute) {

	}

	public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tab = params['tab'];
		})
	}

	public sideMenuClick(): void {
		this.sideMenu = !this.sideMenu;
		console.log(this.sideMenu);
	}


}

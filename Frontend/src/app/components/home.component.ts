import {Component, OnInit, OnChanges} from '@angular/core';
import '../styles/main.scss';
import {ActivatedRoute} from '@angular/router';
import {CompanyService} from '../services/company.service';
import {Company} from '../models/company.model';
//Testing
import {Quote} from "../models/quote.model";
import {QuoteLine} from "../models/quotelines.model";




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
			<!--<form>-->
				<div class="row">
					<div class="col-xs-12">Companies:</div>
					<div class="col-xs-12">
						<select [(ngModel)]="selectedCompany" class="form-control">
							<option *ngFor="let company of companies" [ngValue]="company">{{company.Name}}</option>
						</select>
					</div>
				</div> 
				<input-component label="name" [(model)]="selectedCompany.Name"></input-component>
				<input-component label="Address" [(model)]="selectedCompany.Address"></input-component>
				<input-component label="City" [(model)]="selectedCompany.City"></input-component>
				<input-component label="ZipCode" [(model)]="selectedCompany.Zip"></input-component>
				<input-component label="Phone" [(model)]="selectedCompany.Phone"></input-component>
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
			<!--</form>-->
			
			<br><br><br><br><br>
			<button (click)="OpenTestQuote" />
		</div>
	</div>
`
})
export class HomeComponent implements OnInit, OnChanges {
    public get QUOTES(): string {
        return 'quotes';
    }

    public get CONTACTS(): string {
        return 'contacts';
    }

    public tab: string;
    public sideMenu: boolean = false;
    public companies: Company[];
    public selectedCompany: Company = <Company>{};

    constructor(private route: ActivatedRoute, private companyService: CompanyService) {
    }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.tab = params['tab'];
        });
        this.companyService.getCompanies().subscribe(response => {
            console.log(response);
            this.companies = response;
        });
    }

    public ngOnChanges(): void {
        console.log('selected', this.selectedCompany);
    }

    public sideMenuClick(): void {
        this.sideMenu = !this.sideMenu;
    }

    public OpenTestQuote(): void {
        let _Quote: Quote = {
            ID : 1,
            Date : null,
            Name : "Hello World",
            Company : null,
            Lines: null
        };
        let _Company: Company = {
            ID: 1,
            Name: "",
            Address: "",
            City: "",
            Zip: "",
            Phone: "",
            Misc: "",
            Contacts:null,
            Quotes:null
        };

        let _QuoteLines: QuoteLine[] = [];
        _QuoteLines.push({
            ID: 1,
            Display: 1,
            UNIT: "",
            COST: "",
            DESC: "",
            IsCentered: false,
            Quote: null
        });
    }
}

import {Component, OnInit, trigger, state, style, transition, animate, ViewContainerRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Company} from '../models/company.model';
import '../styles/main.scss';
import {Overlay} from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

@Component({
    selector: 'home-component',
	animations: [
		trigger('contentState', [
			state('active', style({
				opacity: '1',
				transform: 'translateY(0%)',
			})),
			state('inactive', style({
				opacity: '0',
				transform: 'translateY(100%)',
			})),
			transition('inactive => active', animate('400ms, ease-out')),
			//TODO figure out how to outro
			// transition('active => inactive', animate('1000ms, ease-in'))
		])
	],
    template: `
		<div class="container">
			<b>AngularBro's Notes</b> 
			<span class="pull-right">{{activeCompany.Name || 'No Company Is Selected'}}</span>
			<input type="search" placeholder="search"/>
			<content-area>
				<ul class="nav nav-tabs">
					<li [class.active]="tab === COMPANIES">
						<a class="tab" [routerLink]="['/companies']">
							<tab-heading>Companies</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === CONTACTS">
						<a class="tab" [routerLink]="['/contacts']">
							<tab-heading>Contacts</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === NOTES">
						<a class="tab" [routerLink]="['/notes']">
							<tab-heading>Notes</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === QUOTES">
						<a [routerLink]="['/quotes']">
							<tab-heading>Quotes</tab-heading>
						</a>
					</li>
				</ul>
				<div class="tab-content">
					<companies-component 
						[@contentState]="companies"
					 	(currentCompany)="setCompany($event)" 
					 	class="tab-pane"
					 	role="tabpanel" 
					 	[class.active]="tab===COMPANIES">
					</companies-component>
					<contacts-component 
						[@contentState]="contacts" 
						[currentCompany]="activeCompany" 
						class="tab-pane"
						role="tabpanel" 
						[class.active]="tab===CONTACTS">
					</contacts-component>
					<quotes-component 
						[@contentState]="quotes"
						class="tab-pane" 
						role="tabpanel"
						[class.active]="tab===QUOTES">
					</quotes-component>
					<!--//todo move quote prints to a modal-->
					<quotes-printout-component 
						class="tab-pane" 
					   	role="tabpanel"
				   		[class.active]="tab===QUOTE_PRINT">
					</quotes-printout-component>
					<notes-component 
						[@contentState]="notes" 
					 	class="tab-pane" 
					 	role="tabpanel"
					 	[class.active]="tab===NOTES">
					</notes-component>
				</div>
			</content-area>
			<hr>
			<button class="btn btn-block" [routerLink]="['/' + QUOTE_PRINT]">Test Quote</button>
			<button class="btn btn-block" (click)="modalPop()">Test modal</button>
			{{testModel}}
		</div>
	`
})
export class HomeComponent implements OnInit {
	public get COMPANIES(): string {
		return 'companies';
	}
	public get NOTES(): string {
		return 'notes';
	}
	public get QUOTE_PRINT(): string {
		return 'quote_print';
	}
	public get QUOTES(): string {
		return 'quotes';
	}
	public get CONTACTS(): string {
		return 'contacts';
	}
	public activeCompany: Company = <Company>{};
	public testModel: string = 'Please show me in the modal';
	public quotes: string;
	public companies: string;
	public contacts: string;
	public notes: string;
	public tab: string;
	public companySelected: any;
    constructor(private overlay: Overlay, private vcRef: ViewContainerRef, public modal: Modal, private route: ActivatedRoute) {
		overlay.defaultViewContainer = vcRef;
	}

	public modalPop() {
		this.modal.prompt()
			.size('lg')
			.showClose(true)
			.title('Rx Leetness')
			.body(`
			<h1>Modal!</h1>
			<input-component label="Test" [(model)]="testModel"></input-component>
			`)
			.open();
	}

    public ngOnInit(): void {
		this.route.params.subscribe(params => {
			this.tab = params['tab'];
			this.companies = 'inactive';
			this.quotes= 'inactive';
			this.contacts = 'inactive';
			this[params['tab']] = 'active';
		});
	}

	public setCompany(event): void {
    	this.activeCompany = event;
	}

}

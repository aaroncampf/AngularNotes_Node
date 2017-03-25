import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../models/company.model';
import '../styles/main.scss';
import {Overlay} from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import {liftOffTransitions} from '../animations/transitions.animation';

@Component({
    selector: 'home-component',
	animations: [liftOffTransitions()],
    template: `
		<div class="container">
			<b>AngularBro's Notes - an Angular 2 CRM</b> 
			<input type="search" placeholder="search -WIP-"/>
			<content-area>
				<ul class="nav nav-tabs">
					<li [class.active]="tab === COMPANIES">
						<a class="tab" (click)="navigateTab(COMPANIES)">
							<tab-heading>Companies</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === CONTACTS">
						<a disabled class="tab" (click)="navigateTab(CONTACTS)">
							<tab-heading>Contacts</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === NOTES">
						<a class="tab" (click)="navigateTab(NOTES)">
							<tab-heading>Notes</tab-heading>
						</a>
					</li>
					<li [class.active]="tab === QUOTES">
						<a class="tab" (click)="navigateTab(QUOTES)">
							<tab-heading>Quotes</tab-heading>
						</a>
					</li>
				</ul>
				<div class="tab-content">
					<companies-component
						(triggerStateChange)="setTransitionStates($event)"
						[@contentState]="companiesState"
					 	class="tab-pane"
					 	role="tabpanel" 
					 	[class.active]="tab===COMPANIES">
					</companies-component>
					<contacts-component 
						(triggerStateChange)="setTransitionStates($event)"
						[@contentState]="contactsState" 
						[currentCompany]="activeCompany" 
						class="tab-pane"
						role="tabpanel" 
						[class.active]="tab===CONTACTS">
					</contacts-component>
					<quotes-component 
						[@contentState]="quotesState"
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
						[@contentState]="notesState" 
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
	public companyId: string;
	public testModel: string = 'Please show me in the modal';
	public quotesState: string;
	public companiesState: string;
	public contactsState: string;
	public notesState: string;
	public tab: string;
	public companySelected: any;
    constructor(private overlay: Overlay, private vcRef: ViewContainerRef, public modal: Modal, private route: ActivatedRoute, private router: Router) {
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
			this.companyId = params['id'];
			this.setTransitionStates(params['tab']);
		});
	}

	public setTransitionStates(activatingTab: string){
		this.companiesState = 'out';
		this.quotesState = 'out';
		this.contactsState = 'out';
		this.notesState = 'out';
		if (activatingTab !== '0'){
			this[activatingTab + 'State'] = 'in';
		}
	}
	//
	// public setCompany(event): void {
    	// this.activeCompany = event;
	// }

	public navigateTab(path: string) {
    	this.setTransitionStates('0');
    	setTimeout(() => {
    		this.router.navigate([path, this.companyId])
		}, 500)

	}
}

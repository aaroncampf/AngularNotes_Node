import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {CRMStore, CRMStoreService} from '../services/crm-store.service';

interface BuilderState {
	companySelected: boolean;
	quoteSelected: boolean;
	contactSelected: boolean;
	viewCompanyList: boolean;
	viewContactList: boolean;
	viewQuoteCreate: boolean;
	viewTemplate: boolean;
}

const INIT_BUILDER_STATE = {
	companySelected: false,
	quoteSelected: false,
	contactSelected: false,
	viewCompanyList: true,
	viewContactList: false,
	viewQuoteCreate: false,
	viewTemplate: false
};

@Component({
	selector: 'quote-builder-component',
	template: `
	<ul class="builder-progress-bar">
		<li>
			<div class="progress-title" [class.success]="(builderState$|async).companySelected">
				Select Company
			</div>
			<div [class.success]="(builderState$|async).companySelected" class="check-mark">✔</div>
		</li>
		<li>
			<div class="progress-title" [class.success]="(builderState$|async).quoteSelected">
				Create Quote
			</div>
			<div [class.success]="(builderState$|async).quoteSelected" class="check-mark">✔</div>
		</li>
		<li>
			<div class="progress-title" [class.success]="(builderState$|async).contactSelected">
				Choose Contact
			</div>
			<div [class.success]="(builderState$|async).contactSelected" class="check-mark">✔</div>
		</li>
	</ul>
	<div class="content">
		<div class="content-item company-select" [class.collapse]="!(builderState$ | async).viewCompanyList">
			<h4 class="text-center">Create Quote For Which Company?</h4>
			<companies-component (action)="actionHandler($event)"></companies-component>
		</div>
		<div class="content-item quorte-create" [class.collapse]="!(builderState$ | async).viewQuoteCreate">
			<create-quote-component (action)="actionHandler($event)"></create-quote-component>
		</div>
		<div class="content-item contact-select" [class.collapse]="!(builderState$ | async).viewContactList">
			<contacts-component (action)="actionHandler($event)"></contacts-component>
		</div>
		<div class="content-item" [class.collapse]="!(builderState$ | async).viewTemplate">
			<quote-template (action)="actionHandler($event)"></quote-template>
		</div>
	</div>
	`
})
export class QuoteBuilderComponent {

	private builderStateSource: BehaviorSubject<BuilderState> = new BehaviorSubject(INIT_BUILDER_STATE);
	public builderState$: Observable<BuilderState> = this.builderStateSource.asObservable();

	constructor(
		private crmStore: CRMStoreService
	){}
	public actionHandler(event): void {
		const state = this.builderStateSource.value;
		const newState = this.builderStateReducer(state, event);
		this.builderStateSource.next(newState);
		this.crmStore.crmStoreDispatcher(event);
	}
	public builderStateReducer(state: BuilderState, action): BuilderState {
		const {type, payload} = action;
		switch(type){
			case'COMPANY_SELECTED':
				return Object.assign({}, state, {
					companySelected: true,
					viewCompanyList: false,
					viewQuoteCreate: true,
				});
			case'COMPANY_UN_SELECT':
				return Object.assign({}, state, {companySelected: false});
			case'QUOTE_SELECTED':
				return Object.assign({}, state, {
					quoteSelected: true,
					viewQuoteCreate: false,
					viewContactList: true
				});
			case'QUOTE_UN_SELECT':
				return Object.assign({}, state, {
					quoteSelected: false
				});
			case'CONTACT_SELECTED':
				return Object.assign({}, state, {
					contactSelected: true,
					viewContactList: false,
					viewTemplate: true
				});
			case'CONTACT_UN_SELECT':
				return Object.assign({}, state, {
					contactSelected: false
				});
			default:
				return state;
		}
	}
}
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CRMStoreService} from '../../services/crm-store.service';

@Component({
	selector: 'quote-template',
	template: `
		<template-wrapper>
			<template-header>
				<template-sender-info>
					<h5>From: </h5>
					<user-name>User Name</user-name>
					<biz-address>1234 Biz Address</biz-address>
					<biz-address>City, State 123455</biz-address>
					<biz-contact-details>
						<biz-phone>Phone: 555-213-5555</biz-phone>
						<biz-email>Email: email@example.com</biz-email>
					</biz-contact-details>
				</template-sender-info>	
				<template-contact-info>
					<h5>To: </h5>
					<company-name>Company Name</company-name>
					<contact-name>Contact Name</contact-name>
					<contact-position>Contact Position</contact-position>
					<contact-email>Contact Email</contact-email>
				</template-contact-info>
			</template-header>
			<template-body>
				<h3 class="text-center">Biz Name</h3>
				<quote-details>
					<div>Quote Title</div>
					<div>Made For: Contact Name</div>
					<div>On: 12/12/1200</div>
				</quote-details>
				<quote-header>
					<h5>Quote List:</h5>
				</quote-header>
				<quote-list>
					<quote-line>
						<quote-description>Quote-Line Description</quote-description>
						<quote-line-details>
							<quote-line-unit>
								Units: 42
							</quote-line-unit>
							<quote-line-cost>
								Cost: $163.00
							</quote-line-cost>
						</quote-line-details>
					</quote-line>
				<quote-line>
						<quote-description>Quote-Line Description</quote-description>
						<quote-line-details>
							<quote-line-unit>
								Units: 42
							</quote-line-unit>
							<quote-line-cost>
								Cost: $163.00
							</quote-line-cost>
						</quote-line-details>
					</quote-line>
				<quote-line>
						<quote-description>Quote-Line Description</quote-description>
						<quote-line-details>
							<quote-line-unit>
								Units: 42
							</quote-line-unit>
							<quote-line-cost>
								Cost: $163.00
							</quote-line-cost>
						</quote-line-details>
					</quote-line>
				</quote-list>
			</template-body>
			<tempplate-footer>
				<hr>
				<call-to-actions>
					<button class="btn">Send</button>
					<button class="btn">Edit</button>
					<button class="btn">Cancel</button>
				</call-to-actions>
			</tempplate-footer>
		</template-wrapper>
	`
})

export class QuoteTemplateComponent implements OnInit, OnDestroy {
	public stateValues;
	public userValues;
	private stateSub: Subscription;
	private userSub: Subscription;

	constructor(
		private crmStore: CRMStoreService,
	){}

	public ngOnInit(): void {
		this.stateSub = this.crmStore.crmStore$.subscribe(state => this.stateValues = state);
		this.userSub = this.crmStore.crmUser$.subscribe(userState => this.userValues = userState.currentUser)
	}

	public ngOnDestroy(): void {
		this.stateSub.unsubscribe();
		this.userSub.unsubscribe();
	}
 }
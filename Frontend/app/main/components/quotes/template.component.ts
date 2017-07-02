import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {CRMStore, CRMStoreService, CRMUserStore} from '../../services/crm-store.service';
import {EmailerService} from '../../services/emailer.service';
import {User} from '../../models/user.model';
import {Contact} from '../../models/contact.model';
import {Company} from '../../models/company.model';
import {Quote, QuoteLine} from '../../models/quote.model';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';

export interface TemplateState {
	user: User;
	contact: Contact;
	company: Company;
	quote: Quote;
}

@Component({
	selector: 'quote-template',
	template: `
		<div class="template-wrapper row">
			<template-header>
				<template-contact-info>
					<h5>To: </h5>
					<company-name>{{(crmStore.crmStore$ | async).selectedCompany?.name}}</company-name>
					<contact-name>{{(crmStore.crmStore$ | async).selectedContact?.name}}</contact-name>
					<contact-position>{{(crmStore.crmStore$ | async).selectedContact?.position}}</contact-position>
					<contact-email>{{(crmStore.crmStore$ | async).selectedContact?.email}}</contact-email>
				</template-contact-info>
			</template-header>
			<template-body>
				<h3 class="text-center">{{(crmStore.crmUser$ | async).currentUser?.businessName}}</h3>
				<quote-details>
					<div><strong>{{(crmStore.crmStore$ | async).selectedQuote?.name}}</strong></div>
					<div><strong>Salesperson:</strong> {{(crmStore.crmUser$ | async).currentUser.firstName}} {{(crmStore.crmUser$ | async).currentUser.lastName}}</div>
					<div><strong>On:</strong> {{(crmStore.crmStore$ | async).selectedQuote?.created_at | date}}</div>
				</quote-details>
				<quote-header>
					<h5>Quote List:</h5>
				</quote-header>
				<quote-list>
					<quote-line *ngFor="let line of (crmStore.crmStore$ | async).selectedQuote.quoteLines">
						<quote-description class="text-center"><strong>{{line.desc}}</strong></quote-description>
						<quote-line-details>
							<quote-line-unit>
								Units: {{line.unit}}
							</quote-line-unit>
							<quote-line-cost>
								Cost: {{line.cost}}
							</quote-line-cost>
						</quote-line-details>
					</quote-line>
				</quote-list>
			</template-body>
			<tempplate-footer>
				<hr>
				<call-to-actions *ngIf="!confirm">
					<button class="btn-success btn-lg" (click)="confirm = !confirm">Send</button>
					<button class="btn-info btn-lg" [routerLink]="['/Quote-Detail']">Edit</button>
					<button class="btn-warning btn-lg" [routerLink]="['/Quotes']">Cancel</button>
				</call-to-actions>
			</tempplate-footer>
		</div>
		<send-email-confirm *ngIf="!!confirm">
			<h5>Confirm: Send Email to {{(crmStore.crmStore$ | async).email}}</h5>
			<button class="btn-success btn-lg pull-left" (click)="sendEmail()">Send</button>
			<button class="btn-danger btn-lg pull-right" (click)="confirm = !confirm">Cancel</button>
		</send-email-confirm>
	`,
})

export class QuoteTemplateComponent implements OnInit, OnDestroy {
	public confirm: boolean = false;
	public lines: QuoteLine[] = [];

	constructor(
		public toastr: ToastsManager,
		private router: Router,
		public crmStore: CRMStoreService,
		private emailer: EmailerService
	){}

	public ngOnInit(): void {
	}

	public ngOnDestroy(): void {
	}

	public sendEmail(): void {
		// this.emailer.sendEmailWithTemplate(EMAIL_TEMPLATE(this.stateValues), this.stateValues.contact.email, 'A new Quote from AngularBros!').subscribe(res => {
		// 	this.toastr.success('Email sent to: ' + this.stateValues.contact.name);
			this.router.navigate(['/Home']);
		// })
	}
 }

 export const EMAIL_TEMPLATE = (data: TemplateState) => {
	console.log('EMAIL TEMPLATE', data);
	const quoteLines = (quoteLines): string => {
		const sortedLines = quoteLines.sort((a, b) => {
			if (a.weight > b.weight) {
				return 1;
			}
			if (a.weight < b.weight){
				return -1;
			}
		});
		let response = ``;
		for(let line of sortedLines){
			response = response + `
				<tr>
					<td style="text-align: center;">` + line.unit + `</td>
					<td style="text-align: center;">` + line.desc + `</td>
					<td style="text-align: center;">` + line.cost + `</td>
				</tr>
			`;
		console.log(response);
		}
		return response;
	};
	let template = `
	<h1 style="text-align: center;">${data.user.businessName}</h1>
	<p style="text-align: center;">${data.user.addressOne}</p>
	<p style="text-align: center;">${data.user.addressTwo}</p>
	<p style="text-align: center;">${data.user.businessWeb}</p>
	<table class="table table-responsive">
		<tr>
			<td style="text-align: center;">Cell: ${data.user.phone}</td>
			<td style="text-align: center;">Phone: ${data.user.businessPhone}</td>
			<td style="text-align: center;">Fax: ${data.user.businessFax}</td>
		</tr>
	</table>
	<table class="table table-striped">
		<tr>
			<th>
				<p>
					<b>TO:</b><br>
					${data.company.name}<br>
					${data.contact.name}<br>
					${data.company.addressOne}<br>
					${data.company.phone}
				</p>
			</th>
			<td>
				<table style="float:right">
					<tr>
						<th style="background-color:lightblue;text-align: center;">Salesperson</th>
						<th style="background-color:lightblue;text-align: center;">Email</th>
					</tr>
					<tr>
						<td style="text-align: center;">${data.user.firstName}</td>
						<td style="text-align: center;">${data.user.email}</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<br>
	<table class="table table-striped">
		<caption style="text-align: center;">${data.quote.name}</caption>
		<tr>
			<th style="background-color: lightblue;text-align: center;">Unit</th>
			<th style="background-color: lightblue;text-align: center;">Description</th>
			<th style="background-color: lightblue;text-align: center;">Cost</th>
		</tr>
		<tbody>
		` + quoteLines(data.quote.quoteLines) + `
		</tbody>
	</table>
	<table>
		<tr>
			<td>Supplies on Request</td>
			<td style="text-align: right;">All prices subject to change without notice</td>
		</tr>
	</table>
	`;

	 return template;
 };
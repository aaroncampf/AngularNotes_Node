import {Component} from '@angular/core';
@Component({
	selector:'contact-component',
	template: `
		<button class="btn btn-block" [routerLink]="['/Add-Contact/company_id']">Add A Contact</button>
		<ul class="crm-list">
			<li class="crm-list-item">
				<contact-icons class="crm-list-item-icons">
					<span [routerLink]="['/Quotes/contact_id']" class="icon icon-bubble2"></span>
				</contact-icons>
				<contact-name class="crm-list-item-title" [routerLink]="['/Contact-Details/contact_id']">Contact Name
				</contact-name>
				<contact-options-icons class="trash-bin-cell">
					<span class="icon icon-bin"></span>
				</contact-options-icons>
			</li>
			<li class="crm-list-item">
				<contact-icons class="crm-list-item-icons">
					<span [routerLink]="['/Quotes/contact_id']" class="icon icon-bubble2"></span>
				</contact-icons>
				<contact-name class="crm-list-item-title" [routerLink]="['/Contact-Details/contact_id']">Contact Name
				</contact-name>
				<contact-options-icons class="trash-bin-cell">
					<span class="icon icon-bin"></span>
				</contact-options-icons>
			</li>
			<li class="crm-list-item">
				<contact-icons class="crm-list-item-icons">
					<span [routerLink]="['/Quotes/contact_id']" class="icon icon-bubble2"></span>
				</contact-icons>
				<contact-name class="crm-list-item-title" [routerLink]="['/Contact-Details/contact_id']">Contact Name
				</contact-name>
				<contact-options-icons class="trash-bin-cell">
					<span class="icon icon-bin"></span>
				</contact-options-icons>
			</li>
		</ul>
	`
})
export class ContactsComponent {

}
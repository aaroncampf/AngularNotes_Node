import {Component} from '@angular/core';
@Component({
	selector: 'quotes-component',
	template: `
		<button class="btn btn-block" [routerLink]="['/Add-Quote/contact_id_or_company_id']">Create A Quote</button>
		<ul class="crm-list">
			<li class="crm-list-item">
				<quote-icons class="crm-list-item-icons">
					<button class="btn btn-sm btn-default dropdown-toggle" type="button" id="contactDropDown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
						<span [routerLink]="['/Quotes/quote_id']" class="icon icon-share"></span>
						<span class="caret"></span>
					</button>
					<ul class="dropdown-menu" aria-labelledby="contactDropDown">
						<li>Contact 1</li>
						<li>Contact 1</li>
						<li>Contact 1</li>
						<li>Contact 1</li>
					</ul>
					
				</quote-icons>
				<quote-name class="crm-list-item-title" [routerLink]="['/Quote/quote_id']">Quote Name
				</quote-name>
				<quote-options-icons class="trash-bin-cell">
					<span class="icon icon-bin"></span>
				</quote-options-icons>
			</li>
		</ul>
	`
})
export class QuotesComponent {}
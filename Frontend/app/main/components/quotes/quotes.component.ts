import {Component} from '@angular/core';
@Component({
	selector: 'quotes-component',
	template: `
		<button class="btn btn-block" [routerLink]="['/Add-Quote/contact_id_or_company_id']">Create A Quote</button>
		<table class="table table-bordered table-responsive table-hover">
			<tbody>
			<tr>
				<td [routerLink]="['/Quote/contact_id/quote_id']">Quote 1</td>
				<td>
					<span class="icon icon-cross"></span>
				</td>
			</tr>
			</tbody>
		</table>
	`
})
export class QuotesComponent {}
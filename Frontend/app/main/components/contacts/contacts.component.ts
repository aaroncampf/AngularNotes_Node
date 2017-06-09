import {Component} from '@angular/core';
@Component({
	selector:'contact-component',
	template: `
	<button class="btn btn-block" [routerLink]="['/Add-Contact/company_id']">Add A Contact</button>
		<table class="table table-bordered table-responsive table-hover">
			<tbody>
				<tr>
					<td>
						<span class="icon icon-info" [routerLink]="['/Contact-Details/contact_id']"></span>
					</td>
					<td [routerLink]="['/Quotes/contact_id']">Contact Name</td>
					<td>
						<span class="icon icon-cross"></span>
					</td>
				</tr>
				<tr>
					<td>
						<span class="icon icon-info" [routerLink]="['/Contact-Details/contact_id']"></span>
					</td>
					<td [routerLink]="['/Quotes/contact_id']">Contact Name</td>
					<td>
						<span class="icon icon-cross"></span>
					</td>
				</tr>
				<tr>
					<td>
						<span class="icon icon-info" [routerLink]="['/Contact-Details/contact_id']"></span>
					</td>
					<td [routerLink]="['/Quotes/contact_id']">Contact Name</td>
					<td>
						<span class="icon icon-cross"></span>
					</td>
				</tr>
			</tbody>
		</table>
	`
})
export class ContactsComponent {

}
import {Component} from '@angular/core';
@Component({
	selector: 'companies-component',
	template: `
	<button class="btn btn-block" [routerLink]="['/Add-Company']">Add A Company</button>
		<table class="table table-responsive table-bordered table-hover">
			<tbody>
				<tr>
					<td>
						<span class="icon icon-info" [routerLink]="['/Company-Details/company_id']"></span>
					</td>
					<td [routerLink]="['/Contacts/company_id']">Company Name 1</td>
					<td>
						<span class="icon icon-cross" [routerLink]="['/company-details/company_id']"></span>
					</td>
				</tr>
				<tr>
					<td>
						<span class="icon icon-info" [routerLink]="['/company-details/company_id']"></span>
					</td>
					<td [routerLink]="['/Contacts/company_id']">Company Name 1</td>
					<td>
						<span class="icon icon-cross" [routerLink]="['/company-details/company_id']"></span>
					</td>
				</tr>
				<tr>
					<td>
						<span class="icon icon-info" [routerLink]="['/company-details/company_id']"></span>
					</td>
					<td [routerLink]="['/Contacts/company_id']">Company Name 1</td>
					<td>
						<span class="icon icon-cross" [routerLink]="['/company-details/company_id']"></span>
					</td>
				</tr>
			</tbody>
		</table>
	`
})
export class CompaniesComponent {

}
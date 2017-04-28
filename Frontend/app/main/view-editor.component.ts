import {Component, OnInit} from '@angular/core';
import {RESTService} from '../shared/services/rest.service';
import {Company} from '../companies/company.model';
import {TokenService} from '../shared/services/twt.service';
import {UsersServices} from '../users/users.services';
import {TWT} from '../users/user.model';
import {CRMType} from '../shared/models/CRMTypes.type';
import {ToTitleCaseKeys} from '../shared/pipes/toTitleCase.pipe';

@Component({
	selector: 'companies-component',
	template: `		
	<div class="row" *ngIf="create">
		<button class="btn btn-block" (click)="create = false; listCompanies = true;">List Companies</button>
		<create-company-component></create-company-component>
	</div>
	<div *ngIf="list">
		{{twt?.currentCompany?.name || "Company List" }}
		<button class="btn btn-block" (click)="create = true; list = false;">Add A Company</button>
		<list-component [listItems]="companies" (onSave)="onSaveProp($event)"></list-component>
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-12">
					<div class="accordion-wrapper">
						<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
							<div class="panel panel-default">
								<div class="panel-heading" role="tab" id="headingOne">
									<h4 class="panel-title">
										<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseQuotes" aria-expanded="false" aria-controls="collapseQuotes">Quotes
										</a>
									</h4>
								</div>
								<div id="collapseQuotes" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
									<div class="panel-body">
										<div class="content">
											<list-component [listItems]="twt.selectedRelates.quotes"></list-component>
										</div>
									</div>
								</div>
							</div>
							<div class="panel panel-default">
								<div class="panel-heading" role="tab" id="headingTwo">
									<h4 class="panel-title">
										<a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseContacts" aria-expanded="false" aria-controls="collapseContacts">Contacts
										</a>
									</h4>
								</div>
								<div id="collapseContacts" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
									<div class="panel-body">
										<div class="content">
											<list-component [listItems]="twt.selectedRelates.contacts"></list-component>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
		<!--<quotes-component *ngIf="mode === QUOTES"></quotes-component>-->
	`,
})

export class CompaniesComponent implements OnInit {
	public companies: Company[] = [];
	public list: boolean;
	public tab: string;
	public create: boolean = false;
	private twt: TWT = <TWT>{};
	public path: string = `http://angularnotes-angularbros.azurewebsites.net/api/Companies/`;

	constructor(private restService: RESTService,
				private userService: UsersServices,
				private tokenService: TokenService,
				private titleCase: ToTitleCaseKeys) {
	}

	public ngOnInit(): void {
		this.twtInit();
		this.list = true;
	}

	private twtInit(): void {
		this.restService.callPath('get', this.path)
			.subscribe((companies: Company[]) => {
				console.log('company res', companies);
				return this.companies = companies
			});
		this.tokenService.tokenFactory().then(token => {
			this.twt = token;
			this.userService.setTWTProp(Object.assign(token, {state: {
				rootView: 'companies'}}));
		});
		this.userService.userState$.subscribe((twt: TWT) => {
			this.twt = twt;
		})
	}

	public onSaveProp(company): void {
		let payload: {} = {};
		for (let key of Object.keys(company)) {
			Object.assign(payload, {[this.titleCase.transform(key)]:company[key]})
		}
		this.restService.callPath('put', this.path + this.twt.selected.id, <CRMType>company).subscribe(company => {
			console.log('propSaved', company);
		})
	}
}
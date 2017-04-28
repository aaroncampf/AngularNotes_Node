import {Component, OnInit} from '@angular/core';
import {RESTService} from '../shared/services/rest.service';
import {TokenService} from '../shared/services/twt.service';
import {UsersServices} from '../users/users.services';
import {TWT} from '../users/user.model';
import {CRMType} from '../shared/models/CRMTypes.type';
import {ToTitleCaseKeys} from '../shared/pipes/toTitleCase.pipe';
import {ActivatedRoute} from '@angular/router';

@Component({
	selector: 'view-edit-component',
	template: `
		<div class="row" *ngIf="create">
			<button class="btn btn-block" (click)="create = false; list = true;">List Companies</button>
			<create-component></create-component>
		</div>
		<div *ngIf="list">
			{{twt?.currentCompany?.name || "Company List" }}
			<button class="btn btn-block" (click)="create = true; list = false;">Add A Company</button>
			<list-component [listItems]="items" (onSave)="onSaveProp($event)"></list-component>
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<div class="accordion-wrapper">
							<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
								<div class="panel panel-default">
									<div class="panel-heading" role="tab" id="heading-quotes">
										<h4 class="panel-title">
											<a role="button" data-toggle="collapse" data-parent="#accordion"
											   href="#collapseQuotes" aria-expanded="false"
											   aria-controls="collapseQuotes">Quotes
											</a>
										</h4>
									</div>
									<div id="collapseQuotes" class="panel-collapse collapse in" role="tabpanel"
										 aria-labelledby="heading-quotes">
										<div class="panel-body">
											<div class="content">
												<list-component
														[listItems]="twt?.selectedRelations?.quotes"></list-component>
											</div>
										</div>
									</div>
								</div>
								<div class="panel panel-default">
									<div class="panel-heading" role="tab" id="heading-contacts">
										<h4 class="panel-title">
											<a class="collapsed" role="button" data-toggle="collapse"
											   data-parent="#accordion" href="#collapseContacts" aria-expanded="false"
											   aria-controls="collapseContacts">Contacts
											</a>
										</h4>
									</div>
									<div id="collapseContacts" class="panel-collapse collapse" role="tabpanel"
										 aria-labelledby="heading-contacts">
										<div class="panel-body">
											<div class="content">
												<list-component
														[listItems]="twt?.selectedRelations?.contacts"></list-component>
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
	`,
})

export class ViewEditComponent implements OnInit {
	public items: CRMType[] = <CRMType[]>[];
	public list: boolean;
	public tab: string;
	public path: string = `http://angularnotes-angularbros.azurewebsites.net/api/Contact`;
	public create: boolean = false;
	private twt: TWT = <TWT>{};
	constructor(private restService: RESTService,
				private userService: UsersServices,
				private tokenService: TokenService,
				private titleCase: ToTitleCaseKeys,
				private activatedRoute: ActivatedRoute) {
	}

	public ngOnInit(): void {
		this.twtInit();
		this.initListData();
		this.list = true;
		this.activatedRoute.params.subscribe(params => {
			this.tab = params[0];
		})
	}

	private initListData(): void{
		this.restService.callPath('get', `http://angularnotes-angularbros.azurewebsites.net/api/${this.tab}`)
			.subscribe((response: CRMType[]) => {
				 this.items = response;
			});
	}

	private twtInit(): void {
		this.tokenService.tokenFactory().then(twt => {
			this.twt = twt;
			this.userService.setTWTProp(Object.assign(twt, {state: {
				rootView: 'items'}}));
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
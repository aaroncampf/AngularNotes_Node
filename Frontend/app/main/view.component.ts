import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../users/users.services';
import {TWT} from '../users/user.model';
import {CRMType} from '../shared/models/crm-models.type';
import {ActivatedRoute} from '@angular/router';
import {SocketService} from '../shared/services/socket.service';
import {ToastsManager} from 'ng2-toastr';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'view-edit-component',
	template: `
		<button (click)="test()"> TEST</button>
		<div *ngIf="twt.viewMode === 'list'">
			<h1>{{twt.viewContext}}<small>by Angular Bros</small></h1>
			<button class="btn btn-block" [routerLink]="['/create']">Add New</button>
			<list-component [twt]="twt" [listItems]="items" (onSave)="onSaveProps($event)"></list-component>
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<div class="accordion-wrapper">
							<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
								<div class="panel panel-default">
									<div class="panel-heading" role="tab" id="heading-quotes">
										<h4 class="panel-title">
											<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseQuotes" aria-expanded="false" aria-controls="collapseQuotes">Quotes
											</a>
										</h4>
									</div>
									<div id="collapseQuotes" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-quotes">
										<div class="panel-body">
											<div class="content">
												<list-component [twt]="twt" (onSave)="onSaveProps($event)" [listItems]="twt?.selectedRelations?.quotes"></list-component>
											</div>
										</div>
									</div>
								</div>
								<div class="panel panel-default">
									<div class="panel-heading" role="tab" id="heading-contacts">
										<h4 class="panel-title">
											<a class="collapsed" role="button" data-toggle="collapse"
											   data-parent="#accordion" href="#collapseContacts" aria-expanded="false"
											   aria-controls="collapseContacts">{{twt.viewContext}}
											</a>
										</h4>
									</div>
									<div id="collapseContacts" class="panel-collapse collapse" role="tabpanel"
										 aria-labelledby="heading-contacts">
										<div class="panel-body">
											<div class="content">
												<list-component [twt]="twt" (onSave)="onSaveProps($event)" [listItems]="twt?.selectedRelations?.contacts"></list-component>
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

export class ViewEditComponent implements OnInit, OnDestroy{
	public items: CRMType[] = <CRMType[]>[];
	private twt: TWT = <TWT>{};
	public twtSub: Subscription;
	constructor(
				private socketService: SocketService,
				private userService: UsersService,
				private activatedRoute: ActivatedRoute,
				public toastr: ToastsManager
	) {}

	public socketEndpoint(modelName: string, verb: string): string {
		return `${modelName}.${verb}`
	}

	public changeMode(mode: string): void {
		this.userService.setTWTProp({viewMode: mode});
	}

	public ngOnInit(): void {
		this.twtSub = this.userService.userState$.subscribe((twt: TWT) => {
			console.log('subscription hit', this.twt);
			this.twt = twt;
		});
			this.userService.setTWTProp({viewMode: 'list'});
			console.log('twt inside view', this.twt);
		this.activatedRoute.url.subscribe(url => {
			this.userService.setTWTProp({viewContext: url[0].path});
		});
		this.initData().then((items: CRMType[]) => {
			this.items = items;
		})
	}
	public i = 0;
	public test(){
		this.userService.setTWTProp({test: 'I AM A TEST' + this.i });
		this.i ++;
	}
	public ngOnDestroy(): void {
		this.twtSub.unsubscribe();
	}

	private initData(): Promise<CRMType[]> {
		return new Promise((resolve, reject) => {
			this.socketService
				.responseSocket(this.socketEndpoint(this.twt.viewContext, 'get'), {})
				.subscribe((items:CRMType[]) => {
				console.log('items', items);
					resolve(items);
					reject('error');
			});
		});
	}

	public onSaveProps(payload): void {
		this.socketService.responseSocket(this.socketEndpoint(this.twt.viewContext,'post'), payload).subscribe(response => {
			this.toastr.success('Saved!' + response);
		});

	}
}
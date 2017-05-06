import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../users/users.services';
import {TWT} from '../users/user.model';
import {CRMType} from '../shared/models/crm-models.type';
import {ActivatedRoute} from '@angular/router';
import {SocketService} from '../shared/services/socket.service';
import {ToastsManager} from 'ng2-toastr';
import {Subscription} from 'rxjs/Subscription';
import {QuestionService} from '../shared/services/question.service';
import {TriggerListenerTuple} from '@angular/animations/browser/src/render/dom_animation_engine';

@Component({
	selector: 'view-edit-component',
	template: `
		<div *ngIf="twt.viewMode === 'list'">
			<h1>{{twt.viewContext}}<small>by Angular Bros</small></h1>
			<button class="btn btn-block" [routerLink]="['/create']">Add New</button>
			<list-component [listItems]="twt.listItems" [selected]="twt.selected" [control]="twt.controls" (onSave)="onSaveProps($event)" [optionOne]=""></list-component>
			<div class="container-fluid">
				<div class="row">
					<div class="col-lg-12">
						<div class="accordion-wrapper">
							<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
								<div class="panel panel-default">
									<div class="panel-heading" role="tab" id="heading-quotes">
										<h4 class="panel-title">
											<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseQuotes" aria-expanded="false" aria-controls="collapseQuotes">Quotes</a>
										</h4>
									</div>
									<div id="collapseC" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading-quotes">
										<div class="panel-body">
											<div class="content">
												
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
												<list-component (onSave)="onSaveProps($event)" [listItems]="twt?.selectedRelations?.contacts"></list-component>
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
	private twt: TWT = <TWT>{};
	public twtSub: Subscription;
	constructor(
				private socketService: SocketService,
				private questionService: QuestionService,
				private userService: UsersService,
				private activatedRoute: ActivatedRoute,
				public toastr: ToastsManager
	) {}

	public socketEndpoint(modelName: string, verb: string): string {
		return `${modelName}.${verb}`
	}

	public ngOnInit(): void {
		this.twtSub = this.userService.userState$.subscribe((twt: TWT) => {
			this.twt = twt;
		});
		this.userService.setTWTProp({viewMode: 'list'});
		this.activatedRoute.url.subscribe(url => {
			this.userService.setTWTProp({viewContext: url[0].path});
		});
		this.initData().then((items: CRMType[]) => {
			this.userService.setTWTProp({listItems:items});
			const LIST_QUESTIONS = this.questionService.initQuestions(items);
			const CONTROLS = this.questionService.initControlsFromQuestions(LIST_QUESTIONS);
			Object.assign(this.twt, {listItems: LIST_QUESTIONS});
			Object.assign(this.twt, {controls: CONTROLS});
			this.userService.setTWTProp(this.twt);
		})
	}

	public ngOnDestroy(): void {
		this.twtSub.unsubscribe();
	}

	private initData(): Promise<CRMType[]> {
		return new Promise((resolve, reject) => {
			this.socketService
				.responseSocket(this.socketEndpoint(this.twt.viewContext, 'get'), {})
				.subscribe((items:CRMType[]) => {
					resolve(items);
					reject('error');
			});
		});
	}

	public onSaveProps(payload): void {
		let newList: CRMType[] = [];
		this.socketService.responseSocket(this.socketEndpoint(this.twt.viewContext, 'set'), payload)
			.subscribe(response => {
			for (let item of this.twt.listItems) {
				if (item.id && item.id === response.id) {
					item = response;
				}
				newList.push(item);
			}
			this.userService.setTWTProp({listItems: newList});
		});
	}
}

export interface _seedListData {
	context: {
		id?: string;
		siblings:ListData[]
		parent:ListData[]
		children:ListData[]
	}
}

export interface ListData extends _seedListData{
	list: {
		items: ListData[];
		id?: string;
	}

}

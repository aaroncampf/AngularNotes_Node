import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../users/users.services';
import {TWT} from '../users/user.model';
import {CRMType} from '../shared/models/crm-models.type';
import {ActivatedRoute} from '@angular/router';
import {SocketService} from '../shared/services/socket.service';
import {Subscription} from 'rxjs/Subscription';
import {List, QuestionService} from '../forms/services/question.service';

@Component({
	selector: 'view-edit-component',
	template: `
		<div *ngIf="twt.viewMode === 'list'">
			<h1>{{twt.viewContext}}<small>by Angular Bros</small></h1>
			<list-component [listItems]="twt.listItems" [selected]="twt.selected" [control]="twt.controls" (onSave)="onSaveProps($event)" [optionOne]=""></list-component>
			<div class="container-fluid" >
				<div class="row">
					<div class="col-lg-12">
						<div *ngIf="twt.subLists" class="accordion-wrapper">
							<div class="panel-group" *ngFor="let group of twt.subList.items">
								<div class="panel panel-default">
									<div class="panel-heading" role="tab">
										<h4 class="panel-title">
											<a class="collapsed" role="button">{{group.name}}</a>
										</h4>
									</div>
									<div class="panel-collapse collapse" role="tabpanel">
										<div class="panel-body">
											<div class="content">
												<list-component (onSave)="onSaveProps($event)" [controls]="group.controls" [listItems]="group.items" ></list-component>
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
	) {}

	public socketEndpoint(modelName: string, verb: string): string {
		return `${modelName}.${verb}`
	}

	public ngOnInit(): void {
		this.twtSub = this.userService.userState$
			.subscribe((twt: TWT) => {
			if (twt.selected !==  this.twt) {
				this.twt = twt;
			}
		});
		this.userService.setTWTProp({viewMode: 'list'});
		this.activatedRoute.url.subscribe(url => {
			this.userService.setTWTProp({viewContext: url[0].path});
		});
		this.initData().then((items: any[]) => {
			let list = this.questionService.buildList(items);
			list.subLists = this.buildSubLists(items);
			this.userService.setTWTProp({listItems:items});
			Object.assign(this.twt, list);
			this.userService.setTWTProp(this.twt);
		})

	}

	public buildSubLists(items: {}[]): List[] {
		const MODELS = ['contacts', 'quotes', 'notes', 'companies'];
		let response = [];
		for (let item of items) {
			for(let key of Object.keys(item)) {
				if (MODELS.indexOf(key) !== -1) {
					response.push(this.questionService.buildList(item[key]));
				}
			}
		}
		return response;
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

	// public updateSubLists(current, usersService: UsersService, questionService:QuestionService): void {
	// 	const MODELS = ['contacts', 'quotes', 'notes', 'companies'];
	// 	let subList: SubList = <SubList>{};
	// 	let subLists: any[] = [];
	// 	for (let key of Object.keys(current)) {
	// 		if (MODELS.indexOf(key) !== -1 ) {
	// 			for(let model of current[key]) {
	// 			Object.assign(subList,{items: model});
	// 			}
	// 			subList.items = this.questionService.initQuestions(subList.items);
	// 			subList.controls = this.questionService.initControlsFromQuestions(subList.items);
	// 			subLists.push(subList);
	// 			subList = <SubList>{};
	// 		}
	// 	}
	// 	usersService.setTWTProp({subLists: subLists})
	// }
}

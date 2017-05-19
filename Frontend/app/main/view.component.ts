// import {Component, OnDestroy, OnInit} from '@angular/core';
// import {UsersService} from '../users/users.services';
// import {ListItems, RDCache} from '../users/user.model';
// import {CRMType} from './models/crm-models.type';
// import {ActivatedRoute} from '@angular/router';
// import {SocketService} from '../shared/services/socket.service';
// import {Subscription} from 'rxjs/Subscription';
// import {List, FormsService} from '../forms/services/forms.service';
//
// @Component({
// 	selector: 'view-edit-component',
// 	template: `
// 		<div *ngIf="twt.viewMode === 'list'">
// 			<h1>{{twt.viewContext}}<small>by Angular Bros</small></h1>
// 			<list-component [listItems]="tc.listItems.items" [selected]="tc.selected" [control]="tc.controls" (onSave)="onSaveProps($event)" [optionOne]=""></list-component>
// 			<div class="container-fluid" >
// 				<div class="row">
// 					<div class="col-lg-12">
// 						<div *ngIf="twt.subLists" class="accordion-wrapper">
// 							<div class="panel-group" *ngFor="let group of twt.subList.items">
// 								<div class="panel panel-default">
// 									<div class="panel-heading" role="tab">
// 										<h4 class="panel-title">
// 											<a class="collapsed" role="button">{{group.name}}</a>
// 										</h4>
// 									</div>
// 									<div class="panel-collapse collapse" role="tabpanel">
// 										<div class="panel-body">
// 											<div class="content">
// 												<list-component (onSave)="onSaveProps($event)" [controls]="group.controls" [listItems]="group.items" ></list-component>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	`,
// })
//
// export class ViewEditComponent implements OnInit, OnDestroy{
// 	private twt: RDCache = <RDCache>{};
// 	public twtSub: Subscription;
// 	constructor(
// 				private socketService: SocketService,
// 				private questionService: FormsService,
// 				private userService: UsersService,
// 				private activatedRoute: ActivatedRoute,
// 	) {}
//
// 	public socketEndpoint(modelName: string, verb: string): string {
// 		return `${modelName}.${verb}`
// 	}
//
// 	public ngOnInit(): void {
// 		this.twtSub = this.userService.userState$
// 			.subscribe((twt: RDCache) => {
// 			if (this.tc.selected !==  tc.selected) {
// 				this.tc = tc;
// 			}
// 		});
// 		this.userService.setTCProp({viewMode: 'list'});
// 		this.activatedRoute.url.subscribe(url => {
// 			this.userService.setTCProp({viewContext: url[0].path});
// 		});
// 		this.initData().then((items: any[]) => {
// 			// let list = this.questionService.ListBuilder(items);
// 			// this.userService.setTCProp({listItems:items});
// 			// Object.assign(this.twt, list);
// 			// this.userService.setTCProp(this.twt);
// 		})
//
// 	}
//
// 	public ngOnDestroy(): void {
// 		this.twtSub.unsubscribe();
// 	}
//
// 	private initData(): Promise<CRMType[]> {
// 		return new Promise((resolve, reject) => {
// 			this.socketService
// 				.responseSocket(this.socketEndpoint(this.twt.viewContext, 'get'), {})
// 				.subscribe((items:CRMType[]) => {
// 					resolve(items);
// 					reject('error');
// 			});
// 		});
// 	}
//
// 	public onSaveProps(payload): void {
// 		let newList: CRMType[] = [];
// 		this.socketService.responseSocket(this.socketEndpoint(this.twt.viewContext, 'set'), payload)
// 			.subscribe(response => {
// 			for (let item of this.twt.listItems.items) {
// 				if (item.id && item.id === response.id) {
// 					item = response;
// 				}
// 				newList.push(item);
// 			}
// 			this.userService.setTCProp({listItems: {items:  newList}});
// 		});
// 	}
//
// }

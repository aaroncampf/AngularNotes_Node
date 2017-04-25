import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UsersServices} from '../../users/users.services';
import {SocketService} from '../services/socket.service';
import {CRMType} from '../models/CRMTypes.type';
import {TWT} from '../../users/user.model';
import {Subject} from 'rxjs/Subject';

@Component({
	selector: 'list-component',
	template: `
	<div class="row">
		<list-header *ngIf="header">
			<div class="md-toolbar-tools">{{header}}</div>
		</list-header>
	</div>
	<!--//master-->
	<div class="row">
		<list-subheader class="col-xs-12" *ngIf="title">
			<h4>{{title}}</h4>
		</list-subheader>
		<list-group class="col-xs-12">
			<list-item-slide *ngFor="let item of listData" [class.collapse]="activeItem.id !== item.id && details">
					<slide-top (click)="onSelect('slide', item)" [class.active]="item.id === activeItem.id" >{{item.Name || item.Title}}</slide-top>
					<slide-details-option class="pull-right">
						<i class="glyphicon glyphicon-info-sign"></i>
					</slide-details-option>
					<slide-option class="pull-right" *ngIf="!optionTwo">
						<b>{{optionTwo}}</b>
					</slide-option>
					<slide-option class="pull-right" *ngIf="!optionOne">
						<b>{{optionOne}}</b>
					</slide-option>
			<!--//details-->
			<item-details *ngIf="details && activeItem.id === item.id">
				<input-component *ngFor="let key of keys" [label]="key" [(model)]="item[key]" (onBlur)="blurrySave($event, key)"></input-component>
			</item-details>
			</list-item-slide>
		</list-group>
	</div>
`
})

export class ListComponent implements OnInit, OnChanges {
	@Input()
	public listData: CRMType[] = [];
	@Input()
	public title: string;
	@Input()
	public header: string;
	@Input()
	public optionOne: string;
	@Input()
	public optionTwo: string;
	@Output()
	public optionTwoSelected: EventEmitter<any> = new EventEmitter<any>()
	@Output()
	public optionOneSelected: EventEmitter<any> = new EventEmitter<any>()
	@Input()
	public activeItem: CRMType = <CRMType>{};
	public slide: boolean = false;
	public details: boolean = false;
	public keys: any[] = [];
	public tokenTest: TWT = <TWT>{};
	public currentSelect: any = <any>{};
	constructor(private userServices: UsersServices,
				private socket: SocketService){};

	public ngOnInit(): void {
		this.updateKeys(this.listData);
		this.userServices.userState$.subscribe((twt:TWT) => {
			console.log('MY OBSERVABLE IS CHANGING!');
			if (twt.currentSelect.current) {
			this.activeItem = twt.currentSelect.current;
			} else {
				this.activeItem = <CRMType>{};
			}
		});
	}

	public ngOnChanges(): void {
		 this.updateKeys(this.listData);
	}

	public updateKeys(list): void {
		this.keys = [];
		for(let obj of list){
			this.keys.push(Object.keys(obj));
		}
	}

	public onSelect(type: string, content: CRMType): void {
		console.log('selcte',this.activeItem);
		switch(type) {
			case'slide':
				if (!this.slide) {
					this.slide = true;
					this.userServices.setTWTProp({currentSelect: {current: content}});
				} else if (this.slide && this.activeItem.id !== content.id) {
					this.userServices.setTWTProp({currentSelect: {current: content}});
				} else {
					this.slide = false;
					this.userServices.setTWTProp(<TWT>{currentSelect: {}});
			}
			break;
			case 'details':
				this.details = !this.details;
				break;
			case 'optionOne':
				this.optionOneSelected.emit(content);
				break;
			case 'optionTwo':
				this.optionTwoSelected.emit(content);
				break;
		}
	}

	public blurrySave(event, name): void {

	}
}
import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UsersServices} from '../../users/users.services';
import {CRMType} from '../models/CRMTypes.type';
import {TWT} from '../../users/user.model';

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
			<div *ngFor="let item of listData" >
				<list-item-slide [class.collapse]="activeItem.id !== item.id && details">
					<slide-top (click)="onSelect('slide', item)" class="swip-box" ng-style="{'transform': 'rotate('+number+'deg)', '-webkit-transform': 'rotate('+number+'deg)', '-ms-transform': 'rotate('+number+'deg)'}" (pan)="panning($event, item)" (swipeLeft)="swipe($event.type, item)" (swipeRight)="swipe($event.type)"  [class.active]="item.id === activeItem.id" [class.option]="(optionOne || optionTwo) && !(optionOne && optionTwo)" [class.options]="optionOne && optionTwo">{{item.name || item.title}} </slide-top>
					<slide-details-option (click)="onSelect('details', item)">
						<i class="glyphicon glyphicon-info-sign"></i>
					</slide-details-option>
					<slide-option *ngIf="optionTwo">
						<b>{{optionTwo}}</b>
					</slide-option>
					<slide-option *ngIf="optionOne">
						<b>{{optionOne}}</b>
					</slide-option>
				</list-item-slide>
					<!--//details-->
				<item-details *ngIf="details && activeItem.id === item.id">
					<list-item *ngFor="let key of keys">
						{{key}}
						<input-component [label]="key" [(model)]="item[key]" (onBlur)="blurrySave($event, key)"></input-component>
					</list-item>
				</item-details>
			</div>
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
	public SWIPE_ACTION = {RIGHT: 'swip-right', LEFT: 'swip-left'};
	public xVal: number;
	constructor(private userServices: UsersServices){};

	public ngOnInit(): void {

		this.updateKeys(this.listData);
		this.userServices.userState$.subscribe((twt:TWT) => {
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
		let i = 0;
		for(let obj of list){
			this.keys.push(Object.keys(obj)[i].charAt(0).toUpperCase() + Object.keys(obj)[i].slice(1));
			i++;
		}
	}

	public onSelect(type: string, content: CRMType): void {
		switch(type) {
			case'slide':
				if (!this.slide) {
					this.slide = true;
					this.userServices.setTWTProp(<TWT>{currentSelect: {current: content}});
				} else if (this.slide && this.activeItem.id !== content.id) {
					this.userServices.setTWTProp(<TWT>{currentSelect: {current: content}});
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

	public swipe(action = this.SWIPE_ACTION.RIGHT, content?: {}){
		console.log('swipped', action);
		switch(action) {
			case'swipeleft':
				this.userServices.setTWTProp(<TWT>{currentSelect: {current: content}});
				break;
			case'swiperight':
				this.userServices.setTWTProp(<TWT>{currentSelect: {}});
		}
	}

	public panning(event, content) {
		this.xVal = event.srcEvent.clientX;
		if(this.xVal === 50 ) {
			this.onSelect('slide', content);
			console.log(event);

		} else if (this.xVal === -50) {
			this.onSelect('slide', <CRMType>{});
			console.log(event);
		}
}
	public blurrySave(event, name): void {

	}
}
import {Component, Input, OnChanges, OnInit} from '@angular/core';
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
				<div *ngFor="let item of listItems">
					<list-item-slide [class.collapse]="activeItem.id !== item.id && details">
						<slide-top (click)="onSelect('slide', item)" class="swip-box"
								   ng-style="{'transform': 'rotate('+number+'deg)', '-webkit-transform': 'rotate('+number+'deg)', '-ms-transform': 'rotate('+number+'deg)'}"
								   (pan)="panning($event, item)" (swipeLeft)="swipe($event.type, item)"
								   (swipeRight)="swipe($event.type)" [class.active]="item.id === activeItem.id"
								   [class.option]="(optionOne || optionTwo) && !(optionOne && optionTwo)"
								   [class.options]="optionOne && optionTwo">{{item.name || item.title}}
						</slide-top>
						<slide-details-option (click)="onSelect('details', item)">
							<i class="glyphicon glyphicon-info-sign"></i>
						</slide-details-option>
						<slide-option *ngIf="optionTwo" (click)="onSelect('optionOne', item)">
							<b>{{optionTwo}}</b>
						</slide-option>
						<slide-option *ngIf="optionOne" (click)="onSelect('optionTwo', item)">
							<b>{{optionOne}}</b>
						</slide-option>
					</list-item-slide>
					<!--//details-->
					<item-details *ngIf="details && activeItem.id === item.id">
						<list-item *ngFor="let key of keys">
							<input-component [label]="key.charAt(0).toUpperCase() + key.slice(1)" [(model)]="item[key]"
											 (onBlur)="blurrySave($event, key)"></input-component>
						</list-item>
					</item-details>
				</div>
			</list-group>
		</div>
	`
})

export class ListComponent implements OnInit, OnChanges {
	@Input()
	public listItems: CRMType[] = [];
	@Input()
	public title: string;
	@Input()
	public header: string;
	@Input()
	public optionOne: string;
	@Input()
	public optionTwo: string;
	@Input()
	public activeItem: CRMType = <CRMType>{};
	public slide: boolean = false;
	public details: boolean = false;
	public keys: any[] = [];
	public tokenTest: TWT = <TWT>{};
	public currentSelect: CRMType = <CRMType>{};
	public SWIPE_ACTION = {RIGHT: 'swip-right', LEFT: 'swip-left'};
	public xVal: number;
	constructor(private userServices: UsersServices){};

	public ngOnInit(): void {
		do {
		console.log(this.listItems);
			if(this.listItems.length >= 1){
				this.updateKeys(this.listItems);
				this.userServices.userState$.subscribe((twt:TWT) => {
					if (twt.currentSelect.current) {
						this.activeItem = twt.currentSelect.current;
					} else {
						this.activeItem = <CRMType>{};
					}
				});
			}
		} while (this.keys.length < 1);
	}

	public ngOnChanges(): void {
		 // this.updateKeys(this.listItems);
		console.log(this.keys);
	}

	public updateKeys(list): void {
		this.keys = [];
		if(list.length >= 1) {
			for(let key of Object.keys(list[0])){
				if(key !== 'id'){
					this.keys.push(key);
				}
			}
		}
	}

	public onSelect(type: string, content: CRMType): void {
		switch(type) {
			case'slide':
				if (!this.slide) {
					this.slide = true;
					this.userServices.setTWTProp({
						currentSelect: {
							current: content
						},
						focus: {
							type: content.type,
							mode: 'target'
					}});
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
				this.userServices.setTWTProp(content);
				break;
			case 'optionTwo':
				this.userServices.setTWTProp(content);
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
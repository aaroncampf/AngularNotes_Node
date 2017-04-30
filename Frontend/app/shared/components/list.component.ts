import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UsersServices} from '../../users/users.services';
import {CRMType} from '../models/CRMTypes.type';
import {TWT} from '../../users/user.model';
import {ToTitleCaseKeys} from '../pipes/toTitleCase.pipe';
import {Company} from '../models/company.model';
import {Contact} from '../models/contact.model';
import {Quote} from '../models/quote.model';
import {Note} from '../models/note.model';
import {RESTService} from '../services/rest.service';
import {TEST_COMPANY} from '../models/comparrison-models.obj';


//Todo take off collapses
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
					<list-item-slide [class.collapse]="twt?.selected?.id !== item.id && details">
						<slide-top (click)="slide ? onSelect('slide-close') : onSelect('slide-open', item)"
								   class="swipe-box"
								   ng-style="{'transform': 'rotate('+number+'deg)', '-webkit-transform': 'rotate('+number+'deg)', '-ms-transform': 'rotate('+number+'deg)'}"
								   (pan)="panning($event, item)" (swipeLeft)="swipe($event.type, item)"
								   (swipeRight)="swipe($event.type)"
								   [class.active]="item.id === twt?.selected?.id"
								   [class.option]="(optionOne || optionTwo) && !(optionOne && optionTwo)"
								   [class.options]="optionOne && optionTwo">{{item.name || item.title}}
						</slide-top>
						<slide-details-option (click)="onSelect('details', item)">
							<i class="glyphicon glyphicon-info-sign"></i>
						</slide-details-option>
						<slide-option *ngIf="optionTwo" (click)="onSelect('option-one', item)">
							<b>{{optionTwo}}</b>
						</slide-option>
						<slide-option *ngIf="optionOne" (click)="onSelect('option-two', item)">
							<b>{{optionOne}}</b>
						</slide-option>
					</list-item-slide>
					<!--//details-->
					<item-details *ngIf="details && twt?.selected?.id === item.id">
						<list-item *ngFor="let key of itemKeys">
							<input-component [label]="key.charAt(0).toUpperCase() + key.slice(1)" [model]="item[key]"
											 (onBlur)="blurrySave(item, key, $event)"></input-component>
						</list-item>
					</item-details>
				</div>
			</list-group>
		</div>
	`
})

export class ListComponent implements OnInit, OnChanges {
	@Input()
	public listItems: {}[] = <{}[]>[];
	@Input()
	public title: string;
	@Input()
	public header: string;
	@Input()
	public optionOne: string;
	@Input()
	public optionTwo: string;
	@Output()
	public onOptions: EventEmitter<any> = new EventEmitter<any>();
	@Output()
	public onSave: EventEmitter<any> = new EventEmitter<any>();
	public twt: TWT = <TWT>{};
	public slide: boolean = false;
	public details: boolean = false;
	public itemKeys: string[] = <string[]>[];
	// public tokenTest: TWT = <TWT>{};
	public SWIPE_ACTION = {RIGHT: 'swipe-right', LEFT: 'swipe-left'};
	public xVal: number;

	constructor(private userServices: UsersServices, public toTitleCase: ToTitleCaseKeys, private restService: RESTService) {
	};

	public ngOnInit(): void {
		this.updateKeys(this.listItems);
		this.userServices.userState$.subscribe((twt: TWT) => {
			this.twt = twt;
		})
	}

	public ngOnChanges(): void {
		if(this.listItems){
			console.log('items 91',this.listItems[0]);
			this.updateKeys(this.listItems);
		}
	}

	public updateKeys(list: {} = {}): void {
			if(Array.isArray(list) && list.length > 0){
				console.log('list',list);
				for(let key of Object.keys(list[0])) {
					this.itemKeys.push(key.charAt(0).toUpperCase() + key.slice(1));
				}
			}
	}

	public onSelect(type: string, item: CRMType = <CRMType>{}): void {
			switch (type) {
				case'slide-open':
					this.slide = true;
					this.userServices.setTWTProp({selected: item});
					this.userServices.activeSelectUpdate(item);
					break;
				case'slide-close':
					this.userServices.setTWTProp({selected: {}});
					this.slide = false;
					break;
				case 'details':
					this.userServices.setTWTProp({selected:item});
					this.details = !this.details;
					break;
				case 'option-one':
					this.userServices.setTWTProp(item);
					this.onOptions.emit({option: 'option-one', item: item});
					break;
				case 'option-two':
					this.userServices.setTWTProp(item);
					this.onOptions.emit({option: 'option-two', item: item});
					break;
			}
		}

	public blurrySave(item, key, event): void {
		Object.assign(item, {[key]:event});
		this.onSave.emit(item);
	}

	//todo Gesture Tuning and Implementation
	public swipe(action = this.SWIPE_ACTION.RIGHT, item?: {}) {
		console.log('swiped', action);
		switch (action) {
			case'swipeleft':
				this.onSelect('slide-open', <CRMType>item);
				break;
			case'swiperight':
				this.onSelect('slide-close', <CRMType>item);
				this.userServices.setTWTProp(<TWT>{selected: {}});
		}
	}

	public panning(event, item) {
		this.xVal = event.srcEvent.clientX;
		if (this.xVal === 50) {
			this.onSelect('slide-close', item);
			console.log(event);

		} else if (this.xVal === -50) {
			this.onSelect('slide-open', item);
			console.log(event);
		}
	}
}
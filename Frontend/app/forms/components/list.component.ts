import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {CRMType} from '../../main/models/crm-models.type';
import {ToTitleCaseKeys} from '../../shared/pipes/toTitleCase.pipe';
import {ModelService} from '../../shared/services/model.service';
import {FormControl, FormGroup} from '@angular/forms';
import {List} from '../services/forms.service';

//Todo take off collapses
@Component({
	selector: 'list-component',
	template: `
		<!--//master-->
		<div class="row">
			<div>
			</div>
			<list-subheader class="col-xs-12" *ngIf="title">
				<h1>{{title}}</h1>
			</list-subheader>
			<list-group *ngIf="dataReady" class="col-xs-12">
				<div *ngFor="let entry of listItems.items">
					<list-item-slide>
						<slide-top (click)="slide ? onSelect('slide-close', entry) : onSelect('slide-open', entry)"
								   class="swipe-box"
								   ng-style="{'transform': 'rotate('+number+'deg)', '-webkit-transform': 'rotate('+number+'deg)', '-ms-transform': 'rotate('+number+'deg)'}"
								   (pan)="panning($event, entry)" (swipeLeft)="swipe($event.type, entry)"
								   (swipeRight)="swipe($event.type,  entry)"
								   [class.active]="selected?.id === entry?.id"
								   [class.option]="(optionOne || optionTwo) && !(optionOne && optionTwo)"
								   [class.options]="optionOne && optionTwo">{{entry.name}}
						</slide-top>
						<slide-details-option (click)="(details = !details) && action.emit({type: 'SELECT_DETAILS', payload: entry})">
							<i class="glyphicon glyphicon-info-sign"></i>
						</slide-details-option>
						<slide-option *ngIf="optionTwo" (click)="action.emit({type: 'SELECT_OPTION_TWO', payload: entry})">
							<b>{{optionTwo}}</b>
						</slide-option>
						<slide-option *ngIf="optionOne" (click)="action.emit({type: 'SELECT_OPTION_ONE', payload: entry})">
							<b>{{optionOne}}</b>
						</slide-option>
					</list-item-slide>
					<!--//details-->
					<item-details *ngIf="!!details && selected.id === entry.id">
						<div *ngFor="let question of entry.questions">
							<div [formGroup]="detailsForm">
								<input-component [label]="question.label"
												 (onBlur)="blurrySave($event, entry, question.key)"
												 [(model)]="question.value"></input-component>
							</div>
						</div>
					</item-details>
					<!--<list-group *ngIf="!!listItems.subLists">-->
						<!--<h2>SubLists</h2>-->
						<!--<div *ngFor="let subList of listItems.subLists" >-->
							<!--{{subList.title}}-->
							<!--<list-component [createContext]="subList.title" *ngFor="let subList of listItems.subLists" [listItems]="subList.items" [controls]="subList.controls"></list-component>-->
						<!--</div>-->
					<!--</list-group>-->
				</div>
			</list-group>
		</div>
	`,
})

export class ListComponent implements OnInit, OnChanges {
	@Input()
	public state;
	@Input()
	public data;
	@Input()
	public createContext: string;
	@Input()
	public selected: CRMType = <CRMType>{};
	@Input()
	public listItems: List = <List>{};
	@Input()
	public controls: {[name: string]:FormControl} = <{[name: string]:FormControl}>{};
	@Input()
	public title: string;
	@Input()
	public optionOne?: string;
	@Input()
	public optionTwo?: string;
	@Output()
	public action: EventEmitter<any> = new EventEmitter<any>();
	@Output()
	public onSave: EventEmitter<any> = new EventEmitter<any>();
	public dataReady: boolean = false;
	public details: boolean = true;
	public slide: boolean = false;
	public SWIPE_ACTION = {RIGHT: 'swipe-right', LEFT: 'swipe-left'};
	public xVal: number;
	@Input()
	public detailsForm: FormGroup;

	constructor(
		public toTitleCase: ToTitleCaseKeys,
		private modelService: ModelService,
	) {};

	public ngOnInit(): void {}

	public ngOnChanges(): void {
		if (this.detailsForm){
			this.dataReady= true;
		}
		console.log('list component', this.listItems);
	}

	public onSelect(type: string,  model: CRMType = <CRMType>{}): void {
		switch (type) {
			case'slide-open':
				this.slide = true;
				this.action.emit({type: 'STATE_SELECTED_ITEM', payload: {item: model}});
				break;
			case'slide-close':
				this.action.emit({type: 'STATE_UNSELECTED_ITEM', payload: {item: model}});
				this.slide = false;
				break;
			case 'details-pressed':
				this.action.emit({type: 'STATE_DETAILS_PRESSED', payload: {item: model}});
				break;
		}
	}

	public blurrySave(event, form, key): void {
		this.action.emit({
			type: 'SERVICE_SET_' + this.state.contextFocus,
			payload: {
				model: form,
				key: key,
				newVal: event
			}
		})
	}

	//todo Gesture Tuning and Implementation
	public swipe(action = this.SWIPE_ACTION.RIGHT, question?: {}) {
		console.log('swiped', action);
		switch (action) {
			case'swipeleft':
				this.onSelect('slide-open', <CRMType>question);
				break;
			case'swiperight':
				this.onSelect('slide-close', <CRMType>question);
		}
	}

	public panning(event, question) {
		this.xVal = event.srcEvent.clientX;
		if (this.xVal === 50) {
			this.onSelect('slide-close', question);
			console.log(event);

		} else if (this.xVal === -50) {
			this.onSelect('slide-open', question);
			console.log(event);
		}
	}

}

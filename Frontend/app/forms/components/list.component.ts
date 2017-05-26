import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CRMType} from '../../main/models/crm-models.type';
import {Capitalize} from '../../shared/pipes/toTitleCase.pipe';
import {FormGroup} from '@angular/forms';
import {List} from '../models/lists.model';
import {StateInstance} from '../../store/models/state.model';

//Todo take off collapses
@Component({
	selector: 'list-component',
	template: `
		<!--//master-->
		List Component
		<div class="row">
			<div>
			</div>
			<list-subheader class="col-xs-12" *ngIf="title">
				<h1>{{title}}</h1>
			</list-subheader>
			<list-group *ngIf="listItemsReady" class="col-xs-12">
				<div *ngFor="let item of itemsList.items">
					<list-item-slide>
						{{item.label}}
						<slide-top (click)="slide ? onSelect('slide_close', item) : onSelect('slide_open', item)"
								   class="swipe-box"
								   ng-style="{'transform': 'rotate('+number+'deg)', '-webkit-transform': 'rotate('+number+'deg)', '-ms-transform': 'rotate('+number+'deg)'}"
								   (pan)="panning($event, item)" (swipeLeft)="swipe($event.type, item)"
								   (swipeRight)="swipe($event.type,  item)"
								   [class.active]="selected?.id === item?.id"
								   [class.option]="(optionOne || optionTwo) && !(optionOne && optionTwo)"
								   [class.options]="optionOne && optionTwo">{{item.name}}
						</slide-top>
						<slide-details-option (click)="onSelect('details', item)">
							<span class="icon icon-cog"></span>
						</slide-details-option>
						<slide-option *ngIf="optionOne" (click)="optionOne.emit({type: 'CACHE_SELECT_OPTION_ONE', payload: item})">
							<b>{{optionTwo}}</b>
						</slide-option>
						<slide-option *ngIf="optionTwo" (click)="optionTwo.emit({type: 'CACHE_SELECT_OPTION_TWO', payload: item})">
							<b>{{optionOne}}</b>
						</slide-option>
					</list-item-slide>
					<!--//details-->
					<item-details *ngIf="!!details && selected.id === item.id">
						<div [formGroup]="form">
							<div *ngFor="let question of itemsList.questions">
								<input-component [label]="question.label" (onBlur)="action.emit({type: 'SERVICE_' + listContext.toUpperCase() + '_SET', payload: { modelID: item.id, val: $event, prop: question.key}})" [(model)]="question.model">

								</input-component>
							</div>
						</div>
					</item-details>
				</div>
			</list-group>
		</div>
	`,
})

export class ListComponent implements OnInit, OnChanges {
	@Input()
	public currentState: StateInstance = {};
	@Input()
	public listContext: string;
	@Input()
	public itemsList: List = <List>{};
	@Input()
	public form: FormGroup;
	@Input()
	public title: string;
	@Input()
	public optionOne?: EventEmitter<{}> = new EventEmitter<{}>();
	@Input()
	public optionTwo?: EventEmitter<{}> = new EventEmitter<{}>();
	@Output()
	public action: EventEmitter<any> = new EventEmitter<any>();
	@Input()
	public detailsForm: FormGroup;
	@Input()
	public listItemsReady: boolean = false;
	public slide: boolean = false;

	//Todo Gesture stuff
	public SWIPE_ACTION = {RIGHT: 'swipe-right', LEFT: 'swipe-left'};
	public xVal: number;

	constructor(public toTitleCase: Capitalize) {
	};

	public ngOnInit(): void {
	}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		this.listItemsReady = false;
		if (simpleChanges['itemsList'].currentValue) {
			this.listItemsReady = true;
		}
	}

	public onSelect(type: string, model: CRMType = <CRMType>{}): void {
		switch (type.split('_')[0]) {
			case'slide':
				this.action.emit({type: 'CACHE_SELECTED_ITEM', payload: {['selected_' + model.id]: model}});
				this.action.emit({
					type: 'STATE_ITEM_SELECTED',
					payload: {[model.id]: {selected: true, details: false}}
				});
				//todo Open/Close
				this.action.emit({type: 'CACHE_UNSELECTED_ITEM', payload: {['selected_' + model.id]: null}});
				this.action.emit({
					type: 'STATE_ITEM_UNSELECTED',
					payload: {[model.id]: {selected: false, details: false}}
				});
				break;
			case'details-pressed':
				this.action.emit({type: 'STATE_DETAILS_PRESSED', payload: {selected: true, details: true}});
				break;
		}
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

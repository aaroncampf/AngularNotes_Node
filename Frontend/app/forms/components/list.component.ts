import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Capitalize} from '../../shared/pipes/toTitleCase.pipe';
import {FormGroup} from '@angular/forms';
import {List} from '../models/lists.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Subscription} from 'rxjs/Subscription';
import * as _ from 'lodash';

export const ITEM_INITIAL_STATE = {
	selectedLeft: false,
	selectedRight: false,
	showDetails: false,
	hasOptionOne: false,
	hasOptionTwo: false
};

export interface ListState {
	id: number;
	[itemIndex: number]: ItemState;
}

export interface ItemState {
	selectedLeft: boolean;
	selectedRight: boolean;
	showDetails: boolean;
	hasOptionOne: boolean;
	hasOptionTwo: boolean;
}

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
				<div *ngFor="let item of itemsList.items; let i = index">
					<list-item-slide>
						{{item.label}}
						<slide-top (click)="itemPressed({type: 'ITEM_PRESSED', payload: {index: i}})"
								   class="swipe-box"
								   [class.active]="listState$[i] && listState$[i].selectedLeft"
								   [class.option]="listState$[i] && listState$[i].hasOptionOne && !listState$[i].hasOptionTwo && listState$[i].selectedRight"
								   [class.options]="listState$[i] && listState$[i].hasOptionOne && listState$[i].hasOptionTwo && listState$[i].selectedRight">
							{{item.name}}
						</slide-top>
						<slide-details-option (click)="itemPressed({type: 'details', payload: item})">
							<img src="../../../assets/icons/SVG/info.svg" alt="circled info svg for details">
						</slide-details-option>
						<slide-option *ngIf="optionOne"
									  (click)="optionOne.emit({type: 'CACHE_SELECT_OPTION_ONE', payload: item})">
							<b>{{optionTwo}}</b>
						</slide-option>
						<slide-option *ngIf="optionTwo"
									  (click)="optionTwo.emit({type: 'CACHE_SELECT_OPTION_TWO', payload: item})">
							<b>{{optionOne}}</b>
						</slide-option>
					</list-item-slide>
					<!--//details-->
					<!--<item-details *ngIf="!!details && selected.id === item.id">-->
					<!--<div [formGroup]="form">-->
					<!--<div *ngFor="let question of itemsList.questions">-->
					<!--<input-component [label]="question.label"-->
					<!--(onBlur)="action.emit({type: 'SERVICE_' + listContext.toUpperCase() + '_SET', payload: { modelID: item.id, val: $event, prop: question.key}})"-->
					<!--[(model)]="question.model"></input-component>-->
					<!--</div>-->
					<!--</div>-->
					<!--</item-details>-->
				</div>
			</list-group>
		</div>
	`,
})

export class ListComponent implements OnInit, OnChanges {
	// @Input()
	// public state$: StateInstance = {};
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
	public listStateSource: BehaviorSubject<ListState>;
	public listState$: ListState;
	public listStateSub: Subscription;
	public slide: boolean = false;
	public listID: number;

	//Todo Gesture stuff
	public SWIPE_ACTION = {RIGHT: 'swipe-right', LEFT: 'swipe-left'};
	public xVal: number;

	constructor(public toTitleCase: Capitalize) {};

	public ngOnInit(): void {
		this.action.emit({type: 'STATE_LIST-COMPONENT_INITIALIZING'});
		this.listID = Date.now();
		this.listStateSource = new BehaviorSubject<ListState>({id: this.listID});
		this.listStateSub = this.listStateSource.asObservable().subscribe(state => this.listState$ = state);
		this.action.emit({type: 'STATE_LIST-COMPONENT_INITIALIZING-DONE'});
	}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		// this.listItemsReady = false;
		if (simpleChanges['itemsList'] && simpleChanges['itemsList'].currentValue) {
			console.log('list Items', this.itemsList);
			this.listItemsReady = true;
		}
	}

	public itemPressed(action): void {
		const listState = this.listStateSource.getValue();
		const itemState = listState[action.payload.index];
		console.log('Old State', itemState);
		const updatedItemState = this.itemReducer(action, itemState);
		console.log('New State', updatedItemState);
		const updatedListState = _.merge(listState, {[action.payload.index]:updatedItemState});
		this.listStateSource.next(updatedListState);
	}

	public itemReducer(action, state: ItemState = ITEM_INITIAL_STATE): ItemState {
		console.log('ItemReducer', action, state);
		switch (action.type){
			case'ITEM_PRESSED':
				if (!state.selectedRight && !state.selectedLeft) {
					console.log('Item Pressed 1', action, state);
					return Object.assign({}, state, {
						selectedLeft: true,
						selectedRight: false,
					});
				}
				if (state.selectedRight === true && state.hasOptionOne) {
					console.log('Item Pressed 2', action, state);
					return Object.assign({}, state, {
						selectedLeft: false,
						selectedRight: false
					});
				}
					console.log('Item Pressed 3', action, state);
				return Object.assign({}, state, {
					selectedLeft: !state.selectedLeft,
					selectedRight: !state.selectedRight
				});
		}
	}

	//todo Gesture Tuning and Implementation
	public swipe(action = this.SWIPE_ACTION.RIGHT, question?: {}) {
		console.log('swiped', action);
		switch (action) {
			case'swipeleft':
				// this.itemReducer('slide-open', <CRMType>question);
				break;
			case'swiperight':
				// this.itemReducer('slide-close', <CRMType>question);
		}
	}

	public panning(event, question) {
		this.xVal = event.srcEvent.clientX;
		if (this.xVal === 50) {
			// this.itemReducer({type: 'slide-close', question);
			console.log(event);

		} else if (this.xVal === -50) {
			// this.itemReducer('slide-open', question);
			console.log(event);
		}
	}

}

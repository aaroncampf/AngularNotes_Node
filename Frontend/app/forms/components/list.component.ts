import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UsersService} from '../../users/users.services';
import {CRMType} from '../../shared/models/crm-models.type';
import {ListItems, TWT} from '../../users/user.model';
import {ToTitleCaseKeys} from '../../shared/pipes/toTitleCase.pipe';
import {ModelService} from '../../shared/services/model.service';
import {QuestionBase} from '../base-question.class';
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
						<slide-details-option (click)="action.emit('touched', {type: 'details-toggle', entry})">
							<i class="glyphicon glyphicon-info-sign"></i>
						</slide-details-option>
						<slide-option *ngIf="optionTwo" (click)="action.emit('touched', {type: optionOne, entry})">
							<b>{{optionTwo}}</b>
						</slide-option>
						<slide-option *ngIf="optionOne" (click)="action.emit('touched', {type: optionTwo, entry})">
							<b>{{optionOne}}</b>
						</slide-option>
					</list-item-slide>
					<!--//details-->
					<item-details *ngIf="!!details && selected.id === entry.id">
						<div *ngFor="let question of entry.questions">
							<div [formGroup]="detailsForm">
								<input-component [label]="question.label"
												 (onBlur)="blurrySave(entry.id, question.key, $event)"
												 [(model)]="question.value"></input-component>
							</div>
						</div>
					</item-details>
					<list-group *ngIf="!!listItems.subLists">
						<h2>SubLists</h2>
						<div *ngFor="let subList of listItems.subLists" >
							{{subList.title}}
							<list-component [createContext]="subList.title" *ngFor="let subList of listItems.subLists" [listItems]="subList.items" [controls]="subList.controls"></list-component>
						</div>
					</list-group>
				</div>
			</list-group>
		</div>
	`,
})

export class ListComponent implements OnInit, OnChanges {
	public dataReady: boolean = false;
	@Input()
	public details: boolean = false;
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
	public slide: boolean = false;
	public SWIPE_ACTION = {RIGHT: 'swipe-right', LEFT: 'swipe-left'};
	public xVal: number;
	public detailsForm: FormGroup;

	constructor(
		private userServices: UsersService,
		public toTitleCase: ToTitleCaseKeys,
		private modelService: ModelService,
	) {};

	public ngOnInit(): void {
	}

	public ngOnChanges(): void {
		this.detailsForm = new FormGroup(this.controls);
		this.dataReady= true;
		console.log('list component', this.listItems);
	}

	public onSelect(type: string,  model: CRMType = <CRMType>{}): void {
		switch (type) {
			case'slide-open':
				this.slide = true;
				this.userServices.setTWTProp({selected:  model});
				this.modelService.selectedUpdate( model);
				break;
			case'slide-close':
				this.userServices.setTWTProp({selected: {}});
				this.slide = false;
				break;
			case 'details-pressed':
				this.details = !this.details;
				break;
		}
	}

	public blurrySave(id, key, event): void {
		this.onSave.emit({id: id, prop: {
			[key]: event}
		});
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
				this.userServices.setTWTProp(<TWT>{selected: {}});
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

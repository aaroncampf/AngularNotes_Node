import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UsersService} from '../../users/users.services';
import {CRMType} from '../../shared/models/crm-models.type';
import {TWT} from '../../users/user.model';
import {ToTitleCaseKeys} from '../../shared/pipes/toTitleCase.pipe';
import {ModelService} from '../../shared/services/model.service';
import {QuestionBase} from '../base-question.class';
import {FormControl, FormGroup} from '@angular/forms';

//Todo take off collapses
@Component({
	selector: 'list-component',
	template: `
		<!--//master-->
		<div class="row">
			<div *ngIf="parentCreate" >
				<button class="btn btn-block" [routerLink]="['/create']">Add New</button>
				<form-component [controls]="" [questions]=""></form-component>
			</div>
			<list-subheader class="col-xs-12" *ngIf="title">
				<h4>{{title}}</h4>
			</list-subheader>
			<list-group *ngIf="dataReady" class="col-xs-12">
				<div *ngFor="let model of listItems">
					<list-item-slide>
						<slide-top (click)="slide ? onSelect('slide-close', model) : onSelect('slide-open', model)"
								   class="swipe-box"
								   ng-style="{'transform': 'rotate('+number+'deg)', '-webkit-transform': 'rotate('+number+'deg)', '-ms-transform': 'rotate('+number+'deg)'}"
								   (pan)="panning($event, model)" (swipeLeft)="swipe($event.type, model)"
								   (swipeRight)="swipe($event.type,  model)"
								   [class.active]="selected?.id === model?.id"
								   [class.option]="(optionOne || optionTwo) && !(optionOne && optionTwo)"
								   [class.options]="optionOne && optionTwo">{{model.name}}
						</slide-top>
						<slide-details-option (click)="onSelect('details')">
							<i class="glyphicon glyphicon-info-sign"></i>
						</slide-details-option>
						<slide-option *ngIf="optionTwo" (click)="onSelect('option-one', question)">
							<b>{{optionTwo}}</b>
						</slide-option>
						<slide-option *ngIf="optionOne" (click)="onSelect('option-two', question)">
							<b>{{optionOne}}</b>
						</slide-option>
					</list-item-slide>
					<!--//details-->
					<item-details *ngIf="!!details && selected.id === model.id">
							<div *ngFor="let question of model.questions">
								<div [formGroup]="detailsForm">
									<input-component [label]="question.label" (onBlur)="blurrySave(model.id, question.key, $event)" [(model)]="question.value"></input-component>
								</div>
							</div>
					</item-details>
				</div>
			</list-group>
			<list-group>
				<div *ngFor="let subList of subLists" >
					<button class="btn btn-block" (click)="showForm(subList.title)">Add New</button>
					<form-component *ngIf="" [controls]="" [questions]=""  ></form-component>
				</div>
			</list-group>
		</div>
	`
})

export class ListComponent implements OnInit, OnChanges {
	public dataReady: boolean = false;
	@Input()
	public selected: CRMType = <CRMType>{};
	@Input()
	public subLists: any[];
	@Input()
	public listItems: QuestionBase<any>[] = <QuestionBase<any>[]>[];
	@Input()
	public controls: {[name: string]:FormControl} = <{[name: string]:FormControl}>{};
	@Input()
	public title: string;
	@Input()
	public optionOne: string;
	@Input()
	public optionTwo: string;
	@Output()
	public onOptionOne: EventEmitter<any> = new EventEmitter<any>();
	@Output()
	public onOptionTwo: EventEmitter<any> = new EventEmitter<any>();
	@Output()
	public onSave: EventEmitter<any> = new EventEmitter<any>();
	public slide: boolean = false;
	public details: boolean = false;
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
			case 'option-one-pressed':
				this.userServices.setTWTProp( model);
				this.onOptionOne.emit(model);
				break;
			case 'option-two-pressed':
				this.userServices.setTWTProp(model);
				this.onOptionTwo.emit(model);
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
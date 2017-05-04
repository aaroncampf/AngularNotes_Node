import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {UsersService} from '../../users/users.services';
import {CRMType} from '../models/crm-models.type';
import {TWT} from '../../users/user.model';
import {ToTitleCaseKeys} from '../pipes/toTitleCase.pipe';
import {ModelService} from '../services/model.service';
import {QuestionService} from '../services/question.service';
import {QuestionBase} from '../../main/forms/base-question.class';

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
			<list-group *ngIf="dataReady" class="col-xs-12">
				<div *ngFor="let question of questions">
					<list-item-slide [class.collapse]="twt?.selected?.id !== question.id && details">
						<slide-top (click)="slide ? onSelect('slide-close') : onSelect('slide-open', question)"
								   class="swipe-box"
								   ng-style="{'transform': 'rotate('+number+'deg)', '-webkit-transform': 'rotate('+number+'deg)', '-ms-transform': 'rotate('+number+'deg)'}"
								   (pan)="panning($event, question)" (swipeLeft)="swipe($event.type, question)"
								   (swipeRight)="swipe($event.type)"
								   [class.active]="question.id === twt?.selected?.id"
								   [class.option]="(optionOne || optionTwo) && !(optionOne && optionTwo)"
								   [class.options]="optionOne && optionTwo">{{question.name || question.title}}
						</slide-top>
						<slide-details-option (click)="onSelect('details', question)">
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
					<item-details *ngIf="details && twt?.selected?.id === question.id">
						<list-item *ngFor="let detailQuestion of questions">
							<input-component [label]="detailQuestion.label" [(model)]="detailQuestion[question.key]"
											 (onBlur)="blurrySave(detailQuestion.id, $event)"></input-component>
						</list-item>
					</item-details>
				</div>
			</list-group>
		</div>
	`
})

export class ListComponent implements OnInit, OnChanges {
	public dataReady: boolean = false;
	@Input()
	public listItems: CRMType[] = <CRMType[]>[];
	@Input()
	public title: string;
	@Input()
	public header: string;
	@Input()
	public optionOne: string;
	@Input()
	public optionTwo: string;
	@Input()
	public twt: TWT;
	@Output()
	public onOptions: EventEmitter<any> = new EventEmitter<any>();
	@Output()
	public onSave: EventEmitter<any> = new EventEmitter<any>();
	public slide: boolean = false;
	public details: boolean = false;
	public questions: (QuestionBase<string> | string)[] = <QuestionBase<string>[]>[];
	// public tokenTest: TWT = <TWT>{};
	public SWIPE_ACTION = {RIGHT: 'swipe-right', LEFT: 'swipe-left'};
	public xVal: number;

	constructor(
		private userServices: UsersService,
		public toTitleCase: ToTitleCaseKeys,
		private modelService: ModelService,
		private questionService: QuestionService,
	) {};

	public ngOnInit(): void {
	}

	public ngOnChanges(): void {

		if(this.listItems) {
			this.questions = this.questionService.initQuestions(this.listItems);
			this.dataReady = true;
		}
	}

	public onSelect(type: string, question: CRMType = <CRMType>{}): void {
		switch (type) {
			case'slide-open':
				this.slide = true;
				this.userServices.setTWTProp({selected: question});
				this.modelService.selectedUpdate(question);
				break;
			case'slide-close':
				this.userServices.setTWTProp({selected: {}});
				this.slide = false;
				break;
			case 'details':
				this.userServices.setTWTProp({selected:question});
				this.details = !this.details;
				break;
			case 'option-one':
				this.userServices.setTWTProp(question);
				this.onOptions.emit({option: 'option-one', question: question});
				break;
			case 'option-two':
				this.userServices.setTWTProp(question);
				this.onOptions.emit({option: 'option-two', question: question});
				break;
		}
	}

	public blurrySave(id: string, event: any): void {
		console.log('blurry save cares about what you tap.. ');
		this.onSave.emit({id: id, [Object.keys(event)[0]]: event});
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
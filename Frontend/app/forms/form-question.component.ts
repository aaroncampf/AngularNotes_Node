import {Component, EventEmitter, Input, Output} from '@angular/core';
import {QuestionBase} from './base-question.class';
import {FormGroup} from '@angular/forms';

@Component({
	selector: 'fq-question',
	template: `
			<label [attr.for]="question.key">{{question.label}}</label>
			<div *ngIf="form.controls" [ngSwitch]="question.controlType">
				<!--<input-component *ngSwitchCase="'text'" [type]="question.type" (blur)="blurred($event, key)" [control]="form.controls[question.key]" [model]="question.value"></input-component>-->
				<!--<input *ngSwitchCase="'textbox'" [formControlName]="question.key" [id]="question.key" [type]="question.type" (blur)="blurred($event, key)" [value]="question.value"/>-->
				<!--<select *ngSwitchCase="'select'" [formControlName]="question.key" [id]="question.key" (blur)="blurred($event, key)">-->
					<!--<option *ngFor="let opt of question?.options" [value]="opt.key">opt.value</option>-->
				<!--</select>-->
			</div>
			<div class="errorMessage" *ngIf="form.invalid">{{question.label}} is needed.</div>
	`
})
export class FormQuestionComponent {
	@Input()
	public question: QuestionBase<any> = <QuestionBase<any>>{};
	@Input()
	public form: FormGroup;
	@Output()
	public onBlur: EventEmitter<any> = new EventEmitter<any>();

	// public get isValid() {
	// 	return this.form.controls[this.question.key].valid
	// }

	public blurred(event, key): void {
		this.onBlur.emit({[key]:event});
	}
}
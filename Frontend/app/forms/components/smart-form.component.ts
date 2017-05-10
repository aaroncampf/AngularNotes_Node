import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {SocketService} from '../../shared/services/socket.service';
import {TWT} from '../../users/user.model';
import {QuestionService} from '../services/question.service';
import {UsersService} from '../../users/users.services';
import {Router} from '@angular/router';
import {ModelService} from '../../shared/services/model.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
	selector: 'form-component',
	template: `
	<div *ngIf="dataReady === true" [formGroup]="form">
		<h1><small>CREATE</small>{{this.twt.viewContext.toUpperCase()}}</h1>
		<div *ngFor="let question of models[0].questions" class="form-row">
			<input-component [label]="question.label" [control]="controls[question.key]" [(model)]="question.value"></input-component>
		</div>
		<div class="form-row">
			<button (click)="onSubmit(form.value)" class="btn btn-lg" role="button" type="submit" [disabled]="form.invalid" [class.disabled]="form.invalid">Create</button>
		</div>
	</div>
	`,
})

export class SmartFormComponent implements OnInit, OnDestroy {
	public models: any[] = [];
	public get endpoint(): string {
		return `${this.twt.viewContext}.create`
	};

	public controls: {} = {};
	public questions: any[] = [];
	public twt: TWT;
	public form: FormGroup;
	public twtSub: Subscription;
	public dataReady: boolean = false;
	constructor(
		private modelService: ModelService,
		public toastr: ToastsManager,
		private questionService: QuestionService,
		private socketService: SocketService,
		private userServices: UsersService,
		private router: Router
		){}

	public ngOnInit(): void {
		this.twtSub = this.userServices.userState$
			.subscribe(twt => {
				this.twt = twt;
				this.models =  this.questionService.initQuestions([this.modelService.newModel(this.twt.viewContext)]);
				this.controls = this.questionService.initControlsFromQuestions(this.models[0].questions);
				this.form = new FormGroup(this.controls);
				console.log('controls', this.controls, this.models);
				this.dataReady = true;
			});
	}

	public ngOnDestroy(): void {
		this.twtSub.unsubscribe();
	}

	public onSubmit(form: any): void {
			let payload = {props: form};
			console.log('payload', payload);
		this.socketService.responseSocket(this.endpoint, payload)
			.subscribe(response => {
				if (response.error) {
					this.toastr.error('Error with creation: ' + response.error);
				} else {
					console.log('hit toastr');
					this.toastr.success('Successfully Created!');
					this.router.navigate([`/${this.twt.viewContext}`])
				}
		})
	}
}
import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {SocketService} from '../../shared/services/socket.service';
import {TWT} from '../../users/user.model';
import {QuestionControls, QuestionService} from '../../shared/services/question.service';
import {UsersService} from '../../users/users.services';
import {CRMType} from '../../shared/models/crm-models.type';
import {QuestionBase} from './base-question.class';
import {ActivatedRoute, Router} from '@angular/router';
import {ModelService} from '../../shared/services/model.service';

@Component({
	selector: 'form-component',
	template: `
	<div *ngIf="twt.viewMode === 'create' && dataReady === true" [formGroup]="form">
		<h1><small>CREATE</small>{{this.twt.viewContext.toUpperCase()}}</h1>
		<div *ngFor="let question of questions" class="form-row" >
			<input-component [label]="question.label" [control]="controls[question.key]" [(model)]="question.value"></input-component>
		</div>
		<div *ngIf="twt.viewMode === 'create'" class="form-row">
			<button (click)="onSubmit(form.value)" class="btn btn-lg" role="button" type="submit" [disabled]="form.invalid" [class.disabled]="form.invalid">Create</button>
		</div>
	</div>
	`,
})

export class FormComponent implements OnInit {
	public questions: QuestionBase<any>[] = [];
	public get endpoint(): string {
		return `${this.twt.viewContext}.create`
	};
	public controls: QuestionControls = <QuestionControls>{};
	public twt: TWT;
	public form: FormGroup;
	public dataReady: boolean = false;
	constructor(
		private modelService: ModelService,
		public toastr: ToastsManager,
		private questionService: QuestionService,
		private socketService: SocketService,
		private userServices: UsersService,
		private route: ActivatedRoute,
		private router: Router
		){}

	public ngOnInit(): void {
		this.userServices.userState$
			.subscribe(twt => {
				this.twt = twt;
			});
			this.route.url
				.subscribe(url => {
					this.userServices.setTWTProp({viewMode: url[0].path});
					this.socketService.responseSocket(`${this.twt.viewContext}.get`, {})
						.subscribe((items: CRMType[]) => {
						if(items && items.length > 0) {
							this.questions = this.questionService.initQuestions(items);
							this.controls = this.questionService.initControlsFromQuestions(this.questions);
							console.log('Form component', this.controls, this.questions);
							this.form = new FormGroup(this.controls);
							this.dataReady =  true;
						} else {
							this.questions = this.questionService.initQuestions([this.modelService.newModel(this.twt.viewContext)]);
							this.controls = this.questionService.initControlsFromQuestions(this.questions);
								console.log('hit new item', this.questions, this.controls);
								this.form = new FormGroup(this.controls);
								this.dataReady = true;
						}
				});
		});
	}



	public blurrySave(event): void {
		this.socketService.responseSocket(this.endpoint, event).subscribe(response => {
			if (response.error) {
				this.toastr.error('Error: Data may not save right now.');
			}
		})
	}

	public onSubmit(payload: any): void {
			console.log('payload', payload);
		this.socketService.responseSocket(this.endpoint, payload)
			.subscribe(response => {
				if (response.error) {
					this.toastr.error('Error with creation: ' + response.error);
				} else {
					this.toastr.success('Successfully Created!').then(() => {
					this.router.navigate([`/${this.twt.viewContext}`])
					})
				}
		})
	}
}
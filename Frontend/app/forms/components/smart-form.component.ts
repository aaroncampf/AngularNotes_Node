import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {SocketService} from '../../shared/services/socket.service';
import {FormsService} from '../services/forms.service';
import {ModelService} from '../../shared/services/model.service';
import {Subscription} from 'rxjs/Subscription';
import {WritableStateTokenService} from '../../store/state-token/wst.service';
import {WST} from '../../store/state-token/wst.model';
import {Router} from '@angular/router';

@Component({
	selector: 'smart-form-component',
	template: `
	<div class="row">
		<div *ngIf="dataReady === true" [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
			<h1><small>CREATE</small>{{this.wst.viewContext.toUpperCase()}}</h1>
			<div *ngFor="let question of wst.questions" class="form row">
				<input-component [label]="question.label" [control]="wst.listItems.controls[question.key]" [(model)]="question.value"></input-component>
			</div>
			<div class="form-row">
				<button (click)="onSubmit(form.value)" class="btn btn-lg" role="button" type="submit" [disabled]="form.invalid" [class.disabled]="form.invalid">Create</button>
			</div>
		</div>
	</div>
	`,
})

export class SmartFormComponent implements OnInit, OnDestroy {
	public models: any[] = [];
	public get endpoint(): string {
		return `${this.wst.viewContext}.create`
	};

	public controls: {} = {};
	public questions: any;
	public wst: WST;
	public form: FormGroup;
	public twtSub: Subscription;
	public dataReady: boolean = false;
	constructor(
		private modelService: ModelService,
		private wstService: WritableStateTokenService,
		public toastr: ToastsManager,
		private formsService: FormsService,
		private socketService: SocketService,
		private router: Router,
		){}

	public ngOnInit(): void {
		this.twtSub = this.wstService.userState$
			.subscribe(wst => {
				this.wst = wst;
				this.formsService.QuestionsFactory([this.modelService
						.newModel(this.wst.viewContext)])
				this.form = new FormGroup(this.wst.listItems.controls);
				console.log('controls', this.form, this.models);
				this.dataReady = true;
			});
	}

	public ngOnDestroy(): void {
		this.twtSub.unsubscribe();
	}

	public onSubmit(data: any): void {
			let payload = {props: data};
			console.log('payload', payload);
		this.socketService.responseSocket(this.endpoint, payload)
			.subscribe(response => {
				if (response.error) {
					this.toastr.error('Error with creation: ' + response.error);
				} else {
					console.log('hit toastr');
					this.toastr.success('Successfully Created!');
					this.router.navigate([`/main`])
				}
		})
	}
}
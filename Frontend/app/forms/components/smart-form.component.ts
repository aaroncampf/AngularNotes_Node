import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {SocketService} from '../../shared/services/socket.service';
import {FormsService} from '../services/forms.service';
import {ModelService} from '../../shared/services/model.service';
import {StateService} from '../../store/service/state.service';
import {RDCache} from '../../store/models/typescript-cache.model';
import {Router} from '@angular/router';
import {CRMState} from '../../store/models/state.model';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';

@Component({
	selector: 'smart-form-component',
	template: `
		<div class="row">
			<div *ngIf="dataReady === true" [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
				<h1>
					<small>CREATE</small>
					{{this.state$.viewContext.toUpperCase()}}
				</h1>
				<div *ngFor="let question of tc.questions" class="form row">
					<input-component [label]="question.label" [control]="tc.listItems.controls[question.key]"
									 [(model)]="question.value"></input-component>
				</div>
				<div class="form-row">
					<button (click)="onSubmit(form.value)" class="btn btn-lg" role="button" type="submit"
							[disabled]="form.invalid" [class.disabled]="form.invalid">Create
					</button>
				</div>
			</div>
		</div>
	`,
})

export class SmartFormComponent implements OnInit, OnDestroy {
	public models: any[] = [];

	public get endpoint(): string {
		return `${this.state$.viewContext}.create`
	};

	public controls: {} = {};
	public questions: any;
	public state$: CRMState;
	public form: FormGroup;
	public stateSub: Subscription;
	public rdCache$: RDCache;
	public cacheSub: Subscription;
	public dataReady: boolean = false;
	constructor(

		private _store: Store<any>,
		private modelService: ModelService,
		private stateService: StateService,
		public toastr: ToastsManager,
		private formsService: FormsService,
		private socketService: SocketService,
		private router: Router,
		){}

	public ngOnInit(): void {
			this.stateSub = this._store.subscribe(update => this.state$ = update);
			this.cacheSub = this.stateService.tc$.subscribe( update => {
				this.rdCache$ = update;
				console.log('this rdCache', this.rdCache$);
			});
			// .subscribe((state) => {
			// 	this.state$ = state;
			// 	this.formsService.QuestionsFactory([this.modelService.newModel(this.state$.viewContext)]);
			// 				this.form = new FormGroup(this.tc$[this.state$.viewContext].controls);
			// 				console.log('controls', this.form, this.models);
			// 	this.dataReady = true;
			// });
		}

	public ngOnDestroy(): void {
		this.stateSub.unsubscribe();
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
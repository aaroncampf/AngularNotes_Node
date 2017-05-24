import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {SocketService} from '../../shared/services/socket.service';
import {StateService} from '../../store/service/state.service';
import {Router} from '@angular/router';
import {LastIndexed} from '../../shared/pipes/lastIndex.pipe';
import {StateInstance} from '../../store/models/state.model';
import {AsyncPipe} from '@angular/common';
@Component({
	selector: 'smart-form-component',
	template: `
		<div class="row">
			<div *ngIf="!!state$.dataReady" [formGroup]="form" (ngSubmit)="onSubmit(form.value)">
				<h1>
					<small>CREATE {{state$.modelContext}} </small>
					<!--{{this.state$.viewContext.toUpperCase()}}-->
				</h1>
				<div *ngFor="let question of cache$[state$.modelContext + 'List']questions" class="form row">
					<input-component [label]="question.label" [control]="tc.listItems.controls[question.key]"
									 [(model)]="question.model"></input-component>
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

export class SmartFormComponent implements OnInit {
	public get endpoint(): string {
		return `${this.state$.modelContext}.create`
	};
	public state$: StateInstance;
	public cache$: any;
	public form: FormGroup = new FormGroup(this.cache$.companiesList.controls);
	constructor(
		private lastIndexed: LastIndexed,
		private asyncPipe: AsyncPipe,
		private stateService: StateService,
		public toastr: ToastsManager,
		private socketService: SocketService,
		private router: Router,
		){}

	public ngOnInit(): void {
		this.cache$ = this.asyncPipe.transform(this.stateService.cache$);
		this.state$ = this.lastIndexed.transform(this.asyncPipe.transform(this.stateService.state$));
	}

	public onSubmit(data: any): void {
		let payload = {props: data};
		this.socketService.responseSocket(this.endpoint, payload)
			.subscribe(response => {
				if (response.error) {
					this.toastr.error('Error with creation: ' + response.error);
				} else {
					this.toastr.success('Successfully Created!');
					this.router.navigate([`/main`])
				}
		})
	}
}
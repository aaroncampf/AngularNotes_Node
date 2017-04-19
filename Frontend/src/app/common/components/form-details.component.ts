import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SocketService} from '../services/socket.service';
import {ToastsManager} from 'ng2-toastr';
import {FormDataFeed} from '../models/form-data.model';

@Component({
	selector: 'form-details-component',
	template: `
	<div class="row">
		<form [formGroup]="formGroupCreate">
			<form-title class="col-xs-12" *ngIf="formData.title">{{formData.title}}</form-title>
			<form-header class="col-xs-12" *ngIf="formData.header">{{formData.header}}</form-header>
			<form-item class="col-xs-12" *ngFor="let item of formData.items" class="row">
				<input-component [label]="item.label" [(model)]="model[item.label]" (onBlur)="onSave($event)" [control]="formGroupCreate.controls[item.controlName]"></input-component>
			</form-item>
		</form>
	</div>
	`
})

export class FormDetailsComponent implements OnInit{
	@Input()
	public formData: FormDataFeed;
	@Input()
	public path: string;
	public model: {} = {};
	public formGroupCreate: FormGroup;
	constructor( private socketService: SocketService,
				 public toastr: ToastsManager){};

	public ngOnInit(): void {
		this.initForm();
	}

	private initForm(): void {
		let tempControls: {} = {};
		for (let item of this.formData.items) {
			this.model = Object.assign(this.model, {
				[item.label]: void 0
			});
			if (item.require === true) {
				tempControls = Object.assign(tempControls, {
					[item.controlName]: new FormControl('',item.validators.concat(Validators.required))
				})
			} else if(item.validators) {
				tempControls = Object.assign(tempControls, {
					[item.controlName]: new FormControl('', item.validators)
				});
			}
		}
		this.formGroupCreate = new FormGroup(tempControls);
	}

	public onSave(event): void {
		if(!this.formGroupCreate.invalid) {
		console.log('save hit', event);
			let savePayLoad: {} = {};
			for (let item of this.formData.items){
				savePayLoad = Object.assign(savePayLoad, {
					[item.label.toLowerCase()]: this.formGroupCreate.controls[item.controlName].value
				});
			}
			console.log('savePayLoad', savePayLoad);
			this.socketService.responseSocket(this.path + '.set', savePayLoad).then(response => {
				this.toastr.success(this.formData.title + ' has been created!');
				console.log('create response', this.path + '.set');
			}, error => {
				this.toastr.error('Sorry, Something went wrong with creating ' + this.formData.title);
				console.log('create error', error);
			})
		}
	}

}
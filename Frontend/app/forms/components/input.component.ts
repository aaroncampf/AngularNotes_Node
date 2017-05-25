import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StateInstance} from '../../store/models/state.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StateService} from '../../store/service/state.service';
import 'rxjs/add/operator/reduce';
import 'rxjs/operator/';
import {Subscription} from 'rxjs/Subscription';

export const INPUT_INITIAL_STATE = (model: string) => {
	return <InputInstance>{
		value: model,
		id: Date.now()
	}
};

export interface InputInstance {
	value: string;
	id: string | number;
}

@Component({
	selector: 'input-component',
	template: `
		<div class="row">
			<div *ngIf="!!label" class="col-xs-3">
				<strong>{{label}}</strong>
			</div>
			<div *ngIf="!!label" class="col-xs-7">

				<input [formControl]="control" [type]="password ? 'password' : 'text'" [ngModel]="model"
					   (ngModelChange)="updateStore($event)" class="form-control"
					   (blur)="onBlur.emit($event.target.value)"
					   [placeholder]="placeholder"/>{{model}}

			</div>
			<div *ngIf="!!label" class="col-xs-2">
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_UNDO', payload: {}}); unDo(model)"><span
						class="icon icon-undo2"></span></button>
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_REDO', payload: {}}); reDo()"><span
						class="icon icon-redo2"></span></button>
			</div>
			<div *ngIf="!label" class="col-xs-10">
				
			
					<input [formControl]="control" [type]="password ? 'password' : 'text'" [ngModel]="model"
					   (ngModelChange)="updateStore($event.target.value)" class="form-control"
					   (blur)="onBlur.emit($event.target.value)"
					   [placeholder]="placeholder"/>{{model}}
			
			
			</div>
			<div *ngIf="!label" class="col-xs-2">
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_UNDO', payload: {}}); unDo(model)"><span
						class="icon icon-undo2"></span></button>
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_REDO', payload: {}}); reDo()"><span
						class="icon icon-redo2"></span></button>
			</div>
		</div>
	`,
})

export class InputComponent implements OnInit, OnDestroy, OnChanges{
	@Output()
	public onBlur: EventEmitter<string> = new EventEmitter<string>();
	@Input()
	public password: boolean;
	@Input()
	public modelUpdate: string;
	@Input()
	public model: string;
	@Input()
	public placeholder: string = '';
	@Input()
	public label: string;
	@Input()
	public control: FormControl = new FormControl;
	@Output()
	public modelChange: EventEmitter<any> = new EventEmitter<any>();
	@Output()
	public action: EventEmitter<StateInstance> = new EventEmitter<StateInstance>();
	public storeSource: BehaviorSubject<InputInstance[]> = new BehaviorSubject<InputInstance[]>([INPUT_INITIAL_STATE(this.model)]);
	public store$ = this.storeSource.asObservable();
	public storeSub: Subscription = new Subscription();

	constructor(public stateService: StateService) {
	}

	public updateStore(val) {
		this.storeSource.next(this.storeSource.getValue().concat([{id: Date.now(), value: val}]));
	}

	public modelChanged(event): void {
		console.log('modelChanged', this.storeSource.getValue());

	}

	public ngOnChanges(simpleChanges: SimpleChanges) {
		if(simpleChanges['modelUpdate']) {
		console.log('modelUpdate : ', simpleChanges);
			this.storeSource.next([{id: Date.now(), value: this.modelUpdate}]);
		}
		console.log('input component CHANGES : ', simpleChanges);
	}

	public ngOnInit(): void {
		this.storeSub = this.store$.subscribe(res => res);
	}

	public ngOnDestroy(): void {
		this.storeSub.unsubscribe();
	}

	public reDo(): void {
		let states;
		this.storeSource.subscribe(statesInstance => {
			states = statesInstance;
			const currentState = this.stateService.nextState(states, states[states.length - 1]).value;
			const newState: InputInstance = {
				value: currentState.value,
				id: Date.now() + '-' + currentState.id
			};
			this.storeSource.next([newState]);
		});
	}

	public unDo(): void {
		let states = this.storeSource.getValue();
			const currentState = this.stateService.previousState(states, states[states.length - 1]).value;
			const newState: InputInstance = {
				value: currentState.value,
				id: Date.now() + '-' + currentState.id
			};
			console.log('undo', newState);
			this.storeSource.next([newState]);
	}
}

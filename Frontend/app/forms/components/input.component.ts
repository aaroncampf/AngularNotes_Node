import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StateInstance} from '../../store/models/state.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {StateService} from '../../store/service/state.service';
import {LastIndexed} from '../../shared/pipes/lastIndex.pipe';
import 'rxjs/operator/reduce';
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
				<input [formControl]="control" [type]="password ? 'password' : 'text'" [ngModel]="(storeSource | async | lastIndexed)?.value"
					   (ngModelChange)="modelChanged($event)" class="form-control"
					   (blur)="onBlur.emit($event.target.value)"
					   [placeholder]="placeholder"/>
			</div>
			<div *ngIf="!!label" class="col-xs-2">
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_UNDO', payload: {}}); unDo(model)"><span
						class="icon icon-undo2"></span></button>
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_REDO', payload: {}}); reDo()"><span
						class="icon icon-redo2"></span></button>
			</div>
			<div *ngIf="!label" class="col-xs-10">
				<input [formControl]="control" [type]="password ? 'password' : 'text'" [ngModel]="(storeSource | async | lastIndexed)?.value"
					   (ngModelChange)="modelChanged($event)" class="form-control"
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
	@Input()
	public store: BehaviorSubject<InputInstance[]> = new BehaviorSubject<InputInstance[]>([INPUT_INITIAL_STATE(this.model)]);
	public storeSource = this.store.asObservable().reduce((acc, cur) => acc.concat(cur), [INPUT_INITIAL_STATE(this.model)]);
	public storeSub: Subscription = new Subscription();

	constructor(public stateService: StateService) {
	}

	public modelChanged(event): void {
		console.log('modelChanged', this.storeSource.subscribe(res => res));
		let states;
		this.storeSource.subscribe(res => {
			states = res;
			this.modelChange.emit(event);
			this.store.next(states.concat([{value: event.target.value, id: Date.now()}]));
		});
	}

	public ngOnChanges(simpleChanges: SimpleChanges) {
		if(simpleChanges['model'] && simpleChanges['model'].firstChange) {

		console.log('hit firstCHANGES : ', simpleChanges);
			this.store.next([{id: Date.now(), value: this.model}]);
		}
		console.log('input component CHANGES : ', simpleChanges);
	}

	public ngOnInit(): void {
		this.storeSub = this.storeSource.subscribe(res => res);
	}

	public ngOnDestroy(): void {
		this.storeSub.unsubscribe();
	}

	public blurred(event): void {
		this.onBlur.emit(event);
	}

	public reDo(): void {
		let states;
		this.store.subscribe(statesInstance => {
			states = statesInstance;
			const currentState = this.stateService.nextState(states, states[states.length - 1]).value;
			const newState: InputInstance = {
				value: currentState.value,
				id: Date.now() + '-' + currentState.id
			};
			this.store.next([newState]);
		});
	}

	public unDo(): void {
		let states;
		this.store.subscribe(statesInstance => {
			states = statesInstance;
			const currentState = this.stateService.previousState(states, states[states.length - 1]).value;
			const newState: InputInstance = {
				value: currentState.value,
				id: Date.now() + '-' + currentState.id
			};
			this.store.next([newState]);
		})
	}
}

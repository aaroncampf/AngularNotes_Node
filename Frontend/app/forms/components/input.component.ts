import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StateInstance} from '../../store/models/state.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounce';
import 'rxjs/operator/';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';

export interface InputState {
	past: string[];
	present: string;
	future: string[];
}

export const TEXT_INPUT_INITIAL_STATE = {
		past: [],
		present: null,
		future: []
};

@Component({
	selector: 'input-component',
	template: `
		<div class="row">
			<div *ngIf="!!label" class="col-xs-3">
				<strong>{{label}}</strong>
			</div>
			<div [ngClass]="{'col-xs-12':!allowBack && !label, 'col-xs-9':!allowBack && !!label, 'col-xs-7':!!label && allowBack}">
				<input class="form-control" [formControl]="control" [type]="password ? 'password' : 'text'"
					   [ngModel]="model" (ngModelChange)="onInput($event)"
					   [placeholder]="placeholder"/>
			</div>
			<div *ngIf="allowBack" class="col-xs-2">
				<span class="icon icon-undo2" (click)="onNewState({type: 'UNDO', payload:{}})"></span>
				<span class="icon icon-redo2" (click)="onNewState({type: 'REDO', payload:{}})"></span>
			</div>
		</div>
	`,
})

export class InputComponent implements OnInit, OnDestroy, OnChanges{
	@Input()
	public allowBack: boolean = true;
	@Input()
	public context: string = 'not stated';
	@Input()
	public password: boolean;
	@Input()
	public model: string = '';
	@Input()
	public placeholder: string = '';
	@Input()
	public label: string;
	@Input()
	public control: FormControl = new FormControl;
	@Output()
	public modelChange: EventEmitter<string> = new EventEmitter<string>();
	@Output()
	public action: EventEmitter<StateInstance> = new EventEmitter<StateInstance>();
	public storeSource: BehaviorSubject<InputState> = new BehaviorSubject<InputState>({past: [], present: this.model, future:[]});
	public store$ = this.storeSource.asObservable();
	public storeSub: Subscription = new Subscription();

	public ngOnChanges(simpleChanges: SimpleChanges) {
		if(simpleChanges['context'] && this.context)this.context.toUpperCase();
	}

	public ngOnInit(): void {
		this.storeSub = this.store$.subscribe(newState => this.modelChange.emit(newState.present));
	}

	public ngOnDestroy(): void {
		this.storeSub.unsubscribe();
	}

	public onInput(event) {
		Observable.of(event)
			.debounce(() => Observable.timer(500))
			.subscribe(batchVal => {
				this.onNewState({
					type: 'DEFAULT',
					payload: {
						value: batchVal
					}
				})
			});
	}

	public onNewState(action): void {
		const state = this.storeSource.getValue();
		const newState = this.undoableInputReducer(state, action);
		this.storeSource.next(newState);
	}

	public undoableInputReducer(state, action) {
		return this.undoable(this.inputReducer)(state, action);
	}

	public inputReducer(state, action): InputState {
		const past = state.past;
		const present = state.present;
		const future = state.future;
		switch(action.type){
			default:
				return {
					past: [...past, present],
					present: action.payload.value,
					future: []
				}
		}
	}

	public undoable(reducer): (state, action) => {past: string[]; present: string; future: string[]} {
		const initialState = TEXT_INPUT_INITIAL_STATE;

		return function (state = initialState, action) {
			const past = state.past;
			const present = state.present;
			const future = state.future;
			switch(action.type){
				case'UNDO':
					const previous = past[past.length - 1];
					const newPast = past.slice(-1);
					console.log({
						past: newPast,
						present: previous,
						future: [present, ...future]
					});
					return {
						past: newPast,
						present: previous,
						future: [present, ...future]
					};
				case'REDO':
					const next = future[0];
					const newFuture = future.slice(1);
					return {
						past: [...past, present],
						present: next,
						future: newFuture
					};
				default:
					const newPresent = reducer(state, action).present;
					if (present === newPresent){
						return state;
					}
					return {
						past: [...past, present],
						present: newPresent,
						future: []
					}
			}
		}
	}
}

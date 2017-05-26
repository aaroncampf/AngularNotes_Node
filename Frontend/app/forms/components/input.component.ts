import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StateInstance} from '../../store/models/state.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounce';
import 'rxjs/operator/';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Action} from '../../store/models/action.model';
import {InputState} from '../models/input.model';

export const TEXT_INPUT_INITIAL_STATE = {
	past: <string[]>[],
	present: this.model,
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
					   [ngModel]="model" [value]="value" (ngModelChange)="modelChange.emit($event)"
					   [placeholder]="placeholder"/>
			</div>
			<div *ngIf="allowBack" class="col-xs-2">
				<button [class.disabled]="!undoOn" [disabled]="!undoOn" (click)="onNewState({type: 'UNDO'})"><span class="icon icon-undo2"></span></button>
				<button [class.disabled]="!redoOn" [disabled]="!redoOn" (click)="onNewState({type: 'REDO'})"><span class="icon icon-redo2"></span></button>
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
	public value;
	public undoOn: boolean = false;
	public redoOn: boolean = false;
	public action: EventEmitter<StateInstance> = new EventEmitter<StateInstance>();
	public storeSource: BehaviorSubject<InputState> = new BehaviorSubject<InputState>(TEXT_INPUT_INITIAL_STATE);
	public store$ = this.storeSource.asObservable();
	public storeSub: Subscription = new Subscription();

	public ngOnChanges(simpleChanges: SimpleChanges) {
		if(simpleChanges['context'] && this.context)this.context.toUpperCase();
	}

	public ngOnInit(): void {
		this.modelChange.debounce(() => Observable.timer(500)).subscribe(res => {
			this.onNewState({type: 'DEFAULT', payload:{value: res}});
		});
		this.storeSub = this.store$.subscribe(newState => {
			newState.past.length > 0 ? 	this.undoOn = true : this.undoOn = false;
			newState.future.length > 0 ? this.redoOn = true : this.redoOn = false;
			this.value = newState.present;
		});
	}

	public ngOnDestroy(): void {
		this.storeSub.unsubscribe();
	}

	public onNewState(action: Action): void {
		const state = this.storeSource.getValue();
		const newState = this.undoableInputReducer(state, action);
		this.storeSource.next(newState);
	}

	public undoableInputReducer(state: InputState, action: Action) {
		return this.undoable(this.inputReducer)(state, action);
	}

	public inputReducer(state: InputState, action): InputState {
		const {past, present, future} = state;
		switch(action.type){
			default:
				return {
					past: [...past, present],
					present: action.payload.value,
					future: []
				}
		}
	}

	public undoable(reducer): (state: InputState, action: Action) => InputState {
		return function (state: InputState, action: Action) {
			const {past, present, future}: InputState = <InputState>state;
			switch(action.type){
				case'UNDO':
					const previous = past[past.length - 1];
					const newPast: string[] = past.slice(1, -1);
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
						return reducer(state, action);
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

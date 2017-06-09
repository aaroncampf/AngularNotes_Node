import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounce';
import 'rxjs/operator/';
import {Subscription} from 'rxjs/Subscription';
import {InputState} from '../models/input.model';

export const TEXT_INPUT_INITIAL_STATE = {
	past: <string[]>[],
	present: '',
	future: []
};

@Component({
	selector: 'textarea-undo-component',
	template: `
		<div class="row">
			<div *ngIf="!!label" class="col-xs-3">
				<strong>{{label}}</strong>
			</div>
			<div class="textarea-wrapper" [ngClass]="{'col-xs-12':!undoRedo && !label, 'col-xs-9':!undoRedo && !!label, 'col-xs-9':!!label && undoRedo, 'col-xs-11':!label && undoRedo}">
				<textarea rows="1" class="form-control" [formControl]="control"
						  [(ngModel)]="model" [value]="value" (ngModelChange)="modelChange.emit($event)"
						  [placeholder]="placeholder" (change)="onChange.emit($event.target.value)"></textarea>
				<img *ngIf="undoRedo" class="pull-right undo" src="../../../assets/icons/SVG/undo2.svg" (click)="onNewState({type: 'UNDO'})"/>
				<img *ngIf="undoRedo" class="pull-right redo" src="../../../assets/icons/SVG/redo2.svg" (click)="onNewState({type: 'REDO'})"/>
			</div>
		</div>
	`,
})

export class TextareaUndoComponent implements OnInit, OnDestroy, OnChanges{
	@Input()
	public undoRedo: boolean = true;
	@Input()
	public context: string = 'not stated';
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
	public onChange: EventEmitter<any> = new EventEmitter<any>();
	public value;
	public undoOn: boolean = false;
	public redoOn: boolean = false;
	public action: EventEmitter<any> = new EventEmitter<any>();
	public inputHistorySource: BehaviorSubject<InputState> = new BehaviorSubject<InputState>(TEXT_INPUT_INITIAL_STATE);
	public inputHistory$ = this.inputHistorySource.asObservable();
	public inputHistorySub: Subscription = new Subscription();

	public ngOnChanges(simpleChanges: SimpleChanges) {
		if(simpleChanges['context'] && this.context)this.context.toUpperCase();
	}

	public ngOnInit(): void {
		this.modelChange.subscribe(res => {
			this.onNewState({type: 'DEFAULT', payload:{value: res}});
		});
		this.inputHistorySub = this.inputHistory$.subscribe(newState => {
			newState.past.length > 1 ? 	this.undoOn = true : this.undoOn = false;
			newState.future.length > 0 ? this.redoOn = true : this.redoOn = false;
			this.value = newState.present;
			// this.modelChange.emit(newState.present);
		});
	}

	public ngOnDestroy(): void {
		this.inputHistorySub.unsubscribe();
	}

	public onNewState(action: any): void {
		const state = this.inputHistorySource.getValue();
		const newState = this.undoableInputReducer(state, action);
		this.inputHistorySource.next(newState);
		this.onChange.emit(newState.present);
	}

	public undoableInputReducer(state: InputState, action) {
		return this.undoable(this.inputReducer)(state, action);
	}

	public inputReducer(state: InputState, action): InputState {
		const {past, present, future} = state;
		switch(action.type){
			default:
				return {
					past: [...past, present],
					present: action.payload.value || '',
					future: []
				}
		}
	}

	public undoable(reducer): (state: InputState, action) => InputState {
		return function (state: InputState, action) {
			console.log('State', state);
			const {past, present, future}: InputState = <InputState>state;
			switch(action.type){
				case'UNDO':
					if(past.length < 1) {
						return state;
					}
					const previous = past[past.length - 1];
					const newPast: string[] = past.slice(0, -1);
					return {
						past: newPast,
						present: previous,
						future: [present, ...future]
					};
				case'REDO':
					if(future.length < 1){
						return state;
					}
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

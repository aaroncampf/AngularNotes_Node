import {Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {StateAction} from '../../store/models/state.model';
import {Subscription} from 'rxjs/Subscription';
import {InputStore} from '../../main/ui/mobile/side-menu.component';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
	selector: 'input-component',
	template: `
		<div class="row">
			<div *ngIf="!!label" class="col-xs-3">
				<strong>{{label}}</strong>
			</div>
			<div *ngIf="!!label" class="col-xs-7">
				<input [formControl]="control" [type]="password ? 'password' : 'text'" [(ngModel)]="model" (ngModelChange)="modelChange.emit($event); store.next({value: $event}); seeker = []" class="form-control" [formControl]="control"  (blur)="blurred($event); store.next({value: $event})" [placeholder]="placeholder"/>
			</div>
			<div *ngIf="!!label" class="col-xs-2">
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_UNDO', payload: {}})"><span class="icon icon-undo2"></span></button>
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_REDO', payload: {}}); reDo()"><span class="icon icon-redo2"></span></button>
			</div>
			<div *ngIf="!label" class="col-xs-10">
				<input [formControl]="control" [type]="password ? 'password' : 'text'" [(ngModel)]="model" (ngModelChange)="modelChange.emit($event); store.next({value: $event}); seeker = []" class="form-control"  (blur)="blurred($event); store.next({value: $event})" [placeholder]="placeholder"/>
				{{model}}
			</div>
			<div *ngIf="!label" class="col-xs-2">
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_UNDO', payload: {}})"><span class="icon icon-undo2"></span></button>
				<button (click)="action.emit({type: 'STATE_FORMS_INPUT_REDO', payload: {}}); reDo()"><span class="icon icon-redo2"></span></button>
			</div>
		</div>
	`,
})

export class InputComponent implements OnInit, OnDestroy {
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
	public action: EventEmitter<StateAction> = new EventEmitter<StateAction>();
	@Input()
	public store: BehaviorSubject<InputStore[]> = new BehaviorSubject<InputStore[]>([{initialState: 0}]);
 	public storeSource =  this.store.asObservable().concat(this.store
		.asObservable().scan((acc: InputStore[], cur: InputStore[]) => acc.concat(cur,[{value: this.model}])));
	public storeSourceSub: Subscription;
	public seeker: any[] = [];

	public ngOnInit(): void {
		this.store = new BehaviorSubject<InputStore[]>([{value: this.model}]);
		this.storeSourceSub = this.storeSource.subscribe(res => {
			console.log('store subscribe', res);
		});
	}

	public ngOnDestroy(): void {
		this.storeSourceSub.unsubscribe();
	}

	public blurred(event): void {
		this.onBlur.emit(event.target.value);
	}

	public unDo(currentVal): void {
		const currentStates: InputStore[] = <InputStore[]>this.storeSource.valueOf();
		if(Array.isArray(currentStates)){
			const newState = { value: currentVal };
			this.seeker.concat(newState);
			const newStates = currentStates.splice(-1);
			this.model = newStates[newStates.length - 1].value
		}
	}

	public reDo(): void {
		const currentStates: InputStore[] = <InputStore[]>this.storeSource.valueOf();
		if(Array.isArray(currentStates)) {
			const newStates = currentStates.concat(this.seeker[this.seeker.length - 1]);
			this.seeker.splice(-1);
			this.model =  newStates[newStates.length -1 ].value;
		}
	}

}

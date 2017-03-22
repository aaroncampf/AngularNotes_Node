import {Component, Input, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs';

@Component({
	selector: 'input-component',
	template: `
		<div class="row">
			<div *ngIf="!!label" class="col-xs-2 pull-left">
				<strong>{{label}}</strong>
			</div>
			<div *ngIf="!!label" class="col-xs-10">
				<input (blur)="updateTrigger()" type="text" class="form-control" [(ngModel)]="model"
					   [formControl]="control"
					   [placeholder]="placeholder"/>
			</div>
			<div *ngIf="!label" class="col-xs-12">
				<input (blur)="updateTrigger()" type="text" class="form-control" [(ngModel)]="model"
					   [formControl]="control"
					   [placeholder]="placeholder"/>
			</div>
		</div>
	`
})

export class InputComponent {
	@Input()
	public idNumber: number;
	@Input()
	public apiPath: string;
	@Input()
	public placeholder: string = '';
	@Input()
	public label: string;
	@Input()
	public propKey: string;
	@Input()
	public model: string;
	@Input()
	public control: FormControl = new FormControl;
	@Output()
	public changeModel: EventEmitter<string> = new EventEmitter<string>();
	constructor(private http: Http){}

	public update(updateValue: string | number, id: number): Observable<any> {
		const headers = new Headers({
			'content-type': 'application/json'
		});
		const options = new RequestOptions({headers: headers});
		const updateObject = { id: this.idNumber, [this.propKey]: updateValue};
		return this.http.put(this.apiPath + id, JSON.stringify(updateObject), options)
			.map(res => res)
			.catch(err => this.handleError(err));
	}

	private handleError(error: Error | any) {
		let errMsg: string;
		if (error instanceof Response) {
			const body = error.json() || '';
			const err = body.err || JSON.stringify(body);
			errMsg = `${error.status} - ${error.statusText || ''} ${err}`
		} else {
			errMsg = error.message ? error.message : error.toString();
		}
		console.log(errMsg);
		return Observable.throw(errMsg);
	}

	public updateTrigger(): void {
		if (!!this.idNumber){
			this.update(this.model, this.idNumber).subscribe(res => console.log(res));
		}
	}


}

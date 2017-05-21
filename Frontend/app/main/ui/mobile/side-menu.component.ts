import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CRMType} from '../../models/crm-models.type';
import {Company} from '../../models/company.model';
import {ModelService} from '../../../shared/services/model.service';
import {SocketService} from '../../../shared/services/socket.service';
import {FormGroup} from '@angular/forms';
import {RDCache} from '../../../store/models/typescript-cache.model';
import {CRMState} from '../../../store/models/state.model';

@Component({
	selector: 'side-menu',
	template: `
	<div *ngIf="formReady" [formGroup]="form">
		<div class="row">
			<strong>Company Select</strong>
		</div>
		<div class="row">
			<select class="form-control" [(ngModel)]="selected" [ngModelOptions]="{standalone: true}">
				<option *ngFor="let company of rdc.companiesList.items" [ngValue]="company" >{{company.name}}</option>
			</select>
			<i class="glyphicon glyphicon-plus-sign" (click)="newCompany()"></i>
		</div>
		<input-component *ngFor="let question of rdc.companiesList.questions" [model]="selected[question.key]" [label]="question.label" [control]="form.controls[key]"></input-component>
		<div class="row">
			<notes-label class="col-xs-4"><strong>Misc.</strong></notes-label>
			<notes-view class="col-xs-8">
				<text-area class="form-control" type="text" editable="true" placeholder="Notes Here . ."></text-area>
			</notes-view>
		</div>
		<div class="row">
			<!--<list-component [listItems]="rdc.contactsList.items" [selected]="selected" [controls]="rdc.contactsList.controls" createContext="contacts" ></list-component>-->
		</div>
	</div>
	`,
})

export class SideMenuComponent implements OnChanges {
	@Input()
	public state$: CRMState = <CRMState>{};
	@Input()
	public rdc: RDCache = <RDCache>{};
	@Output()
	public action: EventEmitter<{}> = new EventEmitter<{}>();
	public selected: any;
	public model: Company = <Company>{};
	public formReady: boolean = false;
	public form: FormGroup;
	constructor(private modelService: ModelService, private socketService: SocketService){}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		console.log('OnChanges', simpleChanges);
		for(let key of Object.keys(simpleChanges)) {
			if ( key === 'rdc' && simpleChanges[key].currentValue !== (void 0)) {
				console.log('currentValue', key, simpleChanges[key].currentValue);
				this.form = new FormGroup(this.rdc.companiesList.controls);
				this.formReady = true;
			}
		}
	}

	public newCompany(): void{
		this.model = <Company>this.modelService.newModel('companies');
	}

	public onBlurSubmit(form): CRMType {
		this.socketService.responseSocket('companies.create', {props: {}})
		return void 0;
	}
}
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CRMType} from '../../models/crm-models.type';
import {Company} from '../../models/company.model';
import {ModelService} from '../../../shared/services/model.service';
import {SocketService} from '../../../shared/services/socket.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
	selector: 'side-menu',
	template: `
	<div [formGroup]="form">
		<div class="row">
			<strong>Company Select</strong>
		</div>
		<select ([ngSelect])="model">
			<option *ngFor="let company of companies" >{{company.name}}</option>
		</select><i class="glyphicon glyphicon-plus-sign" (click)="newCompany()"></i>
		<input-component [model]="model.name" [control]="controls['name']" label="Name"></input-component>
		<input-component [model]="model.addressOne" [control]="controls['addressOne']" label="Address"></input-component>
		<input-component [model]="model.city" [control]="controls['city']" label="City"></input-component>
		<input-component [model]="model.zipCode" [control]="controls['zipCode']" label="Zip Code"></input-component>
		<input-component [model]="model.phone" [control]="controls['phone']" label="Phone"></input-component>
		<div class="row">
			<notes-label class="col-xs-4"><strong>≈Misc.</strong></notes-label>
			<notes-view class="col-xs-8">
				<text-area class="form-control" type="text" placeholder="Notes Here . ."></text-area>
			</notes-view>
		</div>
		<div class="row">
			<list-component [listItems]="contacts" [details]="details" [selected]="selected" [controls]="controls" createContext="contacts" ></list-component>
		</div>
	</div>
	`,
})

export class SideMenuComponent implements OnChanges {
	public model: Company = <Company>{};
	public formReady: boolean = false;
	public form: FormGroup;
	@Input()
	public details: boolean = false;
	@Input()
	public companies?: any = <any>{};
	@Input()
	public contacts?: any = <any>{};
	@Input()
	public controls: {[name:string]: FormControl} = <{[name:string]: FormControl}>{};
	@Input()
	public formContext: string;
	@Input()
	public selected: CRMType;
	@Output()
	public action: EventEmitter<{}> = new EventEmitter<{}>();
	constructor(private modelService: ModelService, private socketService: SocketService){}

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		for(let key of Object.keys(simpleChanges)) {
			if ( key === 'controls' ) {
				console.log(simpleChanges[key]);
				this.form = new FormGroup(this.controls);
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
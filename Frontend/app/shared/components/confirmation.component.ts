import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
@Component({
	selector: 'confirmation-component',
	template: `
	<div *ngIf="confirm" [class.appear]="!!show" class="confirmation-background">
		<div class="confirmation-container">
			<div class="confirmation-message">
				<h4>{{message}}</h4>
			</div>
			<div class="confirmation-options">
				<button class="btn-success btn-lg" (click)="onOK()">OK</button>
				<button class="btn-warning btn-lg" (click)="onCancel()">Cancel</button>
			</div>
		</div>
	</div>
	`
})
export class ConfirmationComponent implements OnChanges {
	@Input()
	public message: string = 'Are You Sure?';
	@Input()
	public confirm: boolean = false;
	@Output()
	public confirmChange: EventEmitter<boolean> = new EventEmitter<boolean>();
	@Output()
	public response: EventEmitter<string> = new EventEmitter<string>();
	public show: boolean = false;

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		if(simpleChanges.confirm && simpleChanges.confirm.currentValue === true){
			this.show = true;
		}
	}

	public onCancel(): void {
		this.show = !this.show;
		setTimeout(()=>{
			this.confirm = false;
			this.confirmChange.emit(false);
		}, 600);
		this.response.emit('CANCEL');
	}

	public onOK(): void {
		this.response.emit('OK');
	}

}
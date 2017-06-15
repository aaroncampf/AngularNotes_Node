// taken from https://codepen.io/IvanKhartov/pen/KmgzpX
import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
@Component({
	selector: `data-loading-screen`,
	template: `
		<div *ngIf="!remove" class="loading-wrapper" [class.data-ready]="dataReady">
				<div class="diamonds">
				<div class="diamond diamond-1"></div>
				<div class="diamond diamond-2"></div>
				<div class="diamond diamond-3"></div>
				<div class="diamond diamond-4"></div>
			</div>
		</div>
	`,
})

export class DiamondLoaderComponent implements OnChanges {
	@Input()
	public dataReady: boolean = false;
	public remove: boolean = false;

	public ngOnChanges(simpleChanges: SimpleChanges): void {
		if(simpleChanges.dataReady && simpleChanges.dataReady.currentValue === true){
			setTimeout(()=>{
				this.remove = true;
			}, 600)
		}
	}
}
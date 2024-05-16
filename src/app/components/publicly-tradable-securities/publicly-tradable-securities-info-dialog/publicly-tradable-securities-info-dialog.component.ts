import { Component, Inject } from '@angular/core';
import { ForexDto } from '../../../dtos/forex-dto';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StockService } from '../../../services/stock-service/stock.service';
import { ForexService } from '../../../services/stock-service/forex.service';
import {
	PubliclyTradableSecuritiesPopupComponent
} from '../publicly-tradable-securities-popup/publicly-tradable-securities-popup.component';

@Component({
  selector: 'app-publicly-tradable-securities-info-dialog',
  templateUrl: './publicly-tradable-securities-info-dialog.component.html',
  styleUrls: ['./publicly-tradable-securities-info-dialog.component.css']
})
export class PubliclyTradableSecuritiesInfoDialogComponent {
	newSelectedRow: ForexDto = { ...this.data.selectedRow };
	isLoading = true;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: any,
		private stockService: StockService,
		private dialog: MatDialog,
		private forexService: ForexService,
	) {
		this.fetchData();
	}

	fetchData() {
		this.forexService
			.getFindByIdForex(this.data.selectedRow.id)
			.subscribe(response => {
				this.data.selectedRow = response;
				this.prepareValues();
				this.isLoading = false;
			});
	}

	prepareValues() {
		// Replace null or empty values with a placeholder
		for (const key in this.data.selectedRow) {
			if (
				this.data.selectedRow[key] == null ||
				this.data.selectedRow[key] == ''
			) {
				this.data.selectedRow[key] = '-';
			}
		}
		this.newSelectedRow = { ...this.data.selectedRow };
	}

	openPopup() {
		const dialogRef = this.dialog.open(PubliclyTradableSecuritiesPopupComponent,
			{});
	}
}

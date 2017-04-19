export interface FormDataFeedItem {
	label: string;
	controlName: string;
	require: boolean;
	validators: any[];
}

export interface FormDataFeed {
	title: string;
	header: string;
	items: FormDataFeedItem[];
}
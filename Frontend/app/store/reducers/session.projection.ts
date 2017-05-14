export const SessionProjection: any = (action, value) => {
	switch (action) {
		case 'sideMenuToggled':
			if(Number.isInteger(value)){
				return value % 2 === 1;
			}else{
				return {error: 'error: proper state was not provided to MenuFilter: 11'};
			}
		case 'bottomMenuToggled':
			if(typeof value === 'number'){
					return value % 2 === 1;
			}else{
				return {error: 'error: proper state was not provided to MenuFilter: 21'};
			}
		case 'detailsSelected':
			return this.twt.details = !this.twt.details;
	}
};
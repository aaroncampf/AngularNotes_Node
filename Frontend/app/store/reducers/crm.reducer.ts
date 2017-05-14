export const CRMReducer = (state = <{}[]>[], action) => {
	const lastStateIndex = state.length - 1;
	//todo make initial state

	switch(action.type){
		case'COMPANIES_GET':
			return [
				...state,
				Object.assign({}, state[lastStateIndex], action.payload)
			];
		case'CONTACTS_GET':
			return [
				...state,
				Object.assign({}, state[lastStateIndex],  action.payload)
			];
		case'QUOTES_GET':
			return [
				...state,
				Object.assign({}, state[lastStateIndex], action.payload)
			];
		case'NOTES_GET':
			return [
				...state,
				Object.assign({}, state[lastStateIndex], action.payload)
			];
		case 'CRM_SAVE':
			return [
				...state,
				Object.assign({}, action.payload)
			];
		case'CRM_REMOVE':
			return [
				...state,
				Object.assign({},{})
			]
	}
	return state
};
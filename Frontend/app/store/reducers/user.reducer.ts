export const UserReducer = (state = [], action) => {
	switch(action.type){
		case'USER_LOGGED_IN':
			return [
				...state,
				Object.assign({}, state[state.length - 1], action.payload)
			]
	}
	return state
};
export const initialStore = () => {
    return {

        contacts: [],
        filteredContacts: [],
        searchActive: false

    }
}

export default function storeReducer(store, action = {}) {

	switch (action.type) {

		case "set_contacts":

			return {
				...store,
				contacts: action.payload
			}

		case "filter_contacts":

			return {
				...store,
				filteredContacts: action.payload.contacts,
				searchActive: action.payload.active
			}

		default:

			return store
	}
}
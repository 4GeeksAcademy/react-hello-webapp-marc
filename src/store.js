export const initialStore = () => {
  return {

    contacts: [],

    filteredContacts: []

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
        filteredContacts: action.payload
      }

    default:
      throw Error("Unknown action.")
  }
}
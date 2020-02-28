import { ITransactionItems } from "./globalContext"

export default (state: any, action: any) => {
    switch (action.type) {

        case 'DELETE_TRANSACTION':
            return { ...state, transactions: state.transactions.filter((transaction: ITransactionItems) => transaction.id !== action.payload) }

        default: return state
    }
}
import ReceiptService from '../services/receipt.service'

const state = {
    loading: false,
    receiptsList: [],
    loadingError: '',
    loadingErrorCode: 0
}

const getters = {
    loading: state => state.loading,
    receiptsList: state => state.receiptsList,
    loadingError: state => state.loadingError,
    loadingErrorCode: state => state.loadingErrorCode
}

const actions = {
    async getReceiptsList( { commit } ) {
        commit( 'loadingStart' )

        try {
            const list = await ReceiptService.getReceiptsList()
            commit( 'loadingSuccess', list )

            return true
        } catch ( err ) {
            commit( 'loadingErr', {
                errorCode: err.response.status,
                errorMessage: err.response.data.details
            } )
        }
    },

    async addReceipt( { commit }, { itemName, price, description, imageUrl, date } ) {
        commit( 'loadingStart' )

        try {
            const list = await ReceiptService.addReceipt( itemName, price, description, imageUrl, date )
            commit( 'loadingSuccess', list )

            return true
        } catch ( err ) {
            commit( 'loadingErr', {
                errorCode: err.response.status,
                errorMessage: err.response.data.details
            } )
        }
    }
}

const mutations = {
    loadingStart( state ) {
        state.loading = true
        state.loadingError = ''
        state.loadingErrorCode = 0
    },

    loadingSuccess( state, list ) {
        state.receiptsList = list
        state.loading = false
    },

    loadingErr( state, { errorCode, errorMessage } ) {
        state.loading = false
        state.loadingError = errorMessage
        state.loadingErrorCode = errorCode
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}

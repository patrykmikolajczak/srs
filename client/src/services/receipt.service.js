import ApiService from './api.service'

const ReceiptService = {
    getReceiptsList: async function() {

        try {
            const resp = await ApiService.get( 'receipts' )

            return resp.data.data.listCurrentUserReceipts
        } catch ( err ) {
            throw new Error( err.response.details )
        }
    },

    addReceipt: async function( itemName, price, description, imageUrl, date ) {
        const requestData = {
            method: 'post',
            data: {
                query: `mutation {
                    createReceipt (
                        itemName: "${ itemName }",
                        price: ${ price },
                        description: "${ description }",
                        imageUrl: "${ imageUrl }",
                        date: "${ date }",
                    ) {
                        itemName
                        price
                        description
                        imageUrl
                        date
                        uuid
                    }
                }`
            }
        }

        try {
            const resp = await ApiService.customeRequest( requestData )

            return resp.data.data.listCurrentUserReceipts
        } catch ( err ) {
            throw new Error( err.response.details )
        }
    }
}

export default ReceiptService

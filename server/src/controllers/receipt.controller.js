import { ReceiptModel } from '../models/receipts.model'
import Logger from '../utils/Logger'
import validator from 'validator'

// const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.log' )

const ReceiptController = {

    /**
     * Create a new receipt and connect with user id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    create: async( req, res ) => {
        const body = req.body
        const user = req.user

        const validation_errors = []

        if ( !body.url || validator.isEmpty( body.url ) ) {
            validation_errors.push( 'URL is required' )
        }

        if ( !body.description || validator.isEmpty( body.description ) ) {
            validation_errors.push( 'Description is required' )
        }

        if ( !body.price || validator.isEmpty( body.price ) ) {
            validation_errors.push( 'Price is required' )
        }

        if ( !body.category_id || validator.isEmpty( body.category_id ) ) {
            validation_errors.push( 'Category is required' )
        }

        if ( validation_errors.length === 0 ) {
            try {
                const req_obj = {
                    ...body,
                    user_id: user.id
                }
                const receipt = await ReceiptModel.create( req_obj )

                if ( receipt.error ) {
                    return res.status( 400 ).json( receipt )
                }

                return res.status( 200 ).json( receipt )
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        } else {
            return res.status( 400 ).json( validation_errors )
        }
    },

    /**
     * Get all receipts by user id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    getAllByUserId: async( req, res ) => {
        const user = req.user

        try {
            const receipt = await ReceiptModel.getAllByUserId( user )

            if ( receipt.error ) {
                return res.status( 400 ).json( receipt )
            }

            return res.status( 200 ).json( receipt )
        } catch ( err ) {
            errorLogger.log( err )
            return res.status( 400 ).json( err )
        }
    },

    /**
     * Get receipt by id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    getById: async( req, res ) => {
        try {
            const receipt = await ReceiptModel.getById( req.params )

            if ( receipt.error ) {
                return res.status( 400 ).json( receipt )
            }

            return res.status( 200 ).json( receipt )
        } catch ( err ) {
            errorLogger.log( err )
            return res.status( 400 ).json( err )
        }
    },

    /**
     * Update receipt data by user id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    update: async( req, res ) => {
        const body = req.body

        const validation_errors = []

        if ( !body.url || validator.isEmpty( body.url ) ) {
            validation_errors.push( 'URL is required' )
        }

        if ( !body.description || validator.isEmpty( body.description ) ) {
            validation_errors.push( 'Description is required' )
        }

        if ( !body.price || validator.isEmpty( body.price ) ) {
            validation_errors.push( 'Price is required' )
        }

        if ( !body.category_id || validator.isEmpty( body.category_id ) ) {
            validation_errors.push( 'Category is required' )
        }

        if ( validation_errors.length === 0 ) {
            try {
                const query_obj = {
                    ...body,
                    id: req.params.id
                }
                const receipt = await ReceiptModel.updateOne( query_obj )

                if ( receipt.error ) {
                    return res.status( 400 ).json( receipt )
                }

                return res.status( 200 ).json( receipt )
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        } else {
            return res.status( 400 ).json( validation_errors )
        }
    },

    /**
     * Delete receipt by id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    deleteOne: async( req, res ) => {
        try {
            const receipt = await ReceiptModel.deleteOne( req.params )

            if ( receipt.error ) {
                return res.status( 400 ).json( receipt )
            }

            return res.status( 200 ).json( receipt )
        } catch ( err ) {
            errorLogger.log( err )
            return res.status( 400 ).json( err )
        }
    }

}

export { ReceiptController }

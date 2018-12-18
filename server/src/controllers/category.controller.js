import { CategoryModel } from '../models/categories.model'
import Logger from '../utils/Logger'
import validator from 'validator'

// const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.log' )

const CategoryController = {

    /**
     * Create a new category amd connect with user id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    create: async( req, res ) => {
        const body = req.body
        const user = req.user

        const validation_errors = []

        if ( !body.name || validator.isEmpty( body.name ) ) {
            validation_errors.push( 'Name is required' )
        }

        if ( !body.description || validator.isEmpty( body.description ) ) {
            validation_errors.push( 'Description is required' )
        }

        if ( validation_errors.length === 0 ) {
            try {
                const req_obj = {
                    ...body,
                    user_id: user.id
                }
                const category = await CategoryModel.create( req_obj )

                if ( category.error ) {
                    return res.status( 400 ).json( category )
                }

                return res.status( 200 ).json( category )
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        } else {
            return res.status( 400 ).json( validation_errors )
        }
    },

    /**
     * Get all categories by user id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    getAllByUserId: async( req, res ) => {
        const user = req.user

        try {
            const category = await CategoryModel.getAllByUserId( user )

            if ( category.error ) {
                return res.status( 400 ).json( category )
            }

            return res.status( 200 ).json( category )
        } catch ( err ) {
            errorLogger.log( err )
            return res.status( 400 ).json( err )
        }
    },

    /**
     * Get all categories by user id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    getById: async( req, res ) => {
        try {
            const category = await CategoryModel.getById( req.params )

            if ( category.error ) {
                return res.status( 400 ).json( category )
            }

            return res.status( 200 ).json( category )
        } catch ( err ) {
            errorLogger.log( err )
            return res.status( 400 ).json( err )
        }
    },

    /**
     * Update category data by user id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    update: async( req, res ) => {
        const body = req.body

        const validation_errors = []

        if ( !body.name || validator.isEmpty( body.name ) ) {
            validation_errors.push( 'Name is required' )
        }

        if ( !body.description || validator.isEmpty( body.description ) ) {
            validation_errors.push( 'Description is required' )
        }

        if ( validation_errors.length === 0 ) {
            try {
                const query_obj = {
                    ...body,
                    id: req.params.id
                }
                const category = await CategoryModel.update( query_obj )

                if ( category.error ) {
                    return res.status( 400 ).json( category )
                }

                return res.status( 200 ).json( category )
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        } else {
            return res.status( 400 ).json( validation_errors )
        }
    },

    /**
     * Delete category by id
     *
     * @param { Object } req Request object
     * @param { Object } res Response object
     * @return { Object } Response data
     */
    deleteOne: async( req, res ) => {
        try {
            const category = await CategoryModel.deleteOne( req.params.id )

            if ( category.error ) {
                return res.status( 400 ).json( category )
            }

            return res.status( 200 ).json( category )
        } catch ( err ) {
            errorLogger.log( err )
            return res.status( 400 ).json( err )
        }
    }
}

export { CategoryController }

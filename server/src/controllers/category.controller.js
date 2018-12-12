import { CategoryModel } from '../models/categories.model'
import Logger from '../utils/Logger'
import validator from 'validator'

const errorLogger = new Logger( 'error', 'error.log' )

const CategoryController = {

    create: async( req, res ) => {
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
                const req_obj = {
                    ...body,
                    user_id: req.user.id
                }
                const category = await CategoryModel.create( req_obj )

                if ( !category ) {
                    return res.status( 400 ).json( { error: '' } )
                }

                return res.status( 200 ).json( category )
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        } else {
            return res.status( 400 ).json( validation_errors )
        }
    }
}

export { CategoryController }

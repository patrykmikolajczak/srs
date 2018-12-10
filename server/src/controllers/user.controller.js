import { UserModel } from '../models/user.model'
import Logger from '../utils/Logger'
import validator from 'validator'

const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.log' )

const UserController = {

    create: async( req, res ) => {
        const body = req.body

        const validation_errors = []

        if ( validator.isEmpty( body.name ) ) {
            validation_errors.push( 'Name is required' )
        }

        if ( validator.isEmpty( body.family_name ) ) {
            validation_errors.push( 'Family name is required' )
        }

        if ( validator.isEmpty( body.password ) ) {
            validation_errors.push( 'Password is required' )
        }

        if ( validator.isEmpty( body.email ) ) {
            validation_errors.push( 'E-mail is required' )
        }

        if ( !validator.isEmail( body.email ) ) {
            validation_errors.push( 'Name is required' )
        }

        if ( validation_errors.length === 0 ) {
            try {
                body.password = UserModel.hashPassword( body.password )
                if ( body.password ) {
                    const user = await UserModel.create( body )
                    infoLogger.log( user )
                    if ( !user ) {
                        return res.status( 400 ).json( { error: '' } )
                    }

                    return res.status( 200 ).json( user )
                } else {
                    return res.status( 400 ).json( { error: 'Hash password error!' } )
                }
            } catch ( err ) {
                errorLogger.log( err )
                return res.status( 400 ).json( err )
            }
        }
    }
}

export { UserController }

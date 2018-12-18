
import Logger from '../utils/Logger'

const errorLogger = new Logger( 'error', 'error.catch.async.log' )

export function catchAsync( fn ) {
    return ( req, res, next ) => {
        fn( req, res, next )
            .catch( ( err ) => {
                errorLogger.log( err )
                next( err )
            } )
    }
}

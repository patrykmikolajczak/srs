const keypair = require( 'keypair' )
const fs = require( 'fs' )
const CONFIG = require( './src/config/config' )

let pair = keypair()

try {
    fs.mkdir( './src/ssl/', { recursive: true }, ( err ) => {
        console.log( err )// eslint-disable-line
        if ( err === null ) {
            fs.writeFile( CONFIG.jwt_path_for_private_key_access_token, pair.private, ( err ) => {
                console.log( err, CONFIG.jwt_path_for_private_key_access_token )// eslint-disable-line
            } )
            fs.writeFile( CONFIG.jwt_path_for_public_key_access_token, pair.public, ( err ) => {
                console.log( err, CONFIG.jwt_path_for_public_key_access_token )// eslint-disable-line
            } )

            pair = keypair()
            console.log( err )// eslint-disable-line
            if ( err === null ) {
                fs.writeFile( CONFIG.jwt_path_for_private_key_refresh_token, pair.private, ( err ) => {
                    console.log( err, CONFIG.jwt_path_for_private_key_refresh_token )// eslint-disable-line
                } )
                fs.writeFile( CONFIG.jwt_path_for_public_key_refresh_token, pair.public, ( err ) => {
                    console.log( err, CONFIG.jwt_path_for_public_key_refresh_token )// eslint-disable-line
                } )
            }
        }
    } )
} catch ( err ) {
    console.log( err )// eslint-disable-line no-console
}

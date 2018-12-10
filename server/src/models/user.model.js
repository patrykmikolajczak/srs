import db from './db'
import Logger from '../utils/Logger'
import bcrypt from 'bcrypt-nodejs'
import jwt from 'jsonwebtoken'
import CONFIG from '../config/config'
import fs from 'fs'
// const bcrypt = require( 'bcrypt' )

const errorLogger = new Logger( 'error', 'error.user.model.log' )

const UserModel = {

    /**
     * Compate password to auth
     *
     * @param { string } password - Plain text password
     * @param { string } hash_password - Hash password from Users
     * @return { boolean } - true or false
     */
    comparePassword: async( password, hash_password ) => {
        try {
            return await bcrypt.compareSync( password, hash_password )
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
     * Bcrypt password
     *
     * @param { string } password - Plaintext password
     * @return { any } - Hash or false
     */
    hashPassword: async( password ) => {
        try {
            let salt = null, hash = null
            salt = await bcrypt.genSaltSync( 10 )
            hash = await bcrypt.hashSync( password, salt )

            return hash
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    generateAccessAndRefreshToken: async( user ) => {
        try {
            const expiration_time = parseInt( CONFIG.jwt_expiration )

            const certForAccessToken = fs.readFileSync( CONFIG.jwt_path_for_private_key_access_token )
            const access_token = await jwt.sign(
                {
                    user_id: user.id,
                    name: user.name,
                    family_name: user.family_name
                },
                certForAccessToken,
                {
                    expiresIn: expiration_time,
                    algorithm: 'RS256'
                }
            )

            const certForRefreshToken = fs.readFileSync( CONFIG.jwt_path_for_private_key_refresh_token )
            const refresh_token = await jwt.sign(
                {
                    user_id: user.id,
                    email: user.email
                },
                certForRefreshToken,
                {
                    expiresIn: '7d',
                    algorithm: 'RS256'
                }
            )

            const auth_object = {
                accessToken: access_token,
                refreshToken: refresh_token
            }
            return auth_object
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
     * Create a user in table Users
     *
     * @param { array } data - Array with SQL query data
     * @return { any } - return DB row or false
     */
    async create( data ) {
        const text = `INSERT INTO
        users( family_name, name, email, password)
        VALUES($1, $2, $3, $4)
        returning *`

        const values = [
            data.family_name,
            data.name,
            data.email,
            data.password
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
     * Select all users from table Users
     *
     * @return { any } - return DB row or false
     */
    async getAll() {
        const text = 'SELECT * FROM users WHERE IS_NULL deleted_at'

        try {
            const { rows } = await db.query( text )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
    * Select user from Users by id
    *
    * @param { any } data - user id or email
    * @return { any } - return DB row or false
    */
    async getOne( data ) {
        let text = `SELECT * 
        FROM users 
        WHERE `

        if ( typeof data === 'number' ) {
            text += ' id = $1'
        } else {
            text += ' email = $1'
        }

        const values = [
            data
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
     * Update user in table Users by id
     *
     * @param { array } data - Array with SQL query data
     * @return { any } - return DB row or false
     */
    async update( data ) {
        const text = `UPDATE reflections
        SET 
        WHERE id = $1 
        returning *`

        const values = [
            data
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    /**
    * Delete user from Users by id
    *
    * @param { number } id - user id
    * @return { any } - return DB row or false
    */
    async delete( id ) {
        const text = `DELETE FROM users 
        WHERE id = $1
        returning *`

        const values = [
            id
        ]

        try {
            const { rows } = await db.query( text, values )
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    }
}

export { UserModel }

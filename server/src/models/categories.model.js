import db from './db'
import Logger from '../utils/Logger'

// const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.user.model.log' )

const CategoryModel = {

    create: async( data ) => {
        const result = {
            error: false
        }

        const text = `INSERT INTO 
        categories( user_id, name, description ) 
        VALUES($1, $2, $3)
        returning *`

        const values = [
            data.user_id,
            data.name,
            data.description
        ]

        try {
            const { rows } = await db.query( text, values )
            result.row = rows[ 0 ]
            return result
        } catch ( err ) {
            errorLogger.log( err )
            result.error_msg = err
            return result
        }
    },

    getAllByUserId: async( data ) => {
        const result = {
            error: false
        }

        const text = `SELECT id, name, description, updated_at 
        FROM categories
        WHERE
            user_id = $1
            AND deleted_at IS NULL`

        const values = [
            data.id
        ]

        try {
            const { rows } = await db.query( text, values )
            result.rows = rows
            return result
        } catch ( err ) {
            errorLogger.log( err )
            result.error_msg = err
            return result
        }
    },

    getById: async( data ) => {
        const result = {
            error: false
        }

        const text = `SELECT id, name, description, updated_at 
        FROM categories
        WHERE
            deleted_at IS NULL
            AND id = $1`

        const values = [
            data.id
        ]

        try {
            const { rows } = await db.query( text, values )
            result.row = rows[ 0 ]
            return result
        } catch ( err ) {
            errorLogger.log( err )
            result.error_msg = err
            return result
        }
    },

    update: async( data ) => {
        const result = {
            error: false
        }

        const text = `UPDATE categories
        SET name=$2,description=$3,updated_at=$4
        WHERE id = $1 
        returning *`

        const values = [
            data.id,
            data.name,
            data.description,
            new Date()
        ]

        try {
            const { rows } = await db.query( text, values )
            result.row = rows[ 0 ]
            return result
        } catch ( err ) {
            errorLogger.log( err )
            result.error_msg = err
            return result
        }
    },

    deleteOne: async( data ) => {
        const result = {
            error: false
        }

        const text = `DELETE FROM categories 
        WHERE id = $1
        returning *`

        const values = [
            data
        ]

        try {
            const { rows } = await db.query( text, values )
            result.row = rows[ 0 ]
            return result
        } catch ( err ) {
            errorLogger.log( err )
            result.error_msg = err
            return result
        }
    }
}

export { CategoryModel }

import db from './db'
import Logger from '../utils/Logger'

// const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.user.model.log' )

const ReceiptModel = {

    create: async( data ) => {
        const result = {
            error: false
        }

        const text = `INSERT INTO 
        receipts( user_id, category_id, url, description, price )
        VALUES ($1, $2, $3, $4, $5)
        returning *`

        const values = [
            data.user_id,
            data.category_id,
            data.url,
            data.description,
            data.price
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

        const text = `SELECT * 
        FROM receipts
        WHERE
            deleted_at IS NULL
            AND user_id = $1`

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

        const text = `SELECT * 
        FROM receipts
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

    updateOne: async( data ) => {
        const result = {
            error: false
        }

        const text = `UPDATE receipts
        SET category_id=$2, url=$3, description=$4, price=$5,updated_at=$6
        WHERE id = $1
        returning *`

        const values = [
            data.id,
            data.category_id,
            data.url,
            data.description,
            data.price,
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

        const text = `DELETE FROM receipts 
        WHERE id = $1
        returning *`

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
    }
}

export { ReceiptModel }

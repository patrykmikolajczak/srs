import db from './db'
import Logger from '../utils/Logger'

// const infoLogger = new Logger( 'info' )
const errorLogger = new Logger( 'error', 'error.user.model.log' )

const ReceiptModel = {

    create: async( data ) => {
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
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    getAllByUserId: async( data ) => {
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
            return rows
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    getById: async( data ) => {
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
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    updateOne: async( data ) => {
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
            return rows[ 0 ]
        } catch ( err ) {
            errorLogger.log( err )
            return false
        }
    },

    deleteOne: async( data ) => {
        const text = `DELETE FROM receipts 
        WHERE id = $1
        returning *`

        const values = [
            data.id
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

export { ReceiptModel }

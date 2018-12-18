exports.shorthands = undefined

exports.up = ( pgm ) => {

    pgm.createTable( 'receipts', {
        id: 'id',
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            onDelete: 'cascade'
        },
        category_id: {
            type: 'integer',
            notNull: true,
            references: '"categories"',
            onDelete: 'cascade'
        },
        url: {
            type: 'varchar(255)',
            notNull: true
        },
        description: {
            type: 'text',
            notNull: true
        },
        price: {
            type: 'integer',
            notNull: true
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func( 'current_timestamp' )
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func( 'current_timestamp' )
        },
        deleted_at: {
            type: 'timestamp',
            default: null
        }
    } )

    pgm.createIndex( 'receipts', 'id' )
}

// exports.down = (pgm) => {

// };

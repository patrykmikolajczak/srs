exports.shorthands = undefined

exports.up = ( pgm ) => {
    pgm.createTable( 'users', {
        id: 'id',
        name: {
            type: 'varchar(200)',
            notNull: true
        },
        family_name: {
            type: 'varchar(200)',
            notNull: true
        },
        email: {
            type: 'varchar(200)',
            notNull: true,
            unique: true
        },
        password: {
            type: 'varchar(200)',
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

    pgm.createIndex( 'users', 'id' )
}

// exports.down = ( pgm ) => {

// }

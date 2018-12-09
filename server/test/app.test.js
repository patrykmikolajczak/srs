const supertest = require( 'supertest' )
const expect = require( 'chai' ).expect
const app = require( '../src/app' ).default

describe( 'loading express app', () => {
    const server = app.listen( 3030 )
    const request = supertest.agent( server )

    it( 'server exists', () => {
        expect( server ).to.exist
    } )

    it( 'should give 200 response from GET /', () => {
        return request.get( '/' )
            .expect( 200 )
    } )

} )

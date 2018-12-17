import express from 'express'
import passport from 'passport'

import { UserController } from '../controllers/user.controller'
import { CategoryController } from '../controllers/category.controller'
import { ReceiptController } from '../controllers/receipt.controller'

import { catchAsync } from '../middleware/error'

const router = express.Router()// eslint-disable-line new-cap

import middleware from '../middleware/passport'
middleware( passport )

const requireAuth = passport.authenticate( 'jwt', {
    session: false
} )

router.get( '/', ( req, res ) => {
    res.json( {
        status: 'success',
        message: 'Parcel Pending API',
        data: {
            version_number: 'v0.0.1'
        }
    } )
} )

router.get( '/test', requireAuth, ( req, res ) => {
    res.json( {
        status: 'success',
        message: 'Test Auth API',
        data: {
            version_number: 'v0.0.1'
        }
    } )
} )

// AUTH
router.post(    '/auth/login',     catchAsync( UserController.login ) )
router.post(    '/auth/refresh',   catchAsync( UserController.refresh ) )

// USERS
router.post(    '/users',           catchAsync( UserController.create ) )             // C
// router.get(     '/users',           requireAuth, catchAsync( UserController.get ) )   // R
// router.put(     '/users',           requireAuth, catchAsync( UserController.get ) )   // U
// router.delete(  '/users',           requireAuth, catchAsync( UserController.get ) )   // D

// CATEGORIES
router.post(    '/categories',      requireAuth, catchAsync( CategoryController.create ) )          // C
router.get(     '/categories',      requireAuth, catchAsync( CategoryController.getAllByUserId ) )  // R
router.put(     '/categories/:id',  requireAuth, catchAsync( CategoryController.update ) )          // U
router.delete(  '/categories/:id',  requireAuth, catchAsync( CategoryController.deleteOne ) )       // D

// RECEIPT
router.post(    '/receipts',        requireAuth, catchAsync( ReceiptController.create ) )           // C
router.get(     '/receipts',        requireAuth, catchAsync( ReceiptController.getAllByUserId ) )   // R
router.get(     '/receipts/:id',    requireAuth, catchAsync( ReceiptController.getById ) )          // R
router.put(     '/receipts/:id',    requireAuth, catchAsync( ReceiptController.update ) )           // U
router.delete(  '/receipts/:id',    requireAuth, catchAsync( ReceiptController.deleteOne ) )        // D

export default router

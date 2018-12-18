<template>
    <div>
        <welcome-screen
            :animation="false"
            :show="show_logo"
        />
        <!-- <transition @leave="$router.push({ name: 'app' })"> -->
        <transition name="slide-fade">
            <form
                class="sign_in_up_form"
                :class="{'sign_in_up_form--out': !show_logo}"
                v-if="show"
                @submit="handleSubmit"
            >
                <h1>
                    Sign
                    <span>in</span>
                </h1>
                <div
                    class="form__group"
                    :class="{'form__group--error': errors.has('email')}"
                >
                    <input
                        class="form__group__item"
                        type="text"
                        placeholder="E-mail"
                        v-model="credentials.email"
                        v-validate="'required'"
                        name="email"
                    />
                    <small
                        v-show="errors.has('email')"
                        class="form__group__text"
                    >
                        Required!
                    </small>
                </div>
                <div
                    class="form__group"
                    :class="{'form__group--error': errors.has('password')}"
                >
                    <input
                        class="form__group__item"
                        type="password"
                        placeholder="Password"
                        v-model="credentials.password"
                        v-validate="'required'"
                        name="password"
                    />
                    <small
                        v-show="errors.has('password')"
                        class="form__group__text"
                    >
                        Required!
                    </small>
                </div>
                <a
                    href="#"
                    @click.prevent="goToRecoverAccount"
                    class="cant_login"
                >
                    Can't log in?
                </a>
                <div class="btn btn--primary" @click="handleSubmit">
                    Sign in
                </div>
                <a href="#" @click.prevent="goToSignUp" class="sign_up_in_link">
                    Sign
                    <span>up</span>
                </a>
            </form>
        </transition>
    </div>
</template>

<script>
import WelcomeScreen from '@/components/WelcomeScreen'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Signin',
    components: {
        WelcomeScreen
    },
    data() {
        return {
            show: false,
            show_logo: true,
            credentials: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapGetters( 'auth', [
            'authenticating',
            'authenticationError',
            'authenticationErrorCode'
        ] )
    },
    mounted() {
        this.show = true
    },
    methods: {
        ...mapActions( 'auth', [
            'signin'
        ] ),
        handleSubmit() {
            this.$validator.validateAll().then( result => {
                if ( result ) {
                    const result = this.signin( {
                        email: this.credentials.email,
                        pass: this.credentials.password,
                        redirect: false
                    } )

                    if ( result ) {
                        this.show_logo = false
                        setTimeout( () => {
                            this.$router.push( { name: 'receipt_list' } )
                        }, 2000 )
                    }
                    // this.$store.dispatch( 'signin', this.credentials )
                    //     .then( () => {
                    //         this.show_logo = false
                    //         setTimeout( () => {
                    //             this.$router.push( { name: 'receipt_list' } )
                    //         }, 2000 )
                    //     } )
                }
            } )
        },
        goToSignUp() {
            this.changeRouting( 'signup' )
        },
        goToRecoverAccount() {
            this.changeRouting( 'recoverAccount' )
        },
        changeRouting( name ) {
            this.show = false
            setTimeout( () => {
                this.$router.push( { name: name } )
            }, 500 )
        }
    }
}
</script>

<style lang="scss" scoped>
    .cant_login {
        font-family: GilroyLight;
        display: block;
        font-size: .8rem;
        text-decoration: none;
        margin: 10px 0;
        text-align: left;

        &:active, &:hover {
            font-family: GilroyExtraBold;
        }
    }
</style>


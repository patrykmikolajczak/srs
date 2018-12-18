<template>
    <div>
        <welcome-screen
            :animation="false"
        />
        <!-- <transition @leave="$router.push({ name: 'app' })"> -->
        <transition name="slide-fade">
            <form
                class="sign_in_up_form"
                v-if="show"
                @submit.prevent="handleSubmit"
            >
                <h1>
                    Sign
                    <span> up</span>
                </h1>
                <div
                    class="form__group"
                    :class="{'form__group--error': errors.has('name')}"
                >
                    <input
                        class="form__group__item"
                        type="text"
                        placeholder="Name"
                        v-model="credentials.name"
                        v-validate="'required'"
                        name="name"
                    />
                    <small
                        v-show="errors.has('name')"
                        class="form__group__text"
                    >
                        Required!
                    </small>
                </div>
                <div
                    class="form__group"
                    :class="{'form__group--error': errors.has('familyName')}"
                >
                    <input
                        class="form__group__item"
                        type="text"
                        placeholder="Family name"
                        v-model="credentials.familyName"
                        v-validate="'required'"
                        name="familyName"
                    />
                    <small
                        v-show="errors.has('familyName')"
                        class="form__group__text"
                    >
                        Required!
                    </small>
                </div>
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
                <div class="btn btn--primary" @click="handleSubmit">
                    Sign up
                </div>
                <a href="#" @click.prevent="goToSignIn" class="sign_up_in_link">
                    Sign
                    <span> in</span>
                </a>
            </form>
        </transition>
    </div>
</template>

<script>
import WelcomeScreen from '@/components/WelcomeScreen'
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'Signup',
    components: {
        WelcomeScreen
    },
    data() {
        return {
            show: false,
            credentials: {
                name: '',
                familyName: '',
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
                    this.signin( {
                        email: this.credentials.email,
                        familyName: this.credentials.familyName,
                        name: this.credentials.name,
                        pass: this.credentials.password
                    } )
                    // this.$store.dispatch( 'signup', this.credentials )
                    //     .then( () => {
                    //         // this.$router.push({ name: 'app' })
                    //     } )
                }
            } )
        },
        goToSignIn() {
            this.show = false
            setTimeout( () => {
                this.$router.push( { name: 'signin' } )
            }, 500 )
        }
    }
}
</script>


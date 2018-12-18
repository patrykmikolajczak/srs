<template>
    <div>
        <welcome-screen
            :animation="false"
        />
        <!-- <transition @leave="$router.push({ name: 'app' })"> -->
        <transition name="slide-fade">
            <form class="sign_in_up_form" v-if="show" @submit.prevent="recoverAccount">
                <h1>
                    Can't log
                    <span>in</span>
                    ?
                </h1>
                <div
                    class="form__group"
                    :class="{'form__group--error': errors.has('email')}"
                >
                    <label class="form__group__label">
                        We'll send a recovery link to
                    </label>
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
                <div class="btn btn--primary" @click="recoverAccount">
                    Send recovery link
                </div>
                <a href="#" @click.prevent="goToSignIn" class="sign_up_in_link">
                    Sign
                    <span>in</span>
                </a>
            </form>
        </transition>
    </div>
</template>

<script>
import WelcomeScreen from '@/components/WelcomeScreen'

export default {
    name: 'RecoverAccount',
    data() {
        return {
            show: false,
            credentials: {
                email: ''
            }
        }
    },
    components: {
        WelcomeScreen
    },
    mounted() {
        this.show = true
    },
    methods: {
        recoverAccount() {
            this.$validator.validateAll().then( result => {
                if ( result ) {
                    this.$store.dispatch( 'recoveryAccount', this.credentials )
                        .then( () => {
                            // this.$router.push({ name: 'app' })
                        } )
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

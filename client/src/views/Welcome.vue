<template>
    <welcome-screen />
</template>

<script>
import WelcomeScreen from '@/components/WelcomeScreen'
import { mapGetters } from 'vuex'

export default {
    name: 'Welcome',
    components: {
        WelcomeScreen
    },
    computed: {
        ...mapGetters( 'auth', [ 'loggedIn' ] )
    },
    mounted() {
        setTimeout( () => {
            this.init()
        }, 2500 )
    },
    methods: {
        init() {
            this.loggedIn
                ? this.$router.push( { name: 'receipt_list' } )
                : this.$router.push( { name: 'signin' } )
        }
    }
}
</script>


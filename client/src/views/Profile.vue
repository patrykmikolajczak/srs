<template>
    <div>
        <transition name="slide-fade">
            <div class="row" v-if="show">
                <div class="col-12 col-md-6">
                    <div class="row__col__ibox">
                        <h2>Profile edit</h2>
                        <form @submit.prevent="saveProfile">
                            <div
                                class="form__group"
                                :class="{'form__group--error': errors.has('name')}"
                            >
                                <input
                                    class="form__group__item"
                                    type="text"
                                    placeholder="Name"
                                    v-model="profile.name"
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
                                    v-model="profile.familyName"
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
                                    v-model="profile.email"
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
                            <div class="btn btn--primary" @click="saveProfile">
                                Save
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-12 col-md-6">
                    <div class="row__col__ibox">
                        <h2>Change password</h2>
                        <form @submit.prevent="savePassword">
                            <div
                                class="form__group"
                                :class="{'form__group--error': errors.has('old_password')}"
                            >
                                <input
                                    class="form__group__item"
                                    type="text"
                                    placeholder="Old password"
                                    v-model="credentials.old_password"
                                    v-validate="'required'"
                                    name="old_password"
                                />
                                <small
                                    v-show="errors.has('old_password')"
                                    class="form__group__text"
                                >
                                    Required!
                                </small>
                            </div>
                            <div
                                class="form__group"
                                :class="{'form__group--error': errors.has('new_password')}"
                            >
                                <input
                                    class="form__group__item"
                                    type="text"
                                    placeholder="New password"
                                    v-model="credentials.new_password"
                                    v-validate="'required'"
                                    name="new_password"
                                />
                                <small
                                    v-show="errors.has('new_password')"
                                    class="form__group__text"
                                >
                                    Required!
                                </small>
                            </div>
                            <div
                                class="form__group"
                                :class="{'form__group--error': errors.has('repeat_new_password')}"
                            >
                                <input
                                    class="form__group__item"
                                    type="password"
                                    placeholder="Repeat new password"
                                    v-model="credentials.repeat_new_password"
                                    v-validate="'required'"
                                    name="repeat_new_password"
                                />
                                <small
                                    v-show="errors.has('repeat_new_password')"
                                    class="form__group__text"
                                >
                                    Required!
                                </small>
                            </div>
                            <div class="btn btn--primary" @click="savePassword">
                                Save
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Profile',
    data() {
        return {
            show: false,
            credentials: {
                old_password: '',
                new_password: '',
                repeat_new_password: ''
            },
            profile: {
                name: '',
                familyName: '',
                email: ''
            }
        }
    },
    mounted() {
        this.show = true
    },
    methods: {
        saveProfile() {
            this.$validator.validateAll().then( result => {
                if ( result ) {
                    this.$store.dispatch( 'signup', this.credentials )
                        .then( () => {
                            // this.$router.push({ name: 'app' })
                        } )
                }
            } )
        },
        savePassword() {
            this.$validator.validateAll().then( result => {
                if ( result ) {
                    this.$store.dispatch( 'signup', this.credentials )
                        .then( () => {
                            // this.$router.push({ name: 'app' })
                        } )
                }
            } )
        }
    }
}
</script>

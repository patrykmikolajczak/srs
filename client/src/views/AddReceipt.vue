<template>
    <transition name="slide-fade">
        <form
            v-if="show"
            @submit="handleSubmit"
        >
            <h2>
                Add
                <span>receipt</span>
            </h2>
            <div
                class="form__group"
                :class="{'form__group--error': errors.has('itemName')}"
            >
                <input
                    class="form__group__item"
                    type="text"
                    placeholder="Item name"
                    v-model="itemName"
                    v-validate="'required'"
                    name="itemName"
                />
                <small
                    v-show="errors.has('itemName')"
                    class="form__group__text"
                >
                    Required!
                </small>
            </div>
            <div
                class="form__group"
                :class="{'form__group--error': errors.has('price')}"
            >
                <input
                    class="form__group__item"
                    type="number"
                    placeholder="Price"
                    v-model="price"
                    v-validate="'required'"
                    name="price"
                />
                <small
                    v-show="errors.has('price')"
                    class="form__group__text"
                >
                    Required!
                </small>
            </div>
            <div
                class="form__group"
                :class="{'form__group--error': errors.has('description')}"
            >
                <textarea
                    class="form__group__item"
                    type="number"
                    placeholder="Description"
                    v-model="description"
                    v-validate="'required'"
                    name="description"
                >
                </textarea>
                <small
                    v-show="errors.has('description')"
                    class="form__group__text"
                >
                    Required!
                </small>
            </div>
            <div
                class="form__group"
                :class="{'form__group--error': errors.has('imageUrl')}"
            >
                <input
                    class="form__group__item"
                    type="text"
                    placeholder="Image Url"
                    v-model="imageUrl"
                    v-validate="'required'"
                    name="imageUrl"
                />
                <small
                    v-show="errors.has('imageUrl')"
                    class="form__group__text"
                >
                    Required!
                </small>
            </div>
            <div class="btn btn--primary" @click="handleSubmit">
                Add
            </div>
        </form>
    </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'AddReceipt',
    data() {
        return {
            itemName: '',
            price: '',
            description: '',
            imageUrl: '',
            date: this.$moment().format( 'YYYY-MM-DD' ),
            show: false
        }
    },
    computed: {
        ...mapGetters( 'receipt', [
            'loading',
            'loadingError',
            'loadingErrorCode',
            'receiptsList'
        ] )
    },
    mounted() {
        this.show = true
    },
    methods: {
        ...mapActions( 'receipt', [
            'addReceipt'
        ] ),
        handleSubmit() {
            this.$validator.validateAll().then( result => {
                if ( result ) {
                    const result = this.addReceipt( {
                        itemName: this.itemName,
                        price: this.price,
                        description: this.description,
                        imageUrl: this.imageUrl,
                        date: this.date
                    } )

                    if ( result ) {
                        this.show = false
                        setTimeout( () => {
                            this.$router.push( { name: 'receipt_list' } )
                        }, 2000 )
                    }
                }
            } )
        }
    }
}
</script>


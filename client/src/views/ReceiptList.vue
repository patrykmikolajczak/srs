<template>
    <transition name="slide-fade">
        <div class="row" v-if="!loading">
            <div class="col-12">
                <div class="row filter">
                    <div class="col-12 col-md">
                        <div class="form__group">
                            <input
                                class="form__group__item"
                                type="text"
                                placeholder="Type to search"
                                v-model="search"
                                name="search"
                                @input="filterAndSort"
                            />
                        </div>
                    </div>
                    <div class="col-12 col-md">
                        <div class="form__group">
                            <input
                                class="form__group__item"
                                type="number"
                                placeholder="Type price min"
                                v-model="priceMin"
                                name="priceMin"
                                @input="filterAndSort"
                            />
                        </div>
                    </div>
                    <div class="col-12 col-md">
                        <div class="form__group">
                            <input
                                class="form__group__item"
                                type="number"
                                placeholder="Type price max"
                                v-model="priceMax"
                                name="priceMax"
                                @input="filterAndSort"
                            />
                        </div>
                    </div>
                    <div class="col-12 col-md">
                        <div class="form__group">
                            <select
                                class="form__group__item"
                                v-model="order"
                                name="order"
                                @change="filterAndSort"
                            >
                                <option :value="null">Select</option>
                                <option value="asc">ASC</option>
                                <option value="desc">DESC</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="row filter">
                    <div class="col-12 col-md">
                        <div
                            class="btn btn--primary"
                            @click="$router.push( { name: 'add_receipt' } )"
                        >
                            Add new receipt
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <div class="receipt">
                    <div
                        class="receipt__item"
                        v-for="(r,i) in filteredReceiptsList"
                        :key="i"
                    >
                        <img
                            v-img="r.imageUrl"
                            alt=""
                        />
                        <h2>
                            {{ r.itemName }} ( {{ r.price }} )
                        </h2>
                        <p>
                            <b>Buy date:</b> {{ r.date }}
                        </p>
                        <p>
                            <b>Description:</b> {{ r.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'ReceiptList',
    data() {
        return {
            show: false,
            search: '',
            priceMin: '',
            priceMax: '',
            order: null,
            filteredReceiptsList: []
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
    created() {
        this.getReceiptsList()
    },
    mounted() {
        this.show = true
        this.filterAndSort()
    },
    methods: {
        ...mapActions( 'receipt', [
            'getReceiptsList'
        ] ),
        filterAndSort() {
            this.filteredReceiptsList = JSON.parse( JSON.stringify( this.receiptsList ) )

            if ( this.filteredReceiptsList.length > 0 ) {
                let buffList = this.filteredReceiptsList

                // search
                if ( this.search !== '' ) {
                    const searchReg = new RegExp( this.search, 'i' )
                    buffList = buffList.filter(
                        res => res.itemName.search( searchReg ) > -1 || res.description.search( searchReg ) > -1
                    )
                }

                // price
                if ( this.priceMin !== '' ) {
                    buffList = buffList.filter(
                        res => {
                            console.log( res.price )
                            const priceBuff = res.price.toString().replace( ',', '.' )
                            return parseFloat( priceBuff ) >= parseFloat( this.priceMin )
                        }
                    )
                }
                if ( this.priceMax !== '' ) {
                    buffList = buffList.filter(
                        res => {
                            const proceBuff = res.price.toString().replace( ',', '.' )
                            return parseFloat( proceBuff ) <= parseFloat( this.priceMax )
                        }
                    )
                }

                // order
                if ( this.order !== null ) {
                    buffList = buffList.sort( ( a, b ) => {
                        let left, right
                        if ( this.order === 'asc' ) {
                            left = a
                            right = b
                        } else {
                            left = b
                            right = a
                        }
                        return this.$moment.utc(
                            this.$moment( left.date ).format( 'YYYY-MM-DD' )
                        ).diff(
                            this.$moment.utc(
                                this.$moment( right.date ).format( 'YYYY-MM-DD' )
                            )
                        )
                    } )
                }

                this.filteredReceiptsList = buffList
                this.$forceUpdate()
            }
        }
    },
    watch: {
        receiptsList( val ) {
            this.filteredReceiptsList = val
        }
    }
}
</script>

<style lang="scss" scoped>
    .filter {
        margin: 1rem -15px;
    }

    .receipt {
        text-align: left;

        @at-root #{&}__item {
            background: #ffffff;
            border-bottom: 2px solid #7448ff;
            padding: 15px;
            margin: 0 0 10px 0;

            & img {
                width: 150px;
                height: 150px;
                position: relative;
                float: left;
                margin-right: 15px;
                vertical-align: middle;
                backface-visibility: hidden;
                transition: ease-in-out .3s;

                &::before {
                    content: ' ';
                    box-sizing: border-box;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 20px;
                    height: 20px;
                    margin-top: -10px;
                    margin-left: -10px;
                    border-radius: 50%;
                    border: 2px solid #ccc;
                    border-top-color: #7448ff;
                    animation: spinner .6s linear infinite;
                }

            }

            // & h3 {
            //     float: left;
            // }

            // & p {
            //     float: left;
            // }

            &::after {
                content: '';
                clear: both;
                display: block;
            }
        }

    }

    @keyframes spinner {
        to {
            transform: rotate(360deg);
        }
    }

</style>

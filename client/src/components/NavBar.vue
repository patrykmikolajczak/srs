<template>
    <nav class="header">
        <div class="header__logo">
            <div>Whopping </div>
            <div>Parched </div>
            <div>Xoloitzcuintli </div>
        </div>
        <ul class="nav-bar">
            <li class="nav-bar__item">
                <router-link :to="{name: 'receipt_list'}">
                    Receipts list
                </router-link>
            </li>
            <li class="nav-bar__item">
                <a href="#" @click.prevent="logout" >Log out</a>
            </li>
        </ul>
    </nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'NavBar',
    methods: {
        ...mapActions( 'auth', [
            'logout'
        ] )
    }
}
</script>


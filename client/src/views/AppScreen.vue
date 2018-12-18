<template>
    <div>
        <nav-bar />
        <div class="container">
            <router-view />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
    name: 'AppScreen',
    components: {
        NavBar
    }
}
</script>


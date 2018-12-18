<template>
    <div class="welcome_screen">
        <transition name="slide-fade-left">
            <div
                class="welcome_screen__logo"
                :class="{
                    'welcome_screen__logo--go_to_left': animation,
                    'welcome_screen__logo--to_left': !animation
                }"
                v-if="show"
            >
                <div>Whopping</div>
                <div>Parched</div>
                <div>Xoloitzcuintli</div>
            </div>
        </transition>
        <div class="welcome_screen__footer">
            <span >2018</span>
            <span>/</span>
            <span>
                <span>Make with </span>
                <span>&#10084;</span><br/>
                <span>by </span>
                <span>Patryk </span>
                <span>"Suliwoj" </span>
                <span>Mikołajczak </span>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WelcomeScreen',
    props: {
        animation: {
            type: Boolean,
            default: true
        },
        show: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<template lang="pug">
    div#home( class='block' )
        HomeSlider( v-bind='{ stocks }' )
</template>

<script>
import HomeSlider from '@/components/Home/Slider.vue'

export default {
    components: { HomeSlider },
    computed: { stocks }
}

function stocks () {
    return this.$store.state.stocks
}
</script>

<style lang="stylus">
#home
    margin 32px auto

    .banner
        width 100%
</style>

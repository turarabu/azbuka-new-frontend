<template lang="pug">
    div#header
        HeaderTop
        HeaderNav
</template>

<script>
import HeaderTop from '@/components/Header/Top.vue'
import HeaderNav from '@/components/Header/Nav.vue'

export default {
    components: { HeaderTop, HeaderNav }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#header
    background $white-gray
</style>


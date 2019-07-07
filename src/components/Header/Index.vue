<template lang="pug">
    div#header
        HeaderTop
        HeaderNav
        HeaderBottom
</template>

<script>
import HeaderTop from '@/components/Header/Top.vue'
import HeaderNav from '@/components/Header/Nav.vue'
import HeaderBottom from '@/components/Header/Bottom.vue'

export default {
    components: { HeaderTop, HeaderNav, HeaderBottom }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#header
    background $white-gray

</style>


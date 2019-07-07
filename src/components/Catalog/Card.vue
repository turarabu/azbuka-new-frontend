<template lang="pug">

    router-link( tag='div' class='catalog-card' :to='`/catalog/${ catalog.id }`' )
        div( class='image-div' )
            img( class='image' :src='`/images/dynamic/${ catalog.headImage }.jpg`' )

        div( class='bottom' )
            span( class='name' )
                i( :class="'icon icon-{{ parent.icon }}'" )
                span {{ catalog.name }}

            span( class='go' ) перейти
</template>

<script>
export default {
    props: ['catalog', 'parent']
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.catalog-card

    .image-div
        align-items center
        display flex
        justify-content center
        height 420px
        width 100%

        .image
            max-height 100%
            max-width 100%

    .bottom
        align-items center
        background $white-gray
        display flex
        justify-content space-between
        padding 12px 16px

        .name
            color $black
            font-size 18px
            font-weight 400

        .go
            color $dark-gray
            font-size 16px
            font-weight 500
</style>

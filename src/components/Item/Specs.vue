<template lang="pug">
    div( class='item-specs' )
        h3( class='title' ) Характеристики
        p( class='gray-text' ) Производство {{ item.manufacturer }}

        div( class='prop-div' v-for='prop in item.properties' )
            h3( class='title' ) {{ prop.name }}
            p( class='dashed' v-for='meta in prop.childs' )
                span( class='key' ) {{ meta.name }}
                span( class='value' ) {{ meta.value }}
</template>

<script>
export default {
    props: ['item']
}
</script>


<style lang="stylus">
@import '~@/style/palette'

.item-specs
    background $white-gray
    display none
    padding 32px 52px
    &.show
        display block

    .title
        font-size 20px
        font-weight 500
        text-transform uppercase

    .gray-text
        color lighten($dark-gray, 15)
        font-size 16px
        font-weight 500
        margin 4px 0

    .prop-div
        margin 16px 0

    .dashed
        align-items top
        display flex
        justify-content space-between
        margin 2px 0
        position relative
        &:before
            border-top 1px dotted lighten($dark-gray, 15)
            content ''
            display block
            position absolute
            top 10px
            left 0
            right 0

        .key, .value
            background $white-gray
            color lighten($dark-gray, 15)
            display inline-block
            font-size 16px
            font-weight 500
            padding 0 8px
            position relative
            z-index 1

        .key
            padding-left 0

        .value
            padding-right 0
</style>

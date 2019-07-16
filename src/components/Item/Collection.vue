<template lang="pug">
    router-link( tag='div' class='collection-card' :to='link' )
        div( class='image-div' )
            span( class='ticket' ) Коллекция
                span( class='open' ) ← Открыть
            img( class='image' :src='poster' onerror='this.onerror = null; this.src = "/images/not-found.png"' )
        
        h3( class='name' ) {{ name }}

</template>

<script>
export default {
    props: ['collection'],
    data: function () {
        return Object.assign(this.collection, {
            poster: `/images/dynamic/${ this.collection.headImage }.jpg`,
            link: `/catalog/${ this.collection.id }`
        })
    }
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.collection-card
    border 1px solid darken($white-gray, 5)
    &.hide
        display none
    
    .image-div
        align-items center
        display flex
        justify-content center
        overflow hidden
        padding 16px
        position relative
        height 420px
        width 100%

        .ticket
            background $red
            color $white
            display inline-block
            font-size 18px
            font-weight 500
            letter-spacing 2px
            padding-top 8px
            text-align center
            transform rotate(45deg)
            position absolute
            bottom 30px
            left -60px
            width 250px

            .open
                background $white-gray
                color $dark-gray
                display block
                font-size 16px
                font-weight 400
                letter-spacing 1px
                margin-top 8px
                padding 4px

        .image
            max-height 100%
            max-width 100%

    .name
        font-size 18px
        font-weight 500
        height 72px
        padding 16px 12px 0 16px
</style>


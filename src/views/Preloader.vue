<template lang="pug">
    div#preloader
        div( class='center' :class='{show: step === 0}' )
            label( class='label' )
                span( class='meta' ) Выберите город:

                i( class='icon icon-angle-down' )
                select( class='select' v-model='city' )
                    option( value='0' ) Владивосток

            label( class='label' )
                span( class='meta' ) Выберите магазин:

                i( class='icon icon-angle-down' )
                select( class='select' v-model='shop' )
                    option( value='0' ) АМ Русская 2K

            button( class='confirm' @click='confirm' ) Продолжить

        div( class='center' :class='{show: step === 1}' )
            span( class='comment' ) {{ comment }}
            div( class='load-div' )
                div( class='load' :style='`width: ${ load }%`' )
</template>

<script>
import help from '@/script/script'

export default {
    methods: { confirm, download, getCatalog, getItems, getStocks },
    data: function () {
        return {
            comment: 'Загрузка...',
            city: 0,
            shop: 0,
            step: 0,
            load: 0
        }
    }
}

// Methods
function confirm () {
    this.step = 1
    setTimeout(() => {
        this.download()
    }, 750)
}

async function download () {
    var catalog = await this.getCatalog()
    var items = await this.getItems()
    var stocks = await this.getStocks()

    this.load = 100
    this.comment = 'Почти готово...'

    setTimeout(() => {
        var sortedItems = help.sort.items(items)
        var sortedCatalog = help.sort.catalog(catalog, sortedItems)
        var sortedStocks = help.sort.stocks(stocks, sortedCatalog, sortedItems)

        this.$store.commit('set-state', {
            key: 'catalog', 
            value: sortedCatalog
        })

        this.$store.commit('set-state', {
            key: 'items', 
            value: sortedItems
        })

        this.$store.commit('set-state', {
            key: 'stocks', 
            value: sortedStocks
        })

        this.$emit('ready', true)
    }, 10)
}

function getCatalog () {
    this.comment = 'Получаю каталог...'

    return ajax('catalog/list', request => {
        return new Promise((resolve, reject) => {
            handle.call(request, resolve, reject, this)
        })
    })
}

function getItems () {
    this.comment = 'Получаю список товаров...'
    this.load = 33

    return ajax('item/list?shop=000000001', request => {
        return new Promise((resolve, reject) => {
            handle.call(request, resolve, reject, this)
        })
    })
}

function getStocks () {
    this.comment = 'Получаю список акции...'
    this.load = 99

    return ajax('stock/list', request => {
        return new Promise((resolve, reject) => {
            handle.call(request, resolve, reject, this)
        })
    })
}

// Helper functions
function ajax (method, callback) {
    var request = new XMLHttpRequest()

    request.open('GET', `http://95.167.9.22:8081/${method}`, true)
    request.send()

    return callback(request)
}

function handle (resolve, reject, vue) {
    var contentLength

    this.addEventListener('readystatechange', event => {
        let response = event.target.responseText

        if (this.readyState === 2)
            contentLength = this.getResponseHeader('Content-Length')

        if (this.readyState === 3) {
            let load = (100 / contentLength * response.length) / 3

            if ( vue.load >= 66 )
                vue.load = Math.min(99, 66 + load)
            else if ( vue.load >= 33 )
                vue.load = Math.min(60, 33 + load)
            else vue.load = Math.min(33, load)
        }

        if (this.readyState === 4 && this.status === 200) {
            var json = JSON.parse(this.responseText)
            resolve(json.data)
        }
    })
}
</script>

<style lang="stylus">
@import '~@/style/palette'

#preloader
    background darken($white-gray, 5)
    position absolute
    top 0
    left 0
    right 0
    bottom 0

    .center
        align-items center
        display flex
        flex-direction column
        justify-content center
        opacity 0
        overflow hidden
        transition .5s step-end all, .5s opacity
        position absolute
        top 0
        left 0
        height 0
        width 100%
        &.show
            height 100%
            opacity 1

        .label
            display block
            margin 16px 0
            position relative
            width 350px

            .meta
                display block
                font-size 24px
                margin 4px 2px

            .icon
                color $red
                font-size 24px
                bottom 4px
                right 8px
                position absolute

            .select
                background $white-gray
                border none
                border-bottom 2px solid $red
                color $black
                font-size 20px
                outline none
                padding 8px 16px
                width 100%
                -webkit-appearance none

        .confirm
            background $red
            border none 
            border-radius 5px
            color $white
            font-size 20px
            margin 8px 0
            outline none
            padding 12px 16px
            width 350px

    .comment
        font-size 18px
        color $dark-gray

    .load-div
        background $white
        border-radius 10px
        margin 16px 0
        overflow hidden
        height 8px
        width 500px

        .load
            background $red
            border-radius 3px
            height 100%
            min-width 3%
</style>

<template lang="pug">
    div( class='double-range-div' )
        div( class='inputs-div' )
            input( class='input' v-model='num.min' @input='update("pers")' )
            span( class='delimiter' )
            input( class='input' v-model='num.max' @input='update("pers")' )

        div( class='double-range' )
            div( class='selected-range' :style='{left: `${ per.min }%`, right: `${ 100 - per.max }%`}' )
                span( class='point min' @mousedown='active = "min"' )
                span( class='point max' @mousedown='active = "max"' )
</template>

<script>
export default {
    props: ['value', 'set'],
    methods: { update },
    mounted: init,
    data: function () {
        console.log(this.set)
        var set = this.set || {}

        if ( set.min || set.max ) {
            console.log('set', set)
            setTimeout(() => {
                this.update('pers')
            }, 25)
        }

        return {
            active: false,
            num: {
                max: set.max || this.value.max,
                min: set.min || this.value.min
            },

            per: {
                max: 100,
                min: 0
            }
        }
    }
}

function init () {
    var last
    var range = this.$el

    document.addEventListener('touchend', () => { this.active = false })
    document.addEventListener('touchstart', event => { last = event.touches[0] })
    document.addEventListener('touchmove', event => {
        console.log(event.touches[0].clientX, last.clientX, event.touches[0].clientX - last.clientX, event)
        if ( this.active === false )
            return

        var move = event.touches[0].clientX - last.clientX
        var percent = 100 / (range.offsetWidth - 67) * move

        if ( this.active === 'min' ) {
            let check = this.per.min + percent
            if ( check >= 0 && check <= this.per.max ) {
                this.per.min = check
                last = event.touches[0]
            }

            else this.per.min = Math.min(this.per.max, Math.max(0, check))
        }

        else if ( this.active === 'max' ) {
            let check = this.per.max + percent
            if ( check <= 100 && check >= this.per.min ) {
                this.per.max = check
                last = event.touches[0]
            }

            else this.per.max = Math.max(this.per.min, Math.min(100, check))
        }

        return this.update("nums")
    })
}

function update (type) {
    if ( type === 'nums' )
        updateNums.call(this)
    else if ( type === 'pers' )
        updatePers.call(this)

    return this.$emit('input', clones(this.value, this.num))
}

function updateNums () {
    var inequality = this.value.max - this.value.min

    return this.num = {
        max: parseInt((inequality * this.per.max / 100) + this.value.min),
        min: parseInt((inequality * this.per.min / 100) + this.value.min)
    }
}

function updatePers () {
    var inequality = 100 / (this.value.max - this.value.min)

    return this.per = {
        max: Math.max(this.per.min, Math.min(100, inequality * (this.num.max - this.value.min))),
        min: Math.min(this.per.max, Math.max(0, inequality * (this.num.min - this.value.min))),
    }
}

function clones (...objs) {
    var list = []

    for ( let obj of objs )
        list.push(JSON.parse( JSON.stringify(obj) ))

    return Object.assign({}, ...list)
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.double-range-div
    display block
    margin 12px 0
    width 100%

    .inputs-div
        align-items center
        display flex
        justify-content space-between
        margin-bottom 18px

        .input
            border 1px solid lighten($dark-gray, 15)
            border-radius 25px
            font-size 18px
            outline none
            padding 8px 4px
            text-align center
            width 120px

        .delimiter
            background $black
            display inline-block
            height 1px
            width 20px

    .double-range
        background $red
        height 8px
        margin 0 auto
        position relative
        width calc(100% - 70px)
        &:before, &:after
            background $red
            content ''
            display block
            position absolute
            top 0
            bottom 0
            width 35px
        &:before
            border-radius 8px 0 0 8px
            left -35px
        &:after
            border-radius 0 8px 8px 0
            right -35px

        .selected-range
            background $white
            transition none
            position absolute
            top 1px
            bottom 1px
            &:before, &:after
                background $white
                content ''
                display block
                position absolute
                top 0
                bottom 0
                width 15px
                z-index 3
            &:before
                left -10px
            &:after
                right -10px

            .point
                background $red
                border-radius 50%
                height 30px
                width 30px
                position absolute
                top -12px
                z-index 4
                &.min
                    left -32px
                &.max
                    right -32px
</style>

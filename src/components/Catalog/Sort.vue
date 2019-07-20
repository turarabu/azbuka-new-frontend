<template lang="pug">
    div( class='sort-items-div' )
        span( class='sort-text' ) Сортировка:
        span( class='direction' ) {{ getDirectionText() }}

        div( class='direction-div' @click='switchDirection' )
            span( class='direction-text' ) {{ s.type === 'name' ? 'А-Я' : '9-0' }}
            div( class='direction-range' )
                span( class='point' :class='{left: s.direction === "asc"}' )
            span( class='direction-text' ) {{ s.type === 'name' ? 'Я-А' : '0-9' }}

        div( class='dropdown-div' )
            span( class='current' ) {{ s.type === 'name' ? 'По алфавиту' : 'По цене' }}
            div( class='options-div' )
                span(
                    class='option'
                    :class='{active: s.type === "name"}'
                    @click='setType("name")'
                ) По алфавиту

                span(
                    class='option'
                    :class='{active:s.type === "price"}'
                    @click='setType("price")'
                ) По цене
</template>

<script>
export default {
    props: ['value'],
    methods: { getDirectionText, setType, switchDirection, update },
    data: function () {
        return {
            s: this.value
        }
    }
}

// Methods
function getDirectionText () {
    var dirs = ['По возрастанию', 'По убыванию']

    if ( this.s.type === 'name' )
        dirs = dirs.reverse()

    if ( this.s.direction === 'desc' )
        return dirs[1]
    
    else return dirs[0]
}

function setType (type) {
    this.s.type = type

    return this.update()
}

function switchDirection () {
    this.s.direction = this.s.direction === 'desc'
        ? 'asc' : 'desc'

    return this.update()
}

function update () {
    this.$forceUpdate()
    this.$emit('input', this.s)
}

</script>

<style lang="stylus">
@import '~@/style/palette'

.sort-items-div
    align-items center
    display flex
    margin-bottom 16px

    .sort-text
        display inline-block
        font-size 18px
        font-weight 500

    .direction
        display inline-block
        font-size 18px
        margin 0 12px
        width 150px

    .direction-div
        align-items center
        display flex
        justify-content space-between
        width 128px

        .direction-range
            background lighten($red, 30)
            border-radius 25px
            display inline-block
            position relative
            height 25px
            width 60px

        .point
            background $red
            border-radius 50%
            display inline-block
            position absolute
            left 0
            height 25px
            width 25px
            &.left
                left 35px

    .dropdown-div
        display inline-block
        font-size 18px
        margin 0 32px
        position relative
        z-index 3
        &:hover .options-div
            box-shadow 0 0 3px RGBA(50, 50, 50, .5)
            max-height 120px
            padding 8px 20px

        .current
            border-bottom 1px dashed
            position relative
            &:after
                display inline-block
                content ''
                height 8px
                position absolute
                bottom -8px
                left 0
                right 0

        .options-div
            background $white
            box-shadow 0 0 0 $white
            border-radius 3px
            max-height 0
            overflow hidden
            padding 0 20px
            position absolute
            top 30px
            left -12px

            .option
                display block
                padding 6px 0
                width 150px
                &.active
                    font-weight 500
</style>

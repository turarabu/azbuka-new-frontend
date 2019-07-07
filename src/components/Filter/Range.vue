<template lang="pug">
    div( class='range' )
        div( class='input-container' )
            input( class='range-input' v-model='value.min' @keyup='checkout("min", $event)' )
            span( class='delimiter' ) —
            input( class='range-input' v-model='value.max' @keyup='checkout("max", $event)' )

        div( class='line' )
            div( class='line-container' )
                div( class='selected' :style='{left: `calc(${left.min}% - 8px)`, right: `calc(100% - ${left.max}% - 32px)`}' )
                span( class='point'
                    :style='{left: `calc(${left.min}% - 16px)`}'
                    @mousedown='allow = "min"'
                )

                span( class='point'
                    :style='{left: `calc(${left.max}% + 16px)`}'
                    @mousedown='allow = "max"'
                )
</template>

<script>
import { release } from 'os';
export default {
    props: [ 'min', 'max', 'change', 'name' ],
    mounted: init,
    methods: { checkout, rerange, update },
    data: function () {
        return {
            allow: false,
            value: {
                max: this.max,
                min: this.min
            },

            left: {
                max: 100,
                min: 0
            }
        };
    }
}

function init () {
    var self = this;

    document.addEventListener('mousemove', function (...data) {
        move.call(self, ...data)
    });

    document.addEventListener('mouseup', function () {
        self.allow = false;
    });
}

function checkout (type, event) {
    if ( type === 'min' ) {
        if( parseInt(this.value.min) > parseInt(this.value.max) )
            this.value.min = parseInt(this.value.max);
        else this.value.min = Math.max(0, this.value.min) || 0;
    }

    else if (type === 'max') {
        if( parseInt(this.value.max) < parseInt(this.value.min) )
            this.value.max = parseInt(this.value.min);
        else this.value.max = parseInt(this.value.max);
    }

    this.rerange('value');
    this.update();
}

function rerange (type) {
    if (type === 'value')
        this.left = {
            max: Math.min(100, 100 * this.value.max / this.max),
            min: Math.max(0, 100 * this.value.min / this.max)
        };
    
    else this.value = {
        max: parseInt(this.left.max * this.max / 100),
        min: parseInt(this.left.min * this.max / 100)
    };
}

function move (event) {
    if ( this.allow === false )
        return;

    var mouse = relative.call(this, event);
    var calc = percent.call(this, mouse);

    if (this.allow === 'min') {
        if( calc < this.left.max )
            this.left.min = calc;
        else this.left.min = this.left.max;
    }

    else if (this.allow === 'max') {
        if ( calc > this.left.min )
            this.left.max = calc;
        else this.left.max = this.left.min;
    }

    this.rerange();
    this.update();
}

function relative (event) {
    var offset = 0;
    var el = this.$el;

    if (el.offsetParent) {
        do offset += el.offsetLeft;
        while (el = el.offsetParent);
    }

    return event.clientX - offset;
}

function percent (mouse) {
    var diff = this.allow === 'min' ? 0 : -15;
    return mouse > this.$el.offsetWidth + diff
        ? 100 : mouse < 0
            ? 0
            : 100 / (this.$el.offsetWidth + diff) * mouse;

}

function update () {
    return this.$emit('changed', {
        type: 'range',
        name: this.name,
        value: {
            min: this.value.min,
            max: this.value.max
        }
    });
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.range
    display block
    margin 16px 0

    .range-input
        border 1px solid $black
        border-radius 50px
        font-size 16px
        outline none
        padding 8px 16px
        text-align center
        width calc(50% - 60px)

    .input-container
        align-items center
        display flex
        justify-content space-between

        .delimiter
            font-weight bolder

    .line
        background $red
        border-radius 15px
        margin 24px 0 8px 0
        position relative
        height 10px

    .line-container
        position absolute
        left 19px
        right 49px
        height 100%

    .selected
        background $white
        border-radius inherit
        transition none
        position absolute
        top 1px
        height 8px

    .point
        background $red
        border-radius 50%
        cursor pointer
        transition none
        position absolute
        top -10px
        height 30px
        width 30px
</style>

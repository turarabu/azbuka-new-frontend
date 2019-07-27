<template lang="pug">
    div( class='cart-delivery-div' )
        div( class='column' )
            h3( class='column-title' )
                span( class='red' ) 01
                span / Адрес

            Options( :options='delivery.options' :value='delivery.current' @input='change' )
            AddressColumn( v-model='complete.address' v-bind='{services, type: delivery.current}' @input='check' )

        DeliveryColumn(
            v-model='complete.delivery'
            v-bind='{ services, address: complete.address, type: delivery.current }')

        BuildColumn(
            v-model='complete.build'
            v-bind='{ services, address: complete.address, type: delivery.current }')
            
</template>

<script>
import Options from '@/components/Filter/Options.vue'

import AddressColumn from '@/components/Cart/Form/Address.vue'
import DeliveryColumn from '@/components/Cart/Form/Delivery.vue'
import BuildColumn from '@/components/Cart/Form/Build.vue'

export default {
    compted: { costmer },
    components: { Options, AddressColumn, DeliveryColumn, BuildColumn },
    methods: { check, change },
    data: function () {
        return {
            services: getServices(),
            delivery: {
                current: 0,
                options: ['Самовывоз', 'Доставка до подъезда', 'До квартиры']
            },

            complete: {
                delivery: false,
                build: false,
                address: {
                    pass: false,
                    form: {}
                }
            }
        }
    }
}

// Computed
function costmer () {
    return this.$store.state.cart
}

// Methods
function check () {
    var pass = false

    if ( this.delivery.current === 0 )
        pass = true
    else if ( this.complete.address.pass !== false )
        pass = {
            complete: this.complete,
            delivery: this.delivery.current
        }

    this.$store.commit('pass-cart', {
        step: 1,
        value: pass
    })

    return this.$forceUpdate()
}

function change (index) {
    this.delivery.current = index
    this.check()
}

// Helper functions
function getServices () {
    var ajax = new XMLHttpRequest()

    ajax.open('GET', 'http://95.167.9.22:8081/service/list', false)
    ajax.send()

    return JSON.parse( ajax.responseText ).data
}
</script>

<style lang="stylus">
@import '~@/style/palette'

.cart-delivery-div
    align-items top 
    display grid
    grid-column-gap 64px
    grid-template-columns 320px 320px 320px
    justify-content center
    margin 32px auto
    width 1440px

    .column-title .red
        color $red
        display inline-block
        margin-right 4px
</style>

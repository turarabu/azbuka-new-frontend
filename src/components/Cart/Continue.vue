<template lang="pug">
    div( class='to-next-step' )
        p( class='row' )
            span( class='key' ) Стоимость товаров:
            span( class='value' ) {{ total.toLocaleString('ru-RU') }} руб

        p( class='row' )
            span( class='key' ) Доставка и сборка:
            span( class='value' ) {{ (delivery().price + build()).toLocaleString('ru-RU') }} руб

        p( class='row' )
            span( class='key' ) Ваша скидка:
            span( class='value' ) {{ bonuses }} руб

        p( class='row' )
            span( class='key' ) Итого к оплате:
            span( class='value' ) {{ ((total + delivery().price + build()) - bonuses).toLocaleString('ru-RU') }} руб

        p( class='row' )
            button( class='next' @click='next' ) {{ step < 4 ? 'Далее' : 'Оформить покупку' }}
</template>

<script>
export default {
    props: ['step'],
    components: {  },
    computed: { cart, costumer, total, bonuses },
    methods: { delivery, build, getBuildPrice, next },
    data: function () {
        return {
            services: getServices()
        }
    }
}

// Computed
function cart () {
    return this.$store.state.cart
}

function costumer () {
    return this.$store.state.costumer
}

function total () {
    var total = 0

    for (let item of this.cart)
        total += item.total

    return parseInt(total)
}

function bonuses () {
    return this.$store.state.costumer[3].have
}

// Methods
function delivery () {
    return this.costumer[1].complete && this.costumer[1].complete.delivery || {price: 0}
}

function build () {
    var result = 0
    var price = this.getBuildPrice()
    for ( let item of this.cart )
        result += Math.max(price.minPrice, item.source.prices.mins[item.option] * (price.percent / 100) ) * item.count
    
    return result
}

function next () {
    switch (this.step) {
        case '1':
            return this.$router.push('/cart/2')
        case '2':
            if ( this.$store.state.costumer[1] !== false )
                return this.$router.push('/cart/3')
        case '3':
            if ( this.$store.state.costumer[2] !== false )
                return this.$router.push('/cart/4')
        case '4':
            console.log(this.$store.state.costumer)
    }
}

function getBuildPrice () {
    for ( let service of this.services ) {
        if ( service.name.toUpperCase() === 'СБОРКА' ) 
            return service
    }
}

function order () {
    var items = this.getItems()
    var data = getData(this.c, this, items)

    // var form = new FormData()
    // form.append('json', JSON.stringify(data))
    data = JSON.stringify(data)

    var ajax = new XMLHttpRequest()
    ajax.open('POST', `http://95.167.9.22:8081/cart/order?shop=000000001&json=${data}`, true)
    ajax.setRequestHeader('Content-Type', 'multipart/form-data')
    ajax.send( null )

    ajax.addEventListener('readystatechange', async event => {
        if (ajax.readyState === 4) {
            await this.confirm('Ваш заказ оформлен! Продолжить?')
            this.$store.commit('clear-cart')
            this.$router.push('/')
        }
    })

}

function getData (c, self, items) {
    return {
        "order":{
            "delivery": {
                "type":"Доставка",
                "date":"20190721",
                "time":"До 15",
                "point":"Доставка по городу",
                "street": c.address.street,
                "house": c.address.building,
                "apartment": c.address.home,
                "floor": c.address.floor,
                "intercom": c.address.dphone,
                "price": (c.delivery.selected > 1) ? 970 : 0
            },  

            "assembly": {
                "date":"20190722",
                "time": "До15",
                "price": self.build
            },
            "codeSeller":"916900",
            "bonus":{
                "count": 0, //c.bonuses.have,
                "phoneNumber": c.bonuses.phone,
                "spend": c.bonuses.use === 1
            },

            "liftPrice": (c.address.floor || 0) * 20,
            "buyerDetails":
            {
                "phoneNumber": c.contact.phone,
                "family": c.contact.lastName,
                "name": c.contact.firstName,
                "email": c.contact.email,
                "required_sms": c.contact.spams
            },

            products: items,
            "finalprice": self.total + self.build
        }
    }
}

function getItems () {
    var list = []

    for ( let item of this.$store.state.cart ) {
        list.push({
            id: item.id,
            price: parseInt(item.total / item.count),
            sum: item.total,
            count: item.count,
            assembly: Math.max(600, item.total),
            spendAssembly: true,
            dateOrder: '1970-01-01T12:00:00.000Z',
            characteristicId: `${item.source.specs[0].options[item.option].id}`
        })
    }

    return list
}

function getServices () {
    var ajax = new XMLHttpRequest()

    ajax.open('GET', 'http://95.167.9.22:8081/service/list', false)
    ajax.send()

    return JSON.parse( ajax.responseText ).data
}

function objectToFormData (obj, form, namespace) {
    
  var fd = form || new FormData();
  var formKey;
  
  for(var property in obj) {
    if(obj.hasOwnProperty(property)) {
      
      if(namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }
     
      // if the property is an object, but not a File,
      // use recursivity.
      if(typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
        
        objectToFormData(obj[property], fd, property);
        
      } else {
        
        // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
      
    }
  }
  
  return fd;
    
};
</script>

<style lang="stylus">
@import '~@/style/palette'

.to-next-step
    align-items flex-end
    display flex
    flex-direction column
    margin-top 64px
    width 100%

    .row
        font-size 18px
        font-weight 500
        margin 2px 0
        width 500px

        .key
            color lighten($dark-gray, 15)
            display inline-block

        .value
            display inline-block
            margin 0 4px

        .next
            background $red
            border none
            border-radius 50px
            color $white
            font-size 18px
            margin 16px 0
            outline none
            padding 8px 16px
            width 200px
</style>

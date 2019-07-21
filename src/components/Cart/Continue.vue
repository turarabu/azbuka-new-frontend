<template lang="pug">
    div( class='to-next-step' )
        p( class='row' )
            span( class='key' ) Стоимость товаров:
            span( class='value' ) {{ total.toLocaleString('ru-RU') }} руб

        p( class='row' )
            span( class='key' ) Доставка и сборка:
            span( class='value' ) {{ build }} руб

        p( class='row' )
            span( class='key' ) Ваша скидка:
            span( class='value' ) {{ discount }} руб

        p( class='row' )
            span( class='key' ) Итого к оплате:
            span( class='value' ) {{ (total + build).toLocaleString('ru-RU') }} руб

        p( class='row' )
            button( class='next' @click='next' ) {{ step < 4 ? 'Далее' : 'Оформить покупку' }}

        Confirm( v-bind='{ question }' @answer='answer' )
</template>

<script>
import Confirm from '@/components/Cart/Confirm.vue'

export default {
    props: ['step'],
    components: { Confirm },
    computed: { c, total, build, discount },
    methods: { next, order, getItems, answer, confirm },
    data: function () {
        return {
            question: false,
            waiting: false
        }
    }
}

function c () {
    return this.$store.state.costumer
}

function total () {
    var total = 0
    for ( let item of this.$store.state.cart )
        total += item.total

    return total
}

function build () {
    var total = 0
    for ( let item of this.$store.state.cart )
        total += Math.max(600, item.total / 10)

    return total
}

function discount () {
    return 0
}

// Methods
function next () {
    if ( this.step < 4 )
        this.$router.push(`/cart/${ parseInt(this.step) + 1 }`)
    else this.order()
}

function answer (answer) {
    this.question = false

    if ( this.waiting === false )
        return
    
    else this.waiting(answer)
}

function confirm (question) {
    this.question = question

    return new Promise (resolve => {
        this.waiting = (answer) => {
            this.waiting = false
            return resolve(answer)
        }
    })
}

function order () {
    var items = this.getItems()
    var data = getData(this.c, this, items)

    // var form = new FormData()
    // form.append('json', JSON.stringify(data))
    data = JSON.stringify(data)

    var ajax = new XMLHttpRequest()
    ajax.open('POST', `http://95.167.9.22:8081/cart/order??shop=000000001&json=${data}`, true)
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
                "time": "До 15",
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
            dateOrder: new Date().toISOString()
        })
    }

    return list
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

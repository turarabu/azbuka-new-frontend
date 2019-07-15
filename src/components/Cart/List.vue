<template lang="pug">
    div( class='table' )
        p( class='row' )
            td( class='image data' ) Фото товара
            td( class='name data' ) Название
            td( class='count data' ) Количество
            td( class='price data' ) Цена
            td( class='build data' ) Сборка
            td( class='total data' ) Стоимость
            td( class='actions data' ) 

        CartItem( v-for='(item, index) in cart' v-bind='{ index, item }' :key='index' )
</template>

<script>
import CartItem from '@/components/Cart/Item.vue'

export default {
    props: ['cart'],
    components: { CartItem }
}
</script>

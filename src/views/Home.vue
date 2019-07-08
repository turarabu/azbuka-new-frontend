<template lang="pug">
    div#home
        div( class='block' )
            router-link( tag='img' class='banner' src='/images/banner.jpg' to='/catalog/00000000015' )
</template>

<script>

export default {
    
}
</script>

<style lang="stylus">
#home
    margin 32px 0

    .banner
        width 100%
</style>

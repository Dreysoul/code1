<template>
  <div>支付页面</div>
</template>

<script>
import{putCartAPI } from '../request/api.js'
export default {
  data () {
    return {
      cartDatas: {}
    }
  },
  created () {
    // 查看你购物车数据
    this.showCartData()
  },
  methods: {
    // 查看你购物车数据
    async showCartData () {
      let cartData = JSON.parse(this.$route.query.cartData)
      console.log('查看数据', cartData);
      const res = await putCartAPI(cartData)
      console.log('修改数据', res);
      if (res.code == 0) {
        this.cartDatas = res.data
      }
    }
  }
}
</script>

<style>
</style>
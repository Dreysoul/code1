<template>
  <div class="wrap">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide"  v-for="(item,index) in img" :key=index>
          <img width="1200px" height="446px"
            :src="item"
          />
        </div>
        </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import 'swiper/css/swiper.css'
import Swiper from 'swiper'
export default {
  props:['img'],
  data () {
    return {
  
    }
  },

  mounted () {
    var mySwiper = new Swiper('.swiper-container', {
      loop: true, // 循环模式选项
      effect: 'cube',
      autoplay:true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
    })
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  width: 1200px;
  height: 446px;
}
</style>
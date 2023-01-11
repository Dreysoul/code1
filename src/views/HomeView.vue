<template>
  <div class="home">
    <!-- 轮播图 -->
    <MySwiper :img="imgIndex"></MySwiper>
    <!-- 标题 -->
    <Title title="精品推荐" :more="true">

      <img src="@/assets/img/jingpin.png" alt="" />
    </Title>
    <!-- // 精品推荐  -->
    <List :list="jpRes"></List>
    
   <!-- // 热门兑换 -->
    <Title title="热门兑换" :more="true">
      <img src="@/assets/img/hot.png" alt="" />
    </Title>
    <img class="banner" src="@/assets/img/banner.4c6b6225.png" alt="">
    
    <List :list="rmRes"></List>
    

  </div>
</template>

<script>
import MySwiper from '../components/home/MySwiper.vue'
import Title from '../components/home/Title'
import List from '../components/List.vue'
import { JingPinAPI ,remAPI} from '@/request/api'

export default {
  name: 'HomeView',
  components: {
    MySwiper, Title, List
  },
  data () {
    return {
      imgIndex: [
        require('@/assets/img/404.94e7c552.jpg'),
        require('@/assets/img/404.94e7c552.jpg'),
        require('@/assets/img/404.94e7c552.jpg'),
      ],
      // 精品推荐 
      jpRes: {},
      // 热门兑换
      rmRes: {}
    }
  },
  created () {
    // 精品推荐
    this.BoutiqueRecommended(),
      // 热门兑换
      this.popularExchanges()
  },
  methods: {
    // 精品推荐
    async BoutiqueRecommended () {
      let { data: res } = await JingPinAPI()
      this.jpRes = res.data.records
    },
    // 热门兑换
    async popularExchanges () {
      let { data: res } = await remAPI()
      this.rmRes = res.data.records
    }

  }

  // 方法二
  // async created () {
  //   let res = await BoutiqueRecommended();
  //   console.log(res);
  //   this.jpRes = res.data.data.records;
  //   console.log(this.jpRes)
  // }
}

</script>
<style lang="less" scoped>
.home {
  background-color: #f5f5f5;
}

.banner {
  margin-top: 2px;
}
</style>>


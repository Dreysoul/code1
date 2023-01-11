<template>
  <div class="goods">
    <div class="wrap">
      <!--导航框-->
      <!-- <Crumb> </Crumb> -->
      <img src="../assets/img/banner.4c6b6225.png" width="100%" alt="" />
      <ul class="options">
        <li>
          <strong>排序：</strong>
          <span
            @click="orderClick(index, items.min, items.max)"
            :class="orderActive == index ? 'active' : ''"
            v-for="(items, index) in orderArr"
            :key="index"
            >{{ items.txt }}</span
          >
        </li>
        <li>
          <strong>分类：</strong>
          <span
            @click="classifyClick(index, item.type)"
            :class="classifyActive == index ? 'active' : ''"
            v-for="(item, index) in classifyArr"
            :key="index"
            >{{ item.tet }}</span
          >
        </li>
      </ul>
      <!--商品详情信息-->
      <!-- <List :arr="[10,20,30]" /> -->
      <List :list="goodsInfo"></List>
    </div>
  </div>
</template>                            
<script>
import { GoodSearchAPI } from '../request/api.js'
import List from '../components/List'
export default {
  data () {
    return {
      did: 0,//栏目，0全部，1精品推荐，2热门兑换
      type: 0,//类型，0全部，1是集体商店，2虚拟商品
      min: 0,//最少积分
      max: 0,//最多积分
      keyword: "",//搜索关键字
      goodsInfo: [],//存储商品信息的数组
      // 选择功能数据
      classifyArr: [
        { type: 0, tet: '全部' },
        { type: 1, tet: '实体商品' },
        { type: 2, tet: '虚拟商品' }
      ],
      classifyActive: 0,//未被选中
      // 排序功能数据
      orderArr: [
        { min: 0, max: 10000, txt: '我还可以兑换' },
        { min: 0, max: 0, txt: '0-500个' },
        { min: 0, max: 500, txt: '500-1000个' },
        { min: 500, max: 1000, txt: '1000-1500个' },
        { min: 1000, max: 1500, txt: '1500-2000个' },
        { min: 1500, max: 2500, txt: '1500-2500个' }
      ],
      orderActive: 0,//未被选中    
    }
  },
  components: {
    List
  },
  created () {
    // 商品搜索
    this.GoodSearchList()
  },
  // 选择功能
  methods: {
    classifyClick (index, type) {
      this.classifyActive = index;
      this.type = type;
      this.GoodSearchList()
    },
    // 选择排序
    orderClick (index, min, max) {
      this.orderActive = index;
      this.min = min;
      this.max = max;
      this.GoodSearchList()
    },
    async GoodSearchList () {
      // 商品搜索
      const { data: res } = await GoodSearchAPI({
        did: this.did,
        type: this.type,
        min: this.min,
        max: this.max,
        keyword: this.$route.query.keyword || this.keyword
      })
      this.goodsInfo = res
    },
  },
  watch: {
    '$route.query.keyword': {
      handler () {
        this.GoodSearchList()
      }
    }
  }
}
</script>
 
<style lang = "less" scoped>
.goods {
  text-align: left;
  padding-bottom: 50px;
  background: #efefef;
  padding-top: 20px;
  .options {
    padding-top: 20px;
    padding-bottom: 40px;
    li {
      margin-top: 20px;
      strong {
        color: #000;
        font-weight: bold;
      }
      span {
        margin-right: 20px;
        margin-left: 10px;
        cursor: pointer;
        color: #999;
        &.active {
          color: #0a328e;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
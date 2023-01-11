<template>
  <div class="wrap">
    <ul class="list-ul">
   <!-- // 1.  路由携带参数，且地址栏显示参数 -->
      <!-- @click="$router.push({path:'/detail',query:{id:items.id}})"> -->
    <!-- 2.   路由携带参数，且地址栏不显示参数 -->
          <!-- @click="$router.push({path:'/detail',parmas:{id:items.id}})"> -->
<!-- 3. @click="$router.push(`/detail?id=${items.id}`) -->

      <li class="list-li" v-for="(items, index) in list" :key="index"
      @click="$router.push({path:'/detail',query:{id:items.id}})">
        <!-- <img v-show="isHotSale" src="@/assets/img/section_hot.png" alt=""> -->
        <img class="imghn" v-if=" items.isHotSale" src="@/assets/img/section_hot.png" alt="">
        <img class="imghn" v-else-if=" items.isLatest" src="@/assets/img/section_new.png" alt="">
        <img :src="'http://sc.wolfcode.cn' + items.coverImg" alt="" />
        <!-- 商品名称 -->
        <p>{{ items.name }}</p>
        <!-- 价格 -->
        <div class="price">
          <p>{{ items.coin }}</p>
          <img src="@/assets/img/monad.png" alt="" />
        </div>
        <!-- 兑换按钮 -->
        <!-- <div class="dh">立即兑换</div> -->
        <button class="dh">立即兑换</button>
      </li>
    </ul>
    </div>
</template>

<script>
export default {
  props: ['list'],
  data() {
    return {
    
    }
  },
}
</script>

<style lang="less" scoped>
.list-ul {
  display: grid;
  // 每一行的排版方式
  grid-template-columns: 285px 285px 285px 285px;
  // 两端对齐
  justify-content: space-between;

  .list-li {
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 285px;
  height: 512px;
  background-color: white;
  cursor: pointer;
  position: relative;
  img {
    width: 285px;
    height: 330px;
  }
  p {
    font-size: 18px;
  }
  .price {
    display: flex;
    justify-content: center;
    p {
      font-size: 18px;
      color: #fd604d;
      margin-right: 5px;
    }
    img {
      width: 20px;
      height: 20px;
    }
  }
  .dh {
    width: 102px;
    height: 38px;
    line-height: 38px;
    color: #000;
    border: 1px solid #000;
    margin-bottom: 25px;
  }
  .imghn{
    position: absolute;
    left: 0px;
    width: 50px;
    height: 50px;
  }
}

  .list-li:hover {
  transform: translateY(-10px);
  .dh {
    color: #000fff;
    background-color: #fff;
  }
}
}


</style>
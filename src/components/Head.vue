<template>
  <div class="wrap head">
    <div class="left">
      <img src="../assets/img/indexLogo.6f8ac4f0.png" />
    </div>
    <div class="center">
      <ul>
        <li
          :class="$route.path == '/' ? 'active' : ''"
          @click="$router.push('/')"
        >
          首页
        </li>
        <li
          :class="$route.path == '/goods' ? 'active' : ''"
          @click="$router.push('/goods')"
        >
          全部礼品
        </li>
        <li
          :class="$route.path == '/user' ? 'active' : ''"
          @click="$router.push('/user')"
        >
          个人中心
        </li>
        <li
          :class="$route.path == '/order' ? 'active' : ''"
          @click="$router.push('/order')"
        >
          我的订单
        </li>
        <li
          :class="$route.path == '/free' ? 'active' : ''"
          @click="$router.push('/free')"
        >
          专属福利
        </li>
      </ul>
    </div>
    <div class="right">
      <input
        type="text"
        placeholder="请输入关键字"
        v-model="inputVal"
        @keyup.enter="toSearch()"
      />
      <span @click="toSearch()">
        <img src="../assets/img/search.png" alt="" />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputVal: ''
    }
  },
  methods: {
    toSearch () {
      // 跳转到goods页面
      this.$router.push(`/goods?keyword=${this.inputVal}`)
    }
  },
 
}
</script>

<style lang="less" scoped>
.active {
  color: red;
  font-weight: 70px;
}
.head {
  height: 72px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .center {
    ul {
      width: 511px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      li {
        cursor: pointer;
      }
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 174px;
      height: 38px;
      border: 1px solid #ccc;
      border-radius: 18px 0 0 18px;
      padding-left: 10px;
    }
    span {
      width: 50px;
      height: 45px;
      background-color: #0a328e;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 0px 18px 18px 0;
      img {
        padding: 15px;
      }
    }
  }
}
</style>
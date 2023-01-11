<template>
  <div class="top-bar">
    <div class="wrap top-bar-wrap">
      <div class="l">欢迎来到叩丁严选</div>
      <div class="r">
        <ul>
          <li>
            <img class="avatar" width="30" :src="userInfo.headImg" alt="" />
            用户名:{{ userInfo.nickName }}
          </li>
          <li>我的鸡腿:{{ userInfo.coin }}</li>
          <li>获取鸡腿</li>
          <li>叩丁狼官网</li>
          <li class="cat-btn" v-show="isLogined">
            <img src="@/assets/img/cart.png" alt="" />
            <span>购物车</span>
            <b>{{ cartTotal }}</b>
          </li>
          <li
            class="login-btn"
            v-show="!isLogined"
            @click="changeShowLoginModel(true)"
          >
            登录
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      goodsInfo:''
    }
  },
  methods: {
    ...mapMutations(['changeShowLoginModel', 'changLogined']),
  },
  computed: {
    ...mapState(['isLogined', 'cartTotal', 'userInfo'])
  },
  created () {
    //  页面刷新前保存vuex的state数据
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("userInfo", JSON.stringify(this.$store.state))
    })
    //  刷新后将vuex里面的state的数据替换成保存的数据
    if (localStorage.getItem("x-auth-token")) {// 判断是登录状态
      let state = localStorage.getItem("userInfo")
      // Object.assign({} 拷贝
      this.$store.replaceState(Object.assign({}, JSON.parse(state)))
    } else {// 判断不是登录状态
      // 清空数据
      localStorage.removeItem("userInfo")
    }
  },
  watch: {
    '$route.path': {
      handler () {
        let token = localStorage.getItem('x-auth-token')
        this.changLogined(Boolean(token))
      }

    }
  }
}
</script>

<style lang="less" scoped>
.cat-btn {
  width: 125px;
  height: 40px;
  background: #0a3281;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    margin-left: 5px;
    margin-right: 5px;
  }
  b {
    width: 22px;
    height: 22px;
    line-height: 22px;
    text-align: center;
    background-color: #f40;
    border-radius: 11px;
  }
}
.top-bar {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  background-color: #252b39;
  color: white;
  .top-bar-wrap {
    /*后面添加的*/
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .r {
      ul {
        display: flex;

        li {
          display: flex;
          align-items: center;
          margin-left: 10px;
          cursor: pointer;
          .avatar {
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .login-btn {
          background-color: #1d338f;
          width: 124px;
          height: 40px;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
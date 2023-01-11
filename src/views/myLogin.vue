<template>
  <div class="login-modal">
    <div class="mask"></div>
    <div class="login-box">
      <!-- @click="close" 方式一 -->
      <!-- @click="changeShowLoginModel(false)" 方式二 -->
      <img
        class="close"
        @click="changeShowLoginModel(false)"
        src="../assets/img/close.png"
        alt=""
      />
      <ul class="title">
        <li :class="isShowForm ? 'active' : ''" @click="isShowForm = true">
          手机号码登录
        </li>
        <li style="margin: -2px 10px 0; cursor: auto">|</li>
        <li :class="!isShowForm ? 'active' : ''" @click="isShowForm = false">
          微信扫码登录
        </li>
      </ul>
      <div class="body">
        <div class="form" v-show="isShowForm">
          <div class="input-group uname">
            <input
              ref="phone"
              type="text"
              placeholder="请输入手机号"
              v-model="phoneNum"
            />
          </div>
          <div class="input-group mb20">
            <!--滑块-->
            <slide-verify
              :l="42"
              :r="20"
              :w="360"
              :h="140"
              :imgs="imgs"
              class="slide-box"
              :slider-text="msg"
              @success="onSuccess"
              @fail="onFail"
              @refresh="onRefresh"
            ></slide-verify>
          </div>

          <div class="input-group code mb20">
            <input type="text" placeholder="请输入短信验证码" />
            <div class="btn">
              <!-- has-count是灰色背景-->
              <span @click="getSMScode()">获取验证码</span>
              <span v-show="false">18</span>
            </div>
          </div>
          <div class="btn login-btn" @click="submitLogin()">登录</div>
        </div>
        <div class="wx-qrcode" v-show="!isShowForm">微信二维码</div>
      </div>
    </div>
  </div>
</template>
<script>
import { PhoneLoginAPI } from '../request/api.js'
import { mapActions, mapMutations } from 'vuex';
import { validatePhoneNumber } from '../utils/index.js'
export default {
  data () {
    return {
      // 控制表单盒子的显示和隐藏
      isShowForm: true,
      // 用户输入的手机号
      phoneNum: "15888032077",
      msg: "向右滑动",
      verifyCode: '',
      imgs: [
        require('@/assets/img/banner.f559b49d.png'),
        require('@/assets/img/banner.f559b49d.png'),
        require('@/assets/img/banner.f559b49d.png'),
      ]
    };
  },
  methods: {
    // 方式一
    // close () {
    //   this.$store.commit('changeShowLoginModel',false)
    // }
    // 方式二 
    onSuccess () {
      // 滑块验证成功
      this.msg = '校验成功'
    },
    onFail () {
      // 滑块验证那个失败
      this.msg = '再试一次'
    },
    onRefresh () {
      // 滑块刷新
      this.msg = '再试一次'
    },
    ...mapMutations(['changeShowLoginModel', 'changLogined']),
    ...mapActions(['asyncChangeUserInfo']),
    // 手机号验证
    verify () {
      if (!validatePhoneNumber(this.phoneNum)) {
        alert("请输入正确号码")
        return false
      }
      if (this.msg == '向右滑动' || this.msg == '再试一次') {
        alert('必须校验滑块')
        return false
      }
      return true;
    },
    // 获取验证码
    getSMScode () {
      // 验证是否是手机号，如果不是结束掉运行
      if (!this.verify()) {
        return;
      }
    },
    // 登陆验证
    async submitLogin () {
      // 验证是否是手机号，如果不是结束掉运行
      if (!this.verify()) {
        return;
      }
      let res = await PhoneLoginAPI({
        verifyCode: this.verifyCode,
        phone: this.phoneNum
      })
      console.log("成功", res);
      //判断是否登录成功
      if (res) {
        //关闭登录框
        this.changeShowLoginModel(false)
        // 将获取到的值存到localstage中
        localStorage.setItem('x-auth-token', res['x-auth-token'])
        //更改登录状态
        this.changLogined(true)
        // 更新购物车以及用户信息
        this.asyncChangeUserInfo()
      }
    }
  },
};
</script>
<style lang = "less" scoped>
.login-modal {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .login-box {
    width: 555px;
    height: 423px;
    background: url("../assets/img/login-box-bg.png");
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;

    .close {
      position: absolute;
      right: 60px;
      top: 15px;
      cursor: pointer;
    }

    .title {
      display: flex;
      justify-content: center;
      padding: 45px 0 30px;
      color: #ccc;
      font-size: 18px;
      li {
        cursor: pointer;
      }
      .active {
        color: #333;
      }
    }

    .body {
      width: 360px;
      margin: 0 auto;

      .form {
        .uname {
          margin-bottom: 5px;
        }
        .input-group {
          display: flex;

          input {
            height: 48px;
            width: 100%;
            text-indent: 10px;
            border: 1px solid #ccc;
          }
        }
        .code input {
          width: 260px;
          margin-right: 8px;
        }

        .code .btn {
          flex: 1;
        }
        .btn {
          height: 50px;
          line-height: 50px;
          background-color: #0a328e;
          color: #fff;
          text-align: center;
          cursor: pointer;
          &.login-btn {
            margin-top: 10px;
          }
        }
        .has-count {
          background-color: #ccc;
        }
      }
    }
  }
}

/deep/.slide-box {
  width: 100%;
  position: relative;
  box-sizing: border-box;
  canvas {
    position: absolute;
    left: 0;
    top: -120px;
    display: none;
    width: 100%;
    box-sizing: border-box;
  }
  .slide-verify-block {
    width: 85px;
    height: 136px;
  }
  .slide-verify-refresh-icon {
    top: -120px;
    display: none;
  }
  &:hover {
    canvas {
      display: block;
    }
    .slide-verify-refresh-icon {
      display: block;
    }
  }
}
</style>
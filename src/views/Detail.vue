<template>
  <div class="details wrap">
    <!--面包屑组件-->
    <Crumb :navCrumb="nav"></Crumb>
    <main>
      <div class="content">
        <div class="l">
          <div class="bigImg">
            <img
              width="100%"
              height="100%"
              :src="imgURL + productInfo.coverImg"
              alt=""
            />
          </div>
          <ul>
            <li
              v-for="(item, index) in productInfo.imgAltas"
              :key="index"
              @mouseenter="productInfo.coverImg = item.src"
            >
              <img width="100%" height="100%" :src="imgURL + item.src" alt="" />
            </li>
          </ul>
        </div>
        <div class="r">
          <div class="top">
            <h2>{{ productInfo.seriesTitle }}</h2>
            <p>{{ productInfo.seriesSubTitle }}</p>
            <div class="score">{{ productInfo.coin }}</div>
          </div>
          <div class="down">
            <section
              v-for="(items, index) in productInfo.parameterJson"
              :key="index"
            >
              <strong>{{ items.title }}</strong>
              <ul>
                <li
                  v-for="item in items.parameters"
                  :key="item.id"
                  :class="item.currentActivate ? 'active' : ''"
                  @click="productDetails(item.id)"
                >
                  {{ item.title }}
                </li>
              </ul>
            </section>
            <div style="margin: 10px 0">
              <strong
                >数量 <span>{{ productInfo.stock }}</span></strong
              >
              <div class="step">
                <div class="reduce" @click="step(-1)">-</div>
                <input type="text" disabled v-model="stepNum" />
                <div class="add" @click="step(1)">+</div>
              </div>
            </div>
            <div class="btns">
              <div class="addToCart" @click="addCart">
                加入购物车
              </div>
              <div class="buyNow">立即购买</div>
            </div>
          </div>
        </div>
      </div>
      <aside>
        <h3>你还可以兑换</h3>
        <ul>
          <li
            v-for="(it, index) in themYouCanBuy"
            :key="index"
            @click="$router.push(`/detail? id = ${it.id}`)"
          >
            <div class="l">
              <img :src="imgURL + it.img" alt="" />
            </div>
            <div class="r">
              <div class="title">{{ it.name }}</div>
              <div class="score">
                <span>{{ it.coin }}</span>
                积分
              </div>
            </div>
          </li>
        </ul>
      </aside>
    </main>
    <ul class="tabs">
      <li :class="flag ? 'active' : ''" @click="flag = flase">礼品详情</li>
      <li :class="!flag ? 'active' : ''" @click="flag = true">常见问题</li>
    </ul>
    <div
      style="text-align: left"
      v-show="!flag"
      v-html="productInfo.description"
    >
      <!-- 商品详情的内容盒子 -->
    </div>
    <div class="issue" v-show="flag">
      <!-- 常见问题的内容盒子 -->
      <h4>兑换后运费如何收取？</h4>
      <p>
        商城内大部分实物产品均可包邮，也支持上门自提。虚拟产品则无需运费，可在兑换后直接使用。
      </p>
      <p class="mb20">
        （注：新疆，西藏，内蒙古，青海，海南，宁夏暂不支持包邮，在此地区兑换商品需提前与客服确认运费。）
      </p>
      <h4>如何申请退换货？</h4>
      <p>所有产品均为鸡腿兑换礼品，无质量问题不支持退换货；</p>
      <p>如因喜好不同，或到货后后悔等原因，不支持退货；</p>
      <p>
        因客户原因如联系方式有误、电话停机、不接电话、无理由拒收等造成快件无法正常签收的情况，叩丁狼均不进行补发或赔付；
      </p>
      <p>
        如因质量问题需要退货，将由客服人员与客户联系，确认邮寄地址与流程。退回物品不得有人为损坏或使用痕迹，否则拒绝退换；
      </p>
      <p class="mb20">
        如顾客选择自行寄回商品，请先垫付运费，到货验证商品后，叩丁狼将以鸡腿发放形式为用户报销运费，不接受单方面到付件。
      </p>
      <h4>如何开具发票？</h4>
      <p>叩丁狼积分商城产品均为定制礼品，使用积分兑换的产品均不支持开票。</p>
      <h4>关于鸡腿价格问题</h4>
      <p class="mb20">
        因可能存在系统缓存、页面更新延迟等不确定性情况，导致价格显示异常，商品具体售价请以订单结算页价格为准。如您发现异常情况出现，请立即联系我们补正，以便您能顺兑换。
      </p>
      <h4>联系我们</h4>
      <p>www.wolfcode.cn</p>
      <p class="mb20">微信公众号搜索“叩丁狼”</p>
    </div>
  </div>
</template>

<script>
import Crumb from '../components/Crumb'
import { detailsAPI ,addCartAPI} from "@/request/api";
import { mapActions } from 'vuex';
export default {
  components: {
    Crumb
  },
  data () {
    return {
      stepNum: 1 /**数量数据 */,
      productInfo: {},//商品信息
      themYouCanBuy: {},//可兑换的数据
      nav: {},//面包屑数据
      flag: true//问题与详情的数据设置
    };
  },
  watch: {
    // 监听数据是否发生了变化
    '$route.query.id': {
      handler () {
        // 刷新当前页
        this.$router.go(0);
      }
    }
  },

  created () {
    // 获取路由中传递过来的参数
    let id = this.$route.query.id
    this.productDetails(id)
  },
  methods: {
    ...mapActions(['asyncChangeUserInfo']),
    // 添加购物车
    async addCart () {
      let param = {
        productId: this.$route.query.id,
        total: this.stepNum,
        modified:1
      }
      let res = await addCartAPI(param)
      console.log("加入购物车", res)
      // 刷新数据
      this.asyncChangeUserInfo()
    },
    async productDetails (id) {
      // 商品详情
      const { data: res } = await detailsAPI(id)
      this.productInfo = res.productInfo
      this.themYouCanBuy = res.themYouCanBuy
      this.nav = res.nav
      // console.log("获取精品推荐的数据", this.productInfo)
      //切换upload路径
      this.productInfo.description = this.productInfo.description.replaceAll('upload', this.imgURL + '/upload')
    },
    // 数量的计算
    step (val) {
      // 数量减少到1时不在减少
      // 数量增加到库存数不再增加
      if (val == -1 && this.stepNum == 1 || val == 1 && this.stepNum >= this.productInfo.stock) {
        return;
      }
      this.stepNum = this.stepNum + val
    }
  }
}
</script>
 
<style lang = "less" scoped>
.details {
  main {
    margin-bottom: 52px;
    display: flex;
    .content {
      width: 884px;
      display: flex;
      justify-content: space-between;
      .l {
        .bigImg {
          width: 459px;
          height: 440px;
          background-color: #fcf;
          margin-bottom: 21px;
        }
        ul {
          width: 459px;
          display: flex;
          justify-content: space-between;
          li {
            width: 100px;
            height: 100px;
            background-color: #cff;
            cursor: pointer;
            img {
              filter: brightness(50%);
            }
            &:hover {
              img {
                filter: brightness(100%);
              }
            }
          }
        }
      }
      .r {
        text-align: left;
        padding: 7px 49px 0 31px;
        .top {
          padding-bottom: 23px;
          border-bottom: 1px solid #ececec;
          h2 {
            font-size: 28px;
            color: #000000;
          }
          p {
            margin-top: 15px;
            font-size: 14px;
            font-weight: 300;
            color: #999999;
          }
          .score {
            font-size: 28px;
            font-weight: bold;
            color: #fd604d;
            margin-top: 26px;
          }
        }
        .down {
          padding-top: 19px;
          strong {
            font-weight: 300;
            color: #000000;
            margin-bottom: 14px;
            display: block;
            span {
              color: #666;
              font-size: 14px;
            }
          }
          ul {
            width: 100%;
            overflow: hidden;
            li {
              padding: 5px 10px;
              cursor: pointer;
              height: 32px;
              float: left;
              text-align: center;
              line-height: 32px;
              color: #666666;
              border: 1px solid #d1d1d1;
              margin-right: 20px;
              margin-bottom: 11px;
              &.active {
                border-color: #0a328e;
                color: #0a328e;
              }
            }
          }
          .step {
            background: #fff;
            width: 106px;
            margin-bottom: 24px;
            height: 32px;
            display: flex;
            justify-content: space-between;
            .reduce,
            .add {
              width: 30px;
              text-align: center;
              line-height: 32px;
              height: 32px;
              cursor: pointer;
              box-sizing: border-box;
              border: 1px solid #ccc;
              user-select: none;
            }
            input {
              width: 46px;
              height: 32px;
              user-select: none;
              border: 0;
              box-sizing: border-box;
              border-top: 1px solid #ccc;
              padding: 0;
              text-indent: 1.5em;
              outline: none;
              border-bottom: 1px solid #ccc;
            }
          }
          .btns {
            display: flex;
            margin-bottom: 25px;
            div {
              width: 150px;
              height: 46px;
              line-height: 46px;
              text-align: center;
              margin-right: 19px;
              cursor: pointer;
              color: #fff;
              &.addToCart {
                background: #3dc36b;
              }
              &.buyNow {
                background: #fd604d;
              }
            }
          }
          .love_share {
            display: flex;
            .love {
              display: flex;
              align-items: center;
              padding-right: 16px;
              border-right: 1px solid #666;
              img {
                margin-right: 12px;
              }
              span {
                color: #666666;
              }
            }
            .share {
              padding-left: 18px;
            }
          }
        }
      }
    }
    aside {
      text-align: left;
      padding-left: 19px;
      box-sizing: border-box;
      width: 230px;
      border-left: 1px solid #ddd;
      h3 {
        font-size: 18px;
        color: #333333;
        margin-bottom: 20px;
      }
      ul {
        li {
          margin-bottom: 30px;
          display: flex;
          cursor: pointer;
          justify-content: space-between;
          .l {
            width: 80px;
            height: 80px;
            margin-right: 10px;
            background-color: #ffc;
            img {
              width: 100%;
              display: block;
              border: 1px solid transparent;
            }
          }
          .r {
            width: 140px;
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            .title {
              /* 超出一行变省略号 */
              text-overflow: ellipsis;
              width: 100%;
              font-weight: bold;
              overflow: hidden;
              white-space: nowrap;
              font-size: 14px;
              color: #666666;
            }
            .score {
              color: #666666;
              span {
                font-weight: bold;
                font-size: 18px;
                color: #ff5e0f;
              }
            }
          }
          &:hover {
            img {
              border: 1px solid #0a328e;
            }
            .title {
              color: #0a328e;
            }
          }
        }
      }
    }
  }
  .tabs {
    border-top: 1px solid #ececec;
    display: flex;
    width: 100%;
    margin-bottom: 27px;
    li {
      width: 120px;
      height: 50px;
      cursor: pointer;
      background: #fff;
      text-align: center;
      line-height: 50px;
      &.active {
        background: #ececec;
        font-weight: bold;
      }
    }
  }
  .issue {
    text-align: left;
    padding-bottom: 40px;
    h4 {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      margin-top: 20px;
    }
    p {
      line-height: 1.4em;
    }
  }
}
</style>
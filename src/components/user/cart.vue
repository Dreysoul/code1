<template>
  <div class="cart_page">
    <table>
      <thead>
        <tr>
          <th style="width: 8%">
            <i
              @click="clickCheckAll"
              :class="
                checkAll
                  ? 'icon iconfont icon-xuanzeyixuanze'
                  : 'iconfont icon-xuanzeweixuanze'
              "
            ></i>
          </th>
          <th style="width: 30%">礼品信息</th>
          <th>兑换分数</th>
          <th>数量</th>
          <th>小计 (鸡腿)</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in goodsInfo" :key="index">
          <td>
            <i
              @click="clickChecked(index)"
              :class="
                item.checked
                  ? 'iconfont icon-xuanzeyixuanze icon'
                  : 'iconfont icon-xuanzeweixuanze icon'
              "
            ></i>
          </td>
          <td>
            <section>
              <img width="84" :src="imgURL + item.coverImg" alt="列表图片" />
              <div class="info">
                <h5>{{ item.title }}</h5>
                <p>{{ item.versionDescription }}</p>
              </div>
            </section>
          </td>
          <td>{{ item.coin }}鸡腿</td>
          <td>
            <div class="step">
              <span @click="step(item, -1)">-</span>
              <input type="text" disabled v-model="item.total" />
              <span @click="step(item, +1)">+</span>
            </div>
          </td>
          <td>{{ item.coin * item.total }}鸡腿</td>
          <td>
            <span class="del" @click="subGoodsInfo(item.id)">删除</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="total">
      总计：<span>{{ goodsNum }}鸡腿</span>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>
  <script>
import { viewCartAPI, subGoodsAPI } from "@/request/api";
import { mapActions } from 'vuex';
export default {
  data () {
    return {
      stepNum: 1,
      // 全选
      checkAll: false,
      // 单选按钮数组
      checkList: [],
      // 购物车数据
      goodsInfo: [],
      // 购物车已选择的数据
      cartData: [],
      // 删除商品的id
      id: ''
    };
  },

  created () {
    // 查看购物车
    this.viewCart()
  },
  computed: {
    goodsNum () {
      return this.goodsInfo.reduce((sum, item) => {
        if (item.checked) {
          sum += item.coin * item.total
        }
        return sum
      }, 0)
    }
  },
  methods: {
    // 全选按钮
    clickCheckAll () {
      this.checkAll = !this.checkAll;
    },
    // 单选按钮
    clickChecked (index) {
      this.goodsInfo[index].checked = !this.goodsInfo[index].checked;
    },

    // 提交业务
    submit () {
      let count = 0;
      for (let i = 0; i < this.goodsInfo.length; i++) {
        if (this.goodsInfo[i].checked) {
          this.cartData.push(
            {
              id: this.goodsInfo[i].id,
              total: this.goodsInfo[i].total
            }
          )
          count++;
        }
      }
      if (count > 0) {
        this.$router.push({ path: '/affirm', query: { cartData: JSON.stringify(this.cartData) } })
      } else {
        alert('请先选择商品!!!')
      }
    },
    // 查看购物车
    ...mapActions(['asyncChangeUserInfo']),
    async viewCart () {
      const res = await viewCartAPI()
      console.log("购物车", res)
      if (res.code == 0) {
        this.goodsInfo = res.data
      }
      for (let i = 0; i < this.goodsInfo.length; i++) {
        // 为每一个商品设置一个属性
        this.$set(this.goodsInfo[i], "checked", false)
      }
      console.log('shang', this.goodsInfo);
    },
    // 购物车删除商品
    async subGoodsInfo (id) {
      const res  = await subGoodsAPI(id)
      console.log('删除商品', res);
    // 刷新购物车数据
      this.viewCart()
    // 更新头部购物车信息
      this.asyncChangeUserInfo()
    },
    step(item,val){ //购物车数量限制
      // 数量为1和仓库库存最大值时数据不改变
      if (val==-1&&item.total==1||val==1&&item.total>=8) {
        return
      }
      item.total+=val
    },
  }
}
  </script>
  <style lang="less" scoped>
@import "//at.alicdn.com/t/c/font_3821880_7hx3gvili4t.css";
.icon {
  font-size: 20px;
  background-color: white;
  border: 0 solid blue;
}
.cart_page {
  background: #fff;
  table {
    width: 100%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    color: #666;
    border-collapse: collapse;
    font-size: 14px;
    thead {
      background: #f2f2f2;
      th {
        padding: 19px 0;
        .iconfont {
          cursor: pointer;
        }
        .icon-yduifuxuankuangxuanzhong {
          color: #0a328e;
        }
      }
    }
    tbody {
      tr {
        td {
          vertical-align: middle;
          text-align: center;
          padding: 19px 0;
          table-layout: fixed; // td的宽度固定，不随内容变化
          .iconfont {
            cursor: pointer;
          }
          .icon-yduifuxuankuangxuanzhong {
            color: #0a328e;
          }
          section {
            padding-left: 20px;
            display: flex;
            box-sizing: border-box;
            img {
              margin-right: 12px;
            }
            .info {
              padding-top: 20px;
              flex: 1;
              overflow: hidden;
              box-sizing: border-box;
              text-align: left;
              h5 {
                overflow: hidden;
                color: #333;
                font-size: 18px;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 20px;
              }
              p {
                color: #666;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          .step {
            width: 106px;
            height: 32px;
            margin: auto;
            span {
              float: left;
              width: 30px;
              height: 32px;
              display: block;
              border: solid 1px #d1d1d1;
              font-size: 20px;
              box-sizing: border-box;
              font-weight: normal;
              font-stretch: normal;
              line-height: 30px;
              letter-spacing: 0px;
              color: #999999;
              text-align: center;
              cursor: pointer;
              background: #fff;
            }
            input {
              box-sizing: border-box;
              width: 46px;
              height: 32px;
              float: left;
              text-align: center;
              font-size: 14px;
              line-height: 23px;
              letter-spacing: 0px;
              color: #666666;
              border: 0;
              border-top: 1px solid #d1d1d1;
              border-bottom: 1px solid #d1d1d1;
              background: #fff;
            }
          }
          .del {
            border: 1px solid #ececec;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            &:hover {
              color: #fff;
              background: #0a328e;
            }
          }
        }
      }
    }
  }
  .total {
    padding: 30px 0;
    text-align: right;
    font-size: 22px;
    span {
      font-weight: bold;
      color: #fd604d;
    }
  }
  .submit {
    width: 175px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-family: SourceHanSansSC-Light;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
    cursor: pointer;
    background-color: #0a328e;
    float: right;
  }
}
</style>
<template>
  <div class="wrap title">
  <div class="left">
   <slot></slot>
    <div>{{title}}</div>
  </div>
  <div class="right" v-show="more">
    <div>更多</div>
    <slot></slot>
  </div>
  </div>
</template>

<script>
export default {
props:['title','more']
}
</script>

<style lang="less" scoped>
.title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    // 左边
    .left{
        display: flex;
        align-items: center;
        div{
            font-size: 30px;
            font-weight: 700;
            margin-left: 5px;
        }
    }
    // 右边
    .right{
        display: flex;
        align-items: center;
        cursor: pointer;
        div{
            font-size: 16px;
            margin-right: 6px;
        }
    }
}
</style>
<template>
  <div class="crumb">
    <span
      :style="{ color: index != navCrumb.length - 1 ? '#999999' : '#000000' }"
      v-for="(item, index) in navCrumb"
      :key="index"
      >
      <span>{{ item.name }}</span>
      <i v-show="index != navCrumb.length - 1">/</i></span>
  </div>
</template>

<script>
export default {
  props: ['navCrumb'],
  created () {
    console.log(this.nav)
  }
}
</script>

<style lang="less" scoped>
.crumb {
  text-align: left;
  margin-top: 10px;
  margin-bottom: 10px;
  i {
    margin: 0 5px;
  }
}
</style>
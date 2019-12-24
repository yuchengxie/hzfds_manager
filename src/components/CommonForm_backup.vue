<template>
  <el-form :inline="inline" :model="form" ref="form" label-width="100px">
    <el-form-item v-for="item in formLabel" :key="item.model">
      <el-input v-model="form[item.model]" :placeholder="'请输入'+item.label" v-if="!item.type"></el-input>
      <el-select
        v-model="form[item.model]"
        :placeholder="'请输入'+item.lable"
        v-if="item.type==='select'"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    inline: Boolean,
    form: Object,
    formLabel: Array
  }
};
</script>

<style lang="scss" scoped>
.el-form-item{
  margin-bottom: 10px;
}
</style>
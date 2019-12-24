<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">root</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登录时间：
            <span>2019-12</span>
          </p>
          <p>
            上次登录地点：
            <span>深圳</span>
          </p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height: 522px; margin-top: 20px">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="num">￥ {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div> -->
      <!-- <el-card shadow="hover">
        <echart style="height: 280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart :chartData="echartData.user" style="height: 260px"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart :chartData="echartData.video" style="height: 260px" :isAxisChart="false"></echart>
        </el-card>
      </div>-->
      <span>欢迎来到后台管理系统😄</span>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "../../components/EChart";
export default {
  components: {
    Echart
  },
  data() {
    return {
      userImg: require("../../assets/images/user.png"),
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ],
      tableData: [],
      tableLabel: {
        // name: "课程",
        // todayBuy: "今日购买",
        // monthBuy: "本月购买",
        // totalBuy: "总购买"
        name1:'A',
        name2:'B',
        name3:'C',
        name4:'D',
      },
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      }
    };
  },
  methods: {
    getTableData() {
      this.$http.get("/home/getData").then(res => {
        res = res.data;
        this.tableData = res.data.tableData;
        // 订单折线图
        const order = res.data.orderData;
        this.echartData.order.xData = order.date;
        // 第一步取出series中的name部分——键名
        let keyArray = Object.keys(order.data[0]);
        // 第二步，循环添加数据
        keyArray.forEach(key => {
          this.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: order.data.map(item => item[key]),
            type: "line"
          });
        });
        // 用户柱状图
        this.echartData.user.xData = res.data.userData.map(item => item.date);
        this.echartData.user.series.push({
          name: "新增用户",
          data: res.data.userData.map(item => item.new),
          type: "bar"
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: res.data.userData.map(item => item.active),
          type: "bar",
          barGap: 0
        });
        // 视频饼图
        this.echartData.video.series.push({
          data: res.data.videoData,
          type: "pie"
        });
      });
    }
  },
  created() {
    // this.getTableData();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home";
</style>

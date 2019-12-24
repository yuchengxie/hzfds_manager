<template>
  <div style="padding: 20px">
    <el-form :model="form" label-width="120">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" value="123456"></el-input>
      </el-form-item>
      <el-form-item align="center">
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "123456"
      }
    };
  },
  methods: {
    login() {
      //   this.$http.post('api/permission/getMenu', this.form).then(res => {
      //   res = res.data
      //   console.log('login res:',res);
      //   if (res.code === 20000) {
      //     this.$store.commit('clearMenu')
      //     this.$store.commit('setMenu', res.data.menu)
      //     this.$store.commit('setToken', res.data.token)
      //     this.$store.commit('addMenu', this.$router)
      //     this.$router.push({ name: 'home' })
      //   } else {
      //     this.$message.warning(res.data.message)
      //   }
      // })
      this.$http
        .post(this.$url.u_login, { username: "111", password: "222" })
        .then(
          res => {
            console.log("res.data.menu:", res.data.menu);
            let menu = JSON.stringify(res.data.menu);
            console.log("请求到的数据:", menu);
            if (res.status == 200) {
              console.log("success");
              this.$store.commit("clearMenu");
              this.$store.commit("setMenu", res.data.menu);
              this.$store.commit("setToken", "123");
              this.$store.commit("addMenu", this.$router);
              this.$router.push({ name: "home" });
            }
          },
          error => {
            this.$message.warning(err);
            console.log("请求错误：" + error);
          }
        );
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  width: 50%;
  margin: auto;
  padding: 45px;
  height: 450px;
  background-color: #fff;
}
</style>

<template>
  <div>
    <van-nav-bar title="昨日头条 - 登录" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="formLogin.mobile"
        label="手机号"
        placeholder="请输入手机号"
        required
        :rules="[
          {
            required: true,
            message: '请填写手机号',
            trigger: 'onChange',
            pattern: /^1[3456789]\d{9}$/,
          },
        ]"
      />
      <van-field
        v-model="formLogin.code"
        type="password"
        label="密码"
        placeholder="密码"
        required
        :rules="[
          {
            required: true,
            message: '请填写密码',
            trigger: 'onChange',
            pattern: /^\d{6}$/,
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button
          round
          block
          type="info"
          native-type="submit"
          :disabled="loading"
          :loading="loading"
          loading-text="登录中..."
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import token from "@/utils/token";
import { Toast } from "vant";

export default {
  name: "Login",
  data() {
    return {
      formLogin: {
        mobile: "13888888888",
        code: "246810", // 默认只能用246810后台规定了
      },
      loading: false,
    };
  },
  methods: {
    // 登录功能，暂时还没写，先直接跳转
    async onSubmit() {
      this.loading = true;
      try {
        let res = await this.$API.userLogin(this.formLogin);
        let { setToken } = token;
        setToken("token", res.data.token);
        this.loading = false;
        Toast.success("登录成功");
        this.$router.replace("/layout");
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>
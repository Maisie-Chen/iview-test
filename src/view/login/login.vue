<template>
  <div class="login">
    <div class="login-con">
      <Card
        icon="log-in"
        title="欢迎登录"
        :bordered="false"
      >
        <div class="form-con">
          <LoginForm @on-success-valid="handleSubmit"></LoginForm>
          <p class="login-tip">
            输入任意用户名和密码即可
          </p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form';
import { mapActions } from 'vuex';

export default {
  components: {
    LoginForm,
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo',
    ]),
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(() => {
        this.getUserInfo().then(() => {
          this.$router.push({
            name: this.$config.homeName,
          });
        });
      });
    },
  },
};
</script>
<style lang="less">
  @import './login.less';
</style>

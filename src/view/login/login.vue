<template>
  <div class="login">
    <div class="login-con">
      <div class="form-con">
        <div class="form-title">
          Login Form
        </div>
        <LoginForm @on-success-valid="handleSubmit" />
        <p class="login-tip" />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'

export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit({ userName, password }) {
      this.handleLogin({ userName, password }).then(() => {
        this.getUserInfo().then(() => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>
<style lang="less">
  @import './login.less';
</style>

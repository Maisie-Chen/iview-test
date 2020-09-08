<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <div class="form-item-content">
      <FormItem prop="userName">
        <Input
          v-model="form.userName"
          placeholder="Username"
          prefix="ios-contact"
        />
      </FormItem>
      <FormItem prop="password">
        <Input
          v-model="form.password"
          type="password"
          password
          placeholder="Password"
          prefix="ios-lock"
        />
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          long
          size="large"
          @click="handleSubmit"
        >
          Login
        </Button>
      </FormItem>
    </div>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => [
        { required: true, message: 'Username is required', trigger: 'blur' }
      ]
    },
    passwordRules: {
      type: Array,
      default: () => [
        { required: true, message: 'Password is required', trigger: 'blur' }
      ]
    }
  },
  data() {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
@import './login-form.less';
</style>

<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="userName">
      <Input
        v-model="form.userName"
        placeholder="请输入用户名"
      />
      <span slot="prefix">
        <Icon
          :size="16"
          type="ios-person"
        ></Icon>
      </span>
    </FormItem>
    <FormItem prop="password">
      <Input
        v-model="form.password"
        type="password"
        password
        placeholder="请输入密码"
      />
      <span slot="prefix">
        <Icon
          :size="16"
          type="ios-person"
        ></Icon>
      </span>
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        long
        @click="handleSubmit"
      >
        登录
      </Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => [
        { required: true, message: '账号不能为空', trigger: 'blur' },
      ],
    },
    passwordRules: {
      type: Array,
      default: () => [
        { required: true, message: '密码不能为空', trigger: 'blur' },
      ],
    },
  },
  data() {
    return {
      form: {
        userName: 'super_admin',
        password: '',
      },
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
      };
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password,
          });
        }
      });
    },
  },
};
</script>
<style>
</style>

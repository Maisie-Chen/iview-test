module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:vue/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': 'off',
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ],
    // semi: [2, "always"],
    'vue/no-v-html': 0,
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    // 自己注册的组件统一驼峰式写法(与iview统一)
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: ['/^bml-/', '/^grid-/'] // 如果是调用的其他插件不得用驼峰式时，可添加再这里忽略；eg:"/^router-/"
      }
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'vue/no-confusing-v-for-v-if': 2, // v-if与v-for不能同时在同一个组件内使用，容易造成死循环
    'no-undef': 'off',
    'prefer-const': 0,
    'no-const-assign': 2, //禁止修改const声明的变量
    camelcase: 'off',
    indent: [0, 2],
    eqeqeq: 'off', //error: Expected '===' and instead saw '=='
    'vue/no-side-effects-in-computed-properties': 'off', //Unexpected side effect in "*" computed property
    'no-control-regex': 0, // 不禁止在正则表达式中出现控制字符
    'no-eval': 0, //不禁止使用eval
    "no-unused-vars": 'off' // reset/config is defind but never used
  }
}

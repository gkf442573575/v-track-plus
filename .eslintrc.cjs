module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'eslint-config-prettier'
  ],
  globals: {
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    requireConfigFile: false
  },

  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    semi: [2, 'never'], // 禁止尾部使用分号
    'no-console': 0, // 禁止出现console
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // 禁止出现debugger
    'no-duplicate-case': 2, // 禁止出现重复case
    'no-empty': 2, // 禁止出现空语句块
    'no-extra-parens': 2, // 禁止不必要的括号
    'no-func-assign': 2, // 禁止对Function声明重新赋值
    'no-unreachable': 2, // 禁止出现[return|throw]之后的代码块
    'no-else-return': 2, // 禁止if语句中return语句之后有else块
    'no-empty-function': 0, // 禁止出现空的函数块
    '@typescript-eslint/no-empty-function': 0,
    'no-lone-blocks': 2, // 禁用不必要的嵌套块
    'no-multi-spaces': 2, // 禁止使用多个空格
    'no-redeclare': 2, // 禁止多次声明同一变量
    'no-return-assign': 2, // 禁止在return语句中使用赋值语句
    'no-return-await': 2, // 禁用不必要的[return/await]
    'no-self-compare': 2, // 禁止自身比较表达式
    'no-useless-catch': 2, // 禁止不必要的catch子句
    'no-useless-return': 'off', // 禁止不必要的return语句
    'no-mixed-spaces-and-tabs': 2, // 禁止空格和tab的混合缩进
    'no-multiple-empty-lines': 2, // 禁止出现多行空行
    'no-trailing-spaces': 2, // 禁止一行结束后面不要有空格
    'no-useless-call': 2, // 禁止不必要的.call()和.apply()
    'no-var': 'off', // 禁止出现var用let和const代替
    'no-delete-var': 'off', // 允许出现delete变量的使用
    'no-shadow': 'off', // 允许变量声明与外层作用域的变量同名
    'dot-notation': 2, // 要求尽可能地使用点号
    'default-case': 2, // 要求switch语句中有default分支
    eqeqeq: 2, // 要求使用 === 和 !==
    curly: 2, // 要求所有控制语句使用一致的括号风格
    'space-before-blocks': 2, // 要求在块之前使用一致的空格
    'space-in-parens': 2, // 要求在圆括号内使用一致的空格
    'space-infix-ops': 2, // 要求操作符周围有空格
    'space-unary-ops': 2, // 要求在一元操作符前后使用一致的空格
    'switch-colon-spacing': 2, // 要求在switch的冒号左右有空格
    'arrow-spacing': 2, // 要求箭头函数的箭头前后使用一致的空格
    'array-bracket-spacing': 2, // 要求数组方括号中使用一致的空格
    'brace-style': 2, // 要求在代码块中使用一致的大括号风格
    camelcase: 2, // 要求使用骆驼拼写法命名约定
    indent: [2, 2], // 要求使用JS一致缩进4个空格
    'max-depth': [2, 4], // 要求可嵌套的块的最大深度4
    'max-statements': [2, 100], // 要求函数块最多允许的的语句数量20
    'max-nested-callbacks': [2, 3], // 要求回调函数最大嵌套深度3
    'max-statements-per-line': [2, { max: 1 }], // 要求每一行中所允许的最大语句数量
    quotes: [2, 'single', 'avoid-escape'], // 要求统一使用单引号符号
    'vue/require-default-prop': 0, // 关闭属性参数必须默认值
    'vue/no-v-html': 'off',
    'vue/singleline-html-element-content-newline': 0, // 关闭单行元素必须换行符
    'vue/multiline-html-element-content-newline': 0, // 关闭多行元素必须换行符
    // 要求每一行标签的最大属性不超五个
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 10
      }
    ],
    'vue/html-indent': [
      'warn',
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: []
      }
    ],
    // 取消关闭标签不能自闭合的限制设置
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/component-tags-order': [
      'warn',
      {
        order: ['template', 'script']
      }
    ],
    'prettier/prettier': 'off',
    'vue/multi-word-component-names': 'off',
    "no-unused-vars": "warn",
    "no-async-promise-executor": "off",
    '@typescript-eslint/no-explicit-any': 'off',
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-async-promise-executor": "off",
  }
}

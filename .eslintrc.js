// https://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        // ecmaVersion: 6,
        // ecmaFeatures: {
        //     experimentalObjectRestSpread: true
        // },
        ecmaVersion: 9,
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        // es6: true,
        browser: true,
        commonjs: true,
        node: true
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        // https://github.com/standard/standard/blob/master/docs/RULES-en.md
        // 'plugin:vue/base',
        // 'plugin:vue/essential',
        // 'plugin:vue/strongly-recommended',
        // 'plugin:vue/recommended',
        'standard'
    ],
    // required to lint *.vue files
    plugins: [
        // 'vue',
        'html',
        'import'
    ],
    // add your custom rules here
    rules: {

        /* 
            "off"或者0    //关闭规则关闭
            "warn"或者1    //在打开的规则作为警告（不影响退出代码）
            "error"或者2    //把规则作为一个错误（退出代码触发时为1） 
        */

        // 在 JavaScript 中创建一个只有属性 setter 的对象是一个常见的错误，但从来没有为它定义相应的 getter。
        'accessor-pairs': 0,

        //return 语句中不能有赋值表达式
        'no-return-assign': 0,

        // 允许在条件表达式中使用赋值语句
        'no-cond-assign': 0,

        // 换行时运算符在行尾还是行首
        'operator-linebreak': [2, 'after'],

        // 必须使用全等
        'eqeqeq': 0,

        // 确保关键字前后空格的一致性
        'keyword-spacing': 0,

        // 一元运算符的前/后要不要加空格
        'space-unary-ops': [0, { words: true, nonwords: false }],

        // 不以新行开始的块{前面要不要有空格
        'space-before-blocks': [0, 'always'],

        // 语句强制分号结尾
        'semi': 0,

        // 生成器函数*的前后空格
        'generator-star-spacing': 0,

        // 禁止无用的表达式 a && a.b
        'no-unused-expressions': 0,

        // 缩进风格
        'indent': [2, 4],

        // 一行结束后面不要有空格
        'no-trailing-spaces': 1,

        // 空行最多不能超过2行
        'no-multiple-empty-lines': [1, { max: 2 }],

        // 小括号里面要不要有空格
        'space-in-parens': [0, 'never'],

        // 对象字面量项尾不能有逗号
        'comma-dangle': [1, 'never'],

        // 引号类型 `` "" ''
        'quotes': [1, 'single'],

        // 文件以单一的换行符结束
        'eol-last': 0,

        // 不能有声明后未被使用的变量或参数
        // 'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
        'no-unused-vars': 0,

        // 函数定义时括号前面要不要有空格
        'space-before-function-paren': [0, 'always'],

        // 禁止用多余的空格
        'no-multi-spaces': 1,

        // 禁止在使用new构造一个实例后不赋值
        'no-new': 0,

        // 要求或禁止函数名称和调用它的左括号之间的空格
        'func-call-spacing': 0,

        // 禁止使用debugger
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

        // 禁止使用./或../引入文件
        'no-restricted-imports': [2, { patterns: ['./*', '../*'] }],
        'no-restricted-modules': [2, { patterns: ['./*', '../*'] }],

        // eslint-plugin-import内容设置
        'import/first': 0,
        'import/no-unresolved': 0,
        'import/named': 0,
        'import/namespace': 0,
        'import/default': 0,
        'import/export': 0,
        'import/dynamic-import-chunkname': 0,
        'import/dynamic-import': 0
    },
    // settings: {
    //     // 使用webpack中配置的resolve路径
    //     'import/resolver': 'webpack'
    // }
}

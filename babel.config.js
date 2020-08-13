

module.exports = {
  presets: [
      [
        "@babel/preset-env",
        {
          "modules":false,
          "corejs":3,
          "useBuiltIns": "entry", // usage是最佳实践，会按需把core-js和regenerator引入（所谓按需就是按下面的target和编译的js用到的es6语法来判断）
          "targets": { // 目标浏览器
            "chrome": "58",
            "ie": "9",
          }
        },
      ]
    ],
    plugins:[["@babel/transform-runtime", {
      corejs: 3,
    }]
    ],
    exclude: [/node_modules/] // 不要编译node_modules，不然会出一些奇奇怪怪的问题
}


// 这里是把babel-loader的配置抽取到了babel.config.js中:
export const presets = [
  [
    '@babel/preset-react',
    {
      runtime: 'automatic', // 加上这行配置
    },
  ],
];
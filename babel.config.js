module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', { loose: true }],
      ['@babel/preset-react', { runtime: 'automatic' }],
      ['module:metro-react-native-babel-preset'],
      '@babel/preset-typescript',
      'babel-preset-expo',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@app': '.',
          },
        },
      ],
      ['react-native-reanimated/plugin'],
    ],
  };
};

const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container;
const packageJson = require('../package.json');

module.exports = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ComponentLibraryAndUtils',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': path.resolve(__dirname, '..', 'src', 'components', 'button', 'Button'),
      },
      shared: packageJson.dependencies,
    }),
  ]
};
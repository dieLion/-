const path = require("path")
const htmlPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
module.exports = {
  entry: {
    main: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script/[name]-[chunkhash:5].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"]
      }
    ]
  },
  plugins: [
    new htmlPlugin({
      template: "./public/index.html",
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    extensions: [".ts", ".js"]
  }
}
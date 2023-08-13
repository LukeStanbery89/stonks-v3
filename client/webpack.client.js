const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
    mode: "development", // Switch to development mode
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "client.bundle.js",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: "style-loader",
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: "css-loader",
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer,
                                ],
                            },
                        },
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: "sass-loader",
                    },
                ],
            },
            // Aggregates event handlers into a single module
            {
                test: /handlers\/index.ts$/,
                loader: "@lukestanbery/meta-importer",
                exclude: [/node_modules/],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src/index.html"),
        }),
        new ReactRefreshWebpackPlugin(), // Enable React Fast Refresh
    ],
    devServer: {
        historyApiFallback: true, // Enable client-side routing
        hot: true,
        open: true,
        port: 3001,
        proxy: {
            "/api": "http://localhost:3000",
            "/socket.io": "http://localhost:3000",
        },
    },
};

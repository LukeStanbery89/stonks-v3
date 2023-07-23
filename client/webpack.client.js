const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    mode: "development", // Switch to development mode
    entry: "./client/src/index.tsx",
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
        port: 3001, // Set the desired port here
    },
};

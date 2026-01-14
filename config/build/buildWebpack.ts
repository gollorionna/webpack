import webpack from "webpack";
import { buildDevServer } from "./buildDevServer.js";
import { buildLoaders } from "./buildLoaders.js";
import { buildPlugins } from "./buildPlugins.js";
import { buildResolvers } from "./buildResolvers.js";
import { BuildOptions } from "./types/types.js";

export const buildWebpack = (options: BuildOptions): webpack.Configuration => {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode,
    entry: paths.entry,
    output: {
      filename: "[name].[contenthash].js",
      path: paths.output,
      clean: true,
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}

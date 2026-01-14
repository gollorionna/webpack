import type { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export const buildLoaders = (options: BuildOptions): ModuleOptions["rules"] => {
  const isDev = options.mode === "development";

  const assetLoader = {
    test: /\.(png|jpe?g|gif|webp)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: { icon: true },
      },
    ],
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: true,
        },
      },
      "sass-loader",
    ],
  };
  const tsLoader = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: false,
        },
      },
    ],
  };

  const babelLoader = buildBabelLoader(options);

  if (isDev) {
    return [scssLoader, assetLoader, svgrLoader, babelLoader];
  }

  return [scssLoader, tsLoader, assetLoader, svgrLoader, babelLoader];
}

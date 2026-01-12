import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";
import type { PluginItem } from "@babel/core";

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === "development";
  const isProd = mode === "production";

  const plugins: PluginItem[] = [];

  if (isDev) {
    plugins.push("react-refresh/babel");
  }

  if (isProd) {
    plugins.push([removeDataTestIdBabelPlugin, { props: ["data-testid"] }]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
        plugins,
        cacheDirectory: true,
      },
    },
  };
}

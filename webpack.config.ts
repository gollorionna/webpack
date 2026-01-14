import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import webpack from "webpack";
import { buildWebpack } from "./config/build/buildWebpack.js";
import {
  BuildMode,
  BuildPaths,
  BuildPlatform,
} from "./config/build/types/types";

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    output: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3001,
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? "desktop",
  });
  return config;
};

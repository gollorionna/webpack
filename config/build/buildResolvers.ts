import { Configuration } from "webpack";
import { BuildOptions } from "./types/types.js";

export const buildResolvers = (
  options: BuildOptions
): Configuration["resolve"] => {
  return {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": options.paths.src,
    },
  };
}

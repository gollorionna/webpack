import { PluginItem, PluginPass } from "@babel/core";
import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

interface RemoveDataTestIdPluginOptions {
  props?: string[];
}

export function removeDataTestIdBabelPlugin(): PluginItem {
  return {
    visitor: {
      Program(
        path: NodePath<t.Program>,
        state: PluginPass & { opts: RemoveDataTestIdPluginOptions }
      ) {
        const forbiddenProps = state.opts.props ?? [];

        path.traverse({
          JSXIdentifier(current: NodePath<t.JSXIdentifier>) {
            const nodeName = current.node.name;

            if (forbiddenProps.includes(nodeName)) {
              current.parentPath?.remove();
            }
          },
        });
      },
    },
  };
}

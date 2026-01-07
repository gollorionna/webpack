import { PluginItem } from "@babel/core";

export function removeDataTestIdBabelPlugin() : PluginItem {
    return {
        visitor: {
            Program(path: any, state) { 
                const forbiddenProps = state.opts.props || [];

                path.traverse({
                    JSXIdentifier(current : any) { 
                        const nodeName = current.node.name;
                        if(forbiddenProps.includes(nodeName)) {
                            current.parentPath.remove();
                        }
                    }
                });
            }
        }
    };
}
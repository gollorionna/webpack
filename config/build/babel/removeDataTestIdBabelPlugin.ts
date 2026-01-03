import { PluginItem } from "@babel/core";

export function removeDataTestIdBabelPlugin() : PluginItem {
    return {
        visitor: {
            Program(path: any, state) { // CHANGE ANY 
                const forbiddenProps = state.opts.props || [];

                path.traverse({
                    JSXIdentifier(current : any) { // CHANGE ANY 
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
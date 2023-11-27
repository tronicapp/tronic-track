import { Publisher, PublisherProps } from './publisher';
import { Plugin } from '../app/types';
import { NodeEmitter } from '../app/emitter';
type DefinedPluginFields = 'name' | 'type' | 'version' | 'isLoaded' | 'load' | 'identify' | 'track';
type TronicNodePlugin = Plugin & Required<Pick<Plugin, DefinedPluginFields>>;
export type ConfigureNodePluginProps = PublisherProps;
export declare function createNodePlugin(publisher: Publisher): TronicNodePlugin;
export declare const createConfiguredNodePlugin: (props: ConfigureNodePluginProps, emitter: NodeEmitter) => {
    publisher: Publisher;
    plugin: TronicNodePlugin;
};
export {};
//# sourceMappingURL=index.d.ts.map
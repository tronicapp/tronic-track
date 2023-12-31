import { Publisher } from './publisher';
import { version } from '../generated/version';
import { detectRuntime } from '../lib/env';
function normalizeEvent(ctx) {
    ctx.updateEvent('context.library.name', '@tronic/receiver-node');
    ctx.updateEvent('context.library.version', version);
    const runtime = detectRuntime();
    if (runtime === 'node') {
        // eslint-disable-next-line no-restricted-globals
        ctx.updateEvent('_metadata.nodeVersion', process.version);
    }
    ctx.updateEvent('_metadata.jsRuntime', runtime);
}
export function createNodePlugin(publisher) {
    function action(ctx) {
        normalizeEvent(ctx);
        return publisher.enqueue(ctx);
    }
    return {
        name: 'Tronic',
        type: 'after',
        version: '1.0.0',
        isLoaded: () => true,
        load: () => Promise.resolve(),
        identify: action,
        track: action,
    };
}
export const createConfiguredNodePlugin = (props, emitter) => {
    const publisher = new Publisher(props, emitter);
    return {
        publisher: publisher,
        plugin: createNodePlugin(publisher),
    };
};
//# sourceMappingURL=index.js.map
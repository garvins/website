// index.ts imports both the mount and staticRendering functions
// as entry point for the server and the browser
import browserRendering from './mount';
import staticRendering from './static';

// don't mount if we are not running in the browser context
if (typeof document !== 'undefined' &&
    typeof document.getElementById === 'function') {
    browserRendering();
}

// the exported staticRendering function is only called by
// static-website-generator-webpack-plugin
export default staticRendering;
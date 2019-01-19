
/* eslint-disable no-restricted-imports, no-restricted-modules */
import Example from './src/example';

/* istanbul ignore next */
Example.install = function (Vue) {
    Vue.component(Example.name, Example);
};

export default Example;
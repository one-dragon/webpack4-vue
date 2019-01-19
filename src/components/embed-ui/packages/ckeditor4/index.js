/* eslint-disable no-restricted-imports, no-restricted-modules */
import Ckeditor4 from './src/ckeditor4';

/* istanbul ignore next */
Ckeditor4.install = function (Vue) {
    Vue.component(Ckeditor4.name, Ckeditor4);
};

export default Ckeditor4;
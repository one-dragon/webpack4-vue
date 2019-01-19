/* eslint-disable no-restricted-imports, no-restricted-modules */
import Ckeditor5 from './src/ckeditor5';

/* istanbul ignore next */
Ckeditor5.install = function (Vue) {
    Vue.component(Ckeditor5.name, Ckeditor5);
};

export default Ckeditor5;
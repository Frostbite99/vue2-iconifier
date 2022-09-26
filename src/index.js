// Import vue component
import Iconifier from './components/iconifier.vue';

// Declare install function executed by Vue.use()
export default function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('vue2-iconifier', Iconifier);
}

// Create module definition for Vue.use()


// To allow use as module (npm/webpack/etc.) export component
export {Iconifier,install};
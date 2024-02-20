import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Button from 'chp-element/src/views/Button.vue';
import chpElement from 'chp-element';
import './run/index.html';

const app = createApp(App);
app.component("chp-button", Button);
app.use(chpElement);

app.use(store).use(router).mount('#app')

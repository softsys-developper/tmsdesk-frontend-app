import { createApp } from "vue";
import "@/assets/index.css";
import App from "./App.vue";
import { router } from "@/routes/index.route";
import "remixicon/fonts/remixicon.css";
import { TOKEN } from "./services/token.services";
import { createPinia } from "pinia";
// import PrimeVue from 'primevue/config';
// import Aura from '@primevue/themes/aura';




TOKEN();
const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(pinia);
// app.use(PrimeVue, {
//     theme: {
//         preset: Aura
//     }
// });
app.mount("#app");

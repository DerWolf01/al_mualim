import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { RequestController } from "./controller/request_controller/request_controller";
import { CourseModel, ICourseModel, ICourseModelProto } from "./models/course/course_model";
const pinia = createPinia();

// console.log(await RequestController.getByModel<CourseModel, ICourseModel>(CourseModel,ICourseModelProto))
createApp(App).use(pinia).use(router).mount("#app");

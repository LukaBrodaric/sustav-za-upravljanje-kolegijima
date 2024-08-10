import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("./components/Home.vue"),
      meta: { title: "Home - Sustav za upravljanje kolegijima" },
    },
    {
      path: "/file-upload",
      component: () => import("./components/FileUpload.vue"),
      meta: { title: "File Upload - Sustav za upravljanje kolegijima" },
    },
    {
      path: "/SviKolegiji",
      component: () => import("./components/SviKolegiji.vue"),
      meta: { title: "Kolegiji - Sustav za upravljanje kolegijima" },
    },
    {
      path: "//SviKolegijiw/:id",
      component: () => import("./components/Kolegij.vue"),
      meta: { title: "Kolegij *id* - Sustav za upravljanje kolegijima" },
    },
  ],
});

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? "Sustav za upravljanje kolegijima";
});

export default router;
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Secret from "../views/Secret.vue";
import Usuarios from "../views/Usuarios.vue";
import Jugadores from "../views/Jugadores.vue";
import Torneos from "../views/Torneos.vue";
import Preguntas from "../views/Preguntas.vue";

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: "/login",
        name: 'login',
        component: Login
    },
    {
        path: "/secret",
        name: 'secret',
        component: Secret,
        meta: { requiresAuth: true }
    },
    {
        path: "/usuarios",
        name: 'usuarios',
        component: Usuarios,
        meta: { requiresAuth: true }
    },
    {
        path: "/jugadores",
        name: 'jugadores',
        component: Jugadores,
        meta: { requiresAuth: true }
    },
    {
        path: "/preguntas",
        name: 'preguntas',
        component: Preguntas,
        meta: { requiresAuth: true }
    },
    {
        path: "/torneos",
        name: 'torneos',
        component: Torneos,
        meta: { requiresAuth: true }
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;
    if (requiresAuth && !isAuthenticated) {
        next("/login");
    } else {
        next();
    }
});

export default router;
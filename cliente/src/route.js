import Vue from "vue";
import VueRouter from "vue-router";

const LoginComponent = resolve => {
    require.ensure(["./components/login"], () => {
        resolve(require("./components/login"));
    });
};

const RegisterComponent = resolve => {
    require.ensure(["./components/register"], () => {
        resolve(require("./components/register"));
    });
};

const SuccessComponent = resolve => {
    require.ensure(["./components/success"], () => {
        resolve(require("./components/success"));
    });
};

Vue.use(VueRouter);

let routes = [
    {
        path: "",
        components: { default: LoginComponent },
        children: [
            {
                path: "login",
                component: LoginComponent,
                name: "login"
            }
        ]
    },
    {
        path: "/register",
        name: "register",
        components: {
            default: RegisterComponent
        }
    },
    {
        path: "/success",
        name: "success",
        components: {
            default: SuccessComponent
        },
        meta: {
            requiresAuth: true
        }
    }
];

const route = new VueRouter({
    routes,
    mode: "history"
});

route.beforeEach((to, from, next) => {
    let shouldProceedToRoute = false;

    const token = localStorage.getItem("token");
    if (token) {
        shouldProceedToRoute = true;
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (shouldProceedToRoute) {
            next();
        } else {
            next({ name: "login" });
        }
    } else {
        next();
    }
});
export default route;


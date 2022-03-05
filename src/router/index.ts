import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PageWrapper from '../pages/PageWrapper.vue'
import MainDashboard from '../pages/MainDashboard.vue'
import UsersManage from '../pages/users/UsersManage.vue'
import RegisterUser from '../pages/RegisterUser.vue'
import LoginUser from '../pages/LoginUser.vue'

const routes: Array<RouteRecordRaw> = [
	{ path: '/register', component: RegisterUser },
	{ path: '/login', component: LoginUser },
	{
		path: '',
		component: PageWrapper,
		children: [
			{ path: '', component: MainDashboard },
			{ path: '/users', component: UsersManage },
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router

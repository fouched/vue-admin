import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import PageWrapper from '../pages/PageWrapper.vue'
import MainDashboard from '../pages/MainDashboard.vue'
import RegisterUser from '../pages/RegisterUser.vue'
import LoginUser from '../pages/LoginUser.vue'
import UsersManage from '../pages/users/UsersManage.vue'
import UsersCreate from '../pages/users/UsersCreate.vue'
import UsersEdit from '../pages/users/UsersEdit.vue'
import RolesManage from '../pages/roles/RolesManage.vue'
import RolesCreate from '../pages/roles/RolesCreate.vue'
import RolesEdit from '../pages/roles/RolesEdit.vue'

const routes: Array<RouteRecordRaw> = [
	{ path: '/register', component: RegisterUser },
	{ path: '/login', component: LoginUser },
	{
		path: '',
		component: PageWrapper,
		children: [
			{ path: '', component: MainDashboard },
			{ path: '/users', component: UsersManage },
			{ path: '/users/create', component: UsersCreate },
			{ path: '/users/:id/edit', component: UsersEdit },
			{ path: '/roles', component: RolesManage },
			{ path: '/roles/create', component: RolesCreate },
			{ path: '/roles/:id/edit', component: RolesEdit },
		],
	},
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

export default router

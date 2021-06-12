import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ '../views/About.vue'),
	},
	{
		path: '/map',
		name: 'Map',
		component: () => import('../views/OptimalMap.vue'),
		children: [
			{
				path: '/',
				name: 'TourSpotDetail',
				component: () => import('../components/optimalmap/TourSpotDetail.vue'),
			},
			{
				path: '/pathdetail',
				name: 'PathDetail',
				component: () => import('../components/optimalmap/PathDetail.vue'),
			},
			{
				path: '/optlist',
				name: 'OptimalList',
				component: () => import('../components/optimalmap/OptimalList.vue'),
			},
			{
				path: '/route',
				name: 'RouteList',
				component: () => import('../components/optimalmap/RouteList.vue'),
			},
		],
		redirect: () => {
			return '/map/';
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	routes,
});

export default router;

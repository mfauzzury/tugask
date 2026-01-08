import { createRouter, createWebHistory } from 'vue-router';
import KanbanBoard from '../views/KanbanBoard.vue';
import TimelineView from '../views/TimelineView.vue';
import Dashboard from '../views/Dashboard.vue';
import ProjectManagement from '../views/ProjectManagement.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import { useAuth } from '../composables/useAuth';

const routes = [
    { path: '/login', component: Login, name: 'Login', meta: { requiresGuest: true } },
    { path: '/register', component: Register, name: 'Register', meta: { requiresGuest: true } },
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard', meta: { requiresAuth: true } },
    { path: '/projects', component: ProjectManagement, name: 'Projects', meta: { requiresAuth: true } },
    { path: '/projects/:projectId/board', component: KanbanBoard, name: 'ProjectBoard', meta: { requiresAuth: true } },
    { path: '/tasks', component: KanbanBoard, name: 'Tasks', meta: { requiresAuth: true } },
    { path: '/timeline', component: TimelineView, name: 'Timeline', meta: { requiresAuth: true } },
    { path: '/users', component: () => import('../views/UserManagement.vue'), name: 'Users', meta: { requiresAuth: true } },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Navigation guards
router.beforeEach((to, from, next) => {
    const { isAuthenticated, checkAuth } = useAuth();

    // Check authentication status
    checkAuth();

    const requiresAuth = to.meta.requiresAuth;
    const requiresGuest = to.meta.requiresGuest;

    if (requiresAuth && !isAuthenticated.value) {
        // Redirect to login if not authenticated
        next('/login');
    } else if (requiresGuest && isAuthenticated.value) {
        // Redirect to dashboard if already authenticated
        next('/dashboard');
    } else {
        next();
    }
});

export default router;

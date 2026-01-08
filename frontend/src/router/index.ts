import { createRouter, createWebHistory } from 'vue-router';
import KanbanBoard from '../views/KanbanBoard.vue';
import TimelineView from '../views/TimelineView.vue';
import Dashboard from '../views/Dashboard.vue';
import ProjectManagement from '../views/ProjectManagement.vue';

const routes = [
    { path: '/', redirect: '/dashboard' },
    { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
    { path: '/projects', component: ProjectManagement, name: 'Projects' },
    { path: '/projects/:projectId/board', component: KanbanBoard, name: 'ProjectBoard' },
    { path: '/tasks', component: KanbanBoard, name: 'Tasks' },
    { path: '/timeline', component: TimelineView, name: 'Timeline' },
    { path: '/users', component: () => import('../views/UserManagement.vue'), name: 'Users' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

import { ref } from 'vue';

export interface Bucket {
    id: number;
    projectId: number;
    name: string;
    position: number;
    limit?: number;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    color: string;
    createdAt: string;
    buckets: Bucket[];
    teamMemberIds: number[];
}

const projects = ref<Project[]>([
    {
        id: 1,
        name: 'TugaskApp Development',
        description: 'Main project for building the task management application',
        color: '#000000',
        createdAt: new Date().toISOString(),
        teamMemberIds: [1, 2],
        buckets: [
            { id: 1, projectId: 1, name: 'Backlog', position: 0 },
            { id: 2, projectId: 1, name: 'In Progress', position: 1 },
            { id: 3, projectId: 1, name: 'Review', position: 2 },
            { id: 4, projectId: 1, name: 'Done', position: 3 },
        ]
    },
    {
        id: 2,
        name: 'Marketing Campaign',
        description: 'Q1 2026 marketing initiatives',
        color: '#404040',
        createdAt: new Date().toISOString(),
        teamMemberIds: [1, 3],
        buckets: [
            { id: 5, projectId: 2, name: 'Ideas', position: 0 },
            { id: 6, projectId: 2, name: 'Planning', position: 1 },
            { id: 7, projectId: 2, name: 'Execution', position: 2 },
            { id: 8, projectId: 2, name: 'Completed', position: 3 },
        ]
    }
]);

export function useProjects() {
    const addProject = (project: Omit<Project, 'id' | 'createdAt' | 'buckets'>) => {
        const newProject: Project = {
            ...project,
            id: projects.value.length + 1,
            createdAt: new Date().toISOString(),
            buckets: [
                { id: Date.now(), projectId: projects.value.length + 1, name: 'Backlog', position: 0 },
                { id: Date.now() + 1, projectId: projects.value.length + 1, name: 'In Progress', position: 1 },
                { id: Date.now() + 2, projectId: projects.value.length + 1, name: 'Done', position: 2 },
            ]
        };
        projects.value.push(newProject);
    };

    const updateProject = (id: number, updates: Partial<Project>) => {
        const index = projects.value.findIndex(p => p.id === id);
        if (index !== -1) {
            projects.value[index] = { ...projects.value[index], ...updates };
        }
    };

    const deleteProject = (id: number) => {
        projects.value = projects.value.filter(p => p.id !== id);
    };

    const getProjectById = (id: number) => {
        return projects.value.find(p => p.id === id);
    };

    return {
        projects,
        addProject,
        updateProject,
        deleteProject,
        getProjectById
    };
}

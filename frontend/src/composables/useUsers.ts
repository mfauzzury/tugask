import { ref } from 'vue';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'Staff';
    status: 'Active' | 'Inactive';
    phone?: string;
    position?: string;
    unit?: string;
    assignedProjectIds?: number[];
}

const users = ref<User[]>([
    {
        id: 1,
        name: 'Admin User',
        email: 'admin@tugask.app',
        role: 'Admin',
        status: 'Active',
        phone: '123-456-7890',
        position: 'System Administrator',
        unit: 'IT Department',
        assignedProjectIds: [1]
    },
    {
        id: 2,
        name: 'Staff One',
        email: 'staff1@tugask.app',
        role: 'Staff',
        status: 'Active',
        phone: '098-765-4321',
        position: 'Developer',
        unit: 'Engineering',
        assignedProjectIds: [1]
    },
    {
        id: 3,
        name: 'Staff Two',
        email: 'staff2@tugask.app',
        role: 'Staff',
        status: 'Inactive',
        phone: '555-123-4567',
        position: 'Designer',
        unit: 'Design Team',
        assignedProjectIds: []
    },
]);

export function useUsers() {
    const addUser = (user: Omit<User, 'id'>) => {
        users.value.push({
            ...user,
            id: users.value.length + 1
        });
    };

    return {
        users,
        addUser
    };
}

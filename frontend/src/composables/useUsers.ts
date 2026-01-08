import { ref } from 'vue';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'Admin' | 'Staff';
    status: 'Active' | 'Inactive';
}

const users = ref<User[]>([
    { id: 1, name: 'Admin User', email: 'admin@tugask.app', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Staff One', email: 'staff1@tugask.app', role: 'Staff', status: 'Active' },
    { id: 3, name: 'Staff Two', email: 'staff2@tugask.app', role: 'Staff', status: 'Inactive' },
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

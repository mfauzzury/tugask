import { ref } from 'vue';
import { useRouter } from 'vue-router';

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const currentUser = ref<User | null>(null);
const isAuthenticated = ref(false);

// Mock users for demo
const mockUsers = [
    { id: 1, email: 'admin@tugask.com', password: 'admin123', name: 'Admin User', role: 'Admin' },
    { id: 2, email: 'user@tugask.com', password: 'user123', name: 'Regular User', role: 'User' },
];

export function useAuth() {
    const router = useRouter();

    const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        const user = mockUsers.find(u => u.email === email && u.password === password);

        if (user) {
            const { password: _, ...userWithoutPassword } = user;
            currentUser.value = userWithoutPassword;
            isAuthenticated.value = true;
            localStorage.setItem('tugask_user', JSON.stringify(userWithoutPassword));
            return { success: true };
        }

        return { success: false, error: 'Invalid email or password' };
    };

    const register = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if email already exists
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: mockUsers.length + 1,
            name,
            email,
            role: 'User'
        };

        mockUsers.push({ ...newUser, password });
        currentUser.value = newUser;
        isAuthenticated.value = true;
        localStorage.setItem('tugask_user', JSON.stringify(newUser));

        return { success: true };
    };

    const logout = () => {
        currentUser.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('tugask_user');
        router.push('/login');
    };

    const checkAuth = () => {
        const storedUser = localStorage.getItem('tugask_user');
        if (storedUser) {
            currentUser.value = JSON.parse(storedUser);
            isAuthenticated.value = true;
        }
    };

    return {
        currentUser,
        isAuthenticated,
        login,
        register,
        logout,
        checkAuth
    };
}

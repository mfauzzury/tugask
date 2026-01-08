<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { login } = useAuth();

const form = ref({
  email: '',
  password: ''
});

const error = ref('');
const loading = ref(false);

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  const result = await login(form.value.email, form.value.password);

  loading.value = false;

  if (result.success) {
    router.push('/dashboard');
  } else {
    error.value = result.error || 'Login failed';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-black mb-2">TugaskApp</h1>
        <p class="text-sm text-gray-500">Sign in to your account</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <form @submit.prevent="handleLogin" class="space-y-4">

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {{ error }}
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-2">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:border-black focus:ring-1 focus:ring-black transition-colors"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-2">Password</label>
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter your password"
              class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:border-black focus:ring-1 focus:ring-black transition-colors"
              required
            />
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between text-xs">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="rounded border-gray-300 text-black focus:ring-black" />
              <span class="text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-black hover:underline font-medium">Forgot password?</a>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-black text-white py-2.5 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>

          <!-- Demo Credentials -->
          <div class="bg-gray-50 border border-gray-200 rounded-md p-3 mt-4">
            <p class="text-xs font-bold text-gray-600 mb-2">Demo Credentials:</p>
            <div class="text-xs text-gray-500 space-y-1">
              <p>Admin: admin@tugask.com / admin123</p>
              <p>User: user@tugask.com / user123</p>
            </div>
          </div>

          <!-- Register Link -->
          <div class="text-center pt-4 border-t border-gray-200">
            <p class="text-sm text-gray-600">
              Don't have an account?
              <router-link to="/register" class="text-black font-medium hover:underline ml-1">
                Sign up
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

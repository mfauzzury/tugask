<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter();
const { register } = useAuth();

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const error = ref('');
const loading = ref(false);

const handleRegister = async () => {
  error.value = '';

  // Validation
  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match';
    return;
  }

  if (form.value.password.length < 6) {
    error.value = 'Password must be at least 6 characters';
    return;
  }

  loading.value = true;

  const result = await register(form.value.name, form.value.email, form.value.password);

  loading.value = false;

  if (result.success) {
    router.push('/dashboard');
  } else {
    error.value = result.error || 'Registration failed';
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-black mb-2">TugaskApp</h1>
        <p class="text-sm text-gray-500">Create your account</p>
      </div>

      <!-- Register Form -->
      <div class="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
        <form @submit.prevent="handleRegister" class="space-y-4">

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
            {{ error }}
          </div>

          <!-- Full Name -->
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-2">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:border-black focus:ring-1 focus:ring-black transition-colors"
              required
            />
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
              placeholder="At least 6 characters"
              class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:border-black focus:ring-1 focus:ring-black transition-colors"
              required
              minlength="6"
            />
          </div>

          <!-- Confirm Password -->
          <div>
            <label class="block text-xs font-bold text-gray-700 mb-2">Confirm Password</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="Re-enter your password"
              class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-md focus:border-black focus:ring-1 focus:ring-black transition-colors"
              required
              minlength="6"
            />
          </div>

          <!-- Terms & Conditions -->
          <div class="flex items-start gap-2">
            <input
              type="checkbox"
              id="terms"
              class="mt-0.5 rounded border-gray-300 text-black focus:ring-black"
              required
            />
            <label for="terms" class="text-xs text-gray-600">
              I agree to the
              <a href="#" class="text-black hover:underline font-medium">Terms of Service</a>
              and
              <a href="#" class="text-black hover:underline font-medium">Privacy Policy</a>
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-black text-white py-2.5 rounded-md font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Creating account...' : 'Create Account' }}
          </button>

          <!-- Login Link -->
          <div class="text-center pt-4 border-t border-gray-200">
            <p class="text-sm text-gray-600">
              Already have an account?
              <router-link to="/login" class="text-black font-medium hover:underline ml-1">
                Sign in
              </router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

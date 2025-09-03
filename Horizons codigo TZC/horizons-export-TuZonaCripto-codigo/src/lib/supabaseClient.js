import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://neznevdtzjhdrxlioxbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lem5ldmR0empoZHJ4bGlveGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzQxMjMsImV4cCI6MjA2NTI1MDEyM30.cG8sRpdIx6hru9yf9klilCJKNIFYqJgzO4U2B9dWXFA';

const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lem5ldmR0empoZHJ4bGlveGJ1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTY3NDEyMywiZXhwIjoyMDY1MjUwMTIzfQ.vH8Lg-p-w5reH5Q-Uo7t2MA23t3n5jO-7Y8jJtI3p3c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
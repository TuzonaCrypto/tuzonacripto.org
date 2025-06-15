
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://neznevdtzjhdrxlioxbu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lem5ldmR0empoZHJ4bGlveGJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NzQxMjMsImV4cCI6MjA2NTI1MDEyM30.cG8sRpdIx6hru9yf9klilCJKNIFYqJgzO4U2B9dWXFA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

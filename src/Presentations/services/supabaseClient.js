import { createClient } from '@supabase/supabase-js';

const supabaseUrl = '';  // URL entre comillas
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZ2Z4enJqdWN5ZmtmeHlueHZ...';  // Clave entre comillas

export const supabase = createClient('https://fggfxzrjucyfkfxynxvk.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnZ2Z4enJqdWN5ZmtmeHlueHZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU5NzU5ODYsImV4cCI6MjA0MTU1MTk4Nn0.hhDIQlydR-1QFNJKJ4xg6wNJ4u-TeaeKhQdroqJ0_CY');

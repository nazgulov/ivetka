import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://akhqramwvaotvkawbcin.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFraHFyYW13dmFvdHZrYXdiY2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTU3NzQsImV4cCI6MjA2NDg5MTc3NH0.vf9vc48qLlnYQOAKXACE0cFNHNJ3st8KYgc-FwF6UzI';

export const supabase = createClient(supabaseUrl, supabaseKey);

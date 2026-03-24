import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://nudajafusmxnpjysenow.supabase.co' 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51ZGFqYWZ1c214bnBqeXNlbm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQxOTIzMDYsImV4cCI6MjA4OTc2ODMwNn0.7LlntAx47AMmP1pYrGfv8WrEXoDwvI1ylfTpeYnSM38'   

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
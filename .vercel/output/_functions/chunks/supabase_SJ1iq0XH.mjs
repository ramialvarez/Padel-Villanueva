import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tuvbextoqdubigopshzr.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1dmJleHRvcWR1Ymlnb3BzaHpyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIwMTQxNjUsImV4cCI6MjA2NzU5MDE2NX0.lXuMPK3tjx5vycbXAB2VMJ4KPG7P4nOFHdT95zPvbXQ";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase as s };

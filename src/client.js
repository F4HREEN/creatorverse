import { createClient } from '@supabase/supabase-js';

//link to the supabase website
const URL = 'https://ghauhzmaqmddfgkoremz.supabase.co';

//link to the api key
const API_KEY = 'sb_publishable_5tCjZyGCV8eLNPac5YXrBA_uEVrzzvf'

//creating client based in database pulled using url and api key
export const supabase = createClient(URL, API_KEY);

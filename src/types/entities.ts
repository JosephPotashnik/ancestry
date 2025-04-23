// src/types/entities.ts
import { Database } from './supabase';
export {}; // <--- add this temporarily to make sure TypeScript treats it as a module

// Define table row types
export type Monarch = Database['public']['Tables']['Monarch']['Row'];
export type Reign = Database['public']['Tables']['Reigns']['Row'];

// Define insert types (for creating new records)
export type MonarchInsert = Database['public']['Tables']['Monarch']['Insert'];
export type ReignInsert = Database['public']['Tables']['Reigns']['Insert'];

// Define update types (for updating existing records)
export type MonarchUpdate = Database['public']['Tables']['Monarch']['Update'];
export type ReignUpdate = Database['public']['Tables']['Reigns']['Update'];
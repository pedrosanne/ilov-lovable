
import { Database } from '@/types/database';

export type AdInsert = Database['public']['Tables']['ads']['Insert'];
export type CategoryType = Database['public']['Tables']['ads']['Row']['category'];

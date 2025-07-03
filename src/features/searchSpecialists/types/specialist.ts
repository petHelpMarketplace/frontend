export type Specialist = {
  id: number;
  name: string;
  family_name: string;
  district: string;
  rating?: number | null;
  reviews_count: number | null;
  experience: number;
  is_verified: boolean;
  description?: string;
  bio?: string;
  avatar?: string;
  image_id?: string[];
};

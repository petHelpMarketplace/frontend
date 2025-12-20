import { SpecInfoSchemaType } from '../validation/specInfoSchema';

export interface SpecInfoResponse {
  name: string;
  family_name: string | null;
  email: string;
  avatar_url: string | null;
  bio: string | null;
  description: string | null;
  experience: number | null;
  is_active: boolean;
  is_verified: boolean;
  phone: string | null;
  portfolio_urls: string[];
  position: string | null;
}
//
export interface SpecInfoState {
  specInfo: SpecInfoResponse;
  loading: boolean;
  error: string | null;
}

export type AvatarResponse = {
  url: string;
};

export type AvatarRequest = {
  file: File;
};

export interface PatchProfileRequest extends Partial<SpecInfoSchemaType> {
  experience_years?: number; // додаємо поле, яке очікує бекенд
}

export interface SpecInfoResponse {
  id: number | null;
  name: string | null;
  family_name: string | null;
  email: string | null;
  avatar_url: string | null;
  bio: string | null;
  description: string | null;
  experience: number | null;
  is_active: boolean | null;
  is_verified: boolean | null;
  phone: string | null;
  portfolio_urls: string[] | null;
  position: string | null;
}

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

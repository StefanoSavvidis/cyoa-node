export interface SpotifyAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  state: string;
  token_type: string;
  email: string;
  id: string;
  product: string;
  display_name: string;
}

export interface UserInfo {
    id: number;
    username: string;
}

export interface RefreshTokenInfo extends UserInfo {
    accessToken: string;
}

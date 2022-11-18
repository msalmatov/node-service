import { RefreshTokenInfo } from "./common-types";

// FIXME: ideally this info need to be stored in Redis
class TokenContainer {
    private refreshTokens: Map<string, RefreshTokenInfo>;
    private accessTokens: Map<string, string>; // key: accessToken, value: refreshToken

    constructor() {
        this.refreshTokens = new Map();
        this.accessTokens = new Map();
    }

    public setRefreshTokenInfo(refreshToken: string, refreshTokenInfo: RefreshTokenInfo) {
        this.accessTokens.set(refreshTokenInfo.accessToken, refreshToken);
        this.refreshTokens.set(refreshToken, refreshTokenInfo);
    }

    public getRefreshTokenInfo(refreshToken: string) {
        return this.refreshTokens.get(refreshToken);
    }

    public getRefreshTokenInfoByAccessToken(accessToken: string) {
        const refreshToken = this.accessTokens.get(accessToken);
        return this.refreshTokens.get(refreshToken);
    }

    public deleteRefreshTokenInfo(refreshToken: string) {
        const info = this.refreshTokens.get(refreshToken);
        this.accessTokens.delete(info.accessToken);
        return this.refreshTokens.delete(refreshToken);
    }

    public deleteRefreshTokenByAccessToken(accessToken: string) {
        const refreshToken = this.accessTokens.get(accessToken);
        this.accessTokens.delete(accessToken);
        return this.refreshTokens.delete(refreshToken);
    }
}

const tokenContainer = new TokenContainer();
export default tokenContainer;
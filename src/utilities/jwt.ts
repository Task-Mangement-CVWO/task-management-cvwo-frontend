import jwt_decode from 'jwt-decode';

interface payload {
  user_id: number;
  username: string;
  exp: number;
}

export default class JwtUtils {
  static getPayload(accessToken: string): payload {
    return jwt_decode(accessToken) as payload;
  }
}

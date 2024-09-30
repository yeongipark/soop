const CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLINET_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL;

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

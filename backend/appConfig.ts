interface IAppConfig {
  jwtSecret: string;
  cookieSecret: string;
  jwtExpiry: number;
  cookieName: string;
}

export const AppConfig: IAppConfig = {
  jwtSecret: "sofhoewhfsjdhguies",
  cookieSecret: "ejhigohseoiugdf",
  jwtExpiry: 1,
  cookieName: "jwt",
};

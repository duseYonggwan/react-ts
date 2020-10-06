import * as Enums from '@/enums';

export default class Environment {
  static env = (key: string, defaultValue = ''): string =>
    key in process.env ? (process.env[key] as string) : defaultValue;

  static production: boolean = process.env.APP_ENV === Enums.APP_ENV.PRODUCTION;
}

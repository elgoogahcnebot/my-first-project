export interface AppConfig {
  appName: string;
  version: string;
  apiEndpoint: string;
  security: {
    sandboxEnabled: boolean;
    autoUpdateIntervalMs: number;
    zeroLeakProtection: boolean;
  };
}

export const APP_CONFIG: AppConfig = {
  appName: "Koundouz Super AI",
  version: "1.0.0",
  apiEndpoint: "https://api.openai.com/v1",
  security: {
    sandboxEnabled: true,
    autoUpdateIntervalMs: 2000,
    zeroLeakProtection: true
  }
};

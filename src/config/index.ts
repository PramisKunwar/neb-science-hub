
type FeatureFlags = {
  enableAnalytics: boolean;
  enableNewUI: boolean;
  debugMode: boolean;
};

type Environment = {
  isDevelopment: boolean;
  isProduction: boolean;
  buildVersion: string;
  features: FeatureFlags;
};

const getEnvironment = (): Environment => {
  const isProd = import.meta.env.PROD;
  
  return {
    isDevelopment: !isProd,
    isProduction: isProd,
    buildVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
    features: {
      enableAnalytics: isProd,
      enableNewUI: !isProd, // New UI features can be tested in development first
      debugMode: !isProd,
    },
  };
};

export const env = getEnvironment();

// Helper functions to check environment and features
export const isProduction = () => env.isProduction;
export const isDevelopment = () => env.isDevelopment;
export const isFeatureEnabled = (feature: keyof FeatureFlags) => env.features[feature];

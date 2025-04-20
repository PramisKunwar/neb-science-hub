
import { isFeatureEnabled } from '@/config';

export const useFeatureFlag = (featureKey: 'enableAnalytics' | 'enableNewUI' | 'debugMode') => {
  return isFeatureEnabled(featureKey);
};

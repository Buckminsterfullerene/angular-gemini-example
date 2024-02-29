import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

export interface ISafetySettings {
  category: HarmCategory;
  threshold: HarmBlockThreshold
}

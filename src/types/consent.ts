export type ConsentCategory = 'necessary' | 'analytics';

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
}

export interface ConsentText {
  consentModal: {
    title: string;
    description: string;
    acceptAllBtn: string;
    acceptNecessaryBtn: string;
    showPreferencesBtn: string;
  };
  preferencesModal: {
    title: string;
    acceptAllBtn: string;
    acceptNecessaryBtn: string;
    savePreferencesBtn: string;
    closeIconLabel: string;
    sections: Array<{
      title: string;
      description: string;
      linkedCategory?: ConsentCategory;
    }>;
  };
}

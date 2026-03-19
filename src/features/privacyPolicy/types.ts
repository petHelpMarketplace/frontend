type PrivacyPolicyDescriptionList = {
  text: string;
  unorderedLists?: string[];
};

export type PrivacyPolicyData = {
  title: string;
  description?: PrivacyPolicyDescriptionList[];
  orderedLists?: string[];
};

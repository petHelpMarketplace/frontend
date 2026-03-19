type PrivacyPolicyDescriptionList = {
  text: string;
  unorderedLists?: string[];
};

export type PrivacyPolicyData = {
  id: string;
  title: string;
  description?: PrivacyPolicyDescriptionList[];
  orderedLists?: string[];
};

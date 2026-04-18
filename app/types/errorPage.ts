export type RelatedLink = {
    href: string;
    label: string;
  };
  
  export type FaqItem = {
    question: string;
    answer: string;
  };
  
  export type ErrorPageData = {
    title: string;
    intro: string;
  
    fixTitle: string;
    fixText: string;
    code?: string;
    codeTitle?: string;
    codeLanguage?: string;
    afterCodeText?: string;
  
    whyTitle?: string;
    whyText?: string;
  
    problemTitle?: string;
    problemPoints?: string[];
    problemText?: string;
  
    deliverabilityTitle?: string;
    deliverabilityText?: string;
  
    causesTitle?: string;
    causes?: string[];
  
    checkedTitle?: string;
    checkedText?: string;
  
    nextSteps?: string[];
    verifySteps?: string[];
    quickPoints?: string[];
  
    wrongExampleTitle?: string;
    wrongExampleCode?: string;
    wrongExampleLanguage?: string;
    wrongExampleText?: string;
  
    correctExampleTitle?: string;
    correctExampleCode?: string;
    correctExampleLanguage?: string;
    correctExampleText?: string;
  
    faqTitle?: string;
    faq?: FaqItem[];
  
    hub?: {
      href: string;
      label: string;
    };
  
    related?: RelatedLink[];
  };
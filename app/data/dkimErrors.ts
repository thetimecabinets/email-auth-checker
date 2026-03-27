export const dkimErrors = {
  "dkim/no-dkim-record-found": {
    title: "No DKIM Record Found – How to Fix DKIM Setup (2026)",

    intro:
      "No DKIM record found means the domain or selector being checked has no DKIM public key record published in DNS. Receivers need that selector record to validate the DKIM signature in the message header. In practice, this often happens when provider setup was not finished, the wrong selector was checked, or the DNS record was never added.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish the exact DKIM TXT or CNAME record required by your provider on the correct selector._domainkey hostname, then confirm your sender is using that same selector.",

    codeTitle: "Correct DKIM selector record",
    codeLanguage: "DNS TXT",
    code: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."`,

    afterCodeText:
      "If your sender uses selector1, the DKIM public key must exist at selector1._domainkey.example.com.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `# No DKIM record published for selector1._domainkey.example.com`,
    wrongExampleText:
      "This is broken because the sender signs with a selector, but DNS does not publish the matching DKIM key. The receiver cannot retrieve the public key and DKIM verification fails.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."`,
    correctExampleText:
      "This is the correct pattern. The selector record exists in DNS and publishes the DKIM public key the receiver needs for verification.",

    whyTitle: "Why this happens",

    whyText:
      "DKIM verification depends on a published public key record in DNS. If that selector record is missing or looked up under the wrong hostname, receivers cannot fetch the key and cannot verify the DKIM signature.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Receivers cannot verify DKIM signatures.",
      "DKIM alignment can fail.",
      "DMARC alignment can also be affected.",
      "Legitimate email can lose trust, land in spam, and make brand spoofing harder to control."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "When no DKIM record is published, DKIM verification fails for signed mail and authentication trust drops. That increases spam-folder risk, weakens sender reputation signals, and can trigger DMARC alignment failure when DKIM was expected to provide aligned authentication.",

    causesTitle: "Common causes",
    causes: [
      "Provider setup was left incomplete and DKIM was never fully published.",
      "The wrong selector hostname was queried during validation.",
      "The required selector TXT/CNAME record was never published in DNS.",
      "A DNS migration removed or failed to carry over the DKIM record."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We looked for the DKIM selector record needed to validate the signature. If no matching TXT record exists under the expected _domainkey hostname, DKIM cannot be verified.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Does this mean my domain cannot send email at all?",
        answer:
          "No. Mail can still be sent, but receivers cannot verify the DKIM signature, which weakens trust and may hurt deliverability."
      },
      {
        question: "Can SPF compensate for missing DKIM?",
        answer:
          "Sometimes SPF may still pass, but relying on SPF alone is weaker. Modern deliverability and DMARC enforcement work best when both SPF and DKIM are healthy."
      },
      {
        question: "How do I fix this safely?",
        answer:
          "Get the exact DKIM selector record from the provider that signs your mail, publish it in DNS, then send a fresh test message and verify the signature passes."
      }
    ],

    nextSteps: [
      "Identify the platform currently signing your outbound messages.",
      "Copy the exact selector hostname and DKIM record value from provider docs.",
      "Publish the required TXT or CNAME record under selector._domainkey.",
      "Query DNS externally to confirm the selector record resolves correctly.",
      "Send a fresh test email and verify DKIM=pass and DMARC alignment in headers."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/dkim-selector-not-found",
        label: "DKIM selector not found"
      },
      {
        href: "/dkim/invalid-dkim-key",
        label: "Invalid DKIM key"
      },
      {
        href: "/dkim/dkim-alignment-failed",
        label: "DKIM alignment failed"
      }
    ]
  },

  "dkim/google-workspace-dkim-not-working": {
    title: "Google Workspace DKIM Not Working? Fix It Fast (2026)",

    intro:
      "Google Workspace DKIM fails when the Google selector record is missing, wrong, or not yet activated in Admin. A common real-world case is adding the TXT record in DNS correctly but never clicking Start authentication in Google Admin. In that state, Gmail can still send mail while DKIM remains absent or failing in headers.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish the exact Google DKIM TXT record on the correct selector._domainkey hostname, then enable DKIM signing in Google Admin for the same domain and selector.",

    codeTitle: "Correct Google Workspace DKIM record",
    codeLanguage: "DNS TXT",
    code: `google._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,

    afterCodeText:
      "The host name must exactly match the selector value shown in Google Admin followed by ._domainkey.yourdomain.com. If Google shows google as the selector, the TXT record must live at google._domainkey.yourdomain.com, not on the root zone or under www.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."
google._domainkey.example.com TXT "v=DKIM1; k=rsa;"`,
    wrongExampleText:
      "Here DKIM is either published on the root domain instead of under google._domainkey, or the p= value is truncated. Gmail will happily send mail, but receivers cannot fetch a valid public key, so DKIM verification fails for every message.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `google._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."`,
    correctExampleText:
      "This matches what Google Admin expects: DKIM is enabled for the right domain, the selector in DNS matches the selector in the Admin console, and the full public key is published without truncation.",

    whyTitle: "Why this happens",

    whyText:
      "Google Workspace DKIM requires two parts to be correct: DNS publication and Google-side activation. A correct DNS TXT record alone is not enough if signing is not enabled in Admin. DKIM also fails when the selector or domain in DNS does not match what Google is configured to use.",

    problemTitle: "Why this is a problem",

    problemText:
      "Gmail continues to send messages even when DKIM is missing or broken, but receivers treat that traffic as less trustworthy. DMARC policies that rely on DKIM alignment may fail, and over time important transactional and product emails can be pushed from the inbox into spam or promotions as providers see an incomplete authentication story.",

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "When Google Workspace DKIM is broken, receivers cannot rely on DKIM verification for your domain. That raises spam-folder risk, weakens sender trust, and can create DMARC alignment issues when DKIM was expected to provide an aligned pass.",

    causesTitle: "Common causes",
    causes: [
      "The selector TXT record is missing, incorrect, or incomplete in DNS.",
      "DKIM signing was not activated in Google Admin after DNS was published.",
      "The wrong domain or selector was configured between DNS and Google Admin.",
      "Recent DNS changes have not fully propagated to external resolvers."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We queried the selector._domainkey hostname that Google Workspace uses for this domain and looked for a DKIM TXT record starting with v=DKIM1, with k=rsa and a non-empty p= public key. If no matching record exists, or the key appears truncated or published under a different hostname, Gmail-signed messages cannot be validated correctly.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Where do I enable DKIM for Google Workspace?",
        answer:
          "In the Google Admin console, open Apps → Google Workspace → Gmail → Authenticate email. Choose the domain you send from, generate or reuse a selector, publish the TXT record in DNS at the specified host, then come back and click Start authentication."
      },
      {
        question: "How long does it take for Google Workspace DKIM to start working?",
        answer:
          "Once the TXT record is published correctly, DKIM usually starts passing as soon as DNS caches refresh. That can be a few minutes to a couple of hours depending on TTL and your DNS provider, but in edge cases it can take up to 24–48 hours."
      },
      {
        question: "Can I have multiple DKIM selectors for Google Workspace?",
        answer:
          "Yes. You can rotate keys by creating a new selector and publishing its TXT record while the old one is still in place. Just make sure the selector Gmail uses in the DKIM-Signature header always has a matching DNS record."
      },
      {
        question: "Why is DKIM still failing after I followed the Google guide?",
        answer:
          "Most persistent failures come from publishing the TXT record in the wrong zone, copying the selector incorrectly, or testing before DNS propagation is complete. Double-check the exact host name, use external DNS tools to confirm the record is visible, then send a fresh test from a Workspace mailbox. You can also open a real message in Gmail, click 'Show original', and check whether DKIM shows as pass or fail for your domain."
      }
    ],

    nextSteps: [
      "Open Google Admin and confirm the domain and selector used for DKIM signing.",
      "Copy the exact selector hostname and TXT value from Authenticate email.",
      "Publish the TXT record at selector._domainkey for the same sending domain.",
      "Click Start authentication in Google Admin after DNS is visible externally.",
      "Send a fresh test email and verify DKIM=pass and DMARC alignment in headers."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/dkim-selector-not-found",
        label: "DKIM selector not found"
      },
      {
        href: "/dkim/invalid-dkim-key",
        label: "Invalid DKIM key"
      },
      {
        href: "/dkim/dkim-alignment-failed",
        label: "DKIM alignment failed"
      }
    ]
  },

  "dkim/microsoft-365-dkim-not-working": {
    title: "Microsoft 365 DKIM Not Working? Fix CNAME Setup (2026)",

    intro:
      "Microsoft 365 DKIM fails when the required selector CNAMEs are missing, wrong, or DKIM is not enabled for the domain. A common practical case is publishing selector1 and selector2 CNAME records correctly but never turning DKIM on in Microsoft 365. In that state, mail still sends, but DKIM does not reliably pass.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish the exact selector1 and selector2 CNAME records for the domain as shown in Microsoft 365, then enable DKIM signing for that domain in the Defender or Exchange admin center.",

    codeTitle: "Correct Microsoft 365 DKIM records",
    codeLanguage: "DNS",
    code: `selector1._domainkey.example.com CNAME selector1-example._domainkey.onmicrosoft.com
selector2._domainkey.example.com CNAME selector2-example._domainkey.onmicrosoft.com`,

    afterCodeText:
      "Microsoft 365 does not expect TXT records for DKIM on your custom domain. Instead, each selector must be a CNAME that points to the matching _domainkey hostname under your onmicrosoft.com domain. Both selector1 and selector2 should be created so that Microsoft can rotate keys cleanly.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS",
    wrongExampleCode: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=..."
selector1._domainkey.example.com CNAME selector1-example._domainkey.onmicrosoft.com`,
    wrongExampleText:
      "Here only one selector is configured and the first attempt used a TXT record instead of a CNAME. Mixed or duplicate records under the same host confuse resolvers, and with only one selector configured, Microsoft 365 DKIM can still fail or behave unpredictably.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS",
    correctExampleCode: `selector1._domainkey.example.com CNAME selector1-example._domainkey.onmicrosoft.com
selector2._domainkey.example.com CNAME selector2-example._domainkey.onmicrosoft.com`,
    correctExampleText:
      "This pattern matches Microsoft’s guidance: both selector1 and selector2 CNAME records are present, each pointing at the correct onmicrosoft.com target. After DNS propagation and enabling DKIM in the admin center, outbound mail from this domain should pass DKIM using one of these selectors.",

    whyTitle: "Why this happens",

    whyText:
      "Microsoft 365 DKIM depends on both DNS and service-side activation. Valid CNAME records alone do not make DKIM pass until signing is enabled for the same domain in Microsoft 365. Failures happen when CNAME targets are incorrect, selectors are incomplete, or activation is skipped after DNS updates.",

    problemTitle: "Why this is a problem",

    problemText:
      "Microsoft 365 will continue to send mail even when DKIM is not correctly configured, but receivers see messages that lack a reliable DKIM signal. DMARC policies that depend on DKIM alignment can fail, and business-critical mail such as invoices, meeting invites, and account notifications becomes more likely to land in spam or low-priority folders.",

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "When Microsoft 365 DKIM is not working, receivers cannot consistently verify signed mail for your domain. That increases spam-folder risk, weakens sender trust, and can create DMARC alignment issues even when messages are otherwise legitimate.",

    causesTitle: "Common causes",
    causes: [
      "A required selector CNAME is missing or points to the wrong target.",
      "DKIM signing was not enabled in Microsoft 365 after DNS setup.",
      "The records were published for the wrong domain or tenant target.",
      "DNS propagation delay means external resolvers still see old values."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We looked up the selector1._domainkey and selector2._domainkey hostnames for your domain and verified whether they return CNAME records pointing at the expected _domainkey hostnames under your onmicrosoft.com domain. If either selector is missing, misdirected, or returns no usable record, Microsoft 365 DKIM will not validate correctly.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Why does Microsoft 365 use CNAME instead of TXT for DKIM?",
        answer:
          "Microsoft hosts the actual DKIM keys under the onmicrosoft.com domain and uses CNAMEs on your custom domain to point there. This lets them rotate and manage keys centrally while you only have to maintain the CNAME pointers."
      },
      {
        question: "Do I need both selector1 and selector2 records?",
        answer:
          "Yes. Microsoft 365 recommends configuring both selectors so it can rotate keys without interrupting DKIM. Missing one of the selectors can cause failures or complicate future rotations."
      },
      {
        question: "Where do I enable DKIM in Microsoft 365?",
        answer:
          "You enable DKIM in the Microsoft 365 Defender or Exchange admin center, under the DKIM settings for your custom domain. After the CNAME records are in place and visible, return to that screen and turn DKIM on."
      },
      {
        question: "Why is DKIM still failing after I added the CNAME records?",
        answer:
          "The most common reasons are that the CNAME targets are slightly wrong, that only one selector was created, that DKIM was never enabled in the admin center, or that DNS propagation is still in progress. You can send a test message to an external mailbox, view the message headers, and confirm whether DKIM=pass appears for your domain."
      }
    ],

    nextSteps: [
      "Copy selector1 and selector2 CNAME values from the Microsoft 365 DKIM setup screen.",
      "Publish both selector CNAMEs on the correct domain and verify targets externally.",
      "Enable DKIM signing for that domain in Defender or Exchange admin.",
      "Send a new test email from Microsoft 365 after propagation completes.",
      "Check headers for DKIM=pass and confirm DMARC alignment behavior."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/dkim-selector-not-found",
        label: "DKIM selector not found"
      },
      {
        href: "/dkim/invalid-dkim-key",
        label: "Invalid DKIM key"
      },
      {
        href: "/dkim/dkim-alignment-failed",
        label: "DKIM alignment failed"
      },
      {
        href: "/dkim/google-workspace-dkim-not-working",
        label: "Google Workspace DKIM not working"
      }
    ]
  },

  "dkim/amazon-ses-dkim-not-working": {
    title: "Amazon SES DKIM Not Working? Fix the 3 CNAME Records (2026)",

    intro:
      "Amazon SES DKIM fails when Easy DKIM selector CNAME records are missing, wrong, or not fully propagated. A common practical failure is when all three CNAMEs are not added exactly as SES provided for the verified identity. Even one mismatch can keep DKIM in a failing or pending state.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish all SES-provided DKIM selector CNAME records exactly as shown, and verify the sending domain is the same domain configured as a verified identity in SES before retesting.",

    codeTitle: "Correct Amazon SES DKIM records",
    codeLanguage: "DNS",
    code: `abcde12345._domainkey.example.com CNAME abcde12345.dkim.amazonses.com
fghij67890._domainkey.example.com CNAME fghij67890.dkim.amazonses.com
klmno54321._domainkey.example.com CNAME klmno54321.dkim.amazonses.com`,

    afterCodeText:
      "In a real SES setup, the selector values are long, random-looking strings generated by AWS for your specific domain. All three CNAMEs must exist on the same domain you verified in SES, and each one must point exactly to the dkim.amazonses.com target provided in the console.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS",
    wrongExampleCode: `abcde12345._domainkey.example.com CNAME abcde12345.dkim.amazonses.com
fghij67890._domainkey.example.com CNAME fghij67890.dkim.amazonses.co
# third DKIM record missing`,
    wrongExampleText:
      "Here only two of the three DKIM CNAMEs exist, and one target contains a typo in the amazonses.com hostname. SES will continue to show DKIM as not fully configured, and receivers cannot reliably validate signatures on outbound mail.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS",
    correctExampleCode: `abcde12345._domainkey.example.com CNAME abcde12345.dkim.amazonses.com
fghij67890._domainkey.example.com CNAME fghij67890.dkim.amazonses.com
klmno54321._domainkey.example.com CNAME klmno54321.dkim.amazonses.com`,
    correctExampleText:
      "This matches what Amazon SES expects when Easy DKIM is enabled: all three CNAMEs are present, each pointing to the exact dkim.amazonses.com target. Once DNS has propagated and SES shows DKIM as verified, messages from this identity should pass DKIM.",

    whyTitle: "Why this happens",

    whyText:
      "SES expects exact selector-to-target CNAME mapping for DKIM verification on the verified identity. If one selector is missing, mistyped, or published under the wrong domain, DKIM setup can fail as a whole. SES only validates correctly when every required selector record resolves exactly as provided.",

    problemTitle: "Why this is a problem",

    problemText:
      "When DKIM is not working for an SES identity, your messages still send but lack a strong cryptographic signal that they came from an approved sender. DMARC policies that expect DKIM alignment can start to fail, and mailbox providers may treat your campaigns, notifications, and transactional messages as less trustworthy.",

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "When SES DKIM is broken, receivers cannot consistently validate signatures for your sending domain. That raises spam-folder risk, weakens sender trust, and can create DMARC alignment issues even when messages are otherwise legitimate and successfully sent.",

    causesTitle: "Common causes",
    causes: [
      "One or more SES DKIM selector CNAME records are missing.",
      "A selector hostname or CNAME target value was copied incorrectly.",
      "The wrong verified domain was configured for the mail stream in SES.",
      "DNS propagation delay means resolvers still return old or missing records."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We looked for all three DKIM selector hostnames that Amazon SES expects for this identity and confirmed whether each one is a CNAME pointing to a dkim.amazonses.com target. If any selector record is missing or misconfigured, SES DKIM will not be fully active.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Why does Amazon SES require three DKIM records?",
        answer:
          "SES uses three DKIM selectors to support key rotation and resilience. Having multiple keys available lets AWS rotate or replace keys without interrupting mail flow, but it only works if all three CNAMEs exist in DNS."
      },
      {
        question: "Do all three DKIM CNAME records need to exist?",
        answer:
          "Yes. For Easy DKIM to work reliably, all three CNAME records must be present and correctly pointed at the amazonses.com targets shown in the SES console."
      },
      {
        question: "How long does DKIM verification take in SES?",
        answer:
          "After you add the CNAMEs, SES usually verifies them within minutes once DNS has propagated. However, delays of a few hours are possible depending on your DNS provider’s TTL settings and caching."
      },
      {
        question: "What is Easy DKIM in Amazon SES?",
        answer:
          "Easy DKIM is SES’s managed DKIM feature. Instead of generating your own keys and TXT records, SES creates the keys for you and asks you to publish CNAME records that point to those keys, simplifying setup and rotation."
      }
    ],

    nextSteps: [
      "Open SES and confirm the exact verified identity used for outbound mail.",
      "Copy all DKIM selector CNAME hostnames and targets directly from SES.",
      "Publish or correct every selector record on the same sending domain in DNS.",
      "Check external DNS resolution for each selector and wait for full propagation.",
      "Send a fresh test email and confirm DKIM=pass and DMARC alignment in headers."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/dkim-selector-not-found",
        label: "DKIM selector not found"
      },
      {
        href: "/dkim/invalid-dkim-key",
        label: "Invalid DKIM key"
      },
      {
        href: "/dkim/dkim-alignment-failed",
        label: "DKIM alignment failed"
      },
      {
        href: "/dkim/microsoft-365-dkim-not-working",
        label: "Microsoft 365 DKIM not working"
      }
    ]
  },

  "dkim/dkim-selector-not-found": {
    title: "DKIM Selector Not Found – How to Fix DKIM Selector (2026)",

    intro:
      "A DKIM selector-not-found error means the selector in the DKIM-Signature header does not match a DNS record the receiver can find. The selector is the value after s= and it points to the public key hostname under _domainkey. In real setups, this often happens when the sender signs with selector1 but DNS only has selector2, or when the required CNAME/TXT was never published.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish the selector record on the exact _domainkey hostname and confirm the sender is signing with that same selector value.",

    codeTitle: "Correct selector mapping",
    codeLanguage: "Plain text",
    code: `Header uses:   s=selector1
DNS publishes: selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,

    afterCodeText:
      "If the email header uses s=selector1, the DNS record must exist at selector1._domainkey.example.com.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Plain text",
    wrongExampleCode: `Header uses:   s=selector1
DNS publishes: selector2._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,
    wrongExampleText:
      "This is broken because the sender uses selector1, but DNS only contains a DKIM key for selector2. The receiver queries selector1._domainkey.example.com and does not find the expected key.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Plain text",
    correctExampleCode: `Header uses:   s=selector1
DNS publishes: selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,
    correctExampleText:
      "This is the correct pattern. The selector used in the DKIM-Signature header matches the selector published in DNS, so the receiver can fetch the right public key.",

    whyTitle: "Why this happens",

    whyText:
      "DKIM verification fails when the selector in the signature points to a DNS record that does not exist or is published under the wrong name. If the receiver cannot resolve the exact selector hostname to a valid key record, it cannot verify the DKIM signature.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "DKIM verification fails.",
      "DMARC may fail if DKIM was expected to provide aligned authentication.",
      "Receivers cannot retrieve the correct public key.",
      "Inbox placement becomes less predictable."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "When the selector cannot be resolved, DKIM verification is broken even for legitimate mail. That increases spam-folder risk, weakens trust in your authentication setup, and can cause DMARC alignment failure when DKIM was expected to provide the aligned pass path.",

    causesTitle: "Common causes",
    causes: [
      "The mail stream is signing with the wrong selector value.",
      "The DKIM record was published under the wrong _domainkey hostname.",
      "Provider setup was incomplete, so the required selector record was never fully published.",
      "A recent DNS change was made but propagation is not complete yet."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We compared the selector in the DKIM-Signature header with the selector records available under _domainkey in DNS. If the expected selector record is missing, DKIM cannot be verified.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "What is a DKIM selector?",
        answer:
          "A DKIM selector is the label in the DKIM-Signature header that tells receivers which DNS record contains the public key."
      },
      {
        question: "Can I have multiple DKIM selectors?",
        answer:
          "Yes. Multiple selectors are normal and are often used for key rotation or for separate mail systems."
      },
      {
        question: "How do I fix a selector-not-found error safely?",
        answer:
          "Inspect a real DKIM-Signature header, note the selector after s=, and confirm that the exact same selector exists in DNS under _domainkey."
      }
    ],

    nextSteps: [
      "Open a real message header and copy the exact selector value after s=.",
      "Query that exact selector._domainkey hostname in DNS and confirm the record exists.",
      "If missing or misnamed, publish the selector record on the correct hostname.",
      "Verify your provider is signing with the same selector you published.",
      "After propagation, send a fresh test email and confirm DKIM=pass in headers."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/no-dkim-record-found",
        label: "No DKIM record found"
      },
      {
        href: "/dkim/dkim-selector-mismatch",
        label: "DKIM selector mismatch"
      },
      {
        href: "/dkim/invalid-dkim-key",
        label: "Invalid DKIM key"
      }
    ]
  },

  "dkim/invalid-dkim-key": {
    title: "Invalid DKIM Key – Causes & Fix (2026)",

    intro:
      "An invalid DKIM key means the public key in DNS is malformed, truncated, or unreadable to receivers. DKIM verification depends on parsing that key exactly as published, so even small corruption breaks validation. A common example is a broken TXT value where the key was copied with missing characters or split incorrectly.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Republish the full DKIM public key exactly as provided by your sender or provider, with no manual edits to characters, quotes, spacing, or line wrapping.",

    codeTitle: "Correct DKIM public key",
    codeLanguage: "DNS TXT",
    code: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQE..."`,

    afterCodeText:
      "The important part is publishing the exact provider-generated value without truncation or editing.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0B...BROKEN_OR_TRUNCATED"`,
    wrongExampleText:
      "This fails because the public key is incomplete or malformed. Even one damaged section can make the entire DKIM record unusable.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQE..."`,
    correctExampleText:
      "This is the correct pattern. The DKIM public key is published exactly as generated by the provider, so receivers can parse it and verify signatures.",

    whyTitle: "Why this happens",

    whyText:
      "DKIM fails when the receiver cannot parse the public key correctly from DNS. If the key is truncated, malformed by formatting, or published with damaged TXT content, the signature cannot be validated even if the selector exists.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Receivers cannot parse the DKIM key correctly.",
      "DKIM verification fails even when the sender is legitimate.",
      "DMARC may fail if DKIM was expected to provide aligned authentication.",
      "Troubleshooting becomes confusing because the selector exists but still does not work."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "An invalid key breaks DKIM verification for legitimate traffic and weakens your authentication posture. That increases spam-folder risk, reduces trust signals at mailbox providers, and can cause DMARC alignment failure when DKIM was expected to provide an aligned pass.",

    causesTitle: "Common causes",
    causes: [
      "The DKIM TXT record was truncated during copy-paste or save.",
      "Wrong quotes or TXT formatting corrupted the published key.",
      "The key was copied incompletely, with missing characters.",
      "Provider migration or manual DNS editing introduced key formatting errors."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the published DKIM TXT record contains a valid, parseable public key and whether the record format is consistent with a working DKIM selector.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can a selector exist but still be invalid?",
        answer:
          "Yes. The selector hostname may exist in DNS, but if the key itself is malformed or incomplete, DKIM verification still fails."
      },
      {
        question: "Should I ever edit the DKIM key manually?",
        answer:
          "No. Use the exact DKIM value generated by the sending provider unless their documentation explicitly says otherwise."
      },
      {
        question: "Can TXT record splitting break DKIM?",
        answer:
          "Yes. Some DNS tools support long TXT values safely, but bad formatting or truncation can still corrupt the published key."
      }
    ],

    nextSteps: [
      "Copy the full DKIM key again from the active sending platform.",
      "Replace the DNS TXT value exactly as provided, without manual reformatting.",
      "Confirm the selector hostname and record type match provider instructions.",
      "Wait for DNS propagation and re-query the record from an external resolver.",
      "Send a fresh test email and verify DKIM=pass in the message headers."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/dkim-selector-not-found",
        label: "DKIM selector not found"
      },
      {
        href: "/dkim/dkim-key-length-too-short",
        label: "DKIM key length too short"
      },
      {
        href: "/dkim/no-dkim-record-found",
        label: "No DKIM record found"
      }
    ]
  },

  "dkim/dkim-alignment-failed": {
    title: "DKIM Alignment Failed – Fix DKIM Authentication Issues (2026)",

    intro:
      "DKIM alignment failed means DKIM passed cryptographically, but the signing domain does not align with the visible From domain for DMARC. This often happens when a provider signs with its own vendor domain instead of your sender domain. In that case, DKIM=pass may appear in headers while DMARC still treats the identity as misaligned.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Configure the sender/provider to sign with a d= domain that matches, or is properly aligned with, the visible From domain used in mail.",

    codeTitle: "Aligned DKIM setup",
    codeLanguage: "Email header",
    code: `From: billing@example.com
DKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=selector1;`,

    afterCodeText:
      "If the visible From address uses example.com, a DKIM signature with d=example.com is aligned.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Email header",
    wrongExampleCode: `From: billing@example.com
DKIM-Signature: v=1; a=rsa-sha256; d=vendor-mail.com; s=selector1;`,
    wrongExampleText:
      "This can be broken for DMARC because the message is visible as example.com, but the DKIM signing domain is vendor-mail.com. DKIM may pass technically, yet DKIM alignment still fails.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Email header",
    correctExampleCode: `From: billing@example.com
DKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=selector1;`,
    correctExampleText:
      "This is the correct pattern. The DKIM signing domain aligns with the visible From domain, so DKIM can contribute to a DMARC pass.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC checks identity alignment, not just whether DKIM validates. A DKIM signature can pass technically, but DMARC still fails if the d= domain does not align with the From domain. In relaxed alignment, a subdomain can align with its parent domain; in strict alignment, the domains must match exactly.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "DMARC may fail even when DKIM passes technically.",
      "Mailbox providers see a mismatch between visible identity and signing identity.",
      "Legitimate mail can land in spam or be quarantined under stricter policies.",
      "Authentication troubleshooting becomes more confusing."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Even with DKIM=pass, alignment failure can trigger DMARC failure risk under stricter policies. That can increase spam placement, cause quarantine/reject enforcement issues, and reduce trust because the visible sender identity does not match the signing identity.",

    causesTitle: "Common causes",
    causes: [
      "The provider signs with a vendor-owned domain by default.",
      "The wrong DKIM signing domain was configured in the sender platform.",
      "A subdomain/root domain mismatch caused alignment to fail under current policy.",
      "A migration left an old signing setup active after domain changes."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the d= domain in the DKIM signature aligns with the visible From domain strongly enough for DMARC to treat the signature as aligned.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can DKIM pass and still fail alignment?",
        answer:
          "Yes. DKIM pass only means the signature verified. Alignment is a separate DMARC requirement about whether the signing domain matches the From domain."
      },
      {
        question: "Does every DKIM signature need to align?",
        answer:
          "Not necessarily. At least one valid aligned authentication path is enough for DMARC, but relying on misaligned signatures weakens the setup."
      },
      {
        question: "How do I fix this safely?",
        answer:
          "Configure your sending provider to sign with your own domain or an aligned subdomain rather than a provider-owned identity."
      }
    ],

    nextSteps: [
      "Inspect a real message and record the visible From domain.",
      "Check the d= value in DKIM-Signature and compare alignment with From.",
      "Update provider settings to sign with your aligned domain or subdomain.",
      "Verify DMARC alignment mode (relaxed vs strict) matches your domain plan.",
      "Send a new test email and confirm both DKIM=pass and DKIM alignment pass."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-alignment-failed",
        label: "DMARC alignment failed"
      },
      {
        href: "/dkim/no-dkim-record-found",
        label: "No DKIM record found"
      },
      {
        href: "/dkim/dkim-selector-mismatch",
        label: "DKIM selector mismatch"
      }
    ]
  },

  "dkim/dkim-key-length-too-short": {
    title: "DKIM Key Too Small – Fix 1024 vs 2048-bit Issue (2026)",

    intro:
      "DKIM key length matters because the public key is part of the cryptographic trust behind message verification. Keys shorter than modern standards are considered weak and may be distrusted by some mailbox providers. Older DKIM deployments often used 512-bit or 1024-bit RSA keys, while current best practice is generally 2048-bit RSA.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Generate a new 2048-bit DKIM key in your mail platform, publish the new selector in DNS, and move signing traffic to that stronger selector.",

    codeTitle: "Correct 2048-bit DKIM record",
    codeLanguage: "DNS TXT",
    code: `selector2026._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQE..."`,

    afterCodeText:
      "The exact public key will differ, but the important point is publishing a modern 2048-bit DKIM key under a selector that your sending platform actually uses.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQ..."`,
    wrongExampleText:
      "This represents an older, shorter DKIM key. It may still work technically, but it sends a weaker trust signal and may no longer meet modern provider expectations.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `selector2026._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQE..."`,
    correctExampleText:
      "This is the correct pattern. A modern 2048-bit DKIM key is published in DNS under the selector your platform uses for signing.",

    whyTitle: "Why this happens",

    whyText:
      "This problem usually appears when an old DKIM deployment was never rotated, a legacy mail platform generated weaker keys years ago, or a provider migration preserved outdated selectors without upgrading them.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Weaker cryptographic assurance for DKIM validation.",
      "Some receivers may distrust or devalue short keys.",
      "Legacy selectors make the authentication setup look outdated.",
      "Future provider requirements can make the problem worse."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Mailbox providers care about authentication quality, not just the presence of a record. A working but weak DKIM key is better than no DKIM at all, but it still sends a weaker trust signal than a modern 2048-bit deployment.",

    causesTitle: "Common causes",
    causes: [
      "Legacy DKIM selectors were never rotated.",
      "An older mail platform generated short keys.",
      "A migration preserved outdated DNS records.",
      "No one reviewed DKIM key quality after the initial setup."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We evaluated the DKIM selector record and reviewed whether the published public key appears to use an outdated or weak key length by modern standards.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Will a short DKIM key always fail?",
        answer:
          "Not always immediately, but it is weaker and may be distrusted more over time than a modern 2048-bit key."
      },
      {
        question: "Should I rotate DKIM keys regularly?",
        answer:
          "Yes. Key rotation is a healthy security practice and gives you a chance to retire old selectors safely."
      },
      {
        question: "Is 2048-bit DKIM the usual recommendation?",
        answer:
          "Yes. In most modern environments, 2048-bit RSA is the safer default for DKIM."
      }
    ],

    nextSteps: [
      "Check which provider currently signs mail for your domain.",
      "Generate a new 2048-bit DKIM key if the provider supports it.",
      "Publish the new selector in DNS.",
      "Switch traffic to the stronger selector.",
      "Retire the weak legacy selector only after validation."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/invalid-dkim-key",
        label: "Invalid DKIM key"
      },
      {
        href: "/dkim/dkim-selector-explained",
        label: "DKIM selector explained"
      },
      {
        href: "/dkim/no-dkim-record-found",
        label: "No DKIM record found"
      }
    ]
  },

  "dkim/dkim-selector-explained": {
    title: "DKIM Selector Explained – Complete Guide (2026)",

    intro:
      "A DKIM selector is the label used to tell receivers which DNS record contains the public key needed to verify a DKIM signature. It appears in the DKIM-Signature header after s= and maps to a hostname under _domainkey. Selectors matter because they let domains rotate keys, separate different sending systems, and update DKIM safely without interrupting live mail flow.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Match the selector used in the DKIM-Signature header with a valid DKIM TXT record under the same selector name in DNS.",

    codeTitle: "Valid selector mapping",
    codeLanguage: "Plain text",
    code: `Header uses:   s=selector1
DNS publishes: selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,

    afterCodeText:
      "If the mail header shows s=selector1, the receiver will look for the DKIM public key at selector1._domainkey.example.com.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Plain text",
    wrongExampleCode: `Header uses:   s=selector1
DNS publishes: selector2._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,
    wrongExampleText:
      "This is broken because the selector used in the message does not match the selector published in DNS. The receiver looks in the wrong place and cannot verify the signature.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Plain text",
    correctExampleCode: `Header uses:   s=selector1
DNS publishes: selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,
    correctExampleText:
      "This is the correct pattern. The selector in the header and the selector in DNS match, so the receiver can retrieve the right public key.",

    whyTitle: "Why this matters",

    whyText:
      "Selectors make DKIM operationally manageable. Instead of replacing a live key in place, a domain can publish a new selector, switch signing to the new one, test it, and later retire the old selector without breaking mail delivery.",

    problemTitle: "Why selectors matter in practice",

    problemPoints: [
      "They make DKIM key rotation safer.",
      "They allow multiple mail systems to use different keys.",
      "They reduce the need for risky in-place key replacement.",
      "They help large domains manage authentication more cleanly."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Understanding selectors helps prevent operational mistakes that break DKIM. Mailbox providers care whether the selector implementation is stable, valid, and consistent.",

    causesTitle: "Common causes of confusion",
    causes: [
      "Teams copy DKIM values without understanding what s= means.",
      "Key rotation happens without documenting old and new selectors.",
      "Several providers sign mail with different selectors.",
      "DNS and mail-platform ownership are split across different teams."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the selector used in DKIM aligns with a valid selector record in DNS and whether the basic selector logic appears operationally sound.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can I have more than one DKIM selector?",
        answer:
          "Yes. Multiple selectors are normal and often used for key rotation or for separate sending systems."
      },
      {
        question: "Does changing the selector break mail?",
        answer:
          "It can if the new selector is not published correctly in DNS before the sender starts using it."
      },
      {
        question: "Why not just keep one selector forever?",
        answer:
          "Because key rotation is a healthy security practice, and selectors make rotation possible without taking mail offline."
      }
    ],

    nextSteps: [
      "Inspect a real DKIM-Signature header and note the selector value.",
      "Confirm the selector exists under _domainkey in DNS.",
      "Document which platforms use which selectors.",
      "Use selectors deliberately during DKIM key rotation.",
      "Review related DKIM issues if validation still fails."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/dkim-selector-not-found",
        label: "DKIM selector not found"
      },
      {
        href: "/dkim/dkim-selector-mismatch",
        label: "DKIM selector mismatch"
      },
      {
        href: "/dkim/dkim-key-length-too-short",
        label: "DKIM key length too short"
      }
    ]
  },

  "dkim/dkim-selector-mismatch": {
    title: "DKIM Selector Mismatch – Fix DKIM Conflict (2026)",

    intro:
      "A DKIM selector mismatch happens when the selector used in the DKIM-Signature header does not match the selector that actually exists in DNS. In simple terms, the sender signs with one selector name, but DNS only publishes a DKIM key for another selector. When that happens, the receiver looks up the wrong hostname and cannot verify the signature.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Make the selector in the DKIM-Signature header match the selector hostname that publishes the DKIM public key in DNS.",

    codeTitle: "What must match",
    codeLanguage: "Plain text",
    code: `Header uses:   s=selector1
DNS publishes: selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,

    afterCodeText:
      "These two values must refer to the same selector name.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Plain text",
    wrongExampleCode: `Header uses:   s=selector-old
DNS publishes: selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,
    wrongExampleText:
      "This is broken because the sender signs with selector-old, but DNS only publishes a DKIM key for selector1. The receiver looks up selector-old._domainkey.example.com and does not find the expected key.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Plain text",
    correctExampleCode: `Header uses:   s=selector1
DNS publishes: selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBg..."`,
    correctExampleText:
      "This is the correct pattern. The selector used in the DKIM-Signature header matches the selector published in DNS, so the receiver can fetch the right public key and verify the signature.",

    whyTitle: "Why this happens",

    whyText:
      "Selector mismatches usually happen during DKIM key rotation, email provider migrations, or partial DNS updates. A new selector may be published in DNS while the sender still uses the old selector, or the sending platform may be updated before the DNS record is changed.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "DKIM verification fails even when the sender is legitimate.",
      "DMARC may also fail if DKIM was expected to provide aligned authentication.",
      "Receivers cannot retrieve the correct public key.",
      "Mailbox providers may reduce trust in the message."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Mailbox providers want authentication to be stable and internally consistent. When the selector in the signature does not match the selector available in DNS, DKIM fails in a way that looks operationally broken rather than intentional.",

    causesTitle: "Common causes",
    causes: [
      "A DKIM key was rotated but the sending platform still uses the old selector.",
      "DNS was updated with a new selector, but the mail provider still signs with the previous one.",
      "A migration between email platforms changed selector naming.",
      "Old selector records were removed too early."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We compared the selector shown in the DKIM-Signature header with the selector hostname expected in DNS. If the selector in the header does not map to a valid published key, DKIM cannot be verified.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "What is a DKIM selector?",
        answer:
          "A DKIM selector is the label in the DKIM-Signature header that tells receivers which DNS record contains the public key for verification."
      },
      {
        question: "Can I have multiple DKIM selectors?",
        answer:
          "Yes. Multiple selectors are normal and are commonly used for key rotation or for separating different sending systems."
      },
      {
        question: "How do I fix a selector mismatch safely?",
        answer:
          "Check a real DKIM-Signature header, identify the selector being used, then confirm that the exact same selector exists in DNS under _domainkey."
      }
    ],

    nextSteps: [
      "Inspect a real DKIM-Signature header and note the selector value after s=.",
      "Check whether that exact selector exists in DNS under _domainkey.",
      "Update either the sender configuration or DNS so both use the same selector.",
      "Send a fresh test message after the change.",
      "Re-run the check to confirm DKIM verification now passes."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/dkim-selector-not-found",
        label: "DKIM selector not found"
      },
      {
        href: "/dkim/invalid-dkim-key",
        label: "Invalid DKIM key"
      },
      {
        href: "/dkim/no-dkim-record-found",
        label: "No DKIM record found"
      }
    ]
  },

  "dkim/dkim-body-hash-mismatch": {
    title: "DKIM Body Hash Mismatch – Fix DKIM Fail (2026)",

    intro:
      "A DKIM body hash mismatch occurs when the body of the email changes after the DKIM signature was created. DKIM signs the message body and stores a body hash in the DKIM-Signature header using the bh= parameter. When the receiving server recalculates the body hash, it must match the original value. If the content changes during delivery, the recalculated hash becomes different and DKIM verification fails.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Ensure that no system modifies the email body after DKIM signing. Gateways, forwarding services, mailing lists, and security tools must not add footers or rewrite message content after signing.",

    codeTitle: "Correct message delivery",
    codeLanguage: "Email message",
    code: `DKIM-Signature: v=1;
 a=rsa-sha256;
 d=example.com;
 s=selector1;
 bh=abc123originalhash;
 b=signaturevalue

Body sent by sender:
Hello John,
Your invoice is attached.

Body received by mailbox provider:
Hello John,
Your invoice is attached.`,

    afterCodeText:
      "The body received by the mailbox provider must match the body that was originally signed.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Email message",
    wrongExampleCode: `DKIM-Signature: v=1;
 a=rsa-sha256;
 d=example.com;
 s=selector1;
 bh=abc123originalhash;
 b=signaturevalue

Body sent by sender:
Hello John,
Your invoice is attached.

Body received by mailbox provider:
Hello John,
Your invoice is attached.

--
Scanned by SecureMail Gateway`,
    wrongExampleText:
      "The gateway added a footer after the message was signed. Because the body changed, the recalculated body hash no longer matches the bh value stored in the DKIM header.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Email message",
    correctExampleCode: `DKIM-Signature: v=1;
 a=rsa-sha256;
 d=example.com;
 s=selector1;
 bh=abc123originalhash;
 b=signaturevalue

Body sent by sender:
Hello John,
Your invoice is attached.

Body received by mailbox provider:
Hello John,
Your invoice is attached.`,
    correctExampleText:
      "The body delivered to the receiver is identical to the body that was signed. Because the content did not change, the recalculated body hash matches the bh value and DKIM verification succeeds.",

    whyTitle: "Why this happens",

    whyText:
      "DKIM body hash mismatches usually happen when downstream systems modify email content after the signature was created. Security gateways, mailing lists, forwarding services, and link rewriting tools frequently introduce these changes.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "DKIM authentication fails.",
      "DMARC may fail if DKIM was expected to provide aligned authentication.",
      "Mailbox providers may distrust the message.",
      "Legitimate email can land in spam."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Mailbox providers rely on DKIM to verify that a message was not modified in transit. When the body hash fails verification, the receiver cannot confirm the integrity of the message content.",

    causesTitle: "Common causes",
    causes: [
      "Mail gateways adding legal disclaimers or security footers.",
      "Mailing lists modifying the body of the message.",
      "Security systems rewriting links inside the email.",
      "Forwarding services reformatting the message content."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We verified whether the DKIM body hash stored in the DKIM-Signature header matches the hash calculated from the received message body.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can small formatting changes break DKIM?",
        answer:
          "Yes. Even small changes such as added footers, rewritten links, or altered whitespace can invalidate the DKIM body hash."
      },
      {
        question: "Does this mean the sender is malicious?",
        answer:
          "Not necessarily. Many legitimate messages fail DKIM because an intermediate system modified the message after signing."
      },
      {
        question: "How do I fix this safely?",
        answer:
          "Identify which system modifies the message after DKIM signing and disable those changes or move DKIM signing later in the mail flow."
      }
    ],

    nextSteps: [
      "Send a test email and inspect the DKIM-Signature header.",
      "Check whether the body changed during delivery.",
      "Review gateways and mailing list software.",
      "Ensure DKIM signing happens after all content modifications.",
      "Send another test email and verify DKIM now passes."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      {
        href: "/dkim/dkim-selector-not-found",
        label: "DKIM selector not found"
      },
      {
        href: "/dkim/invalid-dkim-key",
        label: "Invalid DKIM key"
      },
      {
        href: "/dkim/dkim-alignment-failed",
        label: "DKIM alignment failed"
      }
    ]
  },

  "dkim/dkim-record-example": {
    title: "DKIM Record Example – Valid DKIM Setup (2026)",

    intro:
      "DKIM records are TXT records published under a selector subdomain, for example selector1._domainkey.example.com. The value contains the version, key type, and public key. This page shows realistic examples for Google Workspace, Microsoft 365, and custom selectors, and explains how to read each field. Use these as reference when validating or troubleshooting DKIM.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish the exact DKIM TXT record your provider supplies. Ensure the selector hostname matches what the sender uses, and that the p= value contains the full public key without truncation.",

    codeTitle: "Google Workspace DKIM record",
    codeLanguage: "DNS TXT",
    code: `google._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."`,

    afterCodeText:
      "The hostname is selector._domainkey.yourdomain. The value starts with v=DKIM1, includes k=rsa (or ed25519), and p= holds the base64 public key. Replace the ellipsis with the full key from your provider.",

    wrongExampleTitle: "Truncated or partial record",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjAN"`,
    wrongExampleText:
      "The p= value is truncated. DKIM verification fails when the public key is incomplete. The key must be the full base64 string from the provider.",

    correctExampleTitle: "Complete DKIM record",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `selector1._domainkey.example.com TXT "v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA..."`,
    correctExampleText:
      "The full public key is present. Receivers can verify signatures that use this selector. Copy the entire p= value from your provider without shortening it.",

    whyTitle: "Why examples help",

    whyText:
      "Teams often truncate the public key during copy-paste, publish under the wrong hostname, or confuse the selector. Working examples show the correct structure and reduce setup errors.",

    problemTitle: "Why incorrect record structure causes problems",

    problemPoints: [
      "Truncated keys cause verification failures.",
      "Wrong selector hostname means receivers cannot find the key.",
      "Missing k= or p= fields make the record invalid.",
      "Publishing under the wrong domain breaks alignment."
    ],

    deliverabilityTitle: "How correct DKIM records affect deliverability",

    deliverabilityText:
      "Valid DKIM records allow receivers to verify signatures. That strengthens authentication, supports DMARC alignment, and improves trust. Malformed or truncated records break verification and weaken deliverability.",

    causesTitle: "Common record mistakes",

    causes: [
      "The public key was truncated when pasting into DNS.",
      "The selector hostname did not match the sender's selector.",
      "The record was published at the wrong domain or subdomain.",
      "An old record was left in place after a key rotation."
    ],

    checkedTitle: "What we checked",

    checkedText:
      "We validated DKIM record structure: version, key type, and completeness of the public key. We also check that the selector hostname matches common patterns.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "What does k=rsa mean?",
        answer:
          "k=rsa indicates the key algorithm. RSA is common; some providers use k=ed25519. The receiver uses this to verify the signature."
      },
      {
        question: "Can the p= value be split across multiple strings?",
        answer:
          "Yes. DNS TXT allows multiple strings that are concatenated. Ensure the full key is present when combined; truncation causes failure."
      },
      {
        question: "How long should the public key be?",
        answer:
          "RSA keys are typically several hundred characters in base64. Ed25519 keys are shorter. Use the full key from your provider."
      }
    ],

    nextSteps: [
      "Obtain the full DKIM record from your provider.",
      "Publish it at the exact selector._domainkey hostname.",
      "Ensure the p= value is complete and not truncated.",
      "Send a test email and verify DKIM passes in headers.",
      "Re-check after key rotation or provider changes."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      { href: "/dkim/no-dkim-record-found", label: "No DKIM record found" },
      { href: "/dkim/dkim-signature-explained", label: "DKIM signature explained" },
      { href: "/dkim/dkim-selector-explained", label: "DKIM selector explained" }
    ]
  },

  "dkim/dkim-signature-explained": {
    title: "DKIM Signature Invalid – Causes & Fix (2026)",

    intro:
      "The DKIM-Signature header is added by the sending server and contains the signature, the selector, the domain, and hashes of the signed headers and body. Receivers use this to fetch the public key from DNS and verify that the message was not modified. Understanding the header fields helps you debug verification failures and alignment issues.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Ensure the domain (d=) and selector (s=) in the DKIM-Signature header match the DNS record location. If the body hash fails, check for modifications (gateways, footers, forwarding) that occur after signing.",

    codeTitle: "DKIM-Signature header fields",
    codeLanguage: "Plain text",
    code: `v=1; a=rsa-sha256; d=example.com; s=selector1;
h=From:To:Subject:Date; bh=base64hash; b=base64signature`,

    afterCodeText:
      "d= is the signing domain, s= is the selector. The receiver fetches the public key from s._domainkey.d. bh= is the body hash; b= is the signature over the listed headers.",

    wrongExampleTitle: "Mismatched domain or selector",
    wrongExampleLanguage: "Plain text",
    wrongExampleCode: `d=mail.example.com; s=selector1
DNS: selector1._domainkey.example.com`,
    wrongExampleText:
      "The header says d=mail.example.com but the DNS record is under example.com. Alignment fails when the From domain is example.com and d= does not match.",

    correctExampleTitle: "Aligned signature",
    correctExampleLanguage: "Plain text",
    correctExampleCode: `d=example.com; s=selector1
DNS: selector1._domainkey.example.com`,
    correctExampleText:
      "The signing domain matches the DNS location. For DMARC alignment, d= should match or be a subdomain of the From domain.",

    whyTitle: "Why the signature matters",

    whyText:
      "The signature proves the message was not altered in transit. If the body or signed headers change after signing, the verification fails. Gateways, mailing lists, and forwarded mail often cause body hash mismatches.",

    problemTitle: "Why signature verification fails",

    problemPoints: [
      "Body hash mismatch when content is modified after signing.",
      "Selector or domain mismatch between header and DNS.",
      "Expired or missing public key in DNS.",
      "Wrong headers included in the signed set."
    ],

    deliverabilityTitle: "How signatures affect deliverability",

    deliverabilityText:
      "Passing DKIM verification is a strong trust signal. When signatures fail, receivers treat the message with less confidence. Fixing alignment and body hash issues restores full DKIM value for deliverability.",

    causesTitle: "Common verification failures",

    causes: [
      "A gateway or relay modified the message body.",
      "Footer insertion or tracking pixels changed the body.",
      "The selector in the header does not match DNS.",
      "The signing domain (d=) does not align with From."
    ],

    checkedTitle: "What we checked",

    checkedText:
      "We inspect DKIM-Signature headers when available and compare d= and s= to DNS. We also flag common causes of body hash mismatch.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "What is the body hash (bh=)?",
        answer:
          "bh= is a hash of the message body. If the body changes after signing, the hash no longer matches and verification fails."
      },
      {
        question: "What does h= specify?",
        answer:
          "h= lists the headers that were signed. The receiver recomputes the signature over those headers to verify integrity."
      },
      {
        question: "Why does forwarding break DKIM?",
        answer:
          "Forwarding often adds headers or modifies the body. The original signature no longer matches, so verification fails."
      }
    ],

    nextSteps: [
      "Inspect the DKIM-Signature header in a test message.",
      "Verify d= and s= match your DNS record location.",
      "Check for modifications (gateways, footers) that affect the body.",
      "Ensure signing happens after all content changes.",
      "Re-test with a clean delivery path."
    ],

    hub: {
      href: "/dkim",
      label: "DKIM Hub"
    },

    related: [
      { href: "/dkim/dkim-body-hash-mismatch", label: "DKIM body hash mismatch" },
      { href: "/dkim/dkim-record-example", label: "DKIM record examples" },
      { href: "/dkim/dkim-alignment-failed", label: "DKIM alignment failed" }
    ]
  }
};
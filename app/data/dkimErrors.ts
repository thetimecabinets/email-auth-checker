export const dkimErrors = {
    "dkim/no-dkim-record-found": {
      title: "No DKIM Record Found",
  
      intro:
        "No DKIM record found means the domain is not publishing the DKIM public key needed for receivers to verify signed messages. DKIM works by placing a cryptographic signature in the email header and publishing the matching public key in DNS under a selector hostname. If that selector record does not exist, receiving servers cannot validate the signature, even when the email came from a legitimate sender.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Publish the exact DKIM selector TXT record provided by your email service under the selector hostname your sender actually uses.",
  
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
        "This usually happens when DKIM was never enabled in the sending platform, the DNS record was not added after setup, the selector hostname was copied incorrectly, or a DNS migration removed a record that active mail systems still depend on.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Receivers cannot verify DKIM signatures.",
        "DMARC may fail if DKIM was expected to provide aligned authentication.",
        "Legitimate email can lose trust and land in spam.",
        "Brand spoofing becomes harder to control."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Without a working DKIM record, your domain loses one of the strongest trust signals used by mailbox providers. That can weaken inbox placement, especially for transactional email, security notifications, and product mail where consistent authentication matters.",
  
      causesTitle: "Common causes",
      causes: [
        "DKIM was never enabled in the sending platform.",
        "The selector TXT record was never added to DNS.",
        "The selector hostname was copied incorrectly.",
        "A DNS migration removed the DKIM record."
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
        "Identify which platform signs your outgoing mail.",
        "Copy the exact selector hostname and public key from that provider.",
        "Publish the TXT record under _domainkey.",
        "Wait for DNS propagation.",
        "Send a fresh test email and verify DKIM now passes."
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
  
    "dkim/dkim-selector-not-found": {
      title: "DKIM Selector Not Found",
  
      intro:
        "A DKIM selector not found error means the selector referenced in the DKIM-Signature header does not resolve to a usable DKIM TXT record in DNS. The selector is the label after s= in the DKIM header, and it tells the receiver where to find the public key. If that selector record is missing, wrong, or published under the wrong hostname, the receiver cannot verify the signature.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Make sure the exact selector used in the DKIM-Signature header exists in DNS under the matching _domainkey hostname.",
  
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
        "This problem usually appears when a mail provider changed selectors, a DNS record was added under the wrong hostname, an old selector was removed too early, or a team copied only part of the DKIM setup instructions.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "DKIM verification fails.",
        "DMARC may fail if DKIM was expected to provide aligned authentication.",
        "Receivers cannot retrieve the correct public key.",
        "Inbox placement becomes less predictable."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When the selector cannot be found, mailbox providers see a broken authentication path. Even if the sender itself is legitimate, the missing selector makes the domain look operationally unreliable and can contribute to spam placement.",
  
      causesTitle: "Common causes",
      causes: [
        "A DKIM key was rotated but DNS still publishes the old selector.",
        "The selector hostname was entered incorrectly in DNS.",
        "A migration between providers changed selector naming.",
        "An old selector record was deleted before all senders stopped using it."
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
        "Inspect a real DKIM-Signature header and note the selector value.",
        "Check whether that exact selector exists in DNS under _domainkey.",
        "Publish the missing selector record or update the sender configuration.",
        "Wait for DNS propagation.",
        "Send a new test message and verify DKIM now passes."
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
      title: "Invalid DKIM Key",
  
      intro:
        "An invalid DKIM key means the public key published in DNS is malformed, incomplete, or incorrectly formatted. DKIM verification depends on the receiver being able to parse the key exactly as published. If the key is truncated, split incorrectly, copied with missing characters, or contains the wrong DNS value, the receiver cannot use it to verify the signature.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Re-copy the DKIM public key from your mail provider and publish it exactly as provided, without changing characters, spacing, or line breaks.",
  
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
        "This usually happens when DNS editors wrap long TXT values incorrectly, a public key is copied incompletely, quote handling breaks the value, or a human edits the record by hand instead of pasting the provider-generated string exactly.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Receivers cannot parse the DKIM key correctly.",
        "DKIM verification fails even when the sender is legitimate.",
        "DMARC may fail if DKIM was expected to provide aligned authentication.",
        "Troubleshooting becomes confusing because the selector exists but still does not work."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "An invalid DKIM key creates one of the most frustrating deliverability issues because the record exists, but it still fails verification. Mailbox providers do not reward the intent to configure DKIM. They reward a technically valid, stable implementation.",
  
      causesTitle: "Common causes",
      causes: [
        "The public key was truncated during copy-paste.",
        "A DNS provider handled long TXT values incorrectly.",
        "Quotes or spaces were added in the wrong place.",
        "A human edited the key instead of pasting the exact provider-generated value."
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
        "Copy the DKIM public key again from the actual sending provider.",
        "Replace the existing DNS value without manual edits.",
        "Confirm the selector hostname is correct.",
        "Wait for DNS propagation.",
        "Send a fresh test email and verify DKIM now passes."
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
      title: "DKIM Alignment Failed",
  
      intro:
        "DKIM alignment failed means the domain used in the DKIM signature does not align with the visible From domain required by DMARC. A message can still have a technically valid DKIM signature, but if the signing domain after d= does not match the visible From domain closely enough, DMARC may still fail.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Make sure at least one valid DKIM signature uses a d= domain that aligns with the visible From domain.",
  
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
        "This problem usually appears when a third-party sender signs with its own domain by default, a white-label domain was never configured properly, or different sending systems use different DKIM identities for the same brand.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "DMARC may fail even when DKIM passes technically.",
        "Mailbox providers see a mismatch between visible identity and signing identity.",
        "Legitimate mail can land in spam or be quarantined under stricter policies.",
        "Authentication troubleshooting becomes more confusing."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Mailbox providers increasingly evaluate the full identity story, not just whether a signature cryptographically verifies. If the message claims to be from one domain but is signed by another, trust can drop even when the underlying DKIM signature is valid.",
  
      causesTitle: "Common causes",
      causes: [
        "A third-party ESP signs with its own domain by default.",
        "A custom DKIM signing domain was never configured.",
        "Several sending platforms use different identities for the same brand.",
        "DMARC was tightened before all senders were aligned."
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
        "Inspect the visible From domain in a real message.",
        "Check the d= domain used in the DKIM-Signature header.",
        "Configure the sender to use an aligned DKIM signing domain.",
        "Send a fresh test message after the change.",
        "Re-run the check to confirm DKIM alignment now passes."
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
      title: "DKIM Key Length Too Short",
  
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
      title: "DKIM Selector Explained",
  
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
      title: "DKIM Selector Mismatch",
  
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
      title: "DKIM Body Hash Mismatch",
  
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
      title: "DKIM Record Examples",

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
      title: "DKIM Signature Explained",

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
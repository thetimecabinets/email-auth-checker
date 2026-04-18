export const dmarcErrors = {
  "dmarc/no-dmarc-record-found": {
    title: "No DMARC Record Found (Fix DMARC Setup Fast)",
    description:
      "Fix missing DMARC record fast. Learn how to create a DMARC policy, protect your domain, and improve email deliverability.",

    intro:
      "No DMARC record found means your domain does not publish a DMARC policy in DNS. Even if SPF and DKIM exist, Gmail, Outlook, and Yahoo have no domain-level instruction for handling failed or spoofed mail. That weakens anti-spoofing control and leaves enforcement inconsistent across receivers.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish one valid DMARC TXT record at _dmarc.yourdomain. If you are not ready for enforcement yet, start with p=none and review reports before moving to quarantine or reject.",

    codeTitle: "Correct DMARC record",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com`,

    afterCodeText:
      "This monitoring policy lets you collect DMARC reports before moving to stricter enforcement such as quarantine or reject.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `# No TXT record published at _dmarc.example.com`,
    wrongExampleText:
      "This is broken because the domain publishes no DMARC policy at all. Receivers can still evaluate SPF and DKIM, but they do not have a domain-level instruction for what to do when authentication fails.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=none; rua=mailto:dmarc@example.com`,
    correctExampleText:
      "This is the correct starting pattern. The domain publishes a valid DMARC policy, enabling reporting and making later enforcement possible.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC is the policy layer above SPF and DKIM. SPF and DKIM provide authentication signals, but DMARC tells receivers how to apply domain-level policy when those signals fail alignment. Without DMARC, receivers have no authoritative instruction from your domain for spoofed or unauthenticated mail.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Mailbox providers cannot enforce anti-spoofing policies for your domain.",
      "Phishing emails can impersonate your domain more easily.",
      "You lose visibility into authentication failures.",
      "DMARC aggregate and forensic reporting is unavailable."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Without DMARC, your domain has weaker protection against impersonation and less consistent trust signals at mailbox providers. That increases spoofing risk and leaves you without DMARC-based enforcement and reporting controls that help protect deliverability over time.",

    causesTitle: "Common causes",
    causes: [
      "The domain was never set up with a DMARC policy.",
      "Authentication was configured only partially (SPF/DKIM without DMARC).",
      "A DNS migration removed the existing _dmarc TXT record.",
      "A new domain launched without complete email authentication setup."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We looked for a TXT record under _dmarc.yourdomain that begins with v=DMARC1. If none exists, the domain has no published DMARC policy.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can email still work without DMARC?",
        answer:
          "Yes. Mail can still be delivered, but receivers do not have a domain-level enforcement policy for messages that fail SPF or DKIM alignment."
      },
      {
        question: "Should I start with p=reject immediately?",
        answer:
          "Usually no. Most domains start with p=none to collect reports and confirm legitimate senders before moving to quarantine or reject."
      },
      {
        question: "Where must the DMARC record be published?",
        answer:
          "At the _dmarc subdomain, for example _dmarc.example.com, as a TXT record beginning with v=DMARC1."
      }
    ],

    nextSteps: [
      "Publish one DMARC TXT record at _dmarc.yourdomain.",
      "Start with p=none and add a working rua mailbox for aggregate reports.",
      "Verify the record is visible externally and syntactically valid.",
      "Review report data to confirm legitimate senders are aligned.",
      "Increase enforcement gradually to quarantine/reject when ready."
    ],
    verifySteps: [
      "Send a test email from your domain.",
      "Check SPF and DKIM alignment in message headers.",
      "Confirm DMARC shows pass in results.",
      "Re-run the DNS check tool to verify the record."
    ],
    quickPoints: [
      "No DMARC record published in DNS",
      "No policy for handling spoofed email",
      "Providers cannot enforce your domain policy",
      "No DMARC reports are generated"
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      },
      {
        href: "/dmarc/dmarc-alignment-failed",
        label: "DMARC alignment failed"
      },
      {
        href: "/dmarc/multiple-dmarc-records-found",
        label: "Multiple DMARC records found"
      }
    ]
  },

  "dmarc/google-workspace-dmarc-not-working": {
    title: "Google Workspace DMARC Not Working (Fix Alignment Fast)",

    intro:
      "Google Workspace DMARC not working usually means SPF or DKIM does not align with your visible From domain. Gmail can still deliver messages, but Outlook and Yahoo may treat them as unauthenticated or suspicious when DMARC fails. This often happens when Google Admin DKIM or sender alignment settings are incomplete.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish one valid DMARC record at _dmarc.yourdomain, enable DKIM signing in Google Admin, and make sure SPF/DKIM align with the visible From domain before tightening policy.",

    codeTitle: "Correct Google Workspace DMARC record",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; adkim=r; aspf=r`,

    afterCodeText:
      "Start with monitoring while you verify Google Workspace sender alignment. Move to stricter policy only after headers consistently show aligned SPF or DKIM pass.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Email header + DNS",
    wrongExampleCode: `From: billing@example.com
DKIM-Signature: d=gmail.com; s=google;
_dmarc.example.com TXT "v=DMARC1; p=reject;"`,
    wrongExampleText:
      "This fails DMARC alignment for example.com because the signing domain does not align with the visible From domain. A strict reject policy can block legitimate mail before alignment issues are fixed.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Email header + DNS",
    correctExampleCode: `From: billing@example.com
DKIM-Signature: d=example.com; s=google;
_dmarc.example.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com; adkim=r; aspf=r"`,
    correctExampleText:
      "This is the healthy rollout pattern: aligned DKIM for your domain plus monitoring policy and reports. You can safely increase enforcement after report data confirms stable alignment.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC checks alignment, not just whether mail was sent from Google infrastructure. If DKIM is not enabled correctly in Google Admin, or SPF/DKIM align to the wrong domain, DMARC fails. This is common during domain onboarding, key rotation, or policy tightening without header validation.",

    problemTitle: "Why this is a problem",

    problemText:
      "When Google Workspace traffic fails DMARC, mailbox providers can treat messages as less trustworthy or apply policy actions such as quarantine/reject. Business-critical mail can be filtered more aggressively, and spoofing protection remains weak if policy is kept soft indefinitely.",

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "A stable Google Workspace DMARC setup improves sender trust and helps providers distinguish legitimate mail from impersonation. Broken alignment reduces that trust signal, increases spam-folder risk, and complicates enforcement decisions.",

    causesTitle: "Common causes",
    causes: [
      "DKIM signing was not fully enabled in Google Admin for the sending domain.",
      "SPF or DKIM passed technically but aligned to a different domain.",
      "DMARC policy was tightened before sender alignment was fully validated.",
      "Recent DNS updates for DMARC or DKIM were not fully propagated."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We checked whether a DMARC record exists, whether policy tags are valid, and whether Google Workspace mail can provide an aligned SPF or DKIM pass for the visible From domain.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can Gmail send mail while DMARC still fails?",
        answer:
          "Yes. Delivery can continue while alignment is broken. DMARC failure appears in headers and can still hurt trust and placement."
      },
      {
        question: "Should I use p=reject immediately for Google Workspace?",
        answer:
          "Only after reports show stable aligned SPF or DKIM across all legitimate senders."
      },
      {
        question: "How do I verify Google Workspace DMARC health quickly?",
        answer:
          "Send a real message, inspect headers for SPF/DKIM alignment, and review DMARC aggregate reports before increasing enforcement."
      }
    ],

    nextSteps: [
      "Check a real Google Workspace message header for SPF/DKIM alignment.",
      "Enable or re-verify DKIM signing in Google Admin for the sending domain.",
      "Publish or correct _dmarc with p=none and a working rua mailbox.",
      "Review DMARC reports and fix failing sources first.",
      "Increase policy from none to quarantine/reject only after stable alignment."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-alignment-failed",
        label: "DMARC alignment failed"
      },
      {
        href: "/dkim/google-workspace-dkim-not-working",
        label: "Google Workspace DKIM not working"
      },
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      }
    ]
  },

  "dmarc/microsoft-365-dmarc-not-working": {
    title: "Microsoft 365 DMARC Not Working (Fix Alignment Fast)",

    intro:
      "Microsoft 365 DMARC not working means SPF or DKIM is passing on a non-aligned domain instead of your visible From domain. Mail can still send, but Gmail, Outlook, and Yahoo may apply stricter filtering when alignment fails. This is common when tenant defaults are active and custom-domain alignment was not fully completed.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish a valid DMARC policy at _dmarc.yourdomain, ensure Microsoft 365 DKIM is enabled for the custom domain, and verify SPF/DKIM alignment in real message headers.",

    codeTitle: "Correct Microsoft 365 DMARC record",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; adkim=r; aspf=r`,

    afterCodeText:
      "Use monitoring first, then increase policy strength after alignment is consistently passing for all legitimate Microsoft 365 sending flows.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Email header + DNS",
    wrongExampleCode: `From: alerts@example.com
DKIM-Signature: d=example.onmicrosoft.com; s=selector1;
_dmarc.example.com TXT "v=DMARC1; p=reject;"`,
    wrongExampleText:
      "This can fail DMARC alignment for example.com if signing/alignment is not configured to match the visible From domain. Strict reject policy may impact legitimate traffic prematurely.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Email header + DNS",
    correctExampleCode: `From: alerts@example.com
DKIM-Signature: d=example.com; s=selector1;
_dmarc.example.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com; adkim=r; aspf=r"`,
    correctExampleText:
      "Aligned signing plus monitoring policy provides safe visibility and predictable rollout. Enforcement can be increased after report-backed validation.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC on Microsoft 365 often fails when DKIM is technically enabled but domain alignment is not set up for the visible From identity. SPF paths can also align to a different return-path domain. DMARC requires at least one aligned authentication path, not just a pass result.",

    problemTitle: "Why this is a problem",

    problemText:
      "If DMARC fails on Microsoft 365 traffic, receivers may downgrade trust or enforce quarantine/reject depending on policy. Legitimate corporate mail can be filtered inconsistently, while spoofing controls remain weaker than expected.",

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Consistent DMARC alignment for Microsoft 365 helps preserve sender reputation and inbox placement for business-critical traffic. Misalignment increases spam risk and creates unstable enforcement behavior across providers.",

    causesTitle: "Common causes",
    causes: [
      "DKIM was not fully enabled for the custom domain in Microsoft 365.",
      "SPF or DKIM authenticated a non-aligned domain.",
      "DMARC policy was enforced before alignment gaps were fixed.",
      "DNS propagation delays hid recent DMARC/DKIM corrections."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We checked DMARC record validity and whether Microsoft 365 mail can provide aligned SPF or DKIM results for the visible From domain under current policy settings.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can Microsoft 365 pass DKIM and still fail DMARC?",
        answer:
          "Yes. DKIM pass alone is not enough if the signing domain is not aligned with the From domain."
      },
      {
        question: "Should I keep DMARC at p=none for Microsoft 365?",
        answer:
          "Use p=none during monitoring, then move to enforcement once reports and headers confirm stable alignment."
      },
      {
        question: "What is the fastest way to validate Microsoft 365 DMARC?",
        answer:
          "Send a real message, inspect SPF/DKIM alignment in headers, and confirm report trends from your rua destination."
      }
    ],

    nextSteps: [
      "Send a real Microsoft 365 message and inspect alignment in headers.",
      "Enable/verify DKIM for the exact custom domain in Microsoft 365.",
      "Publish or correct DMARC at _dmarc with p=none and rua reporting.",
      "Resolve failing sources shown in DMARC aggregate reports.",
      "Increase enforcement only after stable aligned pass rates."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-alignment-failed",
        label: "DMARC alignment failed"
      },
      {
        href: "/dkim/microsoft-365-dkim-not-working",
        label: "Microsoft 365 DKIM not working"
      },
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      }
    ]
  },

  "dmarc/dmarc-fail-gmail": {
    title: "DMARC Fail in Gmail (Why Gmail DMARC Checks Fail)",
    description:
      "Gmail showing DMARC fail? Diagnose SPF/DKIM alignment gaps, sender-path mismatches, and policy issues that break DMARC enforcement.",

    intro:
      "DMARC fail in Gmail usually means SPF or DKIM passed technically but did not align with the visible From domain. Teams often see pass signals in raw headers and still fail DMARC because alignment, not just authentication, is the deciding rule.",

    quickPoints: [
      "DMARC in Gmail depends on alignment, not raw SPF/DKIM pass alone",
      "From domain must align with SPF or DKIM-authenticated domain",
      "Third-party sender paths commonly break Gmail DMARC alignment",
      "Strict policy with unresolved alignment creates immediate delivery risk"
    ],

    fixTitle: "One-Minute Fix",
    fixText:
      "Check a failing Gmail header, confirm aligned SPF or DKIM for the visible From domain, and correct sender routing before enforcing stricter DMARC policy.",

    codeTitle: "Gmail DMARC fail pattern",
    codeLanguage: "Email Header + DNS",
    code: `Authentication-Results: mx.google.com;
spf=pass smtp.mailfrom=mailer.vendor.net
dkim=pass header.d=vendor.net
dmarc=fail header.from=example.com

_dmarc.example.com TXT "v=DMARC1; p=quarantine; adkim=s; aspf=s"`,

    afterCodeText:
      "SPF and DKIM pass for vendor.net, but neither aligns to example.com in header.from, so Gmail returns DMARC fail.",

    wrongExampleTitle: "Unaligned sender setup",
    wrongExampleLanguage: "Header state",
    wrongExampleCode: `header.from=example.com
spf domain=mailer.vendor.net
dkim d=vendor.net`,
    wrongExampleText:
      "Authentication exists, but alignment to the From domain is missing, so DMARC fails in Gmail.",

    correctExampleTitle: "Aligned sender setup",
    correctExampleLanguage: "Header state",
    correctExampleCode: `header.from=example.com
spf domain=bounce.example.com
dkim d=example.com`,
    correctExampleText:
      "At least one aligned path supports DMARC success in Gmail for the visible From domain.",

    whyTitle: "Why this happens",
    whyText:
      "Gmail DMARC fails most often when operational sender domains drift from brand-visible domains. Providers may authenticate on infrastructure domains unless custom alignment is completed.",

    problemTitle: "Why this is a problem",
    problemPoints: [
      "Legitimate Gmail traffic can be quarantined or rejected under policy.",
      "Authentication dashboards look healthy while alignment stays broken.",
      "Brand trust suffers when mailbox placement is inconsistent.",
      "Policy hardening is blocked until alignment is fixed across streams."
    ],

    deliverabilityTitle: "How this affects deliverability",
    deliverabilityText:
      "Persistent DMARC fail in Gmail weakens trust and can push important messages to spam or rejection, especially under quarantine/reject policies.",

    causesTitle: "Common causes",
    causes: [
      "SPF passes on a non-aligned envelope sender domain.",
      "DKIM signs with provider domain instead of your visible From domain.",
      "Strict adkim/aspf settings applied before sender alignment is complete.",
      "Mixed sender stack where one stream is aligned and another is not."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We validate DMARC record health and whether SPF/DKIM outcomes align with the exact From domain used in failing Gmail messages.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can Gmail show DMARC fail even when SPF passes?",
        answer:
          "Yes. If SPF passes on a different domain than the From domain, DMARC can still fail due to alignment."
      },
      {
        question: "Do I need both SPF and DKIM aligned?",
        answer:
          "No. One aligned pass is enough for DMARC, but having both aligned improves resilience."
      },
      {
        question: "Should I lower policy while fixing alignment?",
        answer:
          "Usually yes. Use monitoring or softer enforcement while correcting sender alignment across all streams."
      }
    ],

    nextSteps: [
      "Capture a failing Gmail header and map SPF/DKIM domains vs header.from.",
      "Align at least one authentication path to the From domain.",
      "Retest Gmail outcomes after sender config updates.",
      "Review all sending tools to ensure consistent alignment.",
      "Increase DMARC enforcement only after stable aligned pass rates."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
      { href: "/dkim/dkim-alignment-failed", label: "DKIM alignment failed" },
      { href: "/dmarc/no-dmarc-record-found", label: "No DMARC record found" }
    ]
  },

  "dmarc/dmarc-fail-outlook": {
    title: "DMARC Fail in Outlook (Why Outlook DMARC Fails)",
    description:
      "Outlook DMARC fail usually means SPF/DKIM alignment is broken for the From domain. Diagnose policy and sender-path mismatches fast.",

    intro:
      "DMARC fail in Outlook appears when authenticated domains do not align with the visible From domain used in the message. In Microsoft-heavy environments, mixed relay paths and partial DKIM rollout frequently produce intermittent Outlook DMARC failures.",

    quickPoints: [
      "Outlook DMARC fail is usually an alignment issue, not missing DNS alone",
      "Hybrid sender stacks often pass SPF/DKIM on non-aligned domains",
      "Strict policy can expose hidden stream-level misconfigurations",
      "Consistent alignment across all sender paths is required"
    ],

    fixTitle: "One-Minute Fix",
    fixText:
      "Use a failing Outlook header to identify non-aligned sender domains, then align SPF or DKIM to the From domain before tightening policy.",

    codeTitle: "Outlook DMARC fail pattern",
    codeLanguage: "Header + DNS",
    code: `Authentication-Results:
spf=pass smtp.mailfrom=mailer.example-mail.net
dkim=pass header.d=example-mail.net
dmarc=fail header.from=example.com`,

    afterCodeText:
      "Both auth paths pass on another domain, but DMARC fails because header.from is different and unaligned.",

    wrongExampleTitle: "Policy-first without alignment",
    wrongExampleLanguage: "DMARC TXT",
    wrongExampleCode: `_dmarc.example.com TXT "v=DMARC1; p=reject; adkim=s; aspf=s"`,
    wrongExampleText:
      "Strict enforcement before sender alignment is complete can increase Outlook delivery failures for legitimate mail.",

    correctExampleTitle: "Alignment-first rollout",
    correctExampleLanguage: "Operational pattern",
    correctExampleCode: `Align SPF/DKIM to example.com across all streams, then move policy from none → quarantine → reject`,
    correctExampleText:
      "Alignment-first rollout reduces accidental enforcement failures and stabilizes Outlook deliverability.",

    whyTitle: "Why this happens",
    whyText:
      "Outlook DMARC failures often reflect fragmented sender architecture where each tool authenticates on its own domain rather than your visible From domain.",

    problemTitle: "Why this is a problem",
    problemPoints: [
      "Legitimate business mail can fail policy checks and route to junk.",
      "Operational teams misread pass signals as DMARC health.",
      "Enforcement hardening stalls due to unpredictable stream behavior.",
      "Incident triage takes longer without stream-level alignment mapping."
    ],

    deliverabilityTitle: "How this affects deliverability",
    deliverabilityText:
      "Unresolved Outlook DMARC fails can reduce inbox placement and increase rejection risk under stricter policy levels, especially for transactional traffic.",

    causesTitle: "Common causes",
    causes: [
      "Provider/authenticated domains do not align with visible From domain.",
      "One sender stream still uses old relay or signing configuration.",
      "Policy tightened before all tools were aligned and validated.",
      "DKIM enabled only for part of the outbound mail stack."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We verify Outlook DMARC outcomes against From-domain alignment for SPF/DKIM, plus policy strictness and stream-by-stream sender consistency.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can Outlook fail DMARC while Gmail passes?",
        answer:
          "Yes. Different routing paths, sender pools, and enforcement behavior can expose misalignment differently by provider."
      },
      {
        question: "Is one aligned pass enough for DMARC?",
        answer:
          "Yes, one aligned SPF or DKIM pass is sufficient, but both aligned is better for resilience."
      },
      {
        question: "When should I move to p=reject?",
        answer:
          "Only after all legitimate streams show stable alignment and DMARC pass in real mailbox tests."
      }
    ],

    nextSteps: [
      "Collect failing Outlook headers across all sender streams.",
      "Align SPF or DKIM for each stream to the visible From domain.",
      "Retest Outlook and monitor DMARC outcomes by stream.",
      "Fix outlier tools still authenticating on non-aligned domains.",
      "Advance policy strength after alignment is stable."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
      { href: "/dmarc/microsoft-365-dmarc-not-working", label: "Microsoft 365 DMARC not working" },
      { href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject", label: "DMARC policy levels explained" }
    ]
  },

  "dmarc/dmarc-policy-reject-causing-fail": {
    title: "DMARC Reject Policy Causing Fail (How to Fix Safely)",
    description:
      "DMARC reject causing delivery failures? Learn how to roll back safely, fix alignment gaps, and re-enable strong policy without blocking valid mail.",

    intro:
      "When DMARC policy is set to reject before sender alignment is fully validated, legitimate mail can fail authentication and be blocked. This page focuses on recovery and staged hardening when strict enforcement is causing production failures.",

    quickPoints: [
      "p=reject enforces immediately when alignment fails",
      "Reject policy should follow verified sender alignment, not precede it",
      "Rollback to monitoring can prevent widespread business-mail loss",
      "Stream-by-stream alignment validation is required before re-hardening"
    ],

    fixTitle: "One-Minute Fix",
    fixText:
      "Temporarily reduce policy to p=none or p=quarantine, identify failing streams from headers/reports, fix alignment, then progressively restore reject enforcement.",

    codeTitle: "Safe rollback + staged enforcement",
    codeLanguage: "DMARC TXT",
    code: `_dmarc.example.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com; adkim=r; aspf=r"`,

    afterCodeText:
      "Use monitoring to map failures first, then move gradually back to quarantine/reject once legitimate streams are aligned.",

    wrongExampleTitle: "Premature strict policy",
    wrongExampleLanguage: "DMARC TXT",
    wrongExampleCode: `_dmarc.example.com TXT "v=DMARC1; p=reject; adkim=s; aspf=s"`,
    wrongExampleText:
      "Strict policy with unresolved alignment can block legitimate mail and trigger avoidable production incidents.",

    correctExampleTitle: "Staged hardening policy",
    correctExampleLanguage: "DMARC TXT",
    correctExampleCode: `_dmarc.example.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com"`,
    correctExampleText:
      "Start with controlled monitoring, fix failures, then harden policy when real-world pass rates are stable.",

    whyTitle: "Why this happens",
    whyText:
      "Reject-policy incidents happen when policy decisions are made before sender alignment and routing complexity are fully mapped across all mail sources.",

    problemTitle: "Why this is a problem",
    problemPoints: [
      "Critical transactional mail may be rejected by receivers.",
      "Business teams lose trust in enforcement rollout strategy.",
      "Emergency rollback is required under production pressure.",
      "Security posture and deliverability goals fall out of sync."
    ],

    deliverabilityTitle: "How this affects deliverability",
    deliverabilityText:
      "A mis-timed reject policy can significantly reduce successful delivery for valid mail until alignment issues are corrected and policy is reintroduced safely.",

    causesTitle: "Common causes",
    causes: [
      "Reject policy activated before all sender streams were aligned.",
      "Legacy tools still send from non-aligned domains.",
      "DKIM/SPF config differs by stream and was not validated in real headers.",
      "No phased rollout using report-driven corrections."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We assess policy level, observed fail patterns, and whether legitimate sender streams had aligned SPF/DKIM before reject enforcement was enabled.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Should I immediately disable DMARC after rejects?",
        answer:
          "Not entirely. Move to monitoring or softer policy while fixing alignment rather than removing DMARC completely."
      },
      {
        question: "How long should p=none remain?",
        answer:
          "Long enough to confirm stable aligned pass rates across all legitimate senders in real traffic."
      },
      {
        question: "Can I use pct for safer rollout?",
        answer:
          "Yes. pct helps phased enforcement, but alignment must still be corrected before full reject."
      }
    ],

    nextSteps: [
      "Roll policy back to a safer level to stop immediate false rejects.",
      "Identify failing legitimate streams from headers and reports.",
      "Fix SPF/DKIM alignment for each stream.",
      "Re-test and monitor pass rates in real recipient providers.",
      "Reintroduce reject policy in controlled phases."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      { href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject", label: "DMARC policy levels explained" },
      { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
      { href: "/dmarc/dmarc-pct-tag-explained", label: "DMARC pct tag explained" }
    ]
  },

  "dmarc/dmarc-quarantine-sending-to-spam": {
    title: "DMARC Quarantine Sending to Spam (Why It Happens)",
    description:
      "DMARC quarantine sending mail to spam? Understand policy behavior, reduce false positives, and improve alignment before stricter enforcement.",

    intro:
      "DMARC quarantine is designed to route failing mail to spam-like folders. If legitimate messages are being quarantined, it usually means alignment is still incomplete for one or more sender streams or policy was tightened before sender cleanup.",

    quickPoints: [
      "p=quarantine intentionally increases spam-folder routing for DMARC fails",
      "Legitimate mail in spam indicates unresolved alignment for that stream",
      "Quarantine is a transition stage, not a final fix by itself",
      "Report-guided sender cleanup is required to reduce false positives"
    ],

    fixTitle: "One-Minute Fix",
    fixText:
      "Identify which legitimate streams are failing DMARC, fix SPF/DKIM alignment for those paths, and adjust policy only after pass rates are consistently healthy.",

    codeTitle: "Quarantine policy example",
    codeLanguage: "DMARC TXT",
    code: `_dmarc.example.com TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com; adkim=r; aspf=r"`,

    afterCodeText:
      "Quarantine works as intended for failing mail. The fix is alignment correction for legitimate streams, not ignoring the policy result.",

    wrongExampleTitle: "Quarantine without sender cleanup",
    wrongExampleLanguage: "Operational state",
    wrongExampleCode: `p=quarantine enabled while multiple senders still fail alignment`,
    wrongExampleText:
      "Legitimate traffic continues to land in spam because enforcement outpaced alignment remediation.",

    correctExampleTitle: "Quarantine with remediation",
    correctExampleLanguage: "Operational state",
    correctExampleCode: `p=quarantine + stream-by-stream alignment fixes + report monitoring`,
    correctExampleText:
      "Spam-side false positives reduce as legitimate senders are aligned and policy is tuned with real evidence.",

    whyTitle: "Why this happens",
    whyText:
      "Quarantine-related spam issues occur when policy is functioning correctly but sender alignment is incomplete. The policy is exposing real authentication gaps.",

    problemTitle: "Why this is a problem",
    problemPoints: [
      "Valid mail can route to spam, affecting engagement and business outcomes.",
      "Teams may misinterpret quarantine behavior as provider error.",
      "Policy confidence drops when remediation workflow is missing.",
      "Escalating to reject becomes risky without first stabilizing alignment."
    ],

    deliverabilityTitle: "How this affects deliverability",
    deliverabilityText:
      "Legitimate quarantine outcomes can suppress inbox placement until aligned authentication is restored across all sender streams.",

    causesTitle: "Common causes",
    causes: [
      "One or more legitimate senders still fail SPF/DKIM alignment.",
      "Quarantine policy enabled before comprehensive sender inventory cleanup.",
      "Mixed sender tools with inconsistent authentication domains.",
      "Insufficient DMARC report analysis to identify failing streams quickly."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We review DMARC policy state, identify which streams are failing under quarantine, and validate alignment readiness before stricter policy actions.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Is quarantine supposed to send mail to spam?",
        answer:
          "Yes. Quarantine asks receivers to treat DMARC-failing mail as suspicious, commonly routing it to spam."
      },
      {
        question: "Should I disable quarantine immediately?",
        answer:
          "Only if business impact is severe. Prefer fixing failing streams quickly while monitoring outcomes."
      },
      {
        question: "Can aligned DKIM reduce quarantine false positives?",
        answer:
          "Yes. Stable aligned DKIM and/or SPF significantly reduces legitimate mail being quarantined."
      }
    ],

    nextSteps: [
      "Use reports and headers to identify legitimate streams failing DMARC.",
      "Fix SPF/DKIM alignment per stream and retest outcomes.",
      "Monitor spam-folder rates as remediation progresses.",
      "Adjust policy strictness only after false-positive risk is low.",
      "Document sender onboarding rules to prevent regressions."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      { href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject", label: "DMARC policy levels explained" },
      { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
      { href: "/dmarc/dmarc-aggregate-reports-explained", label: "DMARC aggregate reports explained" }
    ]
  },

  "dmarc/sendgrid-dmarc-fail": {
    title: "SendGrid DMARC Fail (Fix DMARC Alignment Fast)",

    intro:
      "SendGrid DMARC fail means SendGrid traffic is not aligned to your visible From domain, even if SPF or DKIM passes technically. Gmail, Outlook, and Yahoo can still flag or down-rank those messages when DMARC does not align. This usually happens when SendGrid domain authentication is partial or misconfigured.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Complete SendGrid domain authentication, ensure DKIM signs with your domain, publish DMARC at _dmarc, and verify aligned SPF or DKIM pass before enforcing strict policy.",

    codeTitle: "Correct DMARC record for SendGrid rollout",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; adkim=r; aspf=r`,

    afterCodeText:
      "Monitoring first is safer for SendGrid traffic while you validate all authenticated sender paths and alignment behavior.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Email header + DNS",
    wrongExampleCode: `From: no-reply@example.com
DKIM-Signature: d=sendgrid.net; s=s1;
_dmarc.example.com TXT "v=DMARC1; p=reject;"`,
    wrongExampleText:
      "DKIM can pass technically but fail DMARC alignment if signing stays on a provider-owned domain. Strict reject policy then risks blocking legitimate SendGrid mail.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Email header + DNS",
    correctExampleCode: `From: no-reply@example.com
DKIM-Signature: d=example.com; s=s1;
_dmarc.example.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com"`,
    correctExampleText:
      "This aligns SendGrid authentication to your domain and keeps policy in monitoring mode while you confirm stable pass behavior.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC failures with SendGrid usually come from incomplete sender authentication or alignment drift between From, SPF return-path, and DKIM signing domain. DMARC requires aligned identity, not just provider-level pass signals.",

    problemTitle: "Why this is a problem",

    problemText:
      "When SendGrid traffic fails DMARC, transactional messages like password resets and receipts can be filtered aggressively. Trust degrades over time, and strict policy can reject legitimate messages if alignment remains broken.",

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "DMARC alignment is a major trust signal for high-volume SendGrid sending. Persistent failure increases spam risk, weakens spoofing protection, and can produce inconsistent enforcement outcomes across mailbox providers.",

    causesTitle: "Common causes",
    causes: [
      "SendGrid domain authentication was incomplete or misconfigured.",
      "DKIM signing domain remained provider-owned instead of aligned to your domain.",
      "SPF return-path alignment did not match the visible From identity.",
      "DMARC policy was increased before report-backed alignment verification."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We checked DMARC policy presence and whether SendGrid-originated mail can produce aligned SPF or DKIM pass outcomes for your visible From domain.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can SendGrid deliver mail while DMARC fails?",
        answer:
          "Yes. Delivery can continue with failures, but trust and inbox placement can degrade as alignment problems persist."
      },
      {
        question: "Is DKIM pass enough for SendGrid DMARC success?",
        answer:
          "Only if DKIM is aligned with the visible From domain. Pass without alignment can still fail DMARC."
      },
      {
        question: "When should I move SendGrid DMARC to reject?",
        answer:
          "After reports and headers show stable aligned authentication across all legitimate SendGrid traffic."
      }
    ],

    nextSteps: [
      "Send a live SendGrid message and inspect SPF/DKIM alignment in headers.",
      "Complete or correct SendGrid domain authentication settings.",
      "Publish/verify DMARC with p=none and reliable rua reporting.",
      "Fix failing sources identified in aggregate reports.",
      "Increase enforcement only after consistent aligned pass rates."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-alignment-failed",
        label: "DMARC alignment failed"
      },
      {
        href: "/spf/sendgrid-spf-not-working",
        label: "SendGrid SPF not working"
      },
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      }
    ]
  },

  "dmarc/mailchimp-dmarc-alignment-failed": {
    title: "Mailchimp DMARC Alignment Failed (Fix Sender Alignment)",

    intro:
      "Mailchimp DMARC alignment failed means campaign mail authenticates on a domain that does not match your visible From domain. Gmail, Outlook, and Yahoo may still classify those campaigns as risky when DMARC alignment fails. This typically occurs when Mailchimp domain authentication is only partially configured.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Finish Mailchimp domain authentication, align SPF/DKIM with your From domain, publish DMARC at _dmarc, and monitor reports before enforcing stricter policy.",

    codeTitle: "Correct DMARC record for Mailchimp rollout",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; adkim=r; aspf=r`,

    afterCodeText:
      "Use monitoring policy while verifying Mailchimp alignment on real campaigns. Increase enforcement only after clean report data.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Email header + DNS",
    wrongExampleCode: `From: newsletter@example.com
DKIM-Signature: d=mcsv.net; s=k1;
_dmarc.example.com TXT "v=DMARC1; p=quarantine;"`,
    wrongExampleText:
      "This can fail DMARC alignment because the signing domain does not align to the visible From domain. Enforcement then pushes legitimate campaign traffic toward spam handling.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Email header + DNS",
    correctExampleCode: `From: newsletter@example.com
DKIM-Signature: d=example.com; s=k1;
_dmarc.example.com TXT "v=DMARC1; p=none; rua=mailto:dmarc@example.com"`,
    correctExampleText:
      "Aligned signing with monitoring policy gives safe visibility into campaign authentication before stricter enforcement changes.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC alignment failures in Mailchimp often come from incomplete custom-domain authentication or mixed sender identities across tools. DMARC evaluates aligned identity, so non-aligned SPF/DKIM pass results are not enough.",

    problemTitle: "Why this is a problem",

    problemText:
      "Campaign messages can be treated as suspicious despite successful sending, reducing reach and engagement. If policy is strict too early, legitimate mail can be quarantined or rejected while alignment issues remain unresolved.",

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Stable DMARC alignment is critical for marketing sender reputation. Persistent Mailchimp alignment failures raise spam risk, reduce inbox placement consistency, and weaken confidence in enforcement decisions.",

    causesTitle: "Common causes",
    causes: [
      "Mailchimp domain authentication was incomplete for the sending domain.",
      "DKIM signing or SPF path did not align with the visible From domain.",
      "Multiple sending tools used different identities for the same campaigns.",
      "Policy enforcement increased before aggregate report review was complete."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We checked DMARC policy presence and whether Mailchimp campaign traffic can provide aligned SPF or DKIM results for the visible From domain.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Why does Mailchimp mail pass SPF but still fail DMARC?",
        answer:
          "Because DMARC needs alignment. SPF pass on a non-aligned domain can still fail DMARC."
      },
      {
        question: "Should I keep p=none while fixing Mailchimp alignment?",
        answer:
          "Yes. Monitoring with reports helps you fix alignment safely before quarantine/reject enforcement."
      },
      {
        question: "How do I verify Mailchimp DMARC alignment quickly?",
        answer:
          "Send a real campaign test, inspect header alignment, and review aggregate reports for repeated failing sources."
      }
    ],

    nextSteps: [
      "Send a Mailchimp test campaign and inspect SPF/DKIM alignment in headers.",
      "Complete Mailchimp authentication so identities align with From domain.",
      "Publish or correct DMARC at _dmarc with p=none and rua reporting.",
      "Fix repeated failing sources identified in reports.",
      "Increase enforcement only after sustained aligned pass behavior."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-alignment-failed",
        label: "DMARC alignment failed"
      },
      {
        href: "/spf/mailchimp-spf-not-working",
        label: "Mailchimp SPF not working"
      },
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      }
    ]
  },

  "dmarc/dmarc-generator": {
    title: "DMARC Generator (Tool to Create DMARC Record)",

    intro:
      "DMARC lets you publish a domain-level policy that tells mailbox providers what to do when SPF and DKIM do not align with the visible From domain. A clear DMARC record also enables aggregate reporting so you can see which services are sending mail on your behalf.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Use the DMARC generator on this page to choose a policy, reporting addresses, and alignment settings. Then copy the generated TXT value into DNS at the _dmarc hostname for your domain.",

    codeTitle: "Example DMARC record",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; pct=100; adkim=r; aspf=r`,

    afterCodeText:
      "This example starts with a monitoring policy and relaxed alignment. You can tighten enforcement and alignment over time as you gain confidence that all legitimate senders are authenticated correctly.",

    whyTitle: "Why this happens",

    whyText:
      "Many teams understand they need DMARC but are unsure which tags are required and which values are safe to start with. Hand-writing DMARC records increases the risk of typos or overly aggressive policies that can block legitimate mail.",

    problemTitle: "Why a missing or broken DMARC record is a problem",

    problemText:
      "Without a clean DMARC policy, mailbox providers have less guidance on how to treat spoofed or unauthenticated mail that appears to come from your domain. That can make phishing harder to detect and weaken your overall email trust profile.",

    deliverabilityTitle: "How a good DMARC policy helps deliverability",

    deliverabilityText:
      "A well-implemented DMARC record, combined with aligned SPF and DKIM, shows receivers that you actively manage abuse and authentication. Over time, this can improve inbox placement for legitimate mail while making it easier for providers to discard obvious spoofing attempts.",

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      },
      {
        href: "/dmarc/dmarc-aspf-adkim-explained",
        label: "DMARC aspf and adkim alignment"
      },
      {
        href: "/dmarc/dmarc-aggregate-reports-explained",
        label: "DMARC aggregate reports explained"
      }
    ]
  },

  "dmarc/dmarc-policy-none-vs-quarantine-vs-reject": {
    title: "DMARC Policy None vs Quarantine vs Reject (Guide)",

    intro:
      "DMARC policy controls what receivers do with messages that fail DMARC checks. In practice, p=none monitors, p=quarantine usually sends failures to spam, and p=reject asks receivers to block them. Choosing the wrong stage too early can hurt legitimate delivery at Gmail, Outlook, and Yahoo.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Start with p=none if you are still monitoring, move to p=quarantine when sender alignment looks reliable, and use p=reject when authentication is stable across all legitimate sources.",

    codeTitle: "Safe starting policy",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com`,

    afterCodeText:
      "The safest rollout pattern is none first, then quarantine, then reject. Tightening too early can break legitimate mail.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=reject; rua=mailto:dmarc@example.com`,
    wrongExampleText:
      "This can be too aggressive if you have not yet confirmed that every legitimate sender passes SPF or DKIM alignment. Real mail can be rejected before you finish the rollout.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=none; rua=mailto:dmarc@example.com`,
    correctExampleText:
      "This is the correct starting point for most domains. It gives you visibility into failures without blocking real mail, so you can move to stricter enforcement gradually.",

    whyTitle: "Why policy levels exist",

    whyText:
      "This is an enforcement decision, not just a syntax choice. DMARC policy determines how aggressively receivers act on failures, so moving too fast can impact real mail from unaligned systems. A staged rollout gives time to fix SPF/DKIM alignment before strict blocking policies take effect.",

    problemTitle: "Policy comparison",

    problemPoints: [
      "p=none monitors authentication failures but does not block mail.",
      "p=quarantine tells receivers to treat failing mail as suspicious, often routing it to spam.",
      "p=reject tells receivers not to accept failing mail at all.",
      "Moving to stricter policies too early can disrupt legitimate email."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Stronger DMARC policy improves spoofing protection and enforcement, but strict settings deployed too early can affect legitimate transactional, marketing, or support mail. The best deliverability outcome comes from tightening policy only after alignment is consistently healthy.",

    causesTitle: "Common causes",
    causes: [
      "The domain is still in a monitoring phase and not ready for strict enforcement.",
      "SPF/DKIM alignment is incomplete for one or more legitimate senders.",
      "The team is uncertain whether all sending sources are fully mapped.",
      "A gradual DMARC rollout plan is being used to avoid delivery disruption."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed the current p= value in the DMARC record and whether the chosen policy level matches the maturity of the domain's authentication setup.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Is p=reject always best?",
        answer:
          "Only when you are confident that legitimate mail is fully covered by aligned SPF or DKIM. Reject is powerful, but it can block real mail if deployed too early."
      },
      {
        question: "What does p=quarantine usually do?",
        answer:
          "It tells receivers to treat failing messages as suspicious. In practice, that often means spam-folder placement rather than full rejection."
      },
      {
        question: "How long should I stay on p=none?",
        answer:
          "Long enough to understand real traffic and confirm legitimate senders, but not forever. Once reports are clean, move gradually toward enforcement."
      }
    ],

    nextSteps: [
      "Review DMARC reports to identify all legitimate sending sources.",
      "Keep or set p=none while fixing remaining SPF/DKIM alignment gaps.",
      "Move to p=quarantine after sustained report stability.",
      "Advance to p=reject only when legitimate failures are resolved.",
      "Revalidate headers and report trends after each policy change."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/no-dmarc-record-found",
        label: "No DMARC record found"
      },
      {
        href: "/dmarc/dmarc-pct-tag-explained",
        label: "DMARC pct tag explained"
      },
      {
        href: "/dmarc/dmarc-rua-ruf-not-working",
        label: "DMARC RUA / RUF not working"
      }
    ]
  },

  "dmarc/dmarc-alignment-failed": {
    title: "DMARC Alignment Failed (Fix Email Authentication)",
    description:
      "Fix DMARC alignment failures. Step-by-step guide to align SPF and DKIM and prevent emails from failing authentication.",

    intro:
      "DMARC alignment failed means the authenticated SPF or DKIM domain does not match your visible From domain. A common case is SPF passing on a vendor MAIL FROM domain or DKIM passing on a different signing domain while DMARC still fails. That breaks identity trust for Gmail, Outlook, and Yahoo even when a raw SPF or DKIM pass appears in headers.",
    quickPoints: [
      "SPF or DKIM passes but does not align",
      "From domain differs from auth domain",
      "DMARC fails despite valid signatures",
      "Common with third-party senders"
    ],

    fixTitle: "One-Minute Fix",

    fixText:
      "Align your SPF MAIL FROM domain and/or DKIM signing domain with the visible From domain so at least one authentication path is DMARC-aligned.",

    codeTitle: "Aligned authentication example",
    codeLanguage: "Email header",
    code: `From: billing@example.com
DKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=selector1;`,

    afterCodeText:
      "If the visible From address uses example.com, a DKIM signature with d=example.com is aligned for DMARC.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "Email header",
    wrongExampleCode: `From: billing@example.com
DKIM-Signature: v=1; a=rsa-sha256; d=vendor-mail.com; s=selector1;`,
    wrongExampleText:
      "This is broken for DMARC alignment because the visible From domain is example.com, but the DKIM signing domain is vendor-mail.com. DKIM may pass, but DMARC alignment still fails.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "Email header",
    correctExampleCode: `From: billing@example.com
DKIM-Signature: v=1; a=rsa-sha256; d=example.com; s=selector1;`,
    correctExampleText:
      "This is the correct pattern. The DKIM signing domain aligns with the visible From domain, so DKIM can count toward a DMARC pass.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC checks alignment, not just individual SPF/DKIM pass results. A message can have SPF=pass or DKIM=pass and still fail DMARC if the authenticated domain is not aligned with From. In relaxed mode, subdomains can align with the parent domain; in strict mode, domains must match exactly.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "DMARC authentication fails even when SPF or DKIM may pass technically.",
      "Receivers may quarantine or reject messages under stricter policies.",
      "Inbox placement becomes less reliable.",
      "Troubleshooting gets harder because the raw authentication result can look healthy while DMARC still fails."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Alignment failure increases DMARC failure risk under monitoring and enforcement policies alike. Even when SPF or DKIM individually pass, misalignment can cause spam placement, quarantine/reject outcomes, and inconsistent deliverability decisions across providers.",

    causesTitle: "Common causes",
    causes: [
      "A vendor-owned domain is used for SPF or DKIM by default.",
      "The wrong DKIM signing domain is configured for the sender.",
      "The SPF MAIL FROM (return-path) domain is not aligned with From.",
      "Subdomain/root mismatch breaks alignment under current policy mode.",
      "Old provider configuration is still active after migration."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the SPF-authenticated domain or the DKIM d= domain aligns with the visible From domain strongly enough for DMARC to treat the message as aligned.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can DKIM pass and DMARC still fail?",
        answer:
          "Yes. DKIM pass only means the signature verified. DMARC also requires alignment between the signing domain and the visible From domain."
      },
      {
        question: "Is aligned SPF enough if DKIM is not aligned?",
        answer:
          "Yes. DMARC only needs one aligned authentication path, either SPF or DKIM. But many domains prefer to align both for resilience."
      },
      {
        question: "How do I fix this safely?",
        answer:
          "Configure your sender to authenticate with your own domain, or an aligned domain, rather than a provider-owned domain."
      }
    ],

    nextSteps: [
      "Inspect a real message and note the visible From domain.",
      "Check DKIM d= and SPF MAIL FROM domains in message headers.",
      "Update sender settings so at least one path aligns with From.",
      "Confirm DMARC alignment mode (relaxed vs strict) matches your setup.",
      "Send a fresh test and verify DMARC alignment now passes."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dkim/dkim-alignment-failed",
        label: "DKIM alignment failed"
      },
      {
        href: "/dmarc/dmarc-aspf-adkim-explained",
        label: "DMARC aspf / adkim explained"
      },
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      }
    ]
  },

  "dmarc/dmarc-rua-ruf-not-working": {
    title: "DMARC RUA/RUF Not Working (Fix DMARC Reports Fast)",

    intro:
      "DMARC reports are not arriving because the RUA or RUF reporting setup is missing, invalid, or not authorized. A common real-world case is adding a report address on another domain but never publishing external reporting authorization for that destination. In that situation, the DMARC record can look fine while reports still never show up.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Verify that rua/ruf mailto addresses are correct, the destination mailbox can receive mail, and external reporting authorization is in place when reports are sent to another domain.",

    codeTitle: "Correct DMARC reporting tags",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; ruf=mailto:dmarc@example.com`,

    afterCodeText:
      "The rua and ruf values must point to working mailboxes or reporting endpoints that can actually receive DMARC reports.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=none; rua=mailto:reports@example.com; ruf=mailto:forensics@example.com`,
    wrongExampleText:
      "This is broken if those mailboxes do not exist, reject incoming mail, or were never configured to receive DMARC reports. The syntax may look correct, but reporting still fails operationally.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; ruf=mailto:dmarc@example.com`,
    correctExampleText:
      "This is the correct pattern when the reporting mailbox exists and accepts incoming DMARC reports. The domain can now collect report data while monitoring authentication.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC reporting depends on valid destination addresses and, for external domains, proper authorization records. A DMARC policy can be syntactically valid and still produce no reports if destination mailboxes are unreachable, unauthorized, or not accepted by receiver reporting rules.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "You lose visibility into authentication failures.",
      "DMARC rollout becomes harder to monitor.",
      "Abuse patterns become harder to detect.",
      "You may think DMARC is working well when real failures are going unseen."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Mail can continue flowing even when DMARC reports are missing, but you lose visibility into spoofing and authentication problems. Without report data, it is harder to tune enforcement safely and detect abuse patterns early.",

    causesTitle: "Common causes",
    causes: [
      "A typo exists in the rua or ruf mailto address.",
      "The report mailbox exists but is not receiving mail reliably.",
      "External reporting destination authorization was not published.",
      "Teams expected forensic (ruf) reports from providers that do not send them consistently."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the DMARC record includes rua or ruf tags and whether those values appear to point to real reporting addresses using valid mailto syntax.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "What is the difference between rua and ruf?",
        answer:
          "rua is for aggregate DMARC reports, while ruf is for forensic or failure reports where providers support them."
      },
      {
        question: "Why do I get aggregate reports but not forensic reports?",
        answer:
          "Many mailbox providers either limit or do not send forensic reports at all, so missing ruf traffic is common even with correct syntax."
      },
      {
        question: "Can I send DMARC reports to a third party?",
        answer:
          "Yes, but external reporting can require additional DNS authorization depending on the destination and provider behavior."
      }
    ],

    nextSteps: [
      "Check rua/ruf syntax and confirm each mailto address is correct.",
      "Verify destination mailboxes can receive external mail and are monitored.",
      "If using a third-party domain, publish and validate external reporting authorization.",
      "Test with updated DMARC record and wait for normal reporting cycles.",
      "Review incoming aggregate data and adjust enforcement based on findings."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      },
      {
        href: "/dmarc/no-dmarc-record-found",
        label: "No DMARC record found"
      },
      {
        href: "/dmarc/dmarc-fo-tag-explained",
        label: "DMARC fo tag explained"
      }
    ]
  },

  "dmarc/dmarc-pct-tag-explained": {
    title: "DMARC pct Tag Explained (Guide to DMARC Rollout)",

    intro:
      "The DMARC pct tag controls the percentage of messages to which the published DMARC policy applies. It allows a domain to roll out quarantine or reject gradually instead of enforcing the policy across all traffic immediately.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Use pct only when you want to phase in stricter DMARC enforcement while monitoring the results carefully.",

    codeTitle: "Gradual enforcement example",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=quarantine; pct=50; rua=mailto:dmarc@example.com`,

    afterCodeText:
      "This tells receivers to apply the quarantine policy to only part of the failing mail stream, which can make rollouts safer.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=reject; pct=100; rua=mailto:dmarc@example.com`,
    wrongExampleText:
      "This is not inherently invalid, but it is a poor gradual-rollout example. If you are still learning how legitimate mail behaves, full reject at 100 percent may be too aggressive.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=quarantine; pct=50; rua=mailto:dmarc@example.com`,
    correctExampleText:
      "This is the correct gradual-enforcement pattern. It allows the domain to apply quarantine to part of the mail stream while reviewing reports and reducing rollout risk.",

    whyTitle: "Why this matters",

    whyText:
      "DMARC enforcement can be risky if legitimate senders are not fully aligned yet. The pct tag helps domains increase enforcement gradually rather than making an immediate all-or-nothing move.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Domains can enforce too aggressively before understanding legitimate traffic.",
      "Without a gradual rollout, real mail can be impacted faster.",
      "Teams may confuse policy level with rollout percentage.",
      "Poor pct use can create a false sense of control if reports are not reviewed."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Used correctly, pct can make enforcement safer by limiting the blast radius of a stricter DMARC policy. Used carelessly, it can hide unresolved alignment issues or delay full protection too long.",

    causesTitle: "Common causes",
    causes: [
      "Domains moved to quarantine or reject before auditing all senders.",
      "Teams wanted a safer rollout but did not understand the pct tag.",
      "Copied DMARC templates included pct without a clear rollout plan.",
      "Report data was not reviewed while pct-based rollout was active."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the DMARC record publishes a pct tag and whether that percentage makes sense for the current enforcement stage.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Does pct affect messages that already pass DMARC?",
        answer:
          "No. The pct tag applies to messages that fail DMARC and are subject to policy enforcement."
      },
      {
        question: "Should I use pct with p=none?",
        answer:
          "Usually no. The pct tag is most useful when you are phasing in quarantine or reject."
      },
      {
        question: "Does pct guarantee exactly that percentage everywhere?",
        answer:
          "Not necessarily. It is an instruction to receivers, and provider behavior can vary."
      }
    ],

    nextSteps: [
      "Decide whether you need gradual enforcement at all.",
      "Use p=none first if the domain is still in the monitoring stage.",
      "Set pct below 100 only when rolling out quarantine or reject cautiously.",
      "Review DMARC reports while pct is active.",
      "Increase pct gradually as legitimate failures are resolved."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      },
      {
        href: "/dmarc/dmarc-rua-ruf-not-working",
        label: "DMARC RUA / RUF not working"
      },
      {
        href: "/dmarc/no-dmarc-record-found",
        label: "No DMARC record found"
      }
    ]
  },

  "dmarc/dmarc-sp-subdomain-policy-explained": {
    title: "DMARC Subdomain Policy sp Explained (DMARC Guide)",

    intro:
      "The DMARC sp tag defines how the DMARC policy applies to subdomains. Without this tag, subdomains inherit the main DMARC policy. With sp, a domain can apply one enforcement level to the parent domain and a different level to subdomains.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Use the sp tag when you want subdomains to follow a different DMARC enforcement policy than the main domain.",

    codeTitle: "DMARC subdomain policy example",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=quarantine; sp=reject; rua=mailto:dmarc@example.com`,

    afterCodeText:
      "In this example, the main domain uses quarantine, while subdomains are instructed to use reject.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com`,
    wrongExampleText:
      "This is not invalid, but it does not define a separate subdomain policy. If you wanted subdomains to be treated differently, this record does not do that.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=quarantine; sp=reject; rua=mailto:dmarc@example.com`,
    correctExampleText:
      "This is the correct pattern when you want a distinct subdomain policy. Subdomains can now be enforced more strictly than the parent domain.",

    whyTitle: "Why this matters",

    whyText:
      "Many organizations use subdomains for marketing, support, product notifications, or delegated senders. Those traffic types may need different enforcement timing or policy strength than the main brand domain.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Subdomains may inherit the wrong enforcement level.",
      "Marketing or delegated senders can behave differently from the primary domain.",
      "Lack of a subdomain policy can delay stronger protection where it is needed.",
      "Teams may assume subdomains are handled separately when they are not."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Subdomain policy matters when different mail streams have different readiness for enforcement. A thoughtful sp strategy helps protect the brand without forcing every subdomain into the same rollout path.",

    causesTitle: "Common causes",
    causes: [
      "Teams assumed subdomains were automatically treated differently.",
      "Marketing and product mail used separate subdomains with different maturity levels.",
      "Delegated sending domains needed stricter or looser enforcement than the parent domain.",
      "The sp tag was never added during DMARC rollout."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the DMARC record includes an sp tag and whether the published subdomain policy matches the domain's intended enforcement strategy.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Do subdomains inherit the main DMARC policy by default?",
        answer:
          "Yes. Without sp, subdomains inherit the main DMARC policy."
      },
      {
        question: "Should sp always match p?",
        answer:
          "Not necessarily. Some domains intentionally use a different policy for subdomains."
      },
      {
        question: "Can I make subdomains stricter than the main domain?",
        answer:
          "Yes. That is a common use case for the sp tag."
      }
    ],

    nextSteps: [
      "Decide whether your subdomains need a separate enforcement level.",
      "Add an sp tag only if a different subdomain policy is truly needed.",
      "Review which subdomains actually send mail.",
      "Monitor DMARC reports for parent and subdomain traffic separately.",
      "Re-run the check after publishing the updated record."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      },
      {
        href: "/dmarc/dmarc-pct-tag-explained",
        label: "DMARC pct tag explained"
      },
      {
        href: "/dmarc/no-dmarc-record-found",
        label: "No DMARC record found"
      }
    ]
  },

  "dmarc/dmarc-fo-tag-explained": {
    title: "DMARC fo Tag Explained (Guide to Failure Reports)",

    intro:
      "The DMARC fo tag controls forensic reporting behavior where providers support it. It tells receivers under which failure conditions they may generate failure or forensic reports. Different fo values adjust how strict or broad that reporting trigger is.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Use the fo tag only if you understand how forensic reporting works and you have a valid reporting address configured to receive those reports.",

    codeTitle: "Forensic reporting example",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; fo=1; rua=mailto:dmarc@example.com; ruf=mailto:dmarc@example.com`,

    afterCodeText:
      "The fo=1 setting requests a forensic report when either SPF or DKIM produces a failure relevant to DMARC, where providers support that behavior.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=none; fo=1; ruf=mailto:missing@example.com`,
    wrongExampleText:
      "This is broken operationally if the ruf mailbox does not exist or cannot receive reports. The tag may be syntactically valid, but reporting still will not work as intended.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=none; fo=1; rua=mailto:dmarc@example.com; ruf=mailto:dmarc@example.com`,
    correctExampleText:
      "This is the correct pattern when you want forensic reporting and you have a valid ruf destination that can receive reports.",

    whyTitle: "Why this matters",

    whyText:
      "The fo tag controls when forensic reports may be generated, but provider support for these reports is inconsistent. Domains that add fo without understanding ruf, reporting volume, or provider behavior often expect data that never arrives.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Teams may expect forensic data that many providers never send.",
      "An invalid ruf destination makes the setting operationally useless.",
      "Forensic reporting can generate noise if not planned properly.",
      "Misunderstanding fo can make DMARC reporting strategy harder to manage."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "The fo tag does not usually affect inbox placement directly, but it affects your visibility into failures. A correct forensic reporting setup can help investigations, while a misunderstood one creates confusion and false expectations.",

    causesTitle: "Common causes",
    causes: [
      "The fo tag was copied from a template without understanding it.",
      "The ruf mailbox was never configured.",
      "Teams expected all providers to send forensic reports.",
      "Reporting strategy was designed without considering report volume or privacy constraints."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the DMARC record includes an fo tag and whether the surrounding reporting configuration appears consistent with forensic reporting use.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "What does fo=1 do?",
        answer:
          "It requests a forensic report when either SPF or DKIM produces a failure condition relevant to DMARC, where the receiver supports that reporting behavior."
      },
      {
        question: "Will all providers send forensic reports?",
        answer:
          "No. Provider support for forensic reporting is inconsistent, and many major providers send few or no ruf reports."
      },
      {
        question: "Do I need ruf if I use fo?",
        answer:
          "Yes. Without a valid ruf destination, the fo setting has nowhere useful to send forensic reports."
      }
    ],

    nextSteps: [
      "Decide whether you actually need forensic reports.",
      "Make sure the ruf mailbox exists and accepts incoming mail.",
      "Use fo only with a reporting strategy you understand.",
      "Do not assume all providers will send ruf reports.",
      "Re-run the check after updating the record."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-rua-ruf-not-working",
        label: "DMARC RUA / RUF not working"
      },
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      },
      {
        href: "/dmarc/no-dmarc-record-found",
        label: "No DMARC record found"
      }
    ]
  },

  "dmarc/dmarc-aspf-adkim-explained": {
    title: "DMARC aspf and adkim Explained (Alignment Guide)",

    intro:
      "The DMARC aspf and adkim tags control how strictly DMARC evaluates alignment between authentication domains and the visible From domain. The aspf tag applies to SPF alignment, while the adkim tag applies to DKIM alignment. In relaxed mode, subdomains can still align. In strict mode, the authenticated domain must match the From domain exactly.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Use relaxed alignment for most setups unless you specifically need exact-domain matching across all mail flows.",

    codeTitle: "Typical relaxed alignment setup",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; aspf=r; adkim=r; rua=mailto:dmarc@example.com`,

    afterCodeText:
      "Relaxed alignment is the safer default for most domains because it allows subdomains and third-party senders to align more easily while you monitor reports.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=reject; aspf=s; adkim=s; rua=mailto:dmarc@example.com`,
    wrongExampleText:
      "This can be too strict for many real-world setups. If your approved senders authenticate using subdomains or separate aligned domains, strict alignment may cause legitimate mail to fail DMARC unexpectedly.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=none; aspf=r; adkim=r; rua=mailto:dmarc@example.com`,
    correctExampleText:
      "This is the correct starting point for most domains. Relaxed alignment makes it easier to keep legitimate mail aligned while you audit real traffic and prepare stricter enforcement later if needed.",

    whyTitle: "Why this matters",

    whyText:
      "Alignment settings directly affect whether SPF and DKIM results are counted as valid for DMARC. A domain can have SPF pass or DKIM pass technically, but DMARC can still fail if the authenticated domain does not align with the visible From domain according to the published alignment mode.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Strict alignment can make legitimate mail fail DMARC unexpectedly.",
      "Third-party senders often authenticate with subdomains or custom sending domains.",
      "Misunderstanding aspf and adkim can break otherwise valid mail flows.",
      "Overly strict alignment can reduce deliverability before monitoring is complete."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Mailbox providers evaluate whether SPF or DKIM aligns with the visible From domain. If you publish overly strict alignment settings before confirming how your mail actually authenticates, legitimate mail may fail DMARC and lose inbox placement.",

    causesTitle: "Common causes",
    causes: [
      "Strict alignment was enabled before real mail flows were audited.",
      "Third-party senders use subdomains or custom DKIM signing domains.",
      "Teams assume SPF pass or DKIM pass automatically means DMARC pass.",
      "A copied DMARC template used strict settings without testing."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We reviewed whether the DMARC record publishes aspf and adkim tags, and whether the chosen alignment mode matches the way your real mail authenticates.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "What does aspf control?",
        answer:
          "The aspf tag controls SPF alignment under DMARC. It decides how closely the SPF-authenticated domain must match the visible From domain."
      },
      {
        question: "What does adkim control?",
        answer:
          "The adkim tag controls DKIM alignment under DMARC. It decides how closely the DKIM signing domain must match the visible From domain."
      },
      {
        question: "Should I use strict alignment?",
        answer:
          "Only if you have already confirmed that all legitimate senders authenticate with the exact domains required. For most domains, relaxed alignment is the safer starting point."
      }
    ],

    nextSteps: [
      "Check whether your current DMARC record includes aspf and adkim.",
      "Review how SPF and DKIM authenticate for each legitimate sender.",
      "Use relaxed alignment while monitoring reports unless strict matching is truly required.",
      "Send test mail from all major providers and inspect DMARC alignment results.",
      "Tighten alignment only after confirming no legitimate traffic will break."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/dmarc-alignment-failed",
        label: "DMARC alignment failed"
      },
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      },
      {
        href: "/dmarc/dmarc-sp-subdomain-policy-explained",
        label: "DMARC subdomain policy explained"
      }
    ]
  },

  "dmarc/multiple-dmarc-records-found": {
    title: "Multiple DMARC Records Found (Fix This Issue Fast)",
    description:
      "Fix multiple DMARC records fast. Learn how to keep a single valid policy and avoid email authentication errors.",

    intro:
      "Your domain has more than one DMARC record published, which breaks DMARC evaluation. A common real-world case is leaving an old monitoring record in place after adding a newer quarantine or reject policy. When multiple policies exist at _dmarc, receivers cannot reliably apply one authoritative rule.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Keep only one valid DMARC TXT record at _dmarc and merge all required tags (policy, reporting, options) into that single record.",

    codeTitle: "Correct DMARC policy",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com`,

    afterCodeText:
      "A domain must publish one DMARC policy, not several competing ones.",

    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=none; rua=mailto:dmarc@example.com
v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com`,
    wrongExampleText:
      "This is broken because the domain publishes two separate DMARC policies at the same hostname. Receivers cannot reliably determine which policy should apply.",

    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=quarantine; rua=mailto:dmarc@example.com`,
    correctExampleText:
      "This is the correct pattern. The domain publishes one clear DMARC policy, so receivers can evaluate and enforce it correctly.",

    whyTitle: "Why this happens",

    whyText:
      "DMARC expects one policy record per domain at the _dmarc hostname. Multiple records create ambiguity because receivers cannot know which policy should win. That ambiguity makes DMARC handling inconsistent or invalid across mailbox providers.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "DMARC validation fails or becomes ambiguous.",
      "Receivers cannot determine which policy to apply.",
      "Anti-spoofing enforcement becomes unreliable.",
      "Troubleshooting becomes harder because the record exists but is still broken."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "When DMARC evaluation is broken by multiple records, spoofing protection becomes weaker and policy enforcement is less reliable. Different receivers may handle the conflict differently, causing inconsistent filtering and trust outcomes for your domain.",

    causesTitle: "Common causes",
    causes: [
      "A second DMARC record was added during a policy change.",
      "DNS migration preserved an old DMARC record alongside a new one.",
      "Different admins or tools created overlapping DMARC records.",
      "Monitoring and enforcement policies were published separately by mistake."
    ],

    checkedTitle: "What we checked",
    checkedText:
      "We searched for multiple TXT records beginning with v=DMARC1 under the _dmarc hostname. If more than one exists, DMARC evaluation becomes invalid or ambiguous.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "Can I have two DMARC records during migration?",
        answer:
          "No. Even during migration, the domain should publish one final DMARC policy under _dmarc."
      },
      {
        question: "What if the two records are similar?",
        answer:
          "That still creates ambiguity. DMARC expects a single authoritative policy record."
      },
      {
        question: "How do I fix this safely?",
        answer:
          "Identify the record you actually want to keep, merge any needed tags into one final policy, and remove the duplicate."
      }
    ],

    nextSteps: [
      "List every TXT record currently published at _dmarc.",
      "Choose the single DMARC policy that should remain active.",
      "Merge needed tags from duplicates into one final record.",
      "Remove all extra DMARC records and keep only one.",
      "Re-test after propagation to confirm one valid DMARC policy is visible."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      {
        href: "/dmarc/no-dmarc-record-found",
        label: "No DMARC record found"
      },
      {
        href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
        label: "DMARC policy levels explained"
      },
      {
        href: "/dmarc/dmarc-rua-ruf-not-working",
        label: "DMARC RUA / RUF not working"
      }
    ]
  },

  "dmarc/dmarc-record-example": {
    title: "DMARC Record Example (Guide to Valid DMARC Setup)",

    intro:
      "DMARC records are TXT records published at _dmarc.yourdomain.com. They define the policy (p=none, quarantine, or reject), reporting addresses (rua, ruf), and optional tags such as pct and fo. This page shows correct examples for monitoring, gradual enforcement, and full reject, with realistic rua and ruf values.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Start with p=none and a valid rua address. Once you have visibility, move to pct=10 for sampling, then increase enforcement. Use the examples below as templates and replace the mailto address with your own.",

    codeTitle: "Monitoring policy (safe start)",
    codeLanguage: "DNS TXT",
    code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; ruf=mailto:dmarc@example.com; fo=1`,

    afterCodeText:
      "p=none collects data without blocking. rua receives aggregate reports; ruf receives forensic reports when fo=1 triggers them. Replace dmarc@example.com with your reporting mailbox.",

    wrongExampleTitle: "Invalid or incomplete record",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=reject`,
    wrongExampleText:
      "Jumping straight to p=reject without rua means you get no visibility and may block legitimate mail before you finish auditing senders. Add rua and start with p=none.",

    correctExampleTitle: "Enforcement with sampling",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@example.com`,
    correctExampleText:
      "pct=25 applies quarantine to 25% of failing mail first. Use this during rollout to reduce risk. Increase pct or move to p=reject once you are confident.",

    whyTitle: "Why examples help",

    whyText:
      "Teams often omit rua, use invalid mailto syntax, or move to reject too quickly. Working examples show the right tag order and values for each rollout stage.",

    problemTitle: "Why incorrect examples cause problems",

    problemPoints: [
      "Missing rua means no aggregate reports for visibility.",
      "Invalid mailto syntax can break report delivery.",
      "p=reject without prior monitoring risks blocking real mail.",
      "Wrong tag order or typos can invalidate the record."
    ],

    deliverabilityTitle: "How correct DMARC records affect deliverability",

    deliverabilityText:
      "A staged rollout with valid reporting lets you fix alignment issues before enforcement blocks mail. Correct tag syntax ensures reports arrive and you can make informed policy decisions.",

    causesTitle: "Common record mistakes",

    causes: [
      "Copying p=reject before auditing all senders.",
      "Omitting rua or using an invalid mailto address.",
      "Typos in tag names (e.g. ruo instead of rua).",
      "Using pct=0 or omitting pct when sampling is intended."
    ],

    checkedTitle: "What we checked",

    checkedText:
      "We validate DMARC record structure: required tags, valid mailto URIs, and sensible policy values. We flag records that may block mail prematurely.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "What is the difference between rua and ruf?",
        answer:
          "rua receives aggregate reports (daily summaries). ruf receives forensic reports (per-message) when fo=1 triggers them. Both use mailto: addresses."
      },
      {
        question: "Can I use multiple rua addresses?",
        answer:
          "Yes. Separate them with commas: rua=mailto:a@example.com,mailto:b@example.com. Each recipient gets a copy of the aggregate report."
      },
      {
        question: "When should I use pct?",
        answer:
          "Use pct during rollout to apply quarantine or reject to a percentage of failing mail first. Increase gradually to 100."
      }
    ],

    nextSteps: [
      "Publish a p=none record with rua first.",
      "Review aggregate reports for a few weeks.",
      "Add pct when moving to quarantine or reject.",
      "Replace the mailto address with your real mailbox.",
      "Re-check after policy changes."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      { href: "/dmarc/no-dmarc-record-found", label: "No DMARC record found" },
      { href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject", label: "DMARC policy levels" },
      { href: "/dmarc/dmarc-aggregate-reports-explained", label: "DMARC aggregate reports explained" }
    ]
  },

  "dmarc/dmarc-aggregate-reports-explained": {
    title: "DMARC Aggregate Reports Explained (Guide to Read RUA)",

    intro:
      "DMARC aggregate reports are XML summaries sent by receivers to show how your domain is being authenticated. They help you spot spoofing sources and identify legitimate senders that are failing SPF, DKIM, or alignment. This visibility is critical before raising DMARC enforcement.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish a valid rua=mailto: destination in your DMARC record and review incoming reports regularly with a parser or dashboard so issues are acted on quickly.",

    codeTitle: "Report structure overview",
    codeLanguage: "Plain text",
    code: `feedback
report_metadata (reporter, date range)
policy_published (domain, p=, sp=)
record (source_ip, count, disposition, dkim/spf results)`,

    afterCodeText:
      "Each record describes a source IP, how many messages, and whether they passed or failed SPF and DKIM. Use this to find senders that need alignment fixes.",

    wrongExampleTitle: "Ignoring report data",
    wrongExampleLanguage: "Plain text",
    wrongExampleCode: `Moving to p=reject without reviewing rua reports`,
    wrongExampleText:
      "If you never review aggregate reports, you do not know which senders are failing. Tightening policy blindly can block legitimate traffic from undiscovered systems.",

    correctExampleTitle: "Using reports for rollout",
    correctExampleLanguage: "Plain text",
    correctExampleCode: `1. Collect reports on p=none
2. Identify failing sources
3. Fix SPF/DKIM for those senders
4. Move to pct=10, then 100`,
    correctExampleText:
      "Reports tell you which IPs and domains fail. Fix them first, then increase enforcement. This reduces the risk of blocking real mail.",

    whyTitle: "Why aggregate reports matter",

    whyText:
      "Aggregate reports are visibility tools, not enforcement by themselves. They show how receivers evaluate your traffic so you can troubleshoot sender alignment and plan safer DMARC rollout stages. A policy can exist without useful insight if reports are missing or ignored.",

    problemTitle: "Why missing or unused reports cause problems",

    problemPoints: [
      "No rua means no visibility into authentication failures.",
      "Ignoring reports leads to blind policy changes.",
      "Invalid mailto address means reports never arrive.",
      "Moving to reject without report data risks blocking legitimate mail."
    ],

    deliverabilityTitle: "How reports support deliverability",

    deliverabilityText:
      "Report data helps catch authentication and alignment issues before they harm inbox placement or stricter DMARC enforcement outcomes. Without that visibility, domains often discover misconfigured senders only after delivery impact appears.",

    causesTitle: "Common report issues",

    causes: [
      "The DMARC record is missing a rua destination.",
      "The report destination mailbox is not monitored or not receiving mail.",
      "Teams receive reports but do not parse XML into actionable data.",
      "Policy enforcement was increased before reports were reviewed."
    ],

    checkedTitle: "What we checked",

    checkedText:
      "We verify that the DMARC record includes a valid rua tag. We do not parse or store report content; we only confirm the reporting configuration.",

    faqTitle: "FAQ",
    faq: [
      {
        question: "How often are aggregate reports sent?",
        answer:
          "Receivers decide. Most send daily. The report_metadata includes the date range. Reports may be batched or delayed."
      },
      {
        question: "What format are the reports?",
        answer:
          "XML, often gzip-compressed. Many tools parse them. Look for record elements with policy_evaluated (disposition, dkim, spf results)."
      },
      {
        question: "Do all receivers send reports?",
        answer:
          "No. Only receivers that support DMARC reporting will send. Major providers like Gmail and Microsoft do; some smaller ones do not."
      }
    ],

    nextSteps: [
      "Publish or confirm a valid rua=mailto address in your DMARC record.",
      "Verify the destination mailbox receives and retains report emails.",
      "Feed XML reports into a parser or dashboard for daily review.",
      "Investigate failing sources and fix SPF/DKIM/alignment gaps.",
      "Use trend data to guide staged policy enforcement changes."
    ],

    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },

    related: [
      { href: "/dmarc/dmarc-rua-ruf-not-working", label: "DMARC reports not working" },
      { href: "/dmarc/dmarc-record-example", label: "DMARC record examples" },
      { href: "/dmarc/dmarc-fo-tag-explained", label: "DMARC fo tag explained" }
    ]
  },

  "dmarc/dmarc-record-invalid": {
    title: "DMARC Record Invalid (Syntax and Tag Structure Errors)",
    description:
      "Repair malformed DMARC TXT: stray spaces, missing semicolons, duplicate tags, and illegal p= values that make the policy unusable.",
    intro:
      "DMARC lives in `_dmarc.domain` as a TXT record beginning with `v=DMARC1`. Everything after that is a `tag=value` grammar separated by semicolons. A single illegal character—like a Unicode semicolon, duplicated `p=` keys, or `sp=quarantine` misspelled—forces parsers to reject the entire record. Unlike SPF, there is no partial credit: receivers either consume a coherent policy or behave as if DMARC were missing or malformed depending on their implementation. Mixed-case tag names, line-wrapped TXT outside proper quoted spans, and accidental SPF records pasted into `_dmarc` are common sources of silent failure during migrations.",
    quickPoints: [
      "Only one DMARC TXT should answer for the organisational domain.",
      "Tags are `alpha=value` pairs; whitespace around `=` breaks strict parsers.",
      "Aggregate tags like `rua=` accept comma-separated mailto URIs—not spaces between addresses.",
      "Unknown experimental tags must still follow `token=value` format or be omitted."
    ],
    fixTitle: "One-Minute Fix",
    fixText:
      "Rebuild the record from a known-good template: `v=DMARC1; p=…; rua=mailto:…`, ensure every tag ends with `;` except optionally the last, remove duplicate tag names, and publish a single TXT at `_dmarc.example.com` without mixing unrelated SPF content.",
    codeTitle: "Minimal valid skeleton",
    codeLanguage: "DNS TXT",
    code: `_dmarc.example.com TXT \"v=DMARC1; p=none; rua=mailto:dmarc@example.com\"`,
    afterCodeText:
      "Validate with an RFC-aware checker; eyeballing in the registrar preview misses invisible Unicode.",
    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `_dmarc.example.com TXT v=DMARC1 p=none rua=mailto:reports@example.com`,
    wrongExampleText:
      "Missing semicolons between tags breaks tokenisation completely—even though humans read it fine.",
    correctExampleTitle: "Correct setup",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `_dmarc.example.com TXT \"v=DMARC1; p=none; rua=mailto:reports@example.com;\"`,
    correctExampleText:
      "Semicolons separate tags; trailing semicolon optional but including it avoids editor mistakes.",
    whyTitle: "Why invalid DMARC slips in",
    whyText:
      "Teams copy examples from blogs with soft spaces, or merge two policies during a hurried merger Friday. Some DNS UIs also auto-insert line breaks that must be recombined into valid TXT strings.",
    problemTitle: "Impact of an invalid record",
    problemPoints: [
      "Receivers cannot apply requested disposition, undermining spoofing strategy.",
      "Monitoring endpoints never receive `rua` because policy never parsed.",
      "Forensic tooling shows conflicting ‘present’ vs ‘usable’ states.",
      "Compliance audits flag missing effective DMARC even though DNS ‘has something’."
    ],
    deliverabilityTitle: "Deliverability angle",
    deliverabilityText:
      "Invalid DMARC erodes enforcement signals—messages fall back to provider heuristics, making outcomes less predictable than a deliberate `p=none` baseline.",
    causesTitle: "Common causes",
    causes: [
      "Accidental SPF record placed at `_dmarc`.",
      "Duplicate `v=DMARC1;` blocks concatenated into one TXT set incorrectly.",
      "Mixing Google/Microsoft template fragments without merging tags.",
      "Using commas inside `p=` where only `none|quarantine|reject` are legal."
    ],
    checkedTitle: "What we checked",
    checkedText:
      "We fetch `_dmarc` TXT and evaluate structural validity before semantic policy analysis. Syntax errors preempt interpretation of enforcement or reporting directives.",
    faqTitle: "FAQ",
    faq: [
      {
        question: "Does BOM at the start matter?",
        answer:
          "Invisible byte-order marks count as bad leading characters. Strip them if copy/paste introduced them."
      },
      {
        question: "Can comments exist inside DMARC TXT?",
        answer:
          "No—unlike SPF, DMARC has no comment syntax. Remove parenthetical notes."
      },
      {
        question: "What if I need many RUA endpoints?",
        answer:
          "Use comma-separated mailto URIs without spaces; verify each mailbox accepts reports."
      }
    ],
    nextSteps: [
      "Back up existing TXT then delete conflicting duplicates.",
      "Paste policy into a plain-text validator before publish.",
      "Republish a single coherent record.",
      "Query DNS globally to confirm one authoritative answer.",
      "Run aggregate report arrival checks after syntax passes."
    ],
    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },
    related: [
      { href: "/dmarc/multiple-dmarc-records-found", label: "Multiple DMARC records found" },
      { href: "/dmarc/dmarc-record-example", label: "DMARC record examples" },
      { href: "/dmarc/no-dmarc-record-found", label: "No DMARC record found" }
    ]
  },

  "dmarc/dmarc-missing-rua": {
    title: "DMARC Missing rua (No Aggregate Reporting Endpoint)",
    description:
      "Add `rua=` so DMARC delivers data even under relaxed policy—without reports you cannot prove enforcement readiness.",
    intro:
      "A `p=none` policy without `rua` still allows mail to flow, but you lose the telemetry that justifies ever moving to `quarantine` or `reject`. Many organisations publish stripped-down records copied from marketing blog snippets that mention only `p=`. Others fear mailbox overflow and omit reporting entirely—only to discover later that ISP dashboards lack DMARC insight. Regulated environments also struggle to demonstrate due diligence without stored aggregate files. The mailbox does not need to choke: use a dedicated inbox or third-party parser address, scope sampling with `pct` later, but never run blind.",
    quickPoints: [
      "Aggregate reports (`rua`) are XML digests—not message contents.",
      "You can specify multiple `mailto:` URIs for redundancy.",
      "Reports arrive from external addresses; whitelist `*@dmarc.yahoo.com` style senders per provider docs.",
      "Skipping `rua` does not reduce spam; it hides abuse until customers complain."
    ],
    fixTitle: "One-Minute Fix",
    fixText:
      "Append `rua=mailto:dmarc@yourdomain` with a deliverable mailbox, publish, then open `_dmarc` TXT at `_dmarc.yourdomain` to confirm the tag appears exactly once alongside your existing policy flags.",
    codeTitle: "Baseline monitoring policy",
    codeLanguage: "DNS TXT",
    code: `_dmarc.example.com TXT \"v=DMARC1; p=none; rua=mailto:dmarc-reports@example.com; fo=1\"`,
    afterCodeText:
      "Add `fo=1` only if you understand forensic volume trade-offs; skip it if you only need aggregate first.",
    wrongExampleTitle: "Wrong setup",
    wrongExampleLanguage: "DNS TXT",
    wrongExampleCode: `v=DMARC1; p=reject`,
    wrongExampleText:
      "Strict disposition without reporting blinds you to collateral damage and legitimate sources failing alignment.",
    correctExampleTitle: "Correct monitoring-first posture",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `v=DMARC1; p=none; rua=mailto:reports@example.com; adkim=r; aspf=r`,
    correctExampleText:
      "Reporting while monitoring ensures you gather evidence before tightening policy.",
    whyTitle: "Why teams skip rua",
    whyText:
      "Mailbox storage fears, privacy reviews, or ignorance of aggregate XML size dominate. Yet modern ESPs compress reports and many vendors offer free ingestion endpoints.",
    problemTitle: "What you lose without rua",
    problemPoints: [
      "No time-series view of SPF/DKIM pass rates by source IP.",
      "Harder phishing investigations lacking centralised evidence.",
      "Executive stakeholders see opinion, not metrics.",
      "Delayed detection of shadow SaaS senders spoofing your domain."
    ],
    deliverabilityTitle: "Deliverability angle",
    deliverabilityText:
      "Even perfect inbox placement needs longitudinal data; missing `rua` prevents tuning DKIM selectors and SPF includes before they become crises.",
    causesTitle: "Common causes",
    causes: [
      "Copy/paste templates omitting `rua` entirely.",
      "Accidental removal during compressing TXT to fit registrar UI limits.",
      "Fear of GDPR without anonymising parsers.",
      "Belief that `p=none` alone satisfies compliance checklists."
    ],
    checkedTitle: "What we checked",
    checkedText:
      "We look for a parsable DMARC TXT and note whether reporting tags are present. Absent `rua` triggers operational guidance even when enforcement tags parse correctly.",
    faqTitle: "FAQ",
    faq: [
      {
        question: "Can rua point off-domain?",
        answer:
          "Yes, but DMARC expects mailbox confirmation via DNS if you use third-party addresses—follow their onboarding wizard."
      },
      {
        question: "How large are files?",
        answer:
          "Varies by sender volume; enterprise domains can see multiple daily messages, but compression keeps most mailboxes manageable."
      },
      {
        question: "Is ruf mandatory too?",
        answer:
          "No—forensic reports are optional and noisy; start with aggregate (`rua`)."
      }
    ],
    nextSteps: [
      "Create a dedicated mailbox or vendor ingestion alias.",
      "Publish `rua` and verify arrival within 24–72 hours.",
      "Parse XML into dashboards or spreadsheets.",
      "Identify misaligned sources before moving `p=` tighter.",
      "Only then schedule enforcement changes with stakeholders."
    ],
    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },
    related: [
      { href: "/dmarc/dmarc-rua-ruf-not-working", label: "DMARC reports not working" },
      { href: "/dmarc/dmarc-aggregate-reports-explained", label: "DMARC aggregate reports explained" },
      { href: "/dmarc/dmarc-record-example", label: "DMARC record examples" }
    ]
  },

  "dmarc/dmarc-subdomain-policy-not-working": {
    title: "DMARC Subdomain Policy Not Working (When sp= Ignores Expectations)",
    description:
      "Understand how `sp=` changes subdomain enforcement versus organisational policy—and why Header From alignment still decides outcomes.",
    intro:
      "The `sp=` tag sets a default policy for subdomains of the DMARC record owner when no separate DMARC record exists on each child host. It does not override organisational domain alignment magically: mail from `news.brand.com` must still align through SPF or DKIM to the domain shown in the From header. Teams expect `sp=reject` at `_dmarc.brand.com` to block all child-domain spoofing instantly, yet messages can still pass DMARC when a phisher uses `From: phish@brand.com` with misaligned authentication—because `sp` never triggers. Another confusion: publishing DMARC on `sub.brand.com` with its own tags while forgetting apex `sp`, yielding asymmetric enforcement that looks ‘broken’ during testing.",
    quickPoints: [
      "`sp` applies when mail uses subdomains of the organisational domain—check which domain is the DMARC authority.",
      "Subdomains can publish independent `_dmarc` records that supersede inherited `sp`.",
      "Alignment uses authenticated domains, not arbitrary substrings in display names.",
      "Testing with the wrong From domain makes `sp` look inert."
    ],
    fixTitle: "One-Minute Fix",
    fixText:
      "Inventory which domain appears in From, publish DMARC at the matching organisational boundary, set `sp` intentionally, and add dedicated `_dmarc` children only when a subdomain needs divergent policy. Validate with aggregate reports filtered by `header_from` and `policy_evaluated`.",
    codeTitle: "Apex policy with subdomain override",
    codeLanguage: "DNS TXT",
    code: `_dmarc.brand.com TXT \"v=DMARC1; p=reject; sp=quarantine; rua=mailto:dmarc@brand.com\"`,
    afterCodeText:
      "`sp` governs unprotected subdomains lacking their own DMARC while `p` governs the organisational domain presence.",
    wrongExampleTitle: "Mis-set expectations",
    wrongExampleLanguage: "Plain text",
    wrongExampleCode: `Expect sp=reject to stop brand.com spoofing`,
    wrongExampleText:
      "Organizational domain spoofing is controlled by `p` and alignment—not by `sp` alone.",
    correctExampleTitle: "Targeted child policy",
    correctExampleLanguage: "DNS TXT",
    correctExampleCode: `_dmarc.mail.brand.com TXT \"v=DMARC1; p=none; rua=mailto:subs@brand.com\"`,
    correctExampleText:
      "Explicit child `_dmarc` records let newsletters operate under different enforcement while keeping apex strict.",
    whyTitle: "Why sp= surprises teams",
    whyText:
      "DMARC’s inheritance rules are subtle; documentation often compresses them into a single bullet. Product managers then simulate attacks using the wrong From domain and declare DMARC defective.",
    problemTitle: "Operational misunderstandings",
    problemPoints: [
      "False confidence that marketing subdomains inherit apex `p=reject` without alignment checks.",
      "Legitimate mail from regional subdomains suddenly quarantined after tightening `sp`.",
      "Duplicate `_dmarc` records causing parse ambiguity at children.",
      "Vendor mails using bounce subdomains not aligned with expectation."
    ],
    deliverabilityTitle: "Deliverability angle",
    deliverabilityText:
      "When `sp` tightens before sources authenticate subdomains, DMARC ‘fails’ legitimate campaigns—better described as intended enforcement, not DNS breakage.",
    causesTitle: "Common causes",
    causes: [
      "No child `_dmarc` for high-volume marketing hostnames.",
      "Confusing organisational vs subdomain boundaries in multi-brand holding companies.",
      "Assuming `sp` changes alignment mode—it does not; `aspf`/`adkim` do.",
      "Testing DMARC from tools that do not show policy_applied versus evaluated."
    ],
    checkedTitle: "What we checked",
    checkedText:
      "We validate the organisational `_dmarc` TXT and interpret `sp` relative to your declared From domains. Cross-domain tests require distinct checks per sending pattern.",
    faqTitle: "FAQ",
    faq: [
      {
        question: "Should sp equal p eventually?",
        answer:
          "Often, yet marketing ecosystems may warrant softer `sp` while apex stays reject—decide via reports."
      },
      {
        question: "Does CNAME flattening affect _dmarc?",
        answer:
          "If `_dmarc` is CNAMEd improperly, you might read someone else’s policy—verify authoritative answers."
      },
      {
        question: "What about internationalised domains?",
        answer:
          "Use punycode consistently when publishing DMARC; alignment follows IDNA rules per receiver."
      }
    ],
    nextSteps: [
      "Map each sending service to its From domain and subdomain usage.",
      "Publish explicit `_dmarc` rows for exceptions.",
      "Tune `sp` only after `rua` confirms impact.",
      "Communicate changes to marketing partners with example Authentication-Results.",
      "Revisit after acquisitions merge DNS zones."
    ],
    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },
    related: [
      { href: "/dmarc/dmarc-sp-subdomain-policy-explained", label: "DMARC sp subdomain policy explained" },
      { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
      { href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject", label: "DMARC policy none vs quarantine vs reject" }
    ]
  },

  "dmarc/dmarc-spf-dkim-both-fail": {
    title: "DMARC When SPF and DKIM Both Fail (Total Authentication Loss)",
    description:
      "Diagnose combined SPF and DKIM failures: misaligned domains, broken records, and why DMARC cannot salvage mail without one passing identifier.",
    intro:
      "DMARC passes only when at least one authenticated identifier aligns with the Header From domain *and* passes. When SPF yields fail or permerror and DKIM verification fails in the same delivery attempt, DMARC has nothing positive to reuse—policy evaluation sees only negative signals. This is common during migrations where DKIM keys moved but SPF still lists retired relays, or when forwarding breaks DKIM while SPF passes for the forwarder’s domain (both misaligned). Understanding whether both mechanisms truly failed versus merely misaligned guides remediation: alignment issues may need DNS tweaks, while double failure often signals infrastructure outage or outright spoofing attempts.",
    quickPoints: [
      "SPF alignment compares the SPF-authenticated domain to the RFC5322 From domain.",
      "DKIM alignment compares the `d=` domain (with relaxed modes) to the From domain.",
      "Both can be cryptographically ‘fine’ yet fail DMARC if domains differ under strict mode.",
      "`p=none` still reports the double-fail fact pattern for monitoring."
    ],
    fixTitle: "One-Minute Fix",
    fixText:
      "Prioritise restoring *one* strong path—usually DKIM for third-party ESPs—so at least one aligned pass exists, then circle back to SPF includes for your primary MTA. Parallel fixes prevent thrash when both records change simultaneously without measurement.",
    codeTitle: "Diagnostic snapshot pattern",
    codeLanguage: "Authentication-Results excerpt",
    code: `spf=fail ... reason=\"...\"\ndkim=fail ... reason=\"...\"\ndmarc=fail p=none`,
    afterCodeText:
      "Use aggregate reports to see whether failures concentrate on specific source IPs or header From domains.",
    wrongExampleTitle: "Wrong response",
    wrongExampleLanguage: "Plain text",
    wrongExampleCode: `Loosen DMARC by deleting SPF/DKIM records 'to reduce noise'`,
    wrongExampleText:
      "Removing authentication does not improve legitimacy—it erases the signals DMARC needs entirely.",
    correctExampleTitle: "Staged repair",
    correctExampleLanguage: "Plain text",
    correctExampleCode: `Fix DKIM selector → confirm pass → repair SPF include depth → re-evaluate SPF pass`,
    correctExampleText:
      "Sequence changes so you always retain at least one reliable authentication channel per stream.",
    whyTitle: "Why both can fail together",
    whyText:
      "Total failure often means an infrastructure event: DNS outage, bulk key deletion, or ESP incident—all paths degrade at once. In abuse cases, forged mail never matched either identifier.",
    problemTitle: "Risk profile",
    problemPoints: [
      "Mailbox providers may reject or throttle aggressively with no positive auth.",
      "Brand trust erodes when customers receive unauthenticated spoofs.",
      "Internal phish simulations look artificially successful—tests may bypass real controls.",
      "Forensic workloads spike during grey failure windows."
    ],
    deliverabilityTitle: "Deliverability angle",
    deliverabilityText:
      "Double-fail traffic usually sinks fastest—filters assume the worst when neither SPF nor DKIM vouch for the From identity.",
    causesTitle: "Common causes",
    causes: [
      "Dual-stack IPv6 senders missing AAAA coverage in SPF mechanisms.",
      "ESPs rotating DKIM while customers still point SPF at old includes.",
      "Forwarding chains strip DKIM and break SPF alignment simultaneously.",
      "Accidental duplicate `_dmarc` records masking monitoring during the crisis."
    ],
    checkedTitle: "What we checked",
    checkedText:
      "We test each protocol independently before synthesising DMARC outcomes. Bring Authentication-Results headers and DMARC XML when both modes fail to pinpoint whether alignment or mechanism evaluation broke first.",
    faqTitle: "FAQ",
    faq: [
      {
        question: "Will ARC salvage DMARC?",
        answer:
          "ARC helps trusted intermediaries pass downstream context but does not create DMARC pass by itself at strict boundaries."
      },
      {
        question: "Should I raise p= during investigation?",
        answer:
          "Keep enforcement steady while fixing mechanisms—changing policy mid-outage worsens user impact."
      },
      {
        question: "Is BIMI affected?",
        answer:
          "Logo display depends on validated BIMI plus underlying DMARC success; double failures block both."
      }
    ],
    nextSteps: [
      "Segment failing mail streams by ESP and IP ranges.",
      "Restore DKIM signing with a known-good selector first.",
      "Align SPF includes with actual egress IPs.",
      "Analyse DMARC reports for alignment vs mechanism causes.",
      "Only tighten policy once steady pass rates return."
    ],
    hub: {
      href: "/dmarc",
      label: "DMARC Hub"
    },
    related: [
      { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
      { href: "/dmarc/dmarc-aspf-adkim-explained", label: "DMARC aspf and adkim explained" },
      { href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject", label: "DMARC policy none vs quarantine vs reject" }
    ]
  }
};
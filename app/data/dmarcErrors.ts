export const dmarcErrors = {
  "dmarc/no-dmarc-record-found": {
    title: "No DMARC Record Found – How to Add DMARC (2026)",

    intro:
      "If a domain does not publish a DMARC record, mailbox providers cannot apply a domain-level policy for authentication failures. DMARC acts as the policy layer that interprets SPF and DKIM results and instructs receivers how to treat suspicious messages. Without a DMARC record, spoofed emails pretending to come from your domain may still reach recipients.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Publish a valid DMARC TXT record under the _dmarc subdomain of your domain.",

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
      "Many domains configure SPF or DKIM but never add a DMARC policy. Others lose their DMARC record during DNS migrations, provider changes, or manual cleanup of authentication records.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "Mailbox providers cannot enforce anti-spoofing policies for your domain.",
      "Phishing emails can impersonate your domain more easily.",
      "You lose visibility into authentication failures.",
      "DMARC aggregate and forensic reporting is unavailable."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Domains without DMARC policies appear less mature and less controlled to mailbox providers. Over time, this can weaken trust in the domain and make abuse harder to contain.",

    causesTitle: "Common causes",
    causes: [
      "SPF and DKIM were configured but DMARC was never deployed.",
      "DNS migrations accidentally removed the DMARC record.",
      "Teams assumed SPF alone was enough protection.",
      "Email providers did not automatically generate a DMARC policy."
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
      "Publish a DMARC TXT record under _dmarc.",
      "Start with p=none unless you have already audited all legitimate senders.",
      "Add a valid rua mailbox to receive aggregate reports.",
      "Review report data before increasing enforcement.",
      "Re-run the check after DNS propagation."
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

  "dmarc/dmarc-policy-none-vs-quarantine-vs-reject": {
    title: "DMARC Policy None vs Quarantine vs Reject – Explained (2026)",

    intro:
      "DMARC policies define how receivers should treat emails that fail authentication and alignment. Domains usually begin with p=none for monitoring, then move to stricter enforcement once they have identified all legitimate senders and confirmed that SPF or DKIM aligns correctly.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Start with p=none while you monitor real traffic, then move to quarantine and finally reject only after legitimate senders are fully aligned.",

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
      "DMARC enforcement is designed to roll out gradually. Many domains have legacy tools, third-party senders, or subdomains that authenticate differently. Monitoring first helps you identify real traffic before quarantine or reject starts affecting delivery.",

    problemTitle: "Policy comparison",

    problemPoints: [
      "p=none monitors authentication failures but does not block mail.",
      "p=quarantine tells receivers to treat failing mail as suspicious, often routing it to spam.",
      "p=reject tells receivers not to accept failing mail at all.",
      "Moving to stricter policies too early can disrupt legitimate email."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Receivers trust domains more when DMARC enforcement is deliberate and stable. A careful rollout improves security without accidentally breaking transactional, marketing, or support mail.",

    causesTitle: "Common causes",
    causes: [
      "Teams copied a strict p=reject template without auditing mail flow.",
      "A domain stayed on p=none for too long and never moved forward.",
      "Legitimate senders were never fully aligned before enforcement increased.",
      "DMARC reporting was ignored during rollout."
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
      "Confirm that all legitimate senders pass aligned SPF or DKIM.",
      "Start or remain on p=none while reviewing reports.",
      "Move to p=quarantine once you understand the real mail flow.",
      "Move to p=reject only after legitimate failures are resolved.",
      "Re-check policy behavior after each enforcement change."
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
    title: "DMARC Alignment Failed – Causes & Fix (2026)",

    intro:
      "DMARC requires alignment between the domain used in SPF or DKIM authentication and the domain visible in the From header. If those domains do not match closely enough, DMARC alignment fails even when SPF or DKIM may have passed technically.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Ensure that either SPF or DKIM authenticates using the same domain, or an aligned organizational domain, as the visible From address.",

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
      "Third-party services often sign emails using their own domains instead of the sender's domain. SPF can also fail alignment when the authenticated return-path domain does not match the visible From domain.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "DMARC authentication fails even when SPF or DKIM may pass technically.",
      "Receivers may quarantine or reject messages under stricter policies.",
      "Inbox placement becomes less reliable.",
      "Troubleshooting gets harder because the raw authentication result can look healthy while DMARC still fails."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Mailbox providers evaluate whether authenticated identities align with the visible sender identity. If alignment fails, the message can lose trust even when a technical SPF or DKIM pass exists.",

    causesTitle: "Common causes",
    causes: [
      "Third-party platforms sign with their own domains by default.",
      "Custom DKIM or SPF identities were never configured.",
      "Several sending systems use different identities for the same brand.",
      "DMARC enforcement was increased before alignment problems were fixed."
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
      "Inspect the visible From domain in a real message.",
      "Check the DKIM d= domain and the SPF-authenticated domain.",
      "Align at least one of them with the visible From domain.",
      "Send a fresh test message after the change.",
      "Re-run the check to confirm DMARC alignment now passes."
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
    title: "DMARC RUA/RUF Not Working – Fix DMARC Reports (2026)",

    intro:
      "DMARC reports provide visibility into authentication results across mailbox providers. The rua tag controls aggregate reports, and the ruf tag controls forensic reports where supported. If these reporting addresses are misconfigured or cannot receive mail, the domain owner will not get DMARC feedback.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Verify that the reporting addresses exist, accept incoming mail, and are correctly published in the DMARC record.",

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
      "DMARC reports may fail when the reporting mailboxes do not exist, when inbox permissions are wrong, when the mailbox is full, when external reporting authorization is missing, or when providers do not send forensic reports in practice.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "You lose visibility into authentication failures.",
      "DMARC rollout becomes harder to monitor.",
      "Abuse patterns become harder to detect.",
      "You may think DMARC is working well when real failures are going unseen."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Broken reporting does not usually break delivery directly, but it removes the visibility you need to deploy DMARC safely. Without reports, domains are more likely to stay weak for too long or enforce too aggressively without enough evidence.",

    causesTitle: "Common causes",
    causes: [
      "The reporting mailbox does not exist.",
      "Incoming mail to the reporting mailbox is blocked or filtered incorrectly.",
      "External reporting authorization is missing for third-party destinations.",
      "Teams assumed forensic reports would arrive everywhere, even though many providers do not send them."
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
      "Confirm that the reporting mailbox exists and accepts mail.",
      "Check that rua and ruf use valid mailto syntax.",
      "Review any filtering or blocking on the reporting mailbox.",
      "Verify external reporting authorization if using a third-party destination.",
      "Send a new check after updating the record."
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
    title: "DMARC pct Tag Explained – Gradual Rollout Guide (2026)",

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
    title: "DMARC Subdomain Policy (sp) Explained – Full Guide (2026)",

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
    title: "DMARC fo Tag Explained – Failure Reporting Options (2026)",

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
    title: "DMARC aspf & adkim Explained – Alignment Modes (2026)",

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
    title: "Multiple DMARC Records Found – Fix DMARC Conflict (2026)",

    intro:
      "A domain must publish exactly one DMARC record. If multiple DMARC TXT records exist under the _dmarc subdomain, receiving servers cannot determine which policy should apply, and DMARC validation becomes ambiguous or invalid.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Remove duplicate DMARC records and keep only one valid DMARC policy under the _dmarc hostname.",

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
      "Multiple DMARC records often appear when DNS providers migrate records, when different teams add policies independently, or when an old DMARC policy is not removed before a new one is added.",

    problemTitle: "Why this is a problem",

    problemPoints: [
      "DMARC validation fails or becomes ambiguous.",
      "Receivers cannot determine which policy to apply.",
      "Anti-spoofing enforcement becomes unreliable.",
      "Troubleshooting becomes harder because the record exists but is still broken."
    ],

    deliverabilityTitle: "How this affects deliverability",

    deliverabilityText:
      "Multiple DMARC records create policy ambiguity. That weakens trust in the domain and prevents receivers from enforcing authentication policies consistently.",

    causesTitle: "Common causes",
    causes: [
      "DNS migrations duplicated records.",
      "Two administrators published separate policies.",
      "Automated tools added a new DMARC entry without removing the old one.",
      "Legacy TXT records were preserved accidentally."
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
      "Check all TXT records under _dmarc.",
      "Identify which DMARC policy should remain active.",
      "Merge required tags into one final record if needed.",
      "Delete the duplicate DMARC record.",
      "Re-run the check after DNS propagation."
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
    title: "DMARC Record Example – Valid DMARC Setup (2026)",

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
    title: "DMARC Aggregate Reports Explained – How to Read RUA (2026)",

    intro:
      "DMARC aggregate reports (rua) are XML documents sent by receiving servers to the address you specify in your DMARC record. They summarise authentication results: how many messages passed or failed SPF, DKIM, and alignment. Understanding the report structure and fields helps you use the data to fix senders, tune policy, and roll out enforcement safely.",

    fixTitle: "One-Minute Fix",

    fixText:
      "Ensure your DMARC record has a valid rua=mailto: address. Reports arrive as compressed XML. Use a parser or dashboard to interpret them, and focus on failed results to identify misconfigured senders before tightening policy.",

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
      "Reports are the only way to see authentication results across receivers. Without them, you are guessing which senders pass or fail. They are essential for safe DMARC rollout and ongoing monitoring.",

    problemTitle: "Why missing or unused reports cause problems",

    problemPoints: [
      "No rua means no visibility into authentication failures.",
      "Ignoring reports leads to blind policy changes.",
      "Invalid mailto address means reports never arrive.",
      "Moving to reject without report data risks blocking legitimate mail."
    ],

    deliverabilityTitle: "How reports support deliverability",

    deliverabilityText:
      "Reports help you fix alignment before enforcement bites. When you know which senders fail, you can correct SPF and DKIM, then tighten policy with confidence. That improves both security and deliverability.",

    causesTitle: "Common report issues",

    causes: [
      "rua was omitted from the DMARC record.",
      "The mailto address was invalid or unreachable.",
      "Reports were sent but filtered as spam.",
      "No parser or process to review report data."
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
      "Add rua=mailto: to your DMARC record.",
      "Ensure the mailbox can receive compressed XML.",
      "Use a parser or dashboard to interpret reports.",
      "Identify failing sources and fix SPF/DKIM.",
      "Use report data to guide policy rollout."
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
  }
};
export const spfErrors = {
    "spf/multiple-spf-records-found": {
      title: "Multiple SPF Records Found (Fix This Error Fast)",
      description:
        "Fix multiple SPF records fast. Learn how to merge records correctly, avoid DNS errors, and improve email deliverability step by step.",
  
      intro:
        "Your domain is publishing more than one SPF record, which causes SPF validation to fail. SPF allows only one TXT record that starts with v=spf1 per domain, so receivers cannot choose between two competing policies. As a result, SPF returns a permanent error instead of pass, fail, or softfail. A common case is adding Google Workspace first, then Microsoft 365 or SendGrid later as separate SPF records instead of combining them.",
      quickPoints: [
        "Sending IP may appear unauthorized",
        "SPF record can be missing or incorrect",
        "Too many lookups can trigger permerror",
        "Duplicate SPF records break validation"
      ],
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Keep only one SPF TXT record for the domain and merge all legitimate providers into ONE record. If you send through Google, Microsoft 365, and SendGrid, combine those mechanisms into a single v=spf1 policy and remove every extra SPF TXT entry.",
  
      codeTitle: "Correct SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
  
      afterCodeText:
        "That is the core rule: one domain, one SPF record. If several services send email for your domain, they must all be combined into one final SPF record rather than being published as separate TXT entries.",
  
      wrongExampleTitle: "Wrong setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com ~all
  v=spf1 include:sendgrid.net ~all`,
      wrongExampleText:
        "This is invalid because the domain publishes two separate SPF policies. Even if each record looks fine alone, SPF evaluation breaks when both exist at the same time.",
  
      correctExampleTitle: "Correct setup",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
      correctExampleText:
        "This is the correct pattern. Google Workspace and SendGrid are merged into one final SPF record, so the receiver sees one clear sender policy.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "This problem usually appears when different tools each provide their own SPF instructions and those instructions are added directly in DNS without consolidation. For example, a domain may already have an SPF record for Google Workspace, then later a team adds SendGrid or Microsoft 365 and pastes a second v=spf1 record instead of merging the new include mechanism into the original one. SPF returns PERMERROR when multiple SPF records exist, even if each record looks valid on its own.",
  
      problemTitle: "Why multiple SPF records are a problem",
      problemPoints: [
        "Receiving servers return an SPF permerror instead of a clear pass, fail, or softfail result.",
        "Legitimate mail can lose SPF authentication even when your approved senders are correct.",
        "DMARC may also fail when SPF was supposed to provide an aligned authentication path.",
        "Inbox placement becomes less predictable because your authentication setup looks broken rather than intentional."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
      deliverabilityText:
        "From a deliverability perspective, multiple SPF records create ambiguity at the exact moment mailbox providers want clarity. Your domain may have legitimate sending services and good intent, but the receiver still sees a broken SPF policy. That can cause SPF-based DMARC checks to fail and push legitimate messages to spam, especially when enforcement is strict. Even when mail is not rejected immediately, authentication instability makes troubleshooting harder and trust weaker over time.",
  
      causesTitle: "Common causes",
      causes: [
        "Google Workspace or Microsoft 365 was added after an older SPF record already existed.",
        "A marketing platform such as SendGrid or Mailchimp pasted its SPF instructions as a second SPF record.",
        "A DNS migration copied historical TXT records and accidentally preserved duplicate SPF entries.",
        "Different people or teams updated DNS over time without consolidating everything into one final SPF policy.",
        "A new provider was onboarded using copy-paste DNS instructions instead of merging mechanisms into the existing record.",
        "A legacy SPF record was left behind after changing email providers or migrating infrastructure.",
        "Separate DNS tools, dashboards, or admins created overlapping TXT entries for the same domain."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We looked for TXT records on the domain that begin with v=spf1. If more than one SPF policy is published for the same domain, SPF validation becomes invalid and receiving servers may return permerror instead of a usable result.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "Can I have two SPF records if I use two email providers?",
          answer:
            "No. If two providers send email for your domain, both providers must be included inside one final SPF record."
        },
        {
          question: "Will multiple SPF records always block email delivery?",
          answer:
            "Not always immediately, but they can break SPF evaluation and reduce trust. That can lead to DMARC failures, spam-folder placement, or inconsistent results between mailbox providers."
        },
        {
          question: "How do I fix multiple SPF records safely?",
          answer:
            "First list every service that legitimately sends email for your domain. Then merge the valid include mechanisms, IPs, or other sender rules into one SPF record and remove the duplicates."
        }
      ],
  
      nextSteps: [
        "List every service that legitimately sends email for your domain before editing SPF.",
        "Identify every TXT record on the domain that starts with v=spf1.",
        "Merge all valid sender mechanisms into one single SPF record.",
        "Remove the extra SPF TXT records so only one remains.",
        "Re-run the check after DNS propagation to confirm the duplicate-record problem is gone."
      ],
      verifySteps: [
        "Send a test email from your domain.",
        "Check SPF result in message headers.",
        "Confirm the sending IP is authorized.",
        "Re-run the SPF check tool."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        },
        {
          href: "/spf/spf-softfail-vs-fail",
          label: "SPF softfail vs fail"
        }
      ]
    },

    "spf/sendgrid-spf-not-working": {
      title: "SendGrid SPF Not Working (Fix SPF Include Errors Fast)",

      intro:
        "SendGrid mail fails SPF when include:sendgrid.net is missing, added on the wrong domain, or blocked by duplicate SPF records. This is common when teams add SendGrid quickly but do not verify the exact MAIL FROM / Return-Path domain used in production. As a result, mail appears to come from your domain, but SPF does not authorize the actual sending path.",

      fixTitle: "One-Minute Fix",

      fixText:
        "Add include:sendgrid.net to your existing SPF record for the real sending domain, and do not create a second SPF record. Keep one v=spf1 policy only, merge all legitimate providers into that single record, and remove duplicates.",

      codeTitle: "Correct SendGrid SPF record",
      codeLanguage: "DNS TXT",
      code: `example.com TXT "v=spf1 include:sendgrid.net -all"`,

      afterCodeText:
        "This example authorizes only SendGrid to send mail for example.com and fails all other sources. In real deployments you will usually combine SendGrid with other providers in a single v=spf1 policy rather than publishing separate SPF records.",

      wrongExampleTitle: "Wrong setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `example.com TXT "v=spf1 include:_spf.google.com -all"
example.com TXT "v=spf1 include:sendgrid.net -all"`,
      wrongExampleText:
        "Here SendGrid is technically present in SPF, but because there are two separate v=spf1 records, SPF evaluation returns a permerror instead of a clean result. Receivers cannot safely decide which policy to apply.",

      correctExampleTitle: "Correct setup",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `example.com TXT "v=spf1 include:_spf.google.com include:sendgrid.net -all"`,
      correctExampleText:
        "This merges Google Workspace and SendGrid into a single SPF record so receivers see one clear policy. As long as include:sendgrid.net is present in this combined record, SendGrid traffic can pass SPF.",

      whyTitle: "Why this happens",

      whyText:
        "SendGrid’s SPF instructions require adding include:sendgrid.net to your existing policy, not publishing a second SPF TXT record. SPF supports only one policy per domain, so duplicate records trigger errors and unpredictable evaluation. Failures are especially common when the include is published on the wrong hostname or when the sending MAIL FROM / Return-Path domain differs from the domain where SPF was updated.",

      problemTitle: "Why this is a problem",

      problemText:
        "When SPF fails for SendGrid traffic, some providers will treat your mail as suspicious or apply DMARC policies more aggressively. Transactional notifications, password resets, and marketing campaigns sent through SendGrid become more likely to land in spam or get throttled, even if the content and engagement are healthy.",

      deliverabilityTitle: "How this affects deliverability",

      deliverabilityText:
        "SPF is one of the baseline signals receivers use to decide whether infrastructure is authorized. If SendGrid is not correctly represented in SPF, transactional messages, password resets, and marketing campaigns can be flagged as suspicious. Over time this can drive spam-folder placement and DMARC failures when SPF was expected to provide aligned authentication.",

      causesTitle: "Common causes",
      causes: [
        "include:sendgrid.net was added on the wrong hostname instead of the actual MAIL FROM / Return-Path domain.",
        "Multiple SPF TXT records were published instead of one merged SPF policy.",
        "The wrong Return-Path / MAIL FROM domain was tested, so SPF checks the wrong record.",
        "Recent DNS changes, including SendGrid include updates, have not fully propagated yet.",
        "SPF syntax or mechanism ordering issues caused the active record to evaluate incorrectly."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We looked for a single SPF TXT record on your sending domain that begins with v=spf1 and inspected whether it contains include:sendgrid.net. If more than one SPF record exists or the include mechanism is missing from the active policy, SendGrid mail will not authenticate correctly.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Can I have multiple SPF records if I use several providers?",
          answer:
            "No. SPF supports only one TXT record that starts with v=spf1 for a given domain. If you use SendGrid alongside other providers, they must all be combined into one SPF policy."
        },
        {
          question: "What does include:sendgrid.net actually do?",
          answer:
            "The include mechanism tells receivers to fetch SendGrid’s own SPF policy and treat the IPs it authorizes as valid senders for your domain. Without include:sendgrid.net, SendGrid’s sending IPs are not covered by your SPF record."
        },
        {
          question: "Why is SPF still failing after I added include:sendgrid.net?",
          answer:
            "The most common reasons are that another SPF record still exists, that the record was added on the wrong hostname, or that the SPF syntax is broken by extra spaces or mechanisms. Make sure only one v=spf1 record exists, that it lives on the domain you actually send from, and that syntax checks pass."
        }
      ],

      nextSteps: [
        "Send a real SendGrid message and check headers to confirm the exact Return-Path / MAIL FROM domain.",
        "Update SPF on that exact domain by adding include:sendgrid.net to the existing v=spf1 record.",
        "Remove duplicate SPF TXT records so only one SPF policy remains active.",
        "Wait for propagation, then re-test SPF using the same sending path and domain.",
        "Verify DMARC alignment after SPF passes to confirm production traffic is fully authenticated."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        {
          href: "/spf/spf-record-syntax-explained",
          label: "SPF record syntax explained"
        },
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/dmarc/dmarc-alignment-failed",
          label: "DMARC alignment failed"
        }
      ]
    },

    "spf/google-workspace-spf-not-working": {
      title: "Google Workspace SPF Not Working (Fix SPF Setup Fast)",

      intro:
        "Google Workspace SPF fails when include:_spf.google.com is missing, added on the wrong domain, or blocked by duplicate SPF records. This is common when teams migrate to Google Workspace but leave older SPF records untouched or publish changes on the wrong hostname. As a result, mail appears to come from your domain, but SPF does not authorize Google’s sending path correctly.",

      fixTitle: "One-Minute Fix",

      fixText:
        "Add include:_spf.google.com to your existing SPF record for the real sending domain, and do not create a new SPF record. Keep one v=spf1 policy only, merge all legitimate providers into that single record, and remove duplicates.",

      codeTitle: "Correct Google Workspace SPF record",
      codeLanguage: "DNS TXT",
      code: `example.com TXT "v=spf1 include:_spf.google.com -all"`,

      afterCodeText:
        "This example authorizes only Google Workspace to send mail for example.com and fails all other sources. In real deployments you will often combine Google Workspace with other providers in one merged SPF policy.",

      wrongExampleTitle: "Wrong setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `example.com TXT "v=spf1 include:spf.protection.outlook.com -all"
example.com TXT "v=spf1 include:_spf.google.com -all"`,
      wrongExampleText:
        "Here Google Workspace is present, but there are two separate SPF records, so receivers can return SPF permerror instead of a reliable pass/fail result. That ambiguity breaks authentication consistency.",

      correctExampleTitle: "Correct setup",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `example.com TXT "v=spf1 include:_spf.google.com include:spf.protection.outlook.com -all"`,
      correctExampleText:
        "This merges Google Workspace and Microsoft 365 into one SPF policy so receivers evaluate a single clear authorization record. As long as include:_spf.google.com is in the active merged record, Google Workspace traffic can pass SPF.",

      whyTitle: "Why this happens",

      whyText:
        "Google Workspace setup instructions require adding include:_spf.google.com to the existing SPF policy, not creating another v=spf1 TXT record. SPF supports only one policy per domain, so multiple records cause evaluation errors. Failures are also common when SPF is edited on the wrong domain, syntax is malformed, or DNS propagation is incomplete after updates.",

      problemTitle: "Why this is a problem",

      problemText:
        "When SPF fails for Google Workspace mail, receivers may treat messages as less trustworthy and apply stricter filtering. Business-critical traffic such as login alerts, invoices, and user notifications can drift into spam or face DMARC-related failures if SPF was expected to support alignment.",

      deliverabilityTitle: "How this affects deliverability",

      deliverabilityText:
        "SPF is one of the baseline authorization checks providers use before trusting sender infrastructure. If Google Workspace is not correctly represented, legitimate mail can lose trust signals, face higher spam-folder risk, and trigger DMARC alignment problems where SPF was expected to help provide a passing path.",

      causesTitle: "Common causes",
      causes: [
        "Duplicate SPF records were published instead of one merged SPF policy.",
        "include:_spf.google.com was added on the wrong domain or hostname.",
        "Recent DNS changes have not fully propagated across resolvers yet.",
        "SPF syntax issues (extra spaces, bad mechanisms, or malformed qualifiers) broke evaluation.",
        "The tested sending domain differed from the domain where SPF was updated."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We looked for one active SPF TXT record on your sending domain that starts with v=spf1 and checked whether include:_spf.google.com is present. If multiple SPF records exist or the include is missing from the effective policy, Google Workspace mail will not authenticate reliably.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Can I publish one SPF record for Google and another for other providers?",
          answer:
            "No. SPF allows only one v=spf1 record per domain. If you use Google Workspace plus other services, all mechanisms must be merged into one policy."
        },
        {
          question: "What does include:_spf.google.com do?",
          answer:
            "It tells receivers to evaluate Google’s published SPF authorization and treat those sending IPs as allowed for your domain."
        },
        {
          question: "Why is SPF still failing after I added Google include?",
          answer:
            "The most common causes are duplicate SPF records, publishing on the wrong hostname, DNS propagation delay, or syntax mistakes in the final merged policy."
        }
      ],

      nextSteps: [
        "Check a real Google Workspace message header to confirm the exact sending domain being evaluated.",
        "Update SPF on that domain by adding include:_spf.google.com to the existing v=spf1 record.",
        "Merge providers into one SPF record and remove duplicate SPF TXT entries.",
        "Validate SPF syntax and wait for DNS propagation across external resolvers.",
        "Re-test SPF and verify DMARC alignment after Google Workspace mail passes."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/spf/spf-record-syntax-explained",
          label: "SPF record syntax explained"
        },
        {
          href: "/dmarc/dmarc-alignment-failed",
          label: "DMARC alignment failed"
        }
      ]
    },

    "spf/spf-fail-gmail": {
      title: "SPF Fail in Gmail (Why Gmail Shows SPF Fail & How to Fix It)",
      description:
        "Gmail shows SPF fail? Learn the real causes, fix broken SPF setup, and improve inbox placement with step-by-step troubleshooting.",

      intro:
        "If Gmail shows SPF fail even though you already published an SPF record, the issue is usually in evaluation context rather than presence alone. Gmail checks the SPF-evaluated domain tied to MAIL FROM (Return-Path), not just the visible From header. In production, SPF fails when the sending IP is not authorized for that evaluated domain, the wrong hostname was updated, or SPF evaluation is broken by duplicates, syntax errors, or lookup depth limits.",

      quickPoints: [
        "Gmail SPF fail often points to MAIL FROM domain mismatch",
        "Adding SPF on the root domain may not fix Return-Path SPF checks",
        "Unauthorized sending IPs fail SPF even when an SPF TXT exists",
        "Duplicate records, syntax errors, and lookup bloat can still break SPF"
      ],

      fixTitle: "One-Minute Fix",

      fixText:
        "Open a real Gmail message header and identify the SPF-evaluated domain and sending IP. Update SPF on that exact evaluated domain, keep one merged SPF policy only, and ensure the sender IP/provider include is actually authorized there.",

      codeTitle: "Header check + corrected SPF target",
      codeLanguage: "Email Header + DNS TXT",
      code: `Authentication-Results: mx.google.com;
spf=fail (google.com: domain of bounce@mail.example.com does not designate 198.51.100.24 as permitted sender)

mail.example.com TXT "v=spf1 include:_spf.google.com include:sendgrid.net -all"`,

      afterCodeText:
        "In this example Gmail evaluates SPF on mail.example.com (Return-Path domain), not necessarily the visible From domain. Fix SPF where Gmail actually evaluates it.",

      wrongExampleTitle: "Wrong fix path",
      wrongExampleLanguage: "Email Header + DNS TXT",
      wrongExampleCode: `From: billing@example.com
Return-Path: bounce@mail.example.com
example.com TXT "v=spf1 include:_spf.google.com -all"`,
      wrongExampleText:
        "SPF was only updated on example.com while Gmail evaluates bounce@mail.example.com. Gmail can keep reporting SPF fail even though you believe SPF is configured.",

      correctExampleTitle: "Correct fix path",
      correctExampleLanguage: "Email Header + DNS TXT",
      correctExampleCode: `From: billing@example.com
Return-Path: bounce@mail.example.com
mail.example.com TXT "v=spf1 include:_spf.google.com include:sendgrid.net -all"`,
      correctExampleText:
        "SPF is published on the domain Gmail actually evaluates, and the real sender path is authorized. This resolves many 'SPF fail in Gmail' cases quickly.",

      whyTitle: "Why Gmail can show SPF fail when SPF exists",

      whyText:
        "Gmail SPF results depend on the evaluated envelope domain and active sending infrastructure. Teams often check only the visible From domain or a DNS panel screenshot, but Gmail validates the connecting IP against the SPF policy of the MAIL FROM / Return-Path domain. If those do not align operationally, SPF fails despite an existing record.",

      problemTitle: "Why this is a problem",
      problemPoints: [
        "Legitimate mail can fail SPF in Gmail even after SPF was 'added'.",
        "Troubleshooting drifts because teams fix the wrong domain or wrong sender path.",
        "DMARC outcomes become unstable when SPF alignment is expected but broken.",
        "Inbox placement drops as Gmail repeatedly sees authentication failures."
      ],

      deliverabilityTitle: "How this affects deliverability",
      deliverabilityText:
        "Repeated SPF fail signals in Gmail reduce trust in your mail stream and can push legitimate traffic toward spam, especially for transactional flows. Even when delivery continues, inconsistent SPF outcomes weaken reputation and can cascade into DMARC alignment issues across providers.",

      causesTitle: "Common causes",
      causes: [
        "SPF was updated on the visible From domain, but Gmail evaluates a different Return-Path domain.",
        "Sending IP changed (new ESP, relay, gateway), but SPF authorization was never updated.",
        "More than one SPF record exists, producing permerror instead of a clean pass/fail result.",
        "SPF syntax mistakes or malformed mechanisms invalidate evaluation.",
        "Nested includes push effective lookup depth too high and break SPF resolution."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We check whether SPF exists on the evaluated sending domain, whether only one v=spf1 policy is published, and whether the active sending path is authorized without syntax or lookup-limit failures.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Why does Gmail show SPF fail if my domain has SPF?",
          answer:
            "Because Gmail may evaluate a different MAIL FROM / Return-Path domain than the one you checked. SPF must be correct on the evaluated domain."
        },
        {
          question: "Does SPF check the visible From address in Gmail?",
          answer:
            "Not directly. SPF evaluates the envelope sender domain and sending IP. The visible From header can be different."
        },
        {
          question: "Can one bad include cause SPF fail in Gmail?",
          answer:
            "Yes. A wrong include, duplicate record, or lookup overflow can break SPF evaluation and lead Gmail to show fail or permerror."
        }
      ],

      nextSteps: [
        "Inspect Gmail headers and note the SPF-evaluated domain plus sending IP.",
        "Confirm SPF exists on that exact evaluated domain and that only one policy is published.",
        "Authorize the real sender path using correct includes or ip4/ip6 mechanisms.",
        "Remove duplicates and syntax issues, then re-test with a fresh Gmail message.",
        "Verify DMARC alignment after SPF passes to stabilize deliverability."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        {
          href: "/spf/spf-ip-not-authorized",
          label: "SPF IP not authorized"
        },
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        }
      ]
    },

    "spf/spf-fail-outlook": {
      title: "SPF Fail in Outlook (Why Outlook Shows SPF Fail)",
      description:
        "Outlook showing SPF fail? Diagnose sender mismatch, incorrect MAIL FROM SPF, and policy errors that break authentication and hurt inbox placement.",

      intro:
        "If Outlook reports SPF fail, the message path Outlook evaluated does not match the SPF policy published for the envelope sender domain. This often happens when Microsoft 365, relays, or third-party senders use a Return-Path domain that was never updated with the right SPF include or IP authorization.",

      quickPoints: [
        "Outlook SPF checks the envelope sender domain, not only the visible From",
        "Hybrid Microsoft 365 + third-party senders often miss one authorization path",
        "Duplicate SPF records can trigger permerror and fail outcomes",
        "Incorrect relay IP coverage is a frequent Outlook-specific SPF failure source"
      ],

      fixTitle: "One-Minute Fix",
      fixText:
        "Pull a real Outlook header, identify the envelope domain and sending IP, then update that domain’s SPF with one merged policy covering every active sender path.",

      codeTitle: "Outlook SPF failure pattern",
      codeLanguage: "Header + DNS TXT",
      code: `Authentication-Results: spf=fail smtp.mailfrom=mailer.example.net
Received-SPF: Fail (protection.outlook.com: domain of mailer.example.net does not designate 203.0.113.19 as permitted sender)

mailer.example.net TXT "v=spf1 include:spf.protection.outlook.com include:sendgrid.net -all"`,

      afterCodeText:
        "Fix SPF on the exact smtp.mailfrom domain Outlook evaluates. Updating only the visible From domain often does not resolve this failure.",

      wrongExampleTitle: "Wrong troubleshooting target",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `example.com TXT "v=spf1 include:spf.protection.outlook.com -all"`,
      wrongExampleText:
        "If Outlook is evaluating mailer.example.net in smtp.mailfrom, editing example.com alone will not fix SPF fail.",

      correctExampleTitle: "Correct troubleshooting target",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `mailer.example.net TXT "v=spf1 include:spf.protection.outlook.com include:sendgrid.net -all"`,
      correctExampleText:
        "The evaluated envelope domain now authorizes both sender paths, allowing Outlook SPF checks to pass consistently.",

      whyTitle: "Why this happens",
      whyText:
        "Outlook’s SPF result reflects the domain in smtp.mailfrom and the connecting IP. Teams often verify SPF exists somewhere, but not on the exact domain and path used in production mail flow.",

      problemTitle: "Why this is a problem",
      problemPoints: [
        "Legitimate mail can fail authentication in Outlook despite an SPF record existing.",
        "Filtering becomes inconsistent across Microsoft and non-Microsoft recipients.",
        "DMARC alignment can degrade when SPF is expected to support policy.",
        "Incident response slows when teams debug the wrong hostname."
      ],

      deliverabilityTitle: "How this affects deliverability",
      deliverabilityText:
        "SPF fail signals in Outlook can push messages toward junk folders and reduce sender trust, especially for transactional traffic where consistent authentication is expected.",

      causesTitle: "Common causes",
      causes: [
        "Envelope sender domain differs from the domain where SPF was updated.",
        "A relay or ESP sending IP is not included in the active SPF policy.",
        "Two SPF records are published for the same evaluated domain.",
        "Stale provider includes remained after routing or platform changes."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We validate SPF on the evaluated envelope domain, confirm there is one SPF policy, and check whether the active sending infrastructure is authorized.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Does Outlook SPF use the From address?",
          answer:
            "Outlook SPF uses the envelope sender (smtp.mailfrom) domain and sender IP, not just the visible From header."
        },
        {
          question: "Can Microsoft 365 still fail SPF after setup?",
          answer:
            "Yes, especially when another relay path sends without being included in the merged SPF policy."
        },
        {
          question: "How quickly do SPF fixes show in Outlook?",
          answer:
            "Usually within DNS propagation windows, but cached results can delay visible improvements for a few hours."
        }
      ],

      nextSteps: [
        "Capture a recent Outlook-delivered message header.",
        "Identify smtp.mailfrom and connecting sender IP.",
        "Update one SPF record on the evaluated domain with all active senders.",
        "Remove duplicates and retest with a fresh Outlook mailbox message.",
        "Confirm SPF + DMARC pass after propagation."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        { href: "/spf/spf-ip-not-authorized", label: "SPF IP not authorized" },
        { href: "/spf/multiple-spf-records-found", label: "Multiple SPF records found" },
        { href: "/spf/spf-permerror-too-many-dns-lookups", label: "SPF permerror: too many DNS lookups" }
      ]
    },

    "spf/spf-fail-yahoo": {
      title: "SPF Fail in Yahoo (Why Yahoo SPF Checks Fail)",
      description:
        "Yahoo SPF fail results often trace to wrong envelope domain SPF, unauthorized sender paths, or broken SPF policies. Diagnose and fix Yahoo failures fast.",

      intro:
        "Yahoo SPF fail usually means Yahoo evaluated a sender path that your SPF policy does not authorize on the envelope domain. This is common after platform changes, forwarding paths, or partial SPF updates where one domain is fixed but the active Return-Path domain is not.",

      quickPoints: [
        "Yahoo evaluates envelope sender SPF, not only brand-visible domains",
        "Forwarding and mixed ESP stacks can expose missing SPF authorization",
        "Provider changes frequently leave stale SPF includes behind",
        "Lookup-heavy SPF policies can fail even when syntax looks correct"
      ],

      fixTitle: "One-Minute Fix",
      fixText:
        "Find the envelope sender domain Yahoo evaluated, verify one valid SPF record exists there, and authorize all real sender paths without duplicate policies.",

      codeTitle: "Yahoo SPF fail troubleshooting example",
      codeLanguage: "Header + DNS TXT",
      code: `Authentication-Results: mx.yahoo.com; spf=fail smtp.mailfrom=bounce.news.example.org
Received-SPF: fail (domain of bounce.news.example.org does not designate 198.51.100.42 as permitted sender)

bounce.news.example.org TXT "v=spf1 include:sendgrid.net include:spf.mail.yahoo.com -all"`,

      afterCodeText:
        "Yahoo SPF resolution improves when the evaluated envelope domain explicitly authorizes the actual sending route.",

      wrongExampleTitle: "Wrong SPF update location",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `example.org TXT "v=spf1 include:sendgrid.net -all"`,
      wrongExampleText:
        "Updating only the root domain may not help if Yahoo evaluated bounce.news.example.org for SPF.",

      correctExampleTitle: "Correct SPF update location",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `bounce.news.example.org TXT "v=spf1 include:sendgrid.net -all"`,
      correctExampleText:
        "The SPF policy now matches Yahoo’s evaluated envelope domain and can authorize expected sender infrastructure.",

      whyTitle: "Why this happens",
      whyText:
        "Yahoo SPF failures often come from domain-context mismatch: teams publish SPF on one domain, while Yahoo evaluates another envelope sender domain used by mailing software or ESP routing.",

      problemTitle: "Why this is a problem",
      problemPoints: [
        "Legitimate campaigns can fail SPF in Yahoo Mail and land in spam.",
        "Authentication inconsistency increases complaint risk and trust loss.",
        "DMARC results become less predictable when SPF is unstable.",
        "Root-cause analysis gets delayed if only root-domain SPF is checked."
      ],

      deliverabilityTitle: "How this affects deliverability",
      deliverabilityText:
        "SPF fail outcomes at Yahoo reduce sender trust and can increase spam placement, especially for high-volume promotional and lifecycle traffic.",

      causesTitle: "Common causes",
      causes: [
        "Envelope sender domain SPF not updated after ESP or routing changes.",
        "Missing include/IP authorization for Yahoo-evaluated sender path.",
        "Duplicate SPF records on the evaluated domain.",
        "SPF lookup depth or syntax issues causing policy evaluation failure."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We verify which envelope domain Yahoo evaluates for SPF, confirm a single SPF policy there, and check whether the observed sending path is authorized.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Why does Yahoo fail SPF when Gmail passes?",
          answer:
            "Different mailbox providers may evaluate different flows or cached states. Misaligned envelope-domain SPF is a common reason for provider-specific failures."
        },
        {
          question: "Can forwarding trigger Yahoo SPF fail?",
          answer:
            "Yes. Forwarded messages can appear from non-authorized paths and produce SPF fail without ARC/SRS handling."
        },
        {
          question: "Should I add multiple SPF records to cover all senders?",
          answer:
            "No. Keep one merged SPF policy per evaluated domain."
        }
      ],

      nextSteps: [
        "Inspect Yahoo headers for smtp.mailfrom and sender IP.",
        "Update SPF on the evaluated envelope domain, not only root domain.",
        "Merge all active senders into one SPF policy.",
        "Re-test with Yahoo mailbox and verify SPF result improves.",
        "Validate DMARC alignment once SPF is stable."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        { href: "/spf/spf-ip-not-authorized", label: "SPF IP not authorized" },
        { href: "/spf/multiple-spf-records-found", label: "Multiple SPF records found" },
        { href: "/spf/spf-permerror-too-many-dns-lookups", label: "SPF permerror: too many DNS lookups" }
      ]
    },

    "spf/spf-pass-but-still-spam": {
      title: "SPF Pass But Still Spam (Why Inbox Placement Fails)",
      description:
        "SPF pass but still in spam? Learn why inbox placement fails beyond SPF and how to improve reputation, alignment, and message quality for better delivery.",

      intro:
        "SPF pass alone does not guarantee inbox placement. Mailbox providers evaluate broader trust signals: DKIM/DMARC alignment, sender reputation, engagement, content quality, and complaint patterns. Many teams see SPF=pass and assume authentication is solved, but spam placement can persist when other signals remain weak.",

      quickPoints: [
        "SPF pass is necessary but not sufficient for inboxing",
        "DKIM/DMARC alignment and reputation often drive final placement",
        "High complaint or low engagement can override SPF pass benefits",
        "Content and sending behavior quality still matter at provider level"
      ],

      fixTitle: "One-Minute Fix",
      fixText:
        "Treat SPF pass as baseline, then verify DKIM + DMARC alignment, review reputation metrics, tighten list hygiene, and optimize sending behavior for mailbox trust.",

      codeTitle: "Authentication pass but spam outcome",
      codeLanguage: "Email Header + Context",
      code: `Authentication-Results:
spf=pass smtp.mailfrom=mailer.example.com
dkim=pass header.d=example.com
dmarc=pass

Delivery outcome: Spam folder (low engagement + poor reputation signals)`,

      afterCodeText:
        "Even with SPF/DKIM/DMARC pass, placement can fail when sender reputation and user engagement signals are weak.",

      wrongExampleTitle: "Wrong diagnosis",
      wrongExampleLanguage: "Operational check",
      wrongExampleCode: `SPF=pass → Assume deliverability is solved`,
      wrongExampleText:
        "This misses key ranking signals mailbox providers use after authentication, including complaint rate, bounce patterns, and engagement quality.",

      correctExampleTitle: "Correct diagnosis",
      correctExampleLanguage: "Operational check",
      correctExampleCode: `SPF=pass + DKIM/DMARC alignment + healthy reputation + list hygiene + engagement monitoring`,
      correctExampleText:
        "Inbox placement improves when authentication is paired with strong reputation, clean lists, and stable sending behavior.",

      whyTitle: "Why this happens",
      whyText:
        "Authentication verifies technical legitimacy, not recipient desirability. Providers still score sender behavior and recipient interaction. If those signals are poor, spam placement can continue despite SPF pass.",

      problemTitle: "Why this is a problem",
      problemPoints: [
        "Teams over-focus on SPF and miss reputation-driven placement issues.",
        "Transactional and marketing mail can lose inbox visibility despite passing auth.",
        "False confidence delays fixes for complaints, list quality, and engagement.",
        "DMARC policy decisions become harder without a complete deliverability view."
      ],

      deliverabilityTitle: "How this affects deliverability",
      deliverabilityText:
        "When SPF passes but reputation signals are weak, mailbox providers can still route mail to spam. Sustainable inboxing requires authentication plus strong operational quality.",

      causesTitle: "Common causes",
      causes: [
        "Low engagement rates from stale or unqualified recipient lists.",
        "High complaint or bounce rates degrading sender reputation.",
        "Weak DKIM/DMARC alignment consistency across all sending streams.",
        "Content patterns that trigger filtering despite technical authentication pass."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We confirm SPF status and then evaluate likely adjacent factors: DKIM/DMARC alignment quality, sender hygiene, engagement outcomes, and known spam-risk patterns.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Can SPF pass and still land in spam?",
          answer:
            "Yes. SPF is only one trust signal. Reputation, engagement, and policy alignment heavily influence final inbox placement."
        },
        {
          question: "Should I focus on DMARC if SPF already passes?",
          answer:
            "Yes. DMARC alignment and policy consistency help providers trust sender identity more reliably."
        },
        {
          question: "What improves placement fastest after SPF pass?",
          answer:
            "List cleanup, complaint reduction, consistent alignment, and better engagement targeting usually produce the fastest gains."
        }
      ],

      nextSteps: [
        "Verify DKIM and DMARC alignment on real production messages.",
        "Audit complaint, bounce, and engagement metrics by stream.",
        "Remove stale addresses and tighten opt-in/list hygiene processes.",
        "Stabilize sending cadence and domain/IP reputation practices.",
        "Monitor inbox placement after each controlled change."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        { href: "/dmarc/dmarc-alignment-failed", label: "DMARC alignment failed" },
        { href: "/dkim/dkim-alignment-failed", label: "DKIM alignment failed" },
        { href: "/spf/spf-softfail-vs-fail", label: "SPF softfail vs fail" }
      ]
    },

    "spf/microsoft-365-spf-not-working": {
      title: "Microsoft 365 SPF Not Working (Fix SPF Setup Fast)",

      intro:
        "Microsoft 365 SPF fails when include:spf.protection.outlook.com is missing, incorrect, or blocked by duplicate SPF records. A common migration issue is moving from another provider and adding Microsoft as a second SPF record instead of merging policies. In that state, receivers cannot evaluate SPF cleanly for your domain.",

      fixTitle: "One-Minute Fix",

      fixText:
        "Add include:spf.protection.outlook.com to your existing SPF record and do not publish a second SPF TXT record. Keep one v=spf1 policy, merge all approved senders into that single record, and remove duplicates.",

      codeTitle: "Correct Microsoft 365 SPF record",
      codeLanguage: "DNS TXT",
      code: `example.com TXT "v=spf1 include:spf.protection.outlook.com -all"`,

      afterCodeText:
        "This authorizes Microsoft 365 to send for example.com. If you also use other platforms, add their mechanisms to this same SPF record instead of creating separate SPF entries.",

      wrongExampleTitle: "Wrong setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `example.com TXT "v=spf1 include:_spf.google.com -all"
example.com TXT "v=spf1 include:spf.protection.outlook.com -all"`,
      wrongExampleText:
        "Two SPF records make evaluation ambiguous and often produce SPF permerror. Even though Microsoft 365 is listed, receivers cannot safely choose between competing policies.",

      correctExampleTitle: "Correct setup",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `example.com TXT "v=spf1 include:_spf.google.com include:spf.protection.outlook.com -all"`,
      correctExampleText:
        "This keeps one SPF policy with all active providers merged together. Microsoft 365 mail can pass SPF when the include is present in the single authoritative record.",

      whyTitle: "Why this happens",

      whyText:
        "Microsoft 365 setup requires adding include:spf.protection.outlook.com to the active SPF record for the sending domain. SPF supports one policy only, so creating separate records causes failures. Problems also appear when changes are made on the wrong domain, syntax is broken, or propagation is incomplete.",

      problemTitle: "Why this is a problem",

      problemText:
        "When Microsoft 365 traffic fails SPF, mailbox providers may reduce trust in your sender identity and apply stricter filtering. Business email, alerts, and customer communications can drift into spam or fail DMARC alignment expectations.",

      deliverabilityTitle: "How this affects deliverability",

      deliverabilityText:
        "SPF is a foundational sender authorization signal for Microsoft 365 traffic. If Microsoft’s include is missing or SPF is invalid, legitimate mail can lose inbox placement and trigger DMARC issues where SPF was expected to provide aligned authentication.",

      causesTitle: "Common causes",
      causes: [
        "include:spf.protection.outlook.com was not added to the active SPF record.",
        "Duplicate SPF TXT records were published during provider changes.",
        "SPF updates were made on the wrong domain or hostname.",
        "Syntax mistakes in the merged SPF policy caused parsing problems.",
        "DNS propagation delay left external resolvers on older SPF data."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We checked for a single v=spf1 TXT record on the sending domain and verified whether include:spf.protection.outlook.com is present in that active policy. Missing include or duplicate SPF records usually explain Microsoft 365 SPF failures.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Can I keep separate SPF records for Microsoft and another provider?",
          answer:
            "No. SPF allows one v=spf1 record per domain. Microsoft 365 and other providers must be merged into one SPF policy."
        },
        {
          question: "What does include:spf.protection.outlook.com authorize?",
          answer:
            "It authorizes Microsoft 365 infrastructure defined in Microsoft’s SPF policy to send mail for your domain."
        },
        {
          question: "Why is SPF still failing after adding Microsoft include?",
          answer:
            "Most failures come from duplicate SPF records, wrong domain targeting, syntax errors, or DNS propagation not yet complete."
        }
      ],

      nextSteps: [
        "Send a real Microsoft 365 message and check headers to confirm the exact domain being evaluated for SPF.",
        "Update that domain’s SPF record to include include:spf.protection.outlook.com.",
        "Merge all providers into one SPF record and remove duplicates.",
        "Validate SPF syntax and wait for DNS propagation.",
        "Re-test SPF and DMARC alignment on the same sending path."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/spf/spf-record-syntax-explained",
          label: "SPF record syntax explained"
        },
        {
          href: "/dmarc/dmarc-alignment-failed",
          label: "DMARC alignment failed"
        }
      ]
    },

    "spf/amazon-ses-spf-not-working": {
      title: "Amazon SES SPF Not Working? Fix Include Setup Fast",

      intro:
        "Amazon SES SPF fails when the SES include mechanism is missing, malformed, or published on the wrong sending domain. This is common when teams verify a custom MAIL FROM domain in SES but only update SPF on the root domain. As a result, SES mail can fail SPF even though DNS changes seem complete.",

      fixTitle: "One-Minute Fix",

      fixText:
        "Add the SES-provided SPF include to the existing SPF record for the exact MAIL FROM / Return-Path domain and keep only one SPF record. Do not create a second v=spf1 record for SES.",

      codeTitle: "Correct Amazon SES SPF record",
      codeLanguage: "DNS TXT",
      code: `mail.example.com TXT "v=spf1 include:amazonses.com -all"`,

      afterCodeText:
        "In many SES setups SPF is evaluated on a custom MAIL FROM subdomain, not always the visible From root domain. Update SPF where SES actually sends from.",

      wrongExampleTitle: "Wrong setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `example.com TXT "v=spf1 include:_spf.google.com -all"
mail.example.com TXT "v=spf1 include:_spf.google.com -all"`,
      wrongExampleText:
        "Here SES is sending through mail.example.com but its include is missing from that domain’s SPF record. SPF evaluation fails on the active sending domain.",

      correctExampleTitle: "Correct setup",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `mail.example.com TXT "v=spf1 include:_spf.google.com include:amazonses.com -all"`,
      correctExampleText:
        "This authorizes both Google and SES on the actual MAIL FROM domain in one SPF policy. SES traffic can pass SPF when evaluated on mail.example.com.",

      whyTitle: "Why this happens",

      whyText:
        "SES SPF failures usually come from domain mismatch: teams edit SPF on one domain while SES authenticates another. SPF also fails when duplicate records are created or SES include values are copied incorrectly. Since SPF accepts one policy per domain, incorrect placement quickly breaks evaluation.",

      problemTitle: "Why this is a problem",

      problemText:
        "When SES messages fail SPF, receivers may classify them as less trustworthy and apply stricter filtering. Transactional flows like account verification, receipts, and notifications can land in spam or suffer DMARC alignment failures.",

      deliverabilityTitle: "How this affects deliverability",

      deliverabilityText:
        "SES relies on clean authentication signals for production sending reputation. Broken SPF on the MAIL FROM domain weakens trust, raises spam risk, and can undermine DMARC outcomes where SPF should have contributed aligned authorization.",

      causesTitle: "Common causes",
      causes: [
        "SES include mechanism was missing from the actual MAIL FROM domain.",
        "The include hostname or value was copied incorrectly.",
        "Duplicate SPF records were created during setup changes.",
        "SPF was updated on the wrong domain compared to SES sending path.",
        "Propagation delay left receivers reading stale SPF records."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We checked whether the evaluated sending domain has one valid v=spf1 record and whether the SES include is present in that active policy. Missing include, wrong domain placement, or duplicate SPF records are common SES SPF failure sources.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Should SPF be set on my root domain or SES MAIL FROM domain?",
          answer:
            "Set SPF on the domain SES actually uses for MAIL FROM / Return-Path evaluation. In many cases that is a custom subdomain."
        },
        {
          question: "Can I add SES as another SPF record?",
          answer:
            "No. Merge SES include into the existing SPF record for that domain. SPF supports only one v=spf1 record."
        },
        {
          question: "Why does SES still fail after DNS updates?",
          answer:
            "Most issues come from domain mismatch, duplicate SPF records, copied include errors, or propagation delay."
        }
      ],

      nextSteps: [
        "Inspect a real SES message header and identify the MAIL FROM / Return-Path domain.",
        "Update SPF on that exact domain to include SES authorization.",
        "Keep one merged SPF record and remove duplicate v=spf1 entries.",
        "Validate syntax and confirm external DNS propagation.",
        "Re-test SPF and DMARC alignment using fresh SES traffic."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        {
          href: "/spf/spf-record-syntax-explained",
          label: "SPF record syntax explained"
        },
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/dmarc/dmarc-alignment-failed",
          label: "DMARC alignment failed"
        }
      ]
    },

    "spf/sendgrid-spf-permerror": {
      title: "SendGrid SPF Permerror (Fix DNS Lookup Limit Fast)",

      intro:
        "SendGrid SPF permerror happens when SPF evaluation breaks before a normal pass/fail result, often due to too many lookups or conflicting SPF records. A frequent case is adding SendGrid include on top of already complex provider chains until DNS lookup limits are exceeded. When permerror appears, receivers cannot trust SPF evaluation for that message.",

      fixTitle: "One-Minute Fix",

      fixText:
        "Keep one SPF record, remove duplicate or obsolete mechanisms, and reduce lookup-heavy chains around include:sendgrid.net. Merge only active providers and trim unnecessary mx/a/redirect usage to stay under SPF limits.",

      codeTitle: "Correct SendGrid SPF record",
      codeLanguage: "DNS TXT",
      code: `example.com TXT "v=spf1 include:_spf.google.com include:sendgrid.net -all"`,

      afterCodeText:
        "This keeps SendGrid in a compact merged policy. If your SPF already has many includes, count total lookup depth after expansion to avoid permerror.",

      wrongExampleTitle: "Wrong setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `example.com TXT "v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org include:amazonses.com include:spf.protection.outlook.com mx a redirect=_spf.example.com -all"`,
      wrongExampleText:
        "This policy can trigger SPF permerror from lookup depth even if each include looks valid on its own. Receivers stop evaluation when SPF limits are exceeded.",

      correctExampleTitle: "Correct setup",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `example.com TXT "v=spf1 include:_spf.google.com include:sendgrid.net -all"`,
      correctExampleText:
        "This reduced policy keeps only active providers and avoids unnecessary lookup-heavy mechanisms, lowering permerror risk while preserving SendGrid authorization.",

      whyTitle: "Why this happens",

      whyText:
        "SendGrid permerror is usually not a SendGrid outage; it is SPF policy complexity. Nested includes, duplicate SPF records, and extra mechanisms can exceed SPF limits or create conflicting policy states. Once evaluation hits those limits, SPF returns permerror instead of pass/fail.",

      problemTitle: "Why this is a problem",

      problemText:
        "When SPF returns permerror, receivers lose a reliable authorization signal and may treat traffic as suspicious. SendGrid transactional and marketing messages can see inconsistent filtering, reduced inbox placement, and DMARC alignment instability.",

      deliverabilityTitle: "How this affects deliverability",

      deliverabilityText:
        "Permerror weakens both SPF trust and downstream DMARC decisions that depend on SPF reliability. Even valid SendGrid traffic can suffer spam placement or enforcement-side failures when SPF evaluation breaks at the policy level.",

      causesTitle: "Common causes",
      causes: [
        "Too many lookup-heavy includes were chained with SendGrid.",
        "Duplicate SPF records created conflicting policy results.",
        "Unnecessary mx/a/redirect mechanisms pushed lookup depth over limits.",
        "Legacy provider includes were never removed after migrations.",
        "Policy complexity increased without lookup testing after each change."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We checked whether SPF evaluation can complete cleanly with one active record and whether include:sendgrid.net appears in a lookup-safe policy. Duplicate records and excessive lookup depth are leading causes of SendGrid SPF permerror.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Does SendGrid SPF permerror mean SendGrid is down?",
          answer:
            "Usually no. It most often means your SPF policy is too complex, duplicated, or exceeds lookup limits."
        },
        {
          question: "Can SendGrid include cause permerror by itself?",
          answer:
            "Not usually. Permerror normally appears when SendGrid is combined with many other lookup-heavy mechanisms."
        },
        {
          question: "How do I reduce permerror risk quickly?",
          answer:
            "Keep one SPF record, remove obsolete providers, reduce lookup-heavy mechanisms, and re-test lookup depth after each change."
        }
      ],

      nextSteps: [
        "Check that only one v=spf1 record exists on the sending domain.",
        "Map active providers and remove stale includes first.",
        "Retain include:sendgrid.net in a simplified merged SPF policy.",
        "Measure effective lookup depth and trim mx/a/redirect where possible.",
        "Re-test SPF and DMARC after propagation to confirm permerror is resolved."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        },
        {
          href: "/spf/sendgrid-spf-not-working",
          label: "SendGrid SPF not working"
        }
      ]
    },

    "spf/mailchimp-spf-not-working": {
      title: "Mailchimp SPF Not Working (Fix SPF Include Setup Fast)",

      intro:
        "Mailchimp SPF fails when include:servers.mcsv.net is missing, published on the wrong domain, or blocked by duplicate SPF records. This often happens when marketing DNS changes are made separately from transactional sender policies. Mailchimp then sends, but SPF does not authorize the actual path cleanly.",

      fixTitle: "One-Minute Fix",

      fixText:
        "Add include:servers.mcsv.net to the existing SPF record on the real sending domain and keep only one SPF TXT record. Merge Mailchimp with other active providers in a single v=spf1 policy.",

      codeTitle: "Correct Mailchimp SPF record",
      codeLanguage: "DNS TXT",
      code: `example.com TXT "v=spf1 include:servers.mcsv.net -all"`,

      afterCodeText:
        "This authorizes Mailchimp for the domain. If multiple services send mail, combine their includes in the same SPF record rather than publishing multiple SPF entries.",

      wrongExampleTitle: "Wrong setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `example.com TXT "v=spf1 include:_spf.google.com -all"
example.com TXT "v=spf1 include:servers.mcsv.net -all"`,
      wrongExampleText:
        "Two SPF records cause policy conflict and can produce SPF permerror. Even with Mailchimp included, receivers may not evaluate SPF reliably.",

      correctExampleTitle: "Correct setup",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `example.com TXT "v=spf1 include:_spf.google.com include:servers.mcsv.net -all"`,
      correctExampleText:
        "This single merged SPF record authorizes both Google Workspace and Mailchimp. Receivers can evaluate one clear policy and Mailchimp traffic can pass SPF.",

      whyTitle: "Why this happens",

      whyText:
        "Mailchimp SPF setup is straightforward, but failures happen when teams add a second SPF record instead of merging mechanisms. Problems also appear when updates are applied to the wrong sending domain or when syntax issues break the final record. SPF supports one policy per domain, so structure matters as much as the include value.",

      problemTitle: "Why this is a problem",

      problemText:
        "If Mailchimp mail fails SPF, campaign traffic can look less trustworthy to receivers and engagement messages can be filtered more aggressively. DMARC alignment can also fail when SPF was expected to provide the aligned path for marketing sends.",

      deliverabilityTitle: "How this affects deliverability",

      deliverabilityText:
        "Marketing mail depends heavily on consistent authentication at scale. Missing or broken Mailchimp SPF authorization can increase spam-folder placement, reduce sender trust, and create DMARC alignment issues across campaign traffic.",

      causesTitle: "Common causes",
      causes: [
        "include:servers.mcsv.net was missing from the active SPF policy.",
        "A duplicate SPF record was added for Mailchimp instead of merging.",
        "SPF changes were applied to the wrong domain or hostname.",
        "Syntax errors in the SPF record caused invalid evaluation.",
        "DNS propagation delays left providers seeing outdated SPF values."
      ],

      checkedTitle: "What we checked",
      checkedText:
        "We checked for one valid v=spf1 record on the sending domain and verified whether include:servers.mcsv.net exists in that active policy. Missing include or duplicate SPF records commonly explain Mailchimp SPF failures.",

      faqTitle: "FAQ",
      faq: [
        {
          question: "Do I need a separate SPF record just for Mailchimp?",
          answer:
            "No. SPF allows one v=spf1 record. Add Mailchimp include to the existing SPF policy and merge other senders there."
        },
        {
          question: "What does include:servers.mcsv.net do?",
          answer:
            "It authorizes Mailchimp’s sending infrastructure defined in its SPF policy to send mail for your domain."
        },
        {
          question: "Why is Mailchimp SPF still failing after updates?",
          answer:
            "The usual causes are duplicate SPF records, wrong domain targeting, syntax issues, or propagation delay on DNS changes."
        }
      ],

      nextSteps: [
        "Send a real Mailchimp campaign/test and confirm the evaluated sending domain.",
        "Add include:servers.mcsv.net to that domain’s existing SPF record.",
        "Merge all providers into one SPF policy and remove duplicates.",
        "Validate SPF syntax and wait for full propagation.",
        "Re-test SPF and DMARC alignment using fresh Mailchimp traffic."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/spf/spf-record-syntax-explained",
          label: "SPF record syntax explained"
        },
        {
          href: "/dmarc/dmarc-alignment-failed",
          label: "DMARC alignment failed"
        }
      ]
    },

    "spf/spf-lookup-checker": {
      title: "SPF Lookup Checker (Tool to Find DNS Lookup Issues)",

      intro:
        "Your SPF record can fail when lookup-heavy mechanisms push evaluation past the 10-DNS-lookup limit. This tool helps you estimate that risk quickly before it turns into SPF permerror in production. A common real-world case is stacking several provider includes plus mx/a without rechecking total lookup depth.",

      fixTitle: "One-Minute Fix",

      fixText:
        "Paste the live SPF record into the checker and review the estimated lookup count. If you are near or above 10, remove unused providers first, trim unnecessary include/mx/a/redirect usage, and keep only active sender paths.",

      codeTitle: "Example SPF record with lookups",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com include:sendgrid.net a mx ~all`,

      afterCodeText:
        "In this example, each include, a, and mx contributes to the DNS lookup budget. The goal is to authorize your real senders while keeping the total number of lookups under the SPF limit.",

      whyTitle: "Why DNS lookups matter for SPF",

      whyText:
        "Receivers must follow each include, mx, a, and redirect during SPF evaluation, and that total work is capped at 10 DNS lookups. One visible include can hide several nested lookups underneath. That is why records that look reasonable at first glance can still fail as permerror.",

      problemTitle: "Why this is a problem",

      problemText:
        "If SPF regularly returns permerror, mailbox providers cannot use it as a reliable signal. That can cause DMARC to fail when SPF was supposed to provide alignment, and it can make otherwise healthy mail streams look unstable or poorly managed.",

      deliverabilityTitle: "How lookup bloat affects deliverability",

      deliverabilityText:
        "From a deliverability perspective, repeated lookup-limit failures weaken authentication trust. SPF instability can increase spam-folder placement and make DMARC results less predictable when SPF was expected to support alignment. Keeping lookup count controlled improves consistent inbox performance.",

      causesTitle: "Common causes",
      causes: [
        "Stacking many ESP includes over time without cleanup.",
        "Keeping old providers in SPF after migrations or sender changes.",
        "Using broad mx and a mechanisms when provider includes already cover sending paths.",
        "Redirect chains that add hidden lookup depth under the top-level record."
      ],

      checkedTitle: "What this page helps you check",
      checkedText:
        "This page does not perform a live DNS query. Instead, it gives you a fast, approximate count of how many DNS lookups your SPF policy is likely to trigger based on commonly costly mechanisms.",

      nextSteps: [
        "Paste the exact live SPF TXT value used in production.",
        "Identify which mechanisms are driving lookup count upward.",
        "Remove obsolete includes and redundant mx/a/redirect usage first.",
        "Re-test after each edit and keep a margin below the 10-lookup cap."
      ],

      hub: {
        href: "/spf",
        label: "SPF Hub"
      },

      related: [
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        },
        {
          href: "/spf/spf-record-too-long",
          label: "SPF record too long"
        }
      ]
    },
  
    "spf/spf-include-flattening": {
      title: "SPF Include Flattening (Guide to Reduce DNS Lookups)",
  
      intro:
        "SPF include flattening replaces lookup-heavy include mechanisms with direct IP ranges to reduce DNS evaluation load. It is most useful when your current record is at risk of exceeding the 10-lookup SPF limit. In practice, this usually appears after several providers were added and nested includes made the policy too deep.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Remove unused providers first, then flatten only the include paths that still keep you over lookup limits. Keep the record focused on active senders and document ownership so flattened IP ranges are updated when providers change.",
  
      codeTitle: "Example flattened SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 ip4:192.0.2.0/24 ip4:198.51.100.5 include:_spf.google.com ~all`,
  
      afterCodeText:
        "This record replaces some include lookups with direct IP ranges while still keeping Google Workspace authorization.",
  
      wrongExampleTitle: "Unflattened SPF example",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org include:amazonses.com ~all`,
  
      wrongExampleText:
        "This configuration may exceed the SPF DNS lookup limit if each include expands into multiple nested lookups.",
  
      correctExampleTitle: "Flattened SPF example",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 ip4:167.89.0.0/17 ip4:192.0.2.0/24 include:_spf.google.com ~all`,
  
      correctExampleText:
        "Flattening replaces nested includes with IP ranges to stay under the 10-lookup SPF limit.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "Many senders rely on provider includes, and each include can expand into further DNS lookups. When several services are combined over time, lookup depth grows invisibly until SPF starts returning permerror. Flattening is a response to that accumulated dependency chain.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "SPF evaluation stops after 10 DNS lookups.",
        "Receivers may return SPF permerror.",
        "Legitimate email may fail authentication.",
        "DMARC alignment may break."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When SPF exceeds lookup limits, receivers can treat the policy as broken and authentication becomes unreliable. That raises spam-folder risk and can weaken DMARC performance when SPF was expected to contribute aligned results. Controlled flattening can restore stable evaluation.",
  
      causesTitle: "Common causes",
      causes: [
        "Too many ESP includes accumulated over time.",
        "Old providers stayed in SPF after they were no longer used.",
        "Nested third-party includes expanded far beyond expected lookup depth.",
        "No periodic review of lookup count after onboarding new sender tools."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We evaluated whether the SPF policy structure is likely to exceed the 10-DNS-lookup limit and whether flattening is being used to reduce that complexity.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "Does SPF flattening always improve deliverability?",
          answer:
            "Not automatically. It mainly helps when your SPF policy is too lookup-heavy. If done badly, flattened records can become outdated and break legitimate mail."
        },
        {
          question: "Is manual flattening risky?",
          answer:
            "Yes. If provider IP ranges change and you do not update the flattened record, mail that used to pass SPF may start failing."
        },
        {
          question: "When should I flatten SPF?",
          answer:
            "Flatten SPF when cleanup alone is not enough and your policy is close to or above the 10-lookup limit."
        }
      ],
  
      nextSteps: [
        "Measure current lookup depth from the live SPF record.",
        "Prune obsolete providers before flattening active ones.",
        "Flatten only the include chains that still exceed limits.",
        "Set an owner and review cadence to keep flattened IPs current.",
        "Re-test SPF and DMARC after each change to confirm stability."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/spf/spf-redirect-explained",
          label: "SPF redirect explained"
        }
      ]
    },
  
    "spf/spf-ipv6-misconfiguration": {
      title: "SPF IPv6 Misconfiguration (Fix SPF IPv6 Errors Fast)",
  
      intro:
        "SPF IPv6 misconfiguration happens when a domain sends email from IPv6-enabled infrastructure but the SPF record does not authorize the correct IPv6 ranges. SPF checks the actual connecting IP address, so if a provider sends over IPv6 and your record only covers IPv4, authentication can fail even though the sender itself is legitimate.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Make sure your SPF record includes the correct ip6 mechanisms or a provider include that already covers the IPv6 sending ranges.",
  
      codeTitle: "Correct IPv6 SPF entry",
      codeLanguage: "DNS TXT",
      code: `v=spf1 ip6:2001:db8::/32 include:_spf.google.com ~all`,
  
      afterCodeText:
        "Use the exact IPv6 range published by the provider or relay that actually sends your mail. Do not guess the network block.",
  
      wrongExampleTitle: "Wrong IPv6 setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 ip4:198.51.100.10 ~all`,
      wrongExampleText:
        "This can be incomplete if your email provider also delivers mail over IPv6. SPF may pass on IPv4 but fail on IPv6.",
  
      correctExampleTitle: "Correct IPv6-aware setup",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 ip4:198.51.100.10 ip6:2001:db8::/32 ~all`,
      correctExampleText:
        "This covers both IPv4 and IPv6 paths, which is important if your sender uses dual-stack infrastructure.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "Many domains were originally configured when IPv4 was the default assumption. Later, the mail provider or relay starts using IPv6 for part of its delivery path, but SPF is never updated to reflect that change.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "SPF may pass on IPv4 but fail on IPv6 for the same sender.",
        "Authentication results become inconsistent between recipients.",
        "DMARC may fail when SPF was expected to provide alignment.",
        "Troubleshooting becomes confusing because the sender appears valid in some places but not others."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When IPv6 mail is not authorized in SPF, mailbox providers may see inconsistent authentication behavior from the same domain. That weakens trust and can make inbox placement less stable.",
  
      causesTitle: "Common causes",
      causes: [
        "The provider sends over IPv6 but SPF only lists IPv4 mechanisms.",
        "An incorrect or incomplete ip6 range was pasted into DNS.",
        "A relay or secure gateway changed outbound delivery to IPv6.",
        "A provider include was replaced with manual SPF entries that no longer cover both IP families."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed whether the SPF policy is capable of authorizing the actual sending path, including IPv6 where relevant, rather than only an older IPv4-only path.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "Do I always need ip6 in SPF?",
          answer:
            "No. You only need ip6 if your provider or relay actually sends mail from IPv6 addresses."
        },
        {
          question: "Can I use a provider include instead of manual ip6 entries?",
          answer:
            "Yes. In many cases that is safer, because the provider maintains the underlying IP ranges for you."
        },
        {
          question: "Why does SPF pass for some emails but fail for others?",
          answer:
            "One common reason is that some messages go out over IPv4 while others leave through IPv6, and your SPF record only covers one of those paths."
        }
      ],
  
      nextSteps: [
        "Confirm whether your sending provider or relay uses IPv6 at all.",
        "Collect a real sending IP from headers before editing SPF.",
        "Add the correct ip6 mechanism or restore the provider include.",
        "Remove outdated IPv6 entries that do not match your current mail flow.",
        "Send a fresh test email and verify SPF from real headers."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-softfail-vs-fail",
          label: "SPF softfail vs fail"
        },
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        }
      ]
    },
  
    "spf/spf-neutral-result-explained": {
      title: "SPF Neutral Result Explained (Fix & Improve Deliverability)",
  
      intro:
        "An SPF neutral result means your policy does not make a clear authorization decision for unmatched senders. This most often happens when the record ends with ?all. In production, neutral gives receivers weak guidance and reduces SPF’s value as a trust signal.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Replace ?all with ~all or -all after confirming your active senders. Use ~all during transition and move to -all once Google Workspace, Microsoft 365, SendGrid, and any other real sender paths are fully covered.",
  
      codeTitle: "Neutral SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com ?all`,
  
      afterCodeText:
        "A neutral policy tells the receiver you are not making a meaningful statement about unauthorized senders. That is usually too weak for production use.",
  
      wrongExampleTitle: "Neutral policy",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com ?all`,
      wrongExampleText:
        "This leaves SPF in a weak, non-committal state. It rarely helps real-world anti-spoofing or deliverability.",
  
      correctExampleTitle: "Clearer softfail policy",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com ~all`,
      correctExampleText:
        "This gives receivers a clearer policy signal while still being safer than a hard fail during rollout.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "Neutral is often left behind after testing or copied from outdated setup guides. Teams postpone tightening because sender inventory is incomplete, so ?all remains in production longer than intended.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Neutral does not clearly authorize legitimate senders.",
        "It gives mailbox providers little anti-spoofing value.",
        "It can make teams think SPF is configured well when it is still weak.",
        "It reduces the usefulness of SPF as a trust signal."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Mailbox providers trust domains more when SPF gives clear policy decisions. Neutral outcomes can weaken sender reputation signals, increase spam-folder risk in borderline cases, and reduce DMARC confidence when SPF was expected to contribute meaningful alignment.",
  
      causesTitle: "Common causes",
      causes: [
        "The record still ends with ?all from an early testing phase.",
        "A temporary rollout policy was never tightened after onboarding providers.",
        "An outdated template or tutorial was copied directly into production DNS.",
        "Sender inventory remained incomplete, so teams avoided switching to ~all or -all."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the final SPF qualifier and whether the published policy makes a clear authorization decision or leaves the sender posture in a neutral state.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "Is neutral SPF the same as pass?",
          answer:
            "No. Neutral is not a positive authorization result. It simply means the domain is not making a strong claim."
        },
        {
          question: "Should I use ~all or -all instead?",
          answer:
            "Usually yes. Use ~all while you are still verifying senders, then move to -all once the record is complete and stable."
        },
        {
          question: "Does ?all hurt deliverability?",
          answer:
            "It can. It usually does not block mail directly, but it weakens SPF as a useful trust signal."
        }
      ],
  
      nextSteps: [
        "Audit all active sender services and verify each is represented in SPF.",
        "Replace ?all with ~all first if you need a controlled transition.",
        "Move to -all only after repeated tests confirm full sender coverage.",
        "Validate SPF and DMARC results from real headers after changes.",
        "Monitor deliverability for a few days to catch missed senders early."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-softfail-vs-fail",
          label: "SPF softfail vs fail"
        },
        {
          href: "/spf/spf-redirect-explained",
          label: "SPF redirect explained"
        },
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        }
      ]
    },
  
    "spf/spf-permerror-too-many-dns-lookups": {
      title: "SPF Permerror: Too Many DNS Lookups (Fix Guide)",
      description:
        "Fix SPF permerror caused by too many DNS lookups. Learn how to reduce includes, simplify SPF records, and restore deliverability fast.",
  
      intro:
        "SPF evaluation breaks when your record triggers more than 10 DNS lookups. Once that limit is exceeded, receivers return permerror instead of a normal pass, fail, or softfail result. The hidden cause is often nested includes, where one visible provider include expands into several additional DNS queries underneath. This is common on growing domains that add providers over time without SPF cleanup.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Start by removing unused providers first, then simplify the SPF policy so total DNS lookups stay under 10. Focus on lookup-heavy mechanisms like include, mx, a, and redirect, and keep only what active senders actually require before considering flattening.",
  
      codeTitle: "Example optimized SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
  
      afterCodeText:
        "A shorter-looking record is not always enough on its own. What matters is the total effective lookup chain after nested includes are expanded.",
  
      wrongExampleTitle: "Lookup-heavy SPF example",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org include:amazonses.com mx a redirect=_spf.example.com ~all`,
      wrongExampleText:
        "This kind of SPF policy may exceed the lookup limit once nested includes and other mechanisms are fully evaluated.",
  
      correctExampleTitle: "Simplified SPF example",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
      correctExampleText:
        "A cleaned-up policy with fewer dependencies is easier for receivers to evaluate and less likely to trigger SPF permerror.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "SPF lookup limits are easy to exceed because one visible include can expand into multiple DNS lookups underneath it. A record that looks short can still exceed the limit after nested vendor includes, mx/a checks, and redirects are fully evaluated. Over time, providers and legacy senders accumulate until SPF crosses the threshold and fails.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "SPF evaluation fails with permerror instead of a usable result.",
        "Legitimate mail can lose SPF authentication.",
        "DMARC alignment may fail when SPF was the expected path.",
        "Authentication becomes inconsistent between mailbox providers."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When SPF returns permerror, mailbox providers see a broken authentication layer rather than a deliberate sender policy. In real traffic, that can break DMARC alignment when SPF was expected to provide the aligned pass path. The result is weaker trust, higher spam-folder risk, and more inconsistent filtering decisions across providers.",
  
      causesTitle: "Common causes",
      causes: [
        "Too many old ESPs and sending tools were left in SPF after provider changes.",
        "Nested vendor includes expanded one visible include into several hidden DNS lookups.",
        "mx and a mechanisms were used broadly even when provider includes were sufficient.",
        "Redirect chains introduced extra policy hops and pushed total lookups over the limit."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We evaluated whether the SPF policy structure is likely to exceed the 10-DNS-lookup limit once includes, redirects, and other lookup-based mechanisms are fully expanded.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "Can a short SPF record still exceed 10 lookups?",
          answer:
            "Yes. A short-looking record can still fail if the include mechanisms underneath it expand into many nested lookups."
        },
        {
          question: "Does SPF permerror always mean the syntax is wrong?",
          answer:
            "No. The syntax may be valid, but the evaluation path can still exceed the DNS lookup limit."
        },
        {
          question: "How do I fix SPF permerror?",
          answer:
            "Remove obsolete services, simplify the record, and flatten only when necessary so the total lookup count stays under ten."
        }
      ],
  
      nextSteps: [
        "Map each SPF mechanism to an active sender and remove anything no longer in use.",
        "Count estimated lookups after expansion, not just top-level includes.",
        "Trim unnecessary mx, a, and redirect usage where simpler authorization works.",
        "Keep only required providers, then flatten specific includes only if still over limit.",
        "Re-test SPF and DMARC alignment after DNS propagation to confirm permerror is gone."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        },
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/spf/spf-redirect-explained",
          label: "SPF redirect explained"
        }
      ]
    },
  
    "spf/spf-redirect-explained": {
      title: "SPF Redirect Explained (Fix SPF Redirect Issues)",
  
      intro:
        "SPF redirect replaces your domain’s local SPF logic with another domain’s policy, and misuse can break authorization unexpectedly. Unlike include, redirect does not merge rules; it hands full control to the target policy. This often causes confusion during migrations where teams expect local and redirected rules to work together.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Use redirect only when a central domain should fully own SPF for this domain. If you still need local sender rules (for example local relay IPs plus provider includes), use include instead of redirect.",
  
      codeTitle: "SPF redirect example",
      codeLanguage: "DNS TXT",
      code: `v=spf1 redirect=_spf.example.com`,
  
      afterCodeText:
        "A redirect means the target domain becomes the SPF policy for the current domain. It does not combine with local mechanisms the way include does.",
  
      wrongExampleTitle: "Wrong use of redirect",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 ip4:198.51.100.10 redirect=_spf.example.com`,
      wrongExampleText:
        "This is usually conceptually wrong if you expect both the local IP and the redirected domain to be evaluated together. Redirect is not meant to work like include.",
  
      correctExampleTitle: "Correct redirect pattern",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 redirect=_spf.example.com`,
      correctExampleText:
        "Use redirect when another domain should fully own SPF logic for this domain.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "Redirect errors usually happen when inherited DNS records are edited without understanding how redirect differs from include. During shared-policy setups or migrations, teams may publish redirect where include was intended, accidentally removing local authorization logic.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Redirect can accidentally remove expected local SPF logic.",
        "Troubleshooting becomes harder because authorization lives on another domain.",
        "A broken redirected policy can affect several dependent domains at once.",
        "Teams often mistake redirect for include and publish the wrong SPF behavior."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Redirect centralizes SPF dependency, so mistakes in the target policy propagate to every dependent domain. If that target policy is stale or malformed, SPF can fail broadly, increasing spam placement risk and weakening DMARC outcomes where SPF alignment was expected.",
  
      causesTitle: "Common causes",
      causes: [
        "Redirect was published where include should have been used.",
        "A legacy shared-policy record was copied without understanding behavior changes.",
        "Subdomains were pointed at a central redirect target with incompatible policy.",
        "The target policy changed and silently broke dependent domains."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed whether the SPF record uses redirect appropriately and whether the domain should really inherit another domain's full SPF policy instead of using include.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "What is the difference between include and redirect?",
          answer:
            "Include adds another domain's SPF logic into your policy. Redirect replaces your local SPF policy with another domain's policy."
        },
        {
          question: "Can I keep local rules and use redirect too?",
          answer:
            "Usually that is not what you want. If you need local rules plus another provider, include is generally the better mechanism."
        },
        {
          question: "When is SPF redirect useful?",
          answer:
            "It is useful when several domains intentionally inherit one central SPF policy and no local sender rules need to remain active."
        }
      ],
  
      nextSteps: [
        "Confirm whether this domain truly needs full policy inheritance.",
        "Switch to include if local sender logic must remain active.",
        "Validate the target SPF record and its lookup depth before redirecting.",
        "Document all domains that depend on the redirect target.",
        "Re-test SPF and DMARC whenever the target policy changes."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-softfail-vs-fail",
          label: "SPF softfail vs fail"
        },
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        }
      ]
    },
  
    "spf/spf-softfail-vs-fail": {
      title: "SPF Softfail vs Fail (Guide to Fix SPF Policy)",
  
      intro:
        "SPF softfail and fail both signal unauthorized sending, but they are enforced at different strength levels. Softfail (`~all`) means probably unauthorized, while fail (`-all`) means definitively unauthorized by policy. Choosing the wrong qualifier can either block real mail or leave spoofing controls too weak.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Use ~all while you validate sender coverage, then move to -all only after confirming every legitimate sender path is included. Test real traffic from each provider before tightening enforcement.",
  
      codeTitle: "Softfail example",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com ~all`,
  
      afterCodeText:
        "Softfail is often the safer rollout stage because it gives you room to verify sender coverage before enforcing a hard fail posture.",
  
      wrongExampleTitle: "Hard fail example",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com -all`,
      wrongExampleText:
        "This is not wrong in itself, but it becomes risky if your SPF record does not yet include every legitimate sender.",
  
      correctExampleTitle: "Safer rollout example",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com ~all`,
      correctExampleText:
        "Softfail is often the better starting point while you audit mail flow and verify every valid sending source.",
  
      whyTitle: "Why this matters",
  
      whyText:
        "This issue appears when qualifier choice does not match sender maturity. Moving to -all too early can fail legitimate traffic, while staying on ~all too long can reduce anti-spoofing strength and policy clarity.",
  
      problemTitle: "Impact on deliverability",
  
      problemPoints: [
        "A hard fail policy can block legitimate mail if SPF is incomplete.",
        "A softfail policy is safer during rollout but offers weaker enforcement.",
        "The wrong qualifier creates either delivery risk or weaker spoofing protection.",
        "Mailbox providers look for consistent, deliberate authentication behavior."
      ],
  
      deliverabilityTitle: "How mailbox providers interpret this",
  
      deliverabilityText:
        "Providers reward accurate authentication, not strictness alone. A correct -all policy improves trust, but an inaccurate one can trigger delivery failures and DMARC issues for real traffic. A staged transition from ~all to -all usually gives safer deliverability outcomes.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain remained in long-term rollout mode with ~all.",
        "Teams moved to -all before mapping every sender path.",
        "A forgotten provider or relay still sends mail outside SPF coverage.",
        "Qualifier intent (~all vs -all) was misunderstood during DNS edits."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the qualifier at the end of the SPF record and whether the policy strength matches the maturity of the domain's sender inventory.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "Is -all always better than ~all?",
          answer:
            "No. It is only better when your SPF record is complete and you are confident no legitimate sender is missing."
        },
        {
          question: "When should I use ~all?",
          answer:
            "Use ~all while you are still validating all real senders and want a safer transition phase."
        },
        {
          question: "Can moving to -all hurt delivery?",
          answer:
            "Yes. If any real sender is missing from SPF, those messages can fail more aggressively."
        }
      ],
  
      nextSteps: [
        "Inventory active sender services and confirm each is in SPF.",
        "Check live headers from each sender to validate SPF pass behavior.",
        "Use ~all until test traffic is stable across all providers.",
        "Move to -all only after repeated validation with no misses.",
        "Monitor DMARC/SPF results after switching qualifiers."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-neutral-result-explained",
          label: "SPF neutral result explained"
        },
        {
          href: "/spf/spf-redirect-explained",
          label: "SPF redirect explained"
        },
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        }
      ]
    },
  
    "spf/spf-record-syntax-error": {
      title: "SPF Syntax Error (Fix SPF Record Format Fast)",
  
      intro:
        "Your SPF record cannot be parsed because the published format is invalid. SPF syntax is strict, so a missing colon, typo in a mechanism name, or extra space can break evaluation. Common examples include writing include _spf.google.com instead of include:_spf.google.com, misspelling include, or malformed qualifier endings. When parsing fails, receivers cannot produce a normal pass, fail, or softfail SPF result.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Fix the live SPF TXT record directly by correcting typos, colons, qualifiers, and spacing mistakes. If needed, compare the published record character by character against a known-good SPF example to catch subtle formatting issues quickly.",
  
      codeTitle: "Valid SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com -all`,
  
      afterCodeText:
        "Each mechanism must be spelled correctly and follow the expected pattern. Include requires a colon immediately after the keyword with no space, then the domain.",
  
      wrongExampleTitle: "Invalid syntax",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include _spf.google.com -all`,
      wrongExampleText:
        "This is wrong because include requires a colon before the domain. Without it, receivers cannot parse the record as valid SPF.",
  
      correctExampleTitle: "Valid syntax",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com -all`,
      correctExampleText:
        "The colon directly after include and no stray spaces let receivers parse the record correctly.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "Syntax errors often creep in when records are hand-edited, copied from incomplete documentation, or migrated between DNS providers. SPF parsers are unforgiving: one tiny formatting mistake can invalidate the entire record. A trailing space, missing colon, wrong qualifier, or typo such as inclide instead of include is enough to make SPF unusable.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Receivers cannot evaluate the SPF policy and may return permerror or ignore the record.",
        "Legitimate mail loses SPF authentication even when the intent of the policy is correct.",
        "DMARC alignment can fail when SPF cannot provide a usable result.",
        "Troubleshooting becomes harder because the policy looks present but is unusable."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When SPF cannot be parsed, mailbox providers see broken authentication rather than a valid sender policy. That increases spam-folder risk for legitimate traffic and can weaken domain trust over time. It can also impact DMARC outcomes when SPF was expected to help provide an aligned pass path.",
  
      causesTitle: "Common causes",
      causes: [
        "The SPF record was hand-edited in DNS and small format mistakes were introduced.",
        "The value was copy-pasted from incomplete or incorrect documentation.",
        "Invisible characters or smart punctuation were inserted during copy/paste.",
        "A DNS provider migration changed record formatting or split strings unexpectedly."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We inspected the SPF TXT record for syntax validity. If mechanisms are malformed or the record does not follow the SPF specification, we report a syntax error.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "Can a single typo break the whole SPF record?",
          answer:
            "Yes. SPF parsers expect exact mechanism names and structure. One typo or formatting error can cause the entire record to be treated as invalid."
        },
        {
          question: "How do I find syntax errors in my SPF record?",
          answer:
            "Use an SPF validation tool to check your published TXT record. Look for missing colons, extra spaces, or misspelled mechanisms."
        },
        {
          question: "Is SPF syntax error the same as permerror?",
          answer:
            "Not always. Syntax errors often lead to permerror, but permerror can also come from other issues such as too many DNS lookups."
        }
      ],
  
      nextSteps: [
        "Copy the exact SPF TXT value from live DNS before editing anything.",
        "Compare it character by character against a valid SPF format and provider docs.",
        "Fix one issue at a time (colons, typos, qualifiers, and spacing), then save.",
        "Wait for DNS propagation and query the record from an external resolver.",
        "Re-run SPF and DMARC checks to confirm parsing now succeeds end-to-end."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        },
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        }
      ]
    },
  
    "spf/spf-softfail-explained": {
      title: "SPF Softfail Explained (Fix & Improve Deliverability)",
      description:
        "SPF softfail explained. Learn how to fix ~all policy, strengthen SPF records, and improve email deliverability and authentication.",
  
      intro:
        "SPF softfail means the sending IP did not match authorized SPF mechanisms and your policy ended with ~all. It is a warning-level failure, not a hard block, so unauthorized traffic may still be accepted but treated with less trust. This is common during staged rollouts before sender inventory is fully verified.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Confirm whether softfail is intentional for your current rollout stage. If yes, keep `~all` and complete sender validation; if coverage is stable, move to `-all` for stronger enforcement.",
  
      codeTitle: "Softfail SPF example",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com ~all`,
  
      afterCodeText:
        "The ~all qualifier tells receivers that IPs not matching your mechanisms should be treated as probably unauthorized, but not as a definite denial.",
  
      wrongExampleTitle: "Missing qualifier",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com`,
      wrongExampleText:
        "An SPF record without an all mechanism does not tell receivers what to do with unmatched IPs. Most parsers default to neutral, which weakens the policy.",
  
      correctExampleTitle: "Softfail policy",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com ~all`,
      correctExampleText:
        "This explicitly uses softfail so receivers get a clear policy signal while you retain flexibility during sender verification.",
  
      whyTitle: "Why this matters",
  
      whyText:
        "Softfail is used to reduce accidental blocking while teams map all legitimate senders. Problems appear when ~all is left in place indefinitely or when sender coverage is incomplete and results stay noisy.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Softfail by itself is not a problem. It becomes one if you stay at ~all indefinitely when hard fail would be appropriate.",
        "Some receivers may treat softfail and fail differently for filtering decisions.",
        "Domains that never tighten beyond softfail may leave spoofing protection weaker than intended.",
        "Teams sometimes misunderstand when to move from ~all to -all."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Softfail can work during transition, but persistent softfail outcomes weaken trust signals. That can increase spam-folder risk for borderline traffic and reduce DMARC reliability when SPF is expected to support alignment consistently.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain stayed in rollout mode with ~all longer than intended.",
        "Not all legitimate senders were validated before enforcing policy.",
        "Third-party systems were added without SPF updates.",
        "Operational caution delayed transition from softfail to fail."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed whether your SPF record ends with a valid all qualifier and whether the chosen qualifier (softfail, fail, or neutral) matches your stated policy intent.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "When should I use softfail instead of hard fail?",
          answer:
            "Use softfail when you are still verifying all legitimate senders or want a safer transition. Move to hard fail only when your record is complete and trusted."
        },
        {
          question: "Does softfail hurt deliverability?",
          answer:
            "No. Softfail is a valid policy. The risk is staying at softfail too long when hard fail would better protect your domain from spoofing."
        },
        {
          question: "How do I know when to switch from ~all to -all?",
          answer:
            "Once you have inventoried every legitimate sender, verified that approved mail passes SPF, and removed obsolete providers, you can safely move to -all."
        }
      ],
  
      nextSteps: [
        "Audit all legitimate senders and verify SPF coverage.",
        "Inspect live headers to identify recurring softfail sources.",
        "Add missing providers or IP paths causing false softfails.",
        "Move to -all when legitimate traffic is consistently passing.",
        "Track DMARC/SPF trends after policy changes."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-softfail-vs-fail",
          label: "SPF softfail vs fail"
        },
        {
          href: "/spf/spf-neutral-result-explained",
          label: "SPF neutral result explained"
        },
        {
          href: "/spf/spf-redirect-explained",
          label: "SPF redirect explained"
        }
      ]
    },
  
    "spf/spf-missing-all-mechanism": {
      title: "SPF Missing All Mechanism (Fix SPF Policy Ending)",
  
      intro:
        "An SPF record without a final all mechanism is incomplete and leaves unmatched senders without a clear policy outcome. Receivers may treat this as neutral or weakly defined behavior, which reduces SPF usefulness. This commonly happens when teams copy only provider includes and forget to add ~all or -all at the end.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Add a final all qualifier to the end of the live SPF record: use ~all during rollout and move to -all when sender coverage is verified. Keep it as the last mechanism in the record.",
  
      codeTitle: "SPF with all mechanism",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com ~all`,
  
      afterCodeText:
        "The all mechanism is required for a complete SPF policy. Without it, receivers cannot interpret how to treat unmatched IPs.",
  
      wrongExampleTitle: "Record without all",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net`,
      wrongExampleText:
        "This record authorizes Google and SendGrid but does not define what happens for other IPs. Receivers may default to neutral, which weakens the policy.",
  
      correctExampleTitle: "Record with all",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
      correctExampleText:
        "Adding ~all defines the default for unmatched IPs and gives receivers a clear, complete policy.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "This usually happens when SPF is built incrementally and the final qualifier is accidentally omitted. Provider snippets often show include lines only, and manual edits can leave records published without a terminating all policy.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Receivers cannot apply a consistent default for unauthorized IPs.",
        "SPF may evaluate as neutral instead of softfail or fail for spoofed traffic.",
        "DMARC alignment can be harder to achieve when SPF results are ambiguous.",
        "The policy looks incomplete and may reduce trust with mailbox providers."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Incomplete SPF policy signals can lead to inconsistent authentication handling across receivers. That weakens anti-spoofing, increases spam-folder risk, and can reduce DMARC reliability when SPF is expected to produce clear aligned outcomes.",
  
      causesTitle: "Common causes",
      causes: [
        "Provider documentation snippets were copied without a final all qualifier.",
        "Manual DNS edits removed the ending mechanism accidentally.",
        "Migration or cleanup truncated the record before the final qualifier.",
        "An outdated template omitted the required all mechanism."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We verified whether your SPF record ends with a valid all mechanism (~all, -all, ?all, or +all). Records without all are reported as incomplete.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "What is the difference between ~all and -all?",
          answer:
            "~all (softfail) means probably not authorized. -all (hard fail) means definitely not authorized. Use ~all during rollout; -all when your sender list is complete."
        },
        {
          question: "Can I use ?all or +all instead?",
          answer:
            "?all is neutral and usually too weak. +all means all IPs pass, which defeats SPF. In practice, use ~all or -all."
        },
        {
          question: "Where exactly does all go in the record?",
          answer:
            "The all mechanism must be the last mechanism in the record, after all include, ip4, ip6, and other mechanisms."
        }
      ],
  
      nextSteps: [
        "Inspect the live SPF record and confirm whether it ends with all.",
        "Add ~all or -all based on rollout readiness.",
        "Revalidate sender coverage before switching to strict fail mode.",
        "Publish and verify external DNS propagation.",
        "Retest SPF and DMARC results to confirm policy clarity."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-softfail-explained",
          label: "SPF softfail explained"
        },
        {
          href: "/spf/spf-softfail-vs-fail",
          label: "SPF softfail vs fail"
        },
        {
          href: "/spf/spf-neutral-result-explained",
          label: "SPF neutral result explained"
        }
      ]
    },
  
    "spf/spf-ip-not-authorized": {
      title: "SPF IP Not Authorized (Fix SPF Sender Alignment)",
  
      intro:
        "SPF IP not authorized means the server that sent your email is not listed in your SPF record. SPF checks the connecting IP address against the mechanisms in your policy. If the IP does not match any include, ip4, ip6, mx, or a mechanism, SPF fails. This often happens when a new sending service was added without updating SPF, when a relay or gateway changed its outbound IPs, or when the wrong IP range was published in DNS.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Identify the actual sending IP from your message headers, then add that IP or the correct provider include to your SPF record.",
  
      codeTitle: "SPF authorizing an IP range",
      codeLanguage: "DNS TXT",
      code: `v=spf1 ip4:198.51.100.0/24 include:_spf.google.com ~all`,
  
      afterCodeText:
        "Use the exact IP or range published by your provider. Do not guess. Check your provider's documentation or use a header analyzer to get the real connecting IP.",
  
      wrongExampleTitle: "Missing sender IP",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com -all`,
      wrongExampleText:
        "If your mail goes through a relay or gateway that uses different IPs than Google's include, those IPs are not authorized and SPF will fail.",
  
      correctExampleTitle: "Including relay IPs",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 ip4:198.51.100.10 include:_spf.google.com ~all`,
      correctExampleText:
        "Adding the actual sending IP or the provider include that covers it ensures SPF passes for your legitimate traffic.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "SPF evaluates the connecting IP, not the From address. When you add a new ESP, change relays, or move to a different outbound path, the IP that connects to the receiving server may no longer be covered by your existing SPF record.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Legitimate mail fails SPF even though it comes from your approved systems.",
        "DMARC may fail when SPF was expected to provide alignment.",
        "Receivers may treat the message as unauthenticated or spoofed.",
        "Troubleshooting is confusing if you assume your SPF record covers all senders."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When SPF fails because the sending IP is unauthorized, receivers treat mail as unauthenticated or suspicious. That can cause spam placement, throttling, and DMARC failures when SPF should have provided aligned authentication. Correct IP authorization restores trust and stabilizes filtering.",
  
      causesTitle: "Common causes",
      causes: [
        "A new email provider or relay was added without updating SPF.",
        "The provider changed its outbound IP ranges and the include or IP list was not updated.",
        "Mail goes through a secure gateway or third-party relay with different IPs.",
        "The wrong IP range was copied from documentation or a generic example."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We compared the connecting IP from your mail flow against the mechanisms in your SPF record. If the IP does not match any authorized mechanism, we report SPF IP not authorized.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "How do I find the IP that is failing SPF?",
          answer:
            "Look at the Received headers or use a header analyzer. The IP in the final receiving server's Received line is the one SPF checks."
        },
        {
          question: "Should I add the IP directly or use an include?",
          answer:
            "Prefer an include when the provider maintains the IP list. Add ip4 or ip6 only when you have a fixed, provider-published range and no include is available."
        },
        {
          question: "Can multiple IPs cause SPF to fail?",
          answer:
            "Yes. If your mail can originate from several IPs (e.g. load-balanced relays), each must be covered by your SPF record."
        }
      ],
  
      nextSteps: [
        "Extract the actual connecting IP from a recent message's headers.",
        "Check whether your provider has an include that covers that IP.",
        "Add the include or the correct ip4/ip6 mechanism to your SPF record.",
        "Remove obsolete IP ranges that no longer send mail.",
        "Re-send a test message and verify SPF passes in the headers."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-ipv6-misconfiguration",
          label: "SPF IPv6 misconfiguration"
        },
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        },
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        }
      ]
    },
  
    "spf/spf-record-too-long": {
      title: "SPF Record Too Long (Fix DNS Length Error Fast)",
  
      intro:
        "Your SPF record is too long or too bloated for reliable DNS handling. Records this size are more likely to be split, truncated, or parsed inconsistently across resolvers, which can break SPF evaluation. Long SPF policies also often hide nested lookup problems that surface later as permerror. This usually happens after providers are added over time without cleanup.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Start by removing obsolete providers and stale mechanisms, then shorten the SPF policy to only active senders. Keep includes lean, trim unnecessary IP entries, and only consider flattening if cleanup still leaves the record too long.",
  
      codeTitle: "Shorter SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
  
      afterCodeText:
        "Keeping the record under 255 characters per TXT string avoids truncation. Use flattening or provider consolidation when you have many includes.",
  
      wrongExampleTitle: "Overlong SPF record",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org include:amazonses.com include:spf.protection.outlook.com include:_spf1.constantcontact.com include:spf.mtasv.net ~all`,
      wrongExampleText:
        "This record may exceed safe TXT length and can be truncated by some DNS systems. Long records also increase the risk of exceeding the SPF lookup limit.",
  
      correctExampleTitle: "Consolidated record",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
      correctExampleText:
        "A shorter record with only active providers stays within DNS limits and is easier to maintain.",
  
      whyTitle: "Why this happens",
  
      whyText:
        "Long SPF records usually appear after domains add many ESPs, marketing tools, relays, and manual exceptions over months or years. Each new provider adds more text, and old providers are often left behind. Once you approach TXT string limits, records become harder to maintain, easier to break, and more likely to behave inconsistently across DNS systems.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Truncated records may omit critical mechanisms, causing SPF to fail for legitimate senders.",
        "Some DNS providers reject or mishandle very long TXT records.",
        "Long records often correlate with high lookup counts, increasing permerror risk.",
        "Maintenance becomes harder as the record grows."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When an SPF record is truncated or parsed incorrectly due to length, receivers may evaluate an incomplete policy or fail parsing entirely. That breaks authentication, increases spam-folder risk, and can negatively impact DMARC when SPF was expected to support alignment. Keeping SPF compact improves reliability across providers and reduces unpredictable filtering.",
  
      causesTitle: "Common causes",
      causes: [
        "Too many ESPs and sending platforms were added over time without consolidation.",
        "Old providers were never removed after migrations or provider changes.",
        "Too many manual IP ranges were added for temporary exceptions and never cleaned up.",
        "Bloated include chains were added without checking total record size or lookup impact."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We measured the length of your SPF record and whether it fits within typical DNS TXT limits. Records that exceed safe length or are split across too many strings may cause parsing issues.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "What is the maximum SPF record length?",
          answer:
            "DNS TXT strings are typically limited to 255 characters per string. SPF can use multiple strings, but long records increase truncation and lookup risks."
        },
        {
          question: "Should I flatten includes to shorten the record?",
          answer:
            "Flattening can shorten the visible record, but flattened IPs can become stale. Prefer removing obsolete providers first; flatten only when necessary."
        },
        {
          question: "Can I split SPF across multiple TXT records?",
          answer:
            "No. SPF allows one logical record that may be split into multiple DNS strings, but you cannot have multiple SPF policies. Merging into one record is required."
        }
      ],
  
      nextSteps: [
        "Export the live SPF TXT value and map each mechanism to a real active sender.",
        "Remove obsolete includes, old ESPs, and temporary manual IP entries first.",
        "Re-check total length and lookup impact after each cleanup pass.",
        "Use flattening only for specific remaining includes if the record is still too large.",
        "Re-test SPF parsing and DMARC alignment after DNS propagation to confirm stability."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-include-flattening",
          label: "SPF include flattening"
        },
        {
          href: "/spf/multiple-spf-records-found",
          label: "Multiple SPF records found"
        }
      ]
    },
  
    "spf/spf-record-example": {
      title: "SPF Record Example (Guide to Valid SPF Setup)",
  
      intro:
        "SPF examples help you avoid syntax and policy mistakes that break authentication in production. Each example here is practical, but you must adapt it to your real senders and publish only one SPF record for the domain. Common setups include Google Workspace, Microsoft 365, SendGrid, and hybrid combinations.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Pick the example closest to your mail flow, replace placeholders with the exact provider mechanisms, and publish one final v=spf1 TXT record at the root domain. Merge all active providers into that single policy.",
  
      codeTitle: "Google Workspace only",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com ~all`,
  
      afterCodeText:
        "This authorizes Google's mail servers to send for your domain. For Microsoft 365 only, use include:spf.protection.outlook.com. For both, merge the includes into one record.",
  
      wrongExampleTitle: "Generic or incomplete example",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:example.com ~all`,
      wrongExampleText:
        "This is wrong because example.com is a placeholder. The include hostname must be the exact value published by your provider, such as _spf.google.com or spf.protection.outlook.com.",
  
      correctExampleTitle: "Google + SendGrid hybrid",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
      correctExampleText:
        "This pattern works when both Google Workspace and SendGrid send mail for your domain. Add one include per provider and end with ~all or -all.",
  
      whyTitle: "Why examples matter",
  
      whyText:
        "Teams often copy partial snippets or outdated include hostnames, which leads to invalid or incomplete SPF. Reliable examples reduce guesswork and show the correct structure for both single-provider and hybrid sender setups.",
  
      problemTitle: "Why getting the example wrong is a problem",
  
      problemPoints: [
        "Wrong include hostnames cause SPF to fail for legitimate senders.",
        "Multiple records lead to permerror instead of pass or fail.",
        "Missing or wrong qualifiers leave policy ambiguous for receivers.",
        "Using a generic template without adapting it breaks authentication."
      ],
  
      deliverabilityTitle: "How correct examples help deliverability",
  
      deliverabilityText:
        "Receivers expect SPF to authorise the actual sending IPs. When your record matches a proven pattern and uses the correct include hostnames, authentication passes consistently and DMARC alignment becomes easier to achieve.",
  
      causesTitle: "Common mistakes with examples",
  
      causes: [
        "Copying an example without replacing placeholder domains.",
        "Adding a second SPF record instead of merging includes.",
        "Using an outdated include that the provider no longer supports.",
        "Ending with ?all or omitting the all mechanism entirely."
      ],
  
      checkedTitle: "What we checked",
  
      checkedText:
        "We validated that these examples use valid SPF syntax and provider hostnames that are currently in use. Always confirm the exact include from your provider's documentation before publishing.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "Can I use these examples for any domain?",
          answer:
            "Yes, but replace any placeholder domain with your actual domain. The include hostnames (e.g. _spf.google.com) stay the same across domains."
        },
        {
          question: "What if I use more than two providers?",
          answer:
            "Add one include per provider, but stay under the 10-DNS-lookup limit. If you exceed it, consider flattening or consolidating providers."
        },
        {
          question: "Should I use ~all or -all?",
          answer:
            "Use ~all while validating all senders; -all when your record is complete and you want strict enforcement."
        }
      ],
  
      nextSteps: [
        "Inventory all sender services currently used in production.",
        "Select or combine examples into one merged SPF policy.",
        "Publish exactly one SPF TXT record at the root domain.",
        "Validate syntax and lookup depth after publishing.",
        "Re-check whenever providers are added, removed, or migrated."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        { href: "/spf/no-spf-record-found", label: "No SPF record found" },
        { href: "/spf/spf-record-syntax-explained", label: "SPF record syntax explained" },
        { href: "/spf/spf-record-generator", label: "How to build an SPF record" }
      ]
    },
  
    "spf/spf-record-syntax-explained": {
      title: "SPF Record Syntax Explained (Guide to SPF Rules)",
  
      intro:
        "SPF syntax is strict, and even small formatting mistakes can break the entire record. A missing colon, misplaced space, or typo can turn a valid-looking SPF policy into an unusable one. In practice, this means receivers may fail SPF before they can even evaluate your intended sender rules. Getting the exact syntax right is as important as choosing the right mechanisms.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Check the record in this exact order: version (`v=spf1`), mechanisms, colons, spacing, and final qualifier. Make sure every mechanism uses the correct format (for example `include:domain.com`), remove stray spaces, and end with a valid qualifier such as `~all` or `-all`.",
  
      codeTitle: "Syntax breakdown",
      codeLanguage: "Plain text",
      code: `v=spf1          → version (required)
  include:domain  → mechanism:value (colon, no space)
  ip4:192.0.2.0/24 → IP range
  ~all            → qualifier + all (softfail)`,
  
      afterCodeText:
        "Receivers evaluate SPF left to right, and the first matching mechanism sets the result. Keep the all mechanism at the end because it defines the fallback action for any sender that did not match earlier rules.",
  
      wrongExampleTitle: "Malformed syntax",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include _spf.google.com -all`,
      wrongExampleText:
        "The include mechanism requires a colon before the domain. A space instead of a colon causes a syntax error and makes the record unparseable.",
  
      correctExampleTitle: "Valid syntax",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com -all`,
      correctExampleText:
        "Colon after include, no extra spaces, and -all at the end. Receivers can parse this and evaluate it correctly.",
  
      whyTitle: "Why syntax matters",
  
      whyText:
        "Syntax errors are common when records are hand-edited in DNS panels or copied directly from provider documentation without validation. SPF parsers are strict, so one missing colon, typo, or malformed token can invalidate the whole record and trigger errors at delivery time.",
  
      problemTitle: "Why syntax errors are a problem",
  
      problemPoints: [
        "Receivers cannot evaluate the policy and may return permerror.",
        "Legitimate mail loses SPF even when the intent was correct.",
        "DMARC alignment can fail when SPF cannot produce a result.",
        "Debugging becomes harder when the record looks present but is invalid."
      ],
  
      deliverabilityTitle: "How syntax affects deliverability",
  
      deliverabilityText:
        "Syntax mistakes can cause SPF to fail even when your sender list is correct. Once SPF fails, legitimate mail is more likely to be filtered into spam, and DMARC outcomes can degrade when SPF was expected to support alignment. Clean syntax restores reliable authentication and steadier inbox placement.",
  
      causesTitle: "Common syntax mistakes",
  
      causes: [
        "Missing colon after include, redirect, or similar mechanisms.",
        "Extra spaces inserted in mechanism/value pairs.",
        "Typo in a mechanism name (for example, inclide instead of include).",
        "Malformed qualifier formatting (for example, `- all` with a space).",
        "Bad copy/paste from docs that introduced invalid characters or layout."
      ],
  
      checkedTitle: "What we checked",
  
      checkedText:
        "We inspect SPF records for valid syntax: correct mechanism format, valid qualifiers, and proper structure. Records that fail parsing are reported as syntax errors.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "What are SPF qualifiers?",
          answer:
            "Qualifiers (+pass, -fail, ~softfail, ?neutral) modify the result of a mechanism. The all mechanism typically uses ~ or - to define the default for unmatched IPs."
        },
        {
          question: "What is the order of mechanisms?",
          answer:
            "Mechanisms are evaluated left to right. The first match wins. The all mechanism is always last and applies when no earlier mechanism matches."
        },
        {
          question: "Can I use multiple includes?",
          answer:
            "Yes. List them sequentially: include:_spf.google.com include:sendgrid.net. Each triggers a DNS lookup, so stay under the 10-lookup limit."
        }
      ],
  
      nextSteps: [
        "Copy the live SPF TXT value from DNS and review it character by character.",
        "Validate each mechanism format (`mechanism:value`) and confirm every required colon is present.",
        "Remove stray spaces and correct typos in mechanism names or qualifiers.",
        "Confirm the record starts with `v=spf1` and ends with the intended `all` qualifier.",
        "Re-test SPF and DMARC after propagation to confirm parsing and alignment now pass."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        { href: "/spf/spf-record-syntax-error", label: "SPF record syntax error" },
        { href: "/spf/spf-record-example", label: "SPF record examples" },
        { href: "/spf/spf-missing-all-mechanism", label: "SPF missing all mechanism" }
      ]
    },
  
    "spf/spf-record-generator": {
      title: "SPF Record Generator (Tool to Create SPF Record)",
  
      intro:
        "Building SPF from scratch fails most often when sender inventory is incomplete or mechanisms are added without validation. A practical build process helps you authorize real senders, avoid lookup bloat, and keep one maintainable policy. If done ad hoc, records often drift into permerrors, missing senders, or duplicate-policy mistakes.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Build SPF in order: start with v=spf1, add only active provider includes or IP ranges, keep lookup depth under 10, and finish with ~all or -all. Validate each addition before publishing.",
  
      codeTitle: "Step-by-step build",
      codeLanguage: "DNS TXT",
      code: `# 1. Version
  v=spf1
  
  # 2. Add providers (one include each)
  include:_spf.google.com include:sendgrid.net
  
  # 3. End with qualifier
  ~all
  
  # Result: v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
  
      afterCodeText:
        "Do not add mx or a unless you specifically need them. Prefer provider includes over manual IPs when possible, and always verify the include hostname from the provider's docs.",
  
      wrongExampleTitle: "Building without planning",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org include:amazonses.com mx a ~all`,
      wrongExampleText:
        "Adding mx and a on top of many includes can push the lookup count over ten. Build incrementally and count lookups before publishing.",
  
      correctExampleTitle: "Planned build",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
      correctExampleText:
        "Only the services that actually send mail. No unnecessary mx or a. Stays under the lookup limit and remains maintainable.",
  
      whyTitle: "Why a structured build matters",
  
      whyText:
        "Most SPF generator issues come from incremental edits without cleanup. Providers get added, old includes remain, and lookup depth is never re-measured. A structured build process prevents policy drift and keeps the record supportable.",
  
      problemTitle: "Why ad hoc building causes problems",
  
      problemPoints: [
        "Accumulating includes can exceed the 10-lookup limit.",
        "Legacy senders left in the record create confusion.",
        "Redundant mx or a mechanisms add lookups without clear benefit.",
        "No single source of truth for which senders are authorised."
      ],
  
      deliverabilityTitle: "How a clean build helps deliverability",
  
      deliverabilityText:
        "A lean, accurate SPF record improves authentication consistency and inbox stability. Overbuilt policies risk permerror and spam placement, while underbuilt policies fail legitimate senders and hurt DMARC alignment. Structured generation reduces both failure modes.",
  
      causesTitle: "Common build mistakes",
  
      causes: [
        "Adding mechanisms without tracking total lookup depth.",
        "Keeping legacy provider includes after migration.",
        "Using broad mx or a when provider includes are enough.",
        "Onboarding new tools without updating the existing SPF policy."
      ],
  
      checkedTitle: "What we checked",
  
      checkedText:
        "We evaluate SPF records for structure, lookup depth, and completeness. We flag records that are likely to exceed limits or that omit common senders.",
  
      faqTitle: "FAQ",
      faq: [
        {
          question: "How many includes can I add?",
          answer:
            "The limit is 10 DNS lookups total, not 10 includes. Each include can trigger multiple lookups. Count carefully when combining several providers."
        },
        {
          question: "Should I use ip4 or include?",
          answer:
            "Prefer include when the provider publishes one. Use ip4 only when you have a fixed, provider-documented range and no include is available."
        },
        {
          question: "When do I need mx or a?",
          answer:
            "Only when your mail actually comes from your domain's MX or A records. Many hosted setups use include instead; mx and a add lookups."
        }
      ],
  
      nextSteps: [
        "List active sender services and remove historical ones first.",
        "Collect exact include hostnames from official provider docs.",
        "Build one merged SPF record and validate syntax before publish.",
        "Measure lookup count and trim unnecessary mechanisms.",
        "Publish, wait for propagation, and verify SPF/DMARC from live headers."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        { href: "/spf/spf-record-example", label: "SPF record examples" },
        { href: "/spf/spf-permerror-too-many-dns-lookups", label: "SPF permerror: too many DNS lookups" },
        { href: "/spf/spf-include-flattening", label: "SPF include flattening" }
      ]
    },

    "spf/spf-record-not-found-sometimes": {
      title: "SPF Record Not Found Sometimes (Intermittent DNS Results)",
      description:
        "Fix SPF that vanishes in some lookups: stale caches, mixed name servers, and TXT fragmentation so checks stay consistent.",
      intro:
        "Intermittent “no SPF” behaviour almost always points to DNS inconsistency, not a phantom mail problem. One resolver path sees your TXT while another still serves an older zone, serves a child label without the root TXT, or times out mid-query. Marketing tools, inbox placement tests, and security scanners all use different resolver fleets, so you can observe pass from your office VPN and fail from a remote MTA ten minutes later. The SPF record exists in your dashboard but is not universally visible yet, or it is split across strings that some validators concatenate incorrectly.",
      quickPoints: [
        "Different resolvers can see different TXT answers during NS cuts.",
        "Authoritative mismatch between registrant glue and Cloudflare-style edges is a frequent cause.",
        "Split TXT strings must concatenate to one valid v=spf1 line.",
        "TTL and negative caching can hide a recently deleted record for hours."
      ],
      fixTitle: "One-Minute Fix",
      fixText:
        "Confirm every authoritative name server for the zone returns identical TXT including exactly one SPF line, lower TTL temporarily during the change window, and after edits query multiple public resolvers (not just your laptop) until answers converge.",
      codeTitle: "Verify identical answers from two paths",
      codeLanguage: "Shell",
      code: `# Replace with your domain
dig +short TXT example.com @1.1.1.1
dig +short TXT example.com @8.8.8.8`,
      afterCodeText:
        "When both commands disagree or one times out intermittently, focus on NS consistency and propagation before touching SPF mechanics.",
      wrongExampleTitle: "Wrong mental model",
      wrongExampleLanguage: "Plain text",
      wrongExampleCode: `SPF passes in my panel → everyone must already see it.`,
      wrongExampleText:
        "Panels query one resolver or cached edge. Production MTAs query many. A single agreeing answer from one path does not prove global visibility.",
      correctExampleTitle: "Operational check",
      correctExampleLanguage: "Plain text",
      correctExampleCode: `Same TXT from every authoritative NS, then same from several recursive resolvers worldwide.`,
      correctExampleText:
        "First align authority, then validate recursion. Only then is the intermittent symptom closed.",
      whyTitle: "Why SPF flickers between found and missing",
      whyText:
        "DNS is distributed; not every cache updates at once. Secondary zones lag during transfers, some providers publish to one edge first, and long TTLs stretch inconsistency windows. A partially published delete—root TXT removed on one NS but not another—creates nondeterministic SPF evaluation.",
      problemTitle: "Why intermittent visibility hurts",
      problemPoints: [
        "Automated tests become irreproducible, hiding the real defect.",
        "Some mail passes while similar traffic fails, masking abuse signals.",
        "DMARC reports may show conflicting SPF outcomes for the same source IP.",
        "Incident timelines stretch because teams chase mail logs before DNS proof converges."
      ],
      deliverabilityTitle: "How this skews deliverability signals",
      deliverabilityText:
        "Mailbox providers score streams over time. When SPF presence flips, authentication telemetry becomes noisy, reputation models see instability, and throttling may spike during the inconsistent window even if your eventual record is correct.",
      causesTitle: "Common triggers",
      causes: [
        "Mixed authoritative servers after a partial DNS migration.",
        "Accidental SPF on www or a marketing subdomain instead of the organizational From domain.",
        "Provider UI saved the record to the wrong zone or duplicate zone.",
        "Fat-fingered apex record removed while testing another TXT entry.",
        "Very large TXT split into multiple strings assembled out of order by a resolver implementation."
      ],
      checkedTitle: "What we checked",
      checkedText:
        "We query live DNS for SPF TXT at the evaluated domain and report the current result visible to our resolver path. Treat any single snapshot as a hint when your symptom is intermittent; cross-check authoritative NS agreement.",
      faqTitle: "FAQ",
      faq: [
        {
          question: "Can DNSSEC or CDS records cause this?",
          answer:
            "Indirectly. Broken DNSSEC can make some validators treat answers as bogus and behave inconsistently. Fix signing or roll back problematic DNSSEC changes first."
        },
        {
          question: "Do I need a second SPF copy on a subdomain?",
          answer:
            "Only if that subdomain is used in the envelope or HELO path relevant to your setup. Usually you fix apex visibility instead of copying policies."
        },
        {
          question: "How long should I wait after fixing NS records?",
          answer:
            "Expect minutes to 48 hours depending on TTL and cache layers. Temporarily lower TTL before major changes to shrink the drift window."
        }
      ],
      nextSteps: [
        "Export the complete NS list from the registrar and compare to each authoritative server’s SOA/zone file.",
        "Publish one merged SPF TXT at the apex and remove stray duplicates.",
        "Query multiple DNS services until all return identical TXT.",
        "Send tests from distinct networks and read Authentication-Results for SPF stability.",
        "After stability, restore normal TTL values."
      ],
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
      related: [
        { href: "/spf/no-spf-record-found", label: "No SPF record found" },
        { href: "/spf/multiple-spf-records-found", label: "Multiple SPF records found" },
        { href: "/spf/spf-record-syntax-error", label: "SPF record syntax error" }
      ]
    },

    "spf/spf-include-not-working": {
      title: "SPF Include Not Working (Broken Delegated Chains)",
      description:
        "Troubleshoot SPF include failures: wrong hostnames, empty provider records, caps, and lookup limits that block delegation.",
      intro:
        "When an include target is wrong, empty, or cannot be resolved within the SPF DNS limits, every sender that depended on that branch fails instantly. Teams often paste `include:sendgrid.net` while the active project actually requires a different hostname, or they capitalise labels inconsistently although DNS is case-insensitive but still typo-prone. Other times the provider rotated their SPF host and outdated documentation still circulates in internal runbooks. The symptom is a hard SPF fail for traffic that should be covered even though your apex record parses cleanly.",
      quickPoints: [
        "The include hostname must publish its own SPF mechanisms, not CNAME loops.",
        "Each include consumes DNS lookups; deep trees hit permerror faster.",
        "Typos in provider hostnames fail closed as no match.",
        "Some ESPs publish different includes per region or product SKU."
      ],
      fixTitle: "One-Minute Fix",
      fixText:
        "Open the provider’s current sender documentation, copy the exact include hostname they publish today, replace any legacy value in your record, then trace that hostname with `dig TXT` and nested includes until you see the IP coverage you expect.",
      codeTitle: "Trace an include target",
      codeLanguage: "Shell",
      code: `dig +short TXT _spf.example.com
dig +short TXT spf.protection.outlook.com`,
      afterCodeText:
        "If the first hop returns nothing or a bare redirect with no terminal IP mechanisms, your include chain cannot authorise the sending hosts yet.",
      wrongExampleTitle: "Wrong setup",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:spf.example-sendgrid.com -all`,
      wrongExampleText:
        "Hyphenated guesswork instead of the exact hostname SendGrid documents for your account tier breaks the chain even when mail still relays through them.",
      correctExampleTitle: "Correct pattern",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:sendgrid.net -all`,
      correctExampleText:
        "Use the precise include target your ESP lists for SPF. Verify the TXT at that hostname resolves and contributes IP coverage before relying on it in production.",
      whyTitle: "Why includes silently fail",
      whyText:
        "SPF evaluation stops when a referenced record is missing, malformed, or exceeds nested lookup budgets. Unlike soft human-readable warnings, receivers return fail or permerror and move on. Mis-copied includes therefore behave like missing authorisation even when everything else in the policy is polished.",
      problemTitle: "Why this breaks sending reputation",
      problemPoints: [
        "Legitimate ESP traffic fails SPF even though DKIM might still pass.",
        "DMARC alignment over SPF disappears when SPF never reaches a pass.",
        "Volume senders get abrupt bulk foldering when a include regression ships unnoticed.",
        "Operations teams burn time in SMTP logs before DNS tracing exposes the bad hostname."
      ],
      deliverabilityTitle: "How deliverability teams notice this first",
      deliverabilityText:
        "Campaign dashboards show SPF auth failures clustered around specific IPs belonging to a SaaS sender while other IPs still pass—exactly the fingerprint of a broken include branch for that vendor.",
      causesTitle: "Common causes",
      causes: [
        "Stale documentation referencing retired SPF hostnames.",
        "Multiple possible includes (marketing vs transactional) with only one pasted.",
        "Include added with trailing dot mishandled in the DNS UI.",
        "CNAME at the include target where TXT is required for SPF evaluation.",
        "Permerror from total lookup depth rather than the include itself."
      ],
      checkedTitle: "What we checked",
      checkedText:
        "We evaluate your published SPF policy, including mechanism resolution depth. Broken include trees and lookup exhaustion surface as failures to build a complete sender list.",
      faqTitle: "FAQ",
      faq: [
        {
          question: "Should I flatten instead of include?",
          answer:
            "Only if you are out of lookups and have a disciplined update process. Flattening trades operational risk for depth relief."
        },
        {
          question: "Does case matter in include hostnames?",
          answer:
            "DNS matching is case-insensitive, but typos are not. Compare the hostname character-for-character with the vendor docs."
        },
        {
          question: "Can redirects replace includes?",
          answer:
            "Redirect is valid but consumes the single SPF record slot for that path; read RFC semantics before substituting."
        }
      ],
      nextSteps: [
        "Pull the vendor’s current SPF hostname from their dashboard, not a PDF dated last year.",
        "Replace outdated includes and remove experimental duplicates.",
        "Walk the chain with dig until terminal ip4/ip6 or approved mechanisms appear.",
        "Recount lookups; trim or flatten if you approach ten.",
        "Send probe messages and confirm Authentication-Results shows spf=pass for the ESP path."
      ],
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
      related: [
        { href: "/spf/spf-include-flattening", label: "SPF include flattening" },
        { href: "/spf/spf-permerror-too-many-dns-lookups", label: "SPF permerror: too many DNS lookups" },
        { href: "/spf/spf-redirect-explained", label: "SPF redirect explained" }
      ]
    },

    "spf/spf-macro-misconfiguration": {
      title: "SPF Macro Misconfiguration (When %{ Variables Break Includes)",
      description:
        "Fix advanced SPF macros: wrong letter codes, illegal expansions, and scope limits that collapse your policy at runtime.",
      intro:
        "Macros let a single SPF record branch based on SMTP conversation context such as sender local-part or current IP. That power fails loudly when macros reference unsupported characters, exceed expansion limits, or feed into an include target that itself contains illegal syntax after substitution. Mid-market automation platforms sometimes ship macro-heavy templates to chase per-customer policies—without testing the final expanded record against real envelope data. The record looks clever in documentation yet returns permerror or unexpected none results because an intermediate label resolves empty or too long for DNS.",
      quickPoints: [
        "Macro letters are strict: %{l} is local-part, %{d} current domain, %{i} IP octets in dash form.",
        "Uppercase control letters change delimiter behaviour; errors cascade into includes.",
        "Some receivers expand conservatively—keep expansions short and cacheable.",
        "Macros cannot rescue architectural mistakes like missing DKIM alignment."
      ],
      fixTitle: "One-Minute Fix",
      fixText:
        "Replace experimental macro-laden policies with a deterministic include list unless you truly require per-user rules. If you must keep macros, test expansion against sample envelopes and ensure each resolved hostname stays a valid, delegatable SPF reference.",
      codeTitle: "Macro anatomy (illustrative)",
      codeLanguage: "Plain text",
      code: `include:%{l}.\${d}._spf.example.com  → expands using SMTP envelope data
  (must stay a legal hostname and resolve to SPF TXT)`,
      afterCodeText:
        "Validation tools that only inspect the static string miss macro failures—you need envelope-aware testing.",
      wrongExampleTitle: "Risky pattern",
      wrongExampleLanguage: "DNS TXT",
      wrongExampleCode: `v=spf1 include:%{Ir}.bad.-all.example.com -all`,
      wrongExampleText:
        "Illegal macro syntax or characters that cannot appear in a hostname label will break before any sender IP is tested.",
      correctExampleTitle: "Safer baseline",
      correctExampleLanguage: "DNS TXT",
      correctExampleCode: `v=spf1 include:_netblocks.example.com -all`,
      correctExampleText:
        "Static include trees remain easier to reason about. Add macros only after static coverage is impossible.",
      whyTitle: "Why macros misfire in production",
      whyText:
        "Macros depend on data only present during SMTP: if validation never replays that context, you will not see the failure in a basic TXT fetch. Additionally expansion length caps and underscore rules still apply post-substitution.",
      problemTitle: "Operational downsides",
      problemPoints: [
        "Hard-to-reproduce authentication tickets tied to specific envelope addresses.",
        "Accidental open-ended includes if local-part expansions map too broadly.",
        "DNS load spikes if macros generate high-cardinality label variants.",
        "Documentation drift: macros rarely survive team turnover intact."
      ],
      deliverabilityTitle: "Deliverability angle",
      deliverabilityText:
        "Receivers care about consistent outcomes. Macros that expand differently across providers create noisy authentication telemetry, which can slow sender warm-up and confuse feedback loops.",
      causesTitle: "Typical mistakes",
      causes: [
        "Copying vendor samples without adapting delimiter escapes for your DNS UI.",
        "Using macros to synthesise per-customer subdomains without provisioning those zones.",
        "Chaining macros into includes that already max out lookup counts.",
        "Assuming macro expansion happens identically on every MTA."
      ],
      checkedTitle: "What we checked",
      checkedText:
        "General SPF checks evaluate the static TXT. Macro correctness requires contextual evaluation; if your policy relies on macros, supplement online tools with transactional SMTP captures showing expanded results in Authentication-Results.",
      faqTitle: "FAQ",
      faq: [
        {
          question: "Should beginners use macros?",
          answer:
            "No. Master static includes and alignment first—macros are a last resort for specialised hosting patterns."
        },
        {
          question: "Do macros help DMARC alignment?",
          answer:
            "They only affect SPF mechanical passes; alignment still depends on domain relationships between envelope Header From and authenticated domains."
        },
        {
          question: "How do I test safely?",
          answer:
            "Stage subdomains with p=none DMARC, send controlled messages, and compare expanded includes via receiver diagnostics."
        }
      ],
      nextSteps: [
        "Document the exact envelope permutations your macro must support.",
        "Replace brittle macros with static includes where feasible.",
        "Simulate SMTP sessions that exercise each expansion branch.",
        "Measure total lookup depth after expansion.",
        "Roll out gradually with DMARC reporting monitoring for regressions."
      ],
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
      related: [
        { href: "/spf/spf-record-syntax-explained", label: "SPF record syntax explained" },
        { href: "/spf/spf-permerror-too-many-dns-lookups", label: "SPF permerror: too many DNS lookups" },
        { href: "/spf/spf-record-syntax-error", label: "SPF record syntax error" }
      ]
    },

    "spf/spf-helo-fail": {
      title: "SPF HELO Fail (SMTP Identity Does Not Match Policy)",
      description:
        "Understand HELO/EHLO SPF checks: identity selection, dual policies, and why the banner domain needs its own coherent SPF story.",
      intro:
        "SMTP clients introduce themselves with EHLO and a hostname. Some receivers optionally evaluate SPF against that identity separately from the RFC5321 Mail From domain. If the connecting server advertises ` EHLO mail.vendor.outbound.net` but that hostname lacks SPF—or points to a dormant zone—you can observe helo SPF failures even when your domain’s apex policy passes for the envelope sender. Multi-tenant relays and misnamed cloud instances are frequent contributors. This is not the same as MAIL FROM SPF failure; it is a second surface attackers probe and filters notice.",
      quickPoints: [
        "HELO identity is not interchangeable with your marketing From domain.",
        "SPF for the HELO name must exist if receivers evaluate that channel.",
        "A numeric literal EHLO cannot carry meaningful SPF semantics—fix the server config.",
        "TLS and banner mismatches sometimes correlate with lazy EHLO strings."
      ],
      fixTitle: "One-Minute Fix",
      fixText:
        "Set the MTA to present a stable, fully-qualified hostname you control, publish SPF TXT for that hostname (even if policy is narrow), and confirm outbound IPs appear there or via include—then re-test HELO and MAIL FROM paths independently.",
      codeTitle: "Representative MTA banner",
      codeLanguage: "SMTP transcript",
      code: `220 inbound.example.com ESMTP
EHLO mail.clean.sender.com
250-mail.clean.sender.com`,
      afterCodeText:
        "The EHLO argument should resolve forward and backward consistently with the IP that opened the connection.",
      wrongExampleTitle: "Weak HELO identity",
      wrongExampleLanguage: "SMTP transcript",
      wrongExampleCode: `EHLO localhost
250 OK`,
      wrongExampleText:
        "localhost signals an unserious or misconfigured server and cannot anchor SPF expectations.",
      correctExampleTitle: "Coherent identity",
      correctExampleLanguage: "Plain text",
      correctExampleCode: `A dedicated hostname under your brand with SPF covering the egress pool.`,
      correctExampleText:
        "Operators expect the EHLO name’s DNS to corroborate legitimacy alongside MAIL FROM results.",
      whyTitle: "Why HELO-specific SPF appears",
      whyText:
        "Abuse fighters cross-check multiple identifiers. HELO checks catch snowshoe relays that flip envelope domains but reuse tarnished infrastructure banners. When your pool rotates IPs, the HELO hostname is sometimes the steady handle receivers track.",
      problemTitle: "Operational impact",
      problemPoints: [
        "Filters may score down streams lacking coherent EHLO evidence.",
        "TLS certificate SAN mismatches amplify suspicion when EHLO also looks random.",
        "Ticketing churn when SMTP logs show SPF pass on envelope but auxiliary helo fail lines.",
        "Third-party senders may ignore HELO hygiene unless contracted explicitly."
      ],
      deliverabilityTitle: "Deliverability nuance",
      deliverabilityText:
        "Not every mailbox provider foregrounds HELO SPF, but those that do treat persistent EHLO SPF failures as infrastructure red flags—especially for bulk traffic.",
      causesTitle: "Common causes",
      causes: [
        "Default VPS hostnames left untouched after install.",
        "Marketing automation using vendor banner domains without SPF on those names.",
        "Load-balanced egress where each node advertises different HELO randomly.",
        "IPv6-only senders lacking matching AAAA/SPF coverage for the advertised name."
      ],
      checkedTitle: "What we checked",
      checkedText:
        "Our SPF inspection focuses on the domain you submit—typically the organizational domain or envelope domain. When debugging HELO-specific failures, additionally query SPF for the exact EHLO hostname shown in SMTP logs.",
      faqTitle: "FAQ",
      faq: [
        {
          question: "Does fixing HELO replace MAIL FROM SPF work?",
          answer:
            "No. Both identities may be evaluated; success on one does not excuse failure on the other."
        },
        {
          question: "Can I set HELO to my bare root domain?",
          answer:
            "You can if SMTP software allows, but ensure DNS and cert patterns still align with best practice for that hostname."
        },
        {
          question: "What about Bounce/return-path domains?",
          answer:
            "They carry separate alignment concerns; pair this guide with DMARC alignment debugging for the full picture."
        }
      ],
      nextSteps: [
        "Capture EHLO strings from production SMTP logs.",
        "Publish coherent SPF for each advertised hostname.",
        "Align TLS certificates where applicable.",
        "Re-send probes and compare Authentication-Results lines for both identities.",
        "Feed residual anomalies into your DMARC aggregate analysis."
      ],
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
      related: [
        { href: "/spf/spf-neutral-result-explained", label: "SPF neutral result explained" },
        { href: "/spf/spf-ip-not-authorized", label: "SPF IP not authorized" },
        { href: "/spf/spf-softfail-vs-fail", label: "SPF softfail vs fail" }
      ]
    }
  };
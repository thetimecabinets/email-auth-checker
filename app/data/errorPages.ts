export const errorPages = {
    /* =========================
       SPF
    ========================= */
  
    "spf/multiple-spf-records-found": {
      title: "Multiple SPF Records Found",
      intro:
        "Your domain publishes more than one SPF record, which breaks SPF evaluation. SPF is designed to read exactly one TXT record that begins with v=spf1. When receivers find two or more SPF policies for the same domain, they cannot safely decide which one should apply, so SPF returns a permanent error. In practice, that means legitimate mail can lose one of its strongest authentication signals, DMARC may also fail if SPF was expected to align, and deliverability can become unstable. This commonly happens after Google Workspace, Microsoft 365, SendGrid, Mailchimp, or another sender is added without merging all senders into a single consolidated SPF record.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Keep only one SPF TXT record for the domain and merge all legitimate sending services into that single policy.",
  
      codeTitle: "Correct SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
  
      afterCodeText:
        "Only one SPF TXT record should exist for the domain. If several providers send email for your domain, they must all be combined inside one final SPF policy instead of being published as separate TXT records.",
  
      whyTitle: "Why this happens",
      whyText:
        "Multiple SPF records usually appear when different email tools each provide separate SPF instructions and those instructions are added directly in DNS instead of being merged into one policy. SPF does not support multiple active policies for the same domain, even if each individual record is syntactically correct on its own.",
  
      problemTitle: "Why multiple SPF records are a problem",
      problemPoints: [
        "Receiving servers return an SPF permerror instead of a normal pass or fail result.",
        "Legitimate mail can lose SPF authentication even when your senders are valid.",
        "DMARC may fail if SPF was expected to provide alignment.",
        "Inbox placement becomes less predictable because trust signals are weakened."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
      deliverabilityText:
        "From a deliverability perspective, multiple SPF records create ambiguity at exactly the moment mailbox providers want clarity. Even if your domain has good intent, the receiver sees a broken SPF policy and may rely less on your authentication setup. That can reduce trust, especially on new domains or domains already under tighter filtering.",
  
      causesTitle: "Common causes",
      causes: [
        "Google Workspace or Microsoft 365 was added after an older SPF record already existed.",
        "A marketing platform such as SendGrid or Mailchimp provided SPF instructions that were added as a second record.",
        "A DNS migration copied old TXT records and created duplicates.",
        "Different people updated DNS over time without consolidating the final SPF policy."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We looked for TXT records beginning with v=spf1 on your domain. If more than one SPF policy is published, SPF validation becomes invalid and receivers may return a permerror instead of a pass or fail result.",
  
      nextSteps: [
        "List every service that sends email for your domain before editing SPF.",
        "Merge all legitimate providers into one single SPF TXT record.",
        "Remove the duplicate SPF entries from DNS.",
        "Re-run the check after DNS propagation to confirm only one SPF record remains."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/no-spf-record-found",
          label: "No SPF record found"
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
  
    "spf/no-spf-record-found": {
      title: "No SPF Record Found",
      intro:
        "Your domain currently does not publish an SPF record. SPF allows receiving servers to check which systems are authorized to send email for your domain. Without that policy, mailbox providers cannot verify whether a sending server is legitimate or part of a spoofing attempt. Missing SPF does not always block delivery immediately, but it weakens your authentication setup, reduces trust in your messages, and leaves DMARC with fewer ways to pass. This problem often appears after a new domain is connected to Google Workspace, Microsoft 365, SendGrid, Mailchimp, or another platform without completing the DNS authentication setup.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Publish one SPF TXT record on the root of your sending domain and include every legitimate service that sends mail for that domain.",
  
      codeTitle: "Example SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com include:sendgrid.net ~all`,
  
      afterCodeText:
        "This example authorizes Google Workspace and SendGrid. Replace those include mechanisms with the ones used by your actual providers. The key rule is that your domain should publish one SPF TXT record, not zero and not several.",
  
      whyTitle: "Why this happens",
      whyText:
        "No SPF record is usually the result of incomplete setup. Teams connect a mailbox provider or sending platform but forget to publish the TXT record, or the record disappears during a DNS migration. Some administrators also assume DKIM alone is sufficient, but mailbox providers expect SPF to exist as part of a complete authentication setup.",
  
      problemTitle: "Why missing SPF is a problem",
      problemPoints: [
        "Receiving servers cannot clearly verify which systems are allowed to send mail for your domain.",
        "Spoofing becomes easier because your domain publishes no sender authorization policy.",
        "DMARC has one less aligned authentication path available.",
        "Legitimate messages may face lower trust and weaker inbox placement."
      ],
  
      deliverabilityTitle: "How SPF affects deliverability",
      deliverabilityText:
        "SPF does not guarantee inbox placement by itself, but it is one of the core trust signals mailbox providers use when evaluating your domain. When SPF is missing, your messages depend more heavily on DKIM, DMARC, and domain reputation alone. On new or lightly warmed domains, that missing signal can make delivery less stable and make troubleshooting harder when messages start landing in spam.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain was connected to an email provider, but the SPF TXT record was never added.",
        "A DNS migration removed the old SPF record.",
        "The SPF record was added to the wrong host, such as www instead of the root domain.",
        "The sending platform was changed and the new SPF setup was never completed."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We queried DNS TXT records for your domain and looked for a valid SPF policy beginning with v=spf1. No valid SPF record was found.",
  
      nextSteps: [
        "Confirm which services actually send email for your domain before publishing SPF.",
        "Add the SPF TXT record to the root domain, not to www or another unrelated host.",
        "Make sure there is only one SPF record after publishing it.",
        "Wait for DNS propagation, then run the check again."
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
  
    "spf/spf-include-flattening": {
      title: "SPF Include Flattening",
      intro:
        "SPF include flattening means replacing nested include mechanisms with the underlying IP ranges or simplified sender logic so the final SPF policy stays under the DNS lookup limit. It is not always necessary, but it becomes useful when a domain sends mail through many providers and the normal include chain is too large or too fragile. Flattening can improve reliability if it is done carefully, but it also creates maintenance work because provider IP ranges can change over time. This page explains when SPF flattening is appropriate, when it is risky, and how to use it without creating a stale or broken policy.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Use flattening only when your SPF policy is approaching the 10-lookup limit and you have a process to keep flattened IP ranges updated.",
  
      codeTitle: "Example flattened SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 ip4:192.0.2.10 ip4:203.0.113.20 include:_spf.google.com ~all`,
  
      afterCodeText:
        "Flattening reduces DNS dependency during SPF evaluation, but it also turns SPF into a policy you must maintain over time. If provider IP ranges change and you do not update the record, legitimate mail can start failing unexpectedly.",
  
      whyTitle: "Why this happens",
      whyText:
        "Every include, redirect, mx, or a mechanism can trigger more DNS lookups during SPF evaluation. Once the effective total exceeds ten, receivers return a permerror. Flattening reduces the dependency chain by resolving includes ahead of time and publishing a simpler final policy.",
  
      problemTitle: "When flattening becomes necessary",
      problemPoints: [
        "Your SPF policy is close to or already above the 10-lookup limit.",
        "You rely on several providers with nested include chains.",
        "Receivers are returning SPF permerror because the policy is too complex.",
        "You need a more predictable SPF evaluation path."
      ],
  
      deliverabilityTitle: "The tradeoff of SPF flattening",
      deliverabilityText:
        "Flattening can improve reliability because receivers perform fewer live lookups during SPF evaluation. The tradeoff is maintenance. A manually flattened policy can become stale, and stale SPF is just as dangerous as overly complex SPF. That is why flattening should be treated as an operational process, not just a one-time edit.",
  
      causesTitle: "Common causes",
      causes: [
        "Multiple email services each add their own include mechanism.",
        "Providers use deeply nested SPF include chains.",
        "Old senders remain in SPF long after they stop sending.",
        "No one reviews SPF after new tools are added."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the SPF structure and the operational reason people choose flattening: reducing DNS lookups while keeping all legitimate senders covered.",
  
      nextSteps: [
        "Count the effective SPF lookup depth before deciding to flatten.",
        "Remove obsolete senders before flattening anything.",
        "Only flatten providers you can maintain confidently.",
        "Re-check the final SPF record regularly so it does not become stale."
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
      title: "SPF IPv6 Misconfiguration",
      intro:
        "SPF IPv6 misconfiguration happens when your domain sends mail from IPv6-enabled systems, but the SPF record either omits the IPv6 ranges entirely or publishes the wrong ip6 mechanisms. If a receiving server sees mail coming from an IPv6 address that is not authorized in SPF, the message can fail SPF even though the same provider might pass from IPv4. This becomes more common as cloud mail infrastructure and enterprise networks use dual-stack routing. If your provider sends on IPv6, your SPF record must reflect that reality; otherwise authentication becomes inconsistent and troubleshooting gets confusing very quickly.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Add the correct ip6 mechanisms or the provider include that covers both IPv4 and IPv6 sending ranges.",
  
      codeTitle: "Example IPv6-aware SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 ip4:198.51.100.10 ip6:2001:db8::/32 ~all`,
  
      afterCodeText:
        "Do not guess IPv6 ranges. Use the exact networks or provider include published by the service that actually sends your email.",
  
      whyTitle: "Why this happens",
      whyText:
        "Some administrators build SPF around IPv4-only assumptions, while the sending service or relay infrastructure also uses IPv6. Others manually add a narrow ip6 range that does not match the real sending network. Since SPF validates the actual connecting IP, any mismatch can produce a fail or softfail.",
  
      problemTitle: "Why this issue is confusing",
      problemPoints: [
        "A provider may pass SPF from IPv4 but fail from IPv6.",
        "Authentication can look random across different receivers.",
        "Troubleshooting becomes harder because the visible provider appears correct.",
        "DMARC may also fail if SPF was the aligned path."
      ],
  
      deliverabilityTitle: "How IPv6 changes SPF behavior",
      deliverabilityText:
        "SPF validates the real connecting IP address. If part of your mail flow uses IPv6 and your SPF record only authorizes IPv4 sources, the same sender can produce mixed results depending on the path used for delivery. That creates inconsistent authentication and can reduce confidence in your domain.",
  
      causesTitle: "Common causes",
      causes: [
        "The provider sends on IPv6 but SPF only lists IPv4 senders.",
        "An incorrect ip6 range was copied into DNS.",
        "A relay or mail gateway changed its outbound path to IPv6.",
        "The provider include was replaced with manual entries that do not cover all IP families."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed whether the SPF policy authorizes the real sending infrastructure, including IPv6 ranges where relevant, instead of only the older IPv4 path.",
  
      nextSteps: [
        "Verify whether your sender or relay infrastructure actually uses IPv6.",
        "Use provider documentation to confirm the correct IPv6 ranges or include mechanisms.",
        "Remove outdated manual ip6 entries that no longer match your mail flow.",
        "Re-test from live headers after publishing the corrected SPF record."
      ],
  
      hub: {
        href: "/spf",
        label: "SPF Hub"
      },
  
      related: [
        {
          href: "/spf/no-spf-record-found",
          label: "No SPF record found"
        },
        {
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-softfail-vs-fail",
          label: "SPF softfail vs fail"
        }
      ]
    },
  
    "spf/spf-neutral-result-explained": {
      title: "SPF Neutral Result Explained",
      intro:
        "An SPF neutral result means the sender's SPF policy explicitly declines to make a strong statement about whether the connecting server is authorized. In practice, this usually comes from the ?all qualifier. Neutral is not the same as pass, and it is not a strong protection mechanism. Many mailbox providers treat neutral as a weak signal that does little to help deliverability or anti-spoofing. If you expected SPF to actively authorize your sender, a neutral result means the policy is too noncommittal to provide real value. This page explains what neutral means, when it appears, and why most real senders should move toward a stricter SPF posture.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Replace a neutral SPF policy with one that clearly authorizes real senders and uses ~all or -all based on your enforcement stage.",
  
      codeTitle: "Example non-neutral SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com ~all`,
  
      afterCodeText:
        "Neutral SPF rarely helps real-world sender reputation. A clearer policy gives receivers a more useful signal and makes your authentication posture easier to understand.",
  
      whyTitle: "Why this happens",
      whyText:
        "A neutral result normally appears when the domain uses ?all or an overly cautious SPF policy that avoids making a useful authorization decision. Some setups inherit a neutral policy from an old tutorial, a temporary staging configuration, or a provider recommendation that was never tightened later.",
  
      problemTitle: "Why neutral SPF is weak",
      problemPoints: [
        "Neutral does not strongly authorize legitimate senders.",
        "It does little to discourage spoofing from a receiver perspective.",
        "It provides less confidence than softfail or fail-based policies.",
        "It can leave administrators thinking SPF is active when it is not helping much."
      ],
  
      deliverabilityTitle: "How neutral affects trust",
      deliverabilityText:
        "Mailbox providers prefer policies that make a meaningful statement. A neutral SPF result signals indecision. That does not always cause direct delivery failure, but it reduces the value of SPF as a trust signal and makes your domain look less deliberately configured.",
  
      causesTitle: "Common causes",
      causes: [
        "The SPF record ends with ?all.",
        "The domain inherited an old or placeholder SPF policy.",
        "Administrators were afraid to move to ~all or -all.",
        "A test configuration was left in production."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We evaluated the SPF qualifier and the practical meaning of a neutral result for deliverability and sender authorization.",
  
      nextSteps: [
        "Identify all legitimate senders before tightening the SPF qualifier.",
        "Move from ?all to ~all during observation if needed.",
        "Use -all only when you are confident every valid sender is covered.",
        "Re-check live mail flow after publishing the stricter record."
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
          href: "/spf/no-spf-record-found",
          label: "No SPF record found"
        },
        {
          href: "/spf/spf-redirect-explained",
          label: "SPF redirect explained"
        }
      ]
    },
  
    "spf/spf-permerror-too-many-dns-lookups": {
      title: "SPF Permerror: Too Many DNS Lookups",
      intro:
        "SPF allows a maximum of ten DNS lookups during evaluation. If your SPF policy exceeds that limit, receivers return a permerror instead of a normal pass, fail, or softfail result. This is one of the most common SPF problems on growing domains because each new sender often adds another include or redirect. The issue may not be visible at first if only part of the include chain is exercised, but once receivers fully evaluate the policy, the lookup ceiling is hit and SPF stops working as intended. The result is inconsistent authentication, lower trust, and possible DMARC failure when SPF was expected to provide alignment.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Reduce the number of includes, remove obsolete senders, or flatten the policy so the full SPF evaluation stays under 10 DNS lookups.",
  
      codeTitle: "Example lookup-heavy SPF record",
      codeLanguage: "DNS TXT",
      code: `v=spf1 include:_spf.google.com include:sendgrid.net include:mailgun.org ~all`,
  
      afterCodeText:
        "Even a short-looking SPF record can exceed the DNS lookup limit once nested include chains expand. The visible record is not always the real lookup burden.",
  
      whyTitle: "Why this happens",
      whyText:
        "Every include, redirect, a, and mx mechanism can trigger more DNS work. The visible SPF record may look short, but nested includes often expand into multiple additional lookups. Once the total effective count exceeds ten, SPF returns permerror even if the record itself is syntactically valid.",
  
      problemTitle: "Why too many lookups break SPF",
      problemPoints: [
        "Receivers stop SPF evaluation with permerror.",
        "Authentication becomes inconsistent across providers.",
        "DMARC may lose an aligned SPF result.",
        "A previously working setup can break after one more sender is added."
      ],
  
      deliverabilityTitle: "Why this hits growing domains",
      deliverabilityText:
        "As domains add more providers, SPF often becomes the first DNS authentication layer to collapse under complexity. The record may appear correct in syntax, but mailbox providers care about evaluation behavior, not just appearance. Once the lookup ceiling is exceeded, SPF stops being dependable.",
  
      causesTitle: "Common causes",
      causes: [
        "Too many email providers were added over time.",
        "Nested vendor SPF includes expanded beyond the lookup limit.",
        "Old services remained in SPF long after they stopped sending.",
        "A redirect chain combined with includes pushed evaluation over the limit."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the SPF policy structure and the effective DNS lookup burden created by includes, redirects, and other lookup-based mechanisms.",
  
      nextSteps: [
        "Remove providers that no longer send mail for your domain.",
        "Prefer direct, necessary sender coverage over historical SPF clutter.",
        "Flatten only if cleanup alone does not solve the lookup problem.",
        "Re-check the final policy to confirm the total lookup path stays under ten."
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
      title: "SPF Redirect Explained",
      intro:
        "SPF redirect is a mechanism that tells receivers to ignore the current SPF policy and instead evaluate another domain's SPF record as the authoritative policy. It is useful in some controlled setups, especially when a domain wants to fully inherit SPF logic from another domain, but it is often misunderstood. Redirect is not the same as include. Include says another domain may authorize senders in addition to your own policy. Redirect says the other domain is the policy. Used correctly, redirect can simplify management. Used poorly, it can make troubleshooting harder and hide where sender authorization actually lives.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Use redirect only when another domain should fully define SPF for the current domain. If you only want to authorize another sender, use include instead.",
  
      codeTitle: "Example SPF redirect",
      codeLanguage: "DNS TXT",
      code: `v=spf1 redirect=_spf.example.com`,
  
      afterCodeText:
        "Redirect replaces the local SPF logic. It does not combine with your own mechanisms the way include does.",
  
      whyTitle: "Why this happens",
      whyText:
        "Administrators sometimes use redirect when they really mean include, or they inherit an SPF design where subdomains redirect to a shared policy without understanding the consequences. Redirect replaces the local logic, so any expectation that both policies will be combined is incorrect.",
  
      problemTitle: "Why redirect is often misunderstood",
      problemPoints: [
        "Redirect does not add another sender; it replaces the whole SPF policy path.",
        "Troubleshooting becomes harder when authorization logic lives on another domain.",
        "A change to the target domain can affect several dependent domains at once.",
        "Using redirect instead of include can accidentally remove local authorization rules."
      ],
  
      deliverabilityTitle: "How redirect changes SPF maintenance",
      deliverabilityText:
        "Redirect can simplify SPF at scale when several domains intentionally inherit one shared sender policy. But it also centralizes risk. If the redirected policy changes or breaks, every dependent domain can be affected immediately.",
  
      causesTitle: "Common causes",
      causes: [
        "Redirect was used instead of include.",
        "Subdomains inherited a shared policy without documentation.",
        "Legacy DNS copied SPF logic from another environment.",
        "The target redirected policy changed and unexpectedly affected multiple domains."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed how redirect changes SPF evaluation flow and whether the domain should really be inheriting another domain's full SPF policy.",
  
      nextSteps: [
        "Confirm whether your goal is inheritance or just sender authorization.",
        "Use include if you still need local SPF logic to remain active.",
        "Document every domain that depends on a shared redirected policy.",
        "Re-check mail flow after any redirect target changes."
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
          href: "/spf/spf-permerror-too-many-dns-lookups",
          label: "SPF permerror: too many DNS lookups"
        },
        {
          href: "/spf/spf-softfail-vs-fail",
          label: "SPF softfail vs fail"
        }
      ]
    },
  
    "spf/spf-softfail-vs-fail": {
      title: "SPF Softfail vs Fail",
      intro:
        "SPF softfail and SPF fail are both negative SPF outcomes, but they communicate different levels of confidence. Softfail usually comes from the ~all qualifier and signals that a sender is probably unauthorized, while fail usually comes from -all and signals that the sender is definitely unauthorized according to the policy. In deliverability terms, the difference matters because mailbox providers, gateways, and downstream anti-spam systems may treat softfail more cautiously and fail more aggressively. Choosing the right qualifier depends on how confident you are that your SPF record fully covers every legitimate sender for the domain.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Use ~all while you are still discovering legitimate senders, then move to -all when the SPF policy is complete and stable.",
  
      codeTitle: "Softfail vs fail",
      codeLanguage: "DNS TXT",
      code: `Softfail: v=spf1 include:_spf.google.com ~all
  Fail:     v=spf1 include:_spf.google.com -all`,
  
      afterCodeText:
        "Softfail is safer during rollout because it gives you room to observe. Fail is stronger once you are certain every legitimate sender is covered.",
  
      whyTitle: "Why this matters",
      whyText:
        "Softfail is often used during rollout because it allows observation without making a fully hard assertion. Fail is stronger and better for anti-spoofing once the policy is trustworthy. The wrong choice can either reduce protection or accidentally hurt legitimate delivery.",
  
      problemTitle: "How to choose between ~all and -all",
      problemPoints: [
        "Use ~all when your sender inventory is still being verified.",
        "Use -all when you are confident no forgotten sender remains.",
        "Moving to -all too early can break legitimate mail.",
        "Staying at ~all too long can weaken anti-spoofing protection."
      ],
  
      deliverabilityTitle: "What mailbox providers infer",
      deliverabilityText:
        "A fail-based policy is a stronger statement, but only when it is accurate. Mailbox providers do not reward reckless strictness. They reward consistent, reliable authentication. That is why many domains move from ~all to -all gradually rather than immediately.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain is still in SPF rollout mode and uses ~all.",
        "Administrators moved too quickly to -all before mapping all senders.",
        "Old third-party systems still send mail unexpectedly.",
        "Teams do not understand the operational difference between softfail and fail."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We evaluated the qualifier at the end of the SPF record and what that qualifier means for enforcement confidence and sender policy strength.",
  
      nextSteps: [
        "Inventory every legitimate sender before moving to -all.",
        "Monitor SPF results from live mail headers during rollout.",
        "Move from ~all to -all only when your record is complete and stable.",
        "Re-test regularly when new providers are added."
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
          href: "/spf/no-spf-record-found",
          label: "No SPF record found"
        },
        {
          href: "/spf/spf-redirect-explained",
          label: "SPF redirect explained"
        }
      ]
    },
  
    /* =========================
       DKIM
    ========================= */
  
    "dkim/dkim-alignment-failed": {
      title: "DKIM Alignment Failed",
      intro:
        "DKIM alignment failed means the receiving server can verify the cryptographic DKIM signature, but the domain that signed the message does not align with the domain visible in the From header. That distinction matters because DMARC does not only care that a message was signed; it cares whether the signer is actually representing the visible sender domain. When an ESP signs with its own default domain or the wrong custom domain, DKIM may technically pass while DMARC still fails. This issue commonly affects marketing platforms, transactional email providers, and any setup where branded sending domains were never fully configured.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Configure DKIM so the signing domain uses your own domain or an aligned subdomain of the visible From address.",
  
      codeTitle: "Example aligned DKIM signature",
      codeLanguage: "Header Example",
      code: `From: invoices@example.com
  DKIM-Signature: v=1; a=rsa-sha256; d=mailer.example.com; s=dkim1; ...`,
  
      afterCodeText:
        "For DMARC purposes, a valid DKIM signature is not enough on its own. The signing domain also has to align with the visible From domain.",
  
      whyTitle: "Why this happens",
      whyText:
        "DKIM alignment fails when the d= value in the DKIM-Signature header is outside the organizational domain used in the visible From header. A message can still have a valid DKIM signature from a provider domain and yet fail DMARC because the signer is not aligned with the visible sender identity.",
  
      problemTitle: "Why DKIM alignment matters",
      problemPoints: [
        "A technically valid DKIM signature can still fail DMARC.",
        "ESP default signing domains often cause hidden alignment problems.",
        "Messages may land in spam even when DKIM appears to pass.",
        "DMARC loses a potential aligned authentication path."
      ],
  
      deliverabilityTitle: "How this affects DMARC",
      deliverabilityText:
        "DMARC sits above SPF and DKIM and asks whether at least one of them both passes and aligns. If DKIM passes cryptographically but the signer domain is outside your visible From domain, receivers may still treat the message as misaligned and apply your DMARC policy accordingly.",
  
      causesTitle: "Common causes",
      causes: [
        "The ESP signs with its own domain instead of your custom domain.",
        "Custom DKIM was partially configured but not fully activated.",
        "The wrong branded sending domain was assigned in the provider.",
        "Strict DMARC alignment makes a previously acceptable setup fail."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the relationship between the visible From domain and the DKIM d= signing domain to determine whether DKIM can contribute to a DMARC pass.",
  
      nextSteps: [
        "Check the DKIM-Signature header on a real delivered message.",
        "Confirm the d= domain aligns with your visible From domain.",
        "Enable custom DKIM or branded sending domains in your ESP if needed.",
        "Re-test DMARC alignment after publishing the corrected setup."
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
          href: "/dmarc/dmarc-alignment-failed",
          label: "DMARC alignment failed"
        }
      ]
    },
  
    "dkim/dkim-body-hash-mismatch": {
      title: "DKIM Body Hash Mismatch",
      intro:
        "A DKIM body hash mismatch means the bh= value in the DKIM-Signature header does not match the canonicalized body content that the receiving server calculated after receiving the message. In simpler terms, the message body changed after it was signed. That does not always mean the email was maliciously altered. It can happen because of footers, mailing lists, gateways, line-ending normalization, transport modifications, or provider-specific reformatting. When the body hash no longer matches, DKIM verification fails even if the selector and public key are correct. This is especially important for DMARC if DKIM is expected to carry the authentication result.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Stop modifying message bodies after signing, or configure your sender and downstream systems so DKIM signing happens at the final stage before delivery leaves your environment.",
  
      codeTitle: "Example DKIM signature",
      codeLanguage: "Header Example",
      code: `DKIM-Signature: v=1; a=rsa-sha256; bh=BASE64_BODY_HASH; b=...`,
  
      afterCodeText:
        "If something changes in the body after signing, even something small, the receiver recalculates a different body hash and DKIM fails.",
  
      whyTitle: "Why this happens",
      whyText:
        "DKIM signs a canonicalized version of the message body. If anything in that body changes after signing, the receiver recalculates a different hash and verification fails. Even small additions like disclaimer text, footer injection, line wrapping, or list formatting can cause a mismatch.",
  
      problemTitle: "Why body hash mismatches are tricky",
      problemPoints: [
        "The selector and public key can be correct while DKIM still fails.",
        "Email gateways and mailing lists often modify messages after signing.",
        "The failure may appear random across different delivery paths.",
        "DMARC can also fail if DKIM was the expected aligned result."
      ],
  
      deliverabilityTitle: "What this means operationally",
      deliverabilityText:
        "Body hash mismatches often point to the delivery pipeline, not the DNS layer. That makes them harder to diagnose than missing selectors or invalid keys. A domain may look correctly configured in DNS while downstream systems silently modify the message after DKIM signing.",
  
      causesTitle: "Common causes",
      causes: [
        "A secure email gateway adds a disclaimer or footer after signing.",
        "A mailing list rewrites or appends content to the body.",
        "An outbound relay reformats MIME structure or line endings.",
        "An application signs the message too early in the delivery pipeline."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We evaluated whether a valid selector and key exist but the signed body content may have been modified after DKIM signing, causing the bh= value to stop matching.",
  
      nextSteps: [
        "Inspect the raw delivered message and compare it with the sent version if possible.",
        "Look for disclaimers, footers, gateways, or mailing list rewrites.",
        "Move DKIM signing to the final outbound stage when possible.",
        "Re-test after removing post-signing message modifications."
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
          href: "/dkim/dkim-selector-not-found",
          label: "DKIM selector not found"
        },
        {
          href: "/dkim/dkim-key-length-too-short",
          label: "DKIM key length too short"
        }
      ]
    },
  
    "dkim/dkim-key-length-too-short": {
      title: "DKIM Key Length Too Short",
      intro:
        "DKIM key length too short means the public key published for your DKIM selector does not meet modern security expectations. Older 512-bit and some weak 1024-bit keys may still exist in long-lived mail setups, but they are increasingly rejected, distrusted, or discouraged by receiving systems. DKIM was designed to provide a cryptographic proof that the message was signed by a domain you control, and that proof depends heavily on the strength of the key. If the key is too short, your domain may pass in some places and fail or lose trust in others. A modern 2048-bit DKIM key is the safer default where provider support allows it.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Generate a stronger DKIM key with your provider, publish the new selector in DNS, and rotate sending to the stronger key.",
  
      codeTitle: "Example stronger DKIM key record",
      codeLanguage: "DNS TXT",
      code: `Type: TXT
  Host: dkim2._domainkey.example.com
  Value: v=DKIM1; k=rsa; p=NEW_2048_BIT_PUBLIC_KEY`,
  
      afterCodeText:
        "In practice, moving to a stronger selector usually means generating a new key pair, publishing the new DNS record, and switching the sending platform to sign with that selector.",
  
      whyTitle: "Why this happens",
      whyText:
        "Some domains still use legacy selectors that were created years ago under weaker defaults. Others rely on providers that historically used shorter keys and never rotated them. As security expectations rise, those older keys become a deliverability and trust problem even if the surrounding DKIM setup is otherwise valid.",
  
      problemTitle: "Why short keys are risky",
      problemPoints: [
        "Older DKIM keys may be distrusted or rejected by modern receivers.",
        "A valid-looking DKIM setup can still be considered weak.",
        "Security expectations change over time even if DNS never changes.",
        "Legacy selectors often stay in place far longer than intended."
      ],
  
      deliverabilityTitle: "Why stronger keys matter",
      deliverabilityText:
        "DKIM is supposed to prove message authenticity with credible cryptography. If the key is outdated, that proof becomes less convincing. Even before a provider rejects the key outright, weak keys can make your authentication posture look neglected.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain still uses an old 512-bit or weak 1024-bit key.",
        "The provider generated a legacy selector years ago and it was never rotated.",
        "A migration preserved historical DKIM settings without review.",
        "The team assumed any valid key was good enough indefinitely."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the DKIM selector's public key strength and whether the published key length meets current deliverability and security expectations.",
  
      nextSteps: [
        "Check whether your provider supports 2048-bit DKIM keys.",
        "Generate a new selector instead of modifying the old key in place if possible.",
        "Publish the new selector before disabling the old one.",
        "Verify live signatures after rotation to confirm the new selector is active."
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
          href: "/dkim/dkim-selector-not-found",
          label: "DKIM selector not found"
        },
        {
          href: "/dkim/dkim-body-hash-mismatch",
          label: "DKIM body hash mismatch"
        }
      ]
    },
  
    "dkim/dkim-selector-explained": {
      title: "DKIM Selector Explained",
      intro:
        "A DKIM selector is the label in the DKIM-Signature header that tells receiving servers which public key to fetch from DNS. It appears in the s= tag and works together with the d= signing domain. If a message uses s=dkim1 and d=example.com, the receiver looks up the public key at dkim1._domainkey.example.com. This matters because many DKIM problems are not caused by broken cryptography, but by publishing the right key at the wrong selector, deleting an active selector during key rotation, or using a selector in the signing system that does not match DNS. Understanding selectors makes it much easier to troubleshoot missing records, key mismatches, and provider migration issues.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Find the selector used in the DKIM-Signature header and confirm that the matching TXT record exists at selector._domainkey.yourdomain.com.",
  
      codeTitle: "How a DKIM selector maps to DNS",
      codeLanguage: "Example",
      code: `Selector used in header:
  s=dkim1
  
  DNS host:
  dkim1._domainkey.example.com
  
  TXT value:
  v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY`,
  
      afterCodeText:
        "The selector is simply the bridge between the email header and the DNS record that contains the public key used to verify the signature.",
  
      whyTitle: "Why this matters",
      whyText:
        "The selector is the bridge between the email header and the DNS record that holds the public key. If the selector used by the sender does not match the DNS record that was published, DKIM validation fails even when the actual key material is correct. This becomes especially important when multiple providers or staged key rotations are involved.",
  
      problemTitle: "Why selectors cause confusion",
      problemPoints: [
        "The public key can exist but still be looked up at the wrong DNS host.",
        "Providers often use different selectors for different sending environments.",
        "Key rotations can leave old and new selectors active at the same time.",
        "Many administrators focus on the key itself and forget the selector mapping."
      ],
  
      deliverabilityTitle: "Why understanding selectors helps",
      deliverabilityText:
        "Once you understand that the selector is the lookup label, many DKIM problems become easier to diagnose. Missing selector, wrong selector, mismatched selector, and invalid key are all related, but they fail at different points in the DKIM verification process.",
  
      causesTitle: "Common causes",
      causes: [
        "The ESP signs with one selector, but DNS was configured for another.",
        "The old selector was removed too early during DKIM key rotation.",
        "The public key was published at the wrong DNS host.",
        "Different email services use different selectors and only one was configured."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We explain how the selector in the DKIM-Signature header maps to a DNS lookup under selector._domainkey.domain.tld and why any mismatch there causes DKIM validation issues.",
  
      nextSteps: [
        "Check a real DKIM-Signature header for the s= selector value.",
        "Confirm the selector host exists exactly in DNS.",
        "Make sure the selector used by the provider matches the DNS record you published.",
        "Keep old selectors active long enough during rotations."
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
          href: "/dkim/invalid-dkim-key",
          label: "Invalid DKIM key"
        }
      ]
    },
  
    "dkim/dkim-selector-mismatch": {
      title: "DKIM Selector Mismatch",
      intro:
        "DKIM selector mismatch means the selector used to sign the message is not the same selector that has the correct public key published in DNS. The domain may have a valid DKIM setup in general, but the sending platform is pointing at the wrong selector, an old selector, or a selector that was never fully published. Because receivers look up the selector named in the signed message, any mismatch between the active signer and the DNS record breaks verification. This often appears during provider migrations, selector rotation, staged rollout, or partial DKIM reconfiguration.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Make sure the selector used by your sending platform exactly matches the selector that has the correct DKIM public key in DNS.",
  
      codeTitle: "Selector match example",
      codeLanguage: "Example",
      code: `Header selector: s=dkim2
  DNS record host: dkim2._domainkey.example.com`,
  
      afterCodeText:
        "The selector in the email header and the selector in DNS must point to the same record. A valid key on the wrong selector still fails DKIM.",
  
      whyTitle: "Why this happens",
      whyText:
        "When a sender signs with selector A but DNS only publishes selector B, receiving servers query the wrong host and cannot validate the signature. The underlying key might be valid, but it is attached to the wrong selector for the actual message flow.",
  
      problemTitle: "Why selector mismatches are common",
      problemPoints: [
        "Providers often change selectors during migrations or rotations.",
        "Administrators may publish the new key but forget to switch the sender.",
        "The sender may keep using an older selector longer than expected.",
        "DNS and provider settings can drift apart over time."
      ],
  
      deliverabilityTitle: "Why this hurts authentication",
      deliverabilityText:
        "Selector mismatches break DKIM at lookup time, which means the signature cannot be verified even if the correct key exists somewhere else in DNS. From the receiver's perspective, the relevant key is simply missing because it is being searched for at the wrong host.",
  
      causesTitle: "Common causes",
      causes: [
        "A new selector was created, but the sending platform still uses the old one.",
        "DNS was updated for one selector while the ESP was configured for another.",
        "A provider migration changed default selectors unexpectedly.",
        "Selector rotation was started but not completed."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed whether the selector referenced in signed mail is the same selector that has a matching DKIM public key published in DNS.",
  
      nextSteps: [
        "Inspect the s= value from a real signed message.",
        "Confirm the same selector host exists in DNS.",
        "Switch the sender or DNS so both sides match exactly.",
        "Keep the previous selector available during a staged rotation if needed."
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
          href: "/dkim/dkim-selector-explained",
          label: "DKIM selector explained"
        },
        {
          href: "/dkim/invalid-dkim-key",
          label: "Invalid DKIM key"
        }
      ]
    },
  
    "dkim/dkim-selector-not-found": {
      title: "DKIM Selector Not Found",
      intro:
        "DKIM selector not found means the selector named in the DKIM-Signature header does not resolve to a usable DKIM public key in DNS. The sending platform signs the message with an s= value such as dkim1, but the receiving server cannot find a valid TXT record at dkim1._domainkey.yourdomain.com. When that happens, DKIM verification fails even if the sending platform believes it is signing correctly. This problem is common after incomplete DNS setup, selector changes, provider migrations, or DKIM key rotation. It can directly affect inbox placement and can also break DMARC if DKIM was supposed to provide alignment for the visible From domain.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Publish the DKIM TXT record at the exact selector host used by your email provider and verify that the selector in the header matches the DNS record.",
  
      codeTitle: "Example DKIM selector record",
      codeLanguage: "DNS TXT",
      code: `Type:  TXT
  Host:  dkim1._domainkey.example.com
  Value: v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY`,
  
      afterCodeText:
        "The host name matters just as much as the key value. A valid public key published at the wrong hostname is still treated as missing.",
  
      whyTitle: "Why this happens",
      whyText:
        "Receivers validate DKIM by extracting the selector from the header and querying DNS for the corresponding public key. If that host is missing, misspelled, or points to the wrong selector, DKIM validation fails. This often happens when a provider gives a selector such as selector1 or dkim1 and the TXT record is published at the wrong hostname.",
  
      problemTitle: "Why a missing selector breaks DKIM",
      problemPoints: [
        "The receiver has no public key to verify the signature.",
        "The sender may appear configured correctly inside the ESP but still fail on delivery.",
        "DMARC may also fail if DKIM was your aligned authentication method.",
        "This issue often survives unnoticed until live mail is inspected."
      ],
  
      deliverabilityTitle: "How this affects inbox placement",
      deliverabilityText:
        "DKIM selector failures remove one of the most important trust signals mailbox providers use when evaluating your mail. If SPF is also weak or misaligned, the missing selector can push legitimate mail into spam or cause DMARC failures that should have been avoidable.",
  
      causesTitle: "Common causes",
      causes: [
        "The TXT record was added at the wrong host.",
        "The sending platform was switched to a new selector, but DNS still uses the old one.",
        "A DKIM rotation removed an active selector too early.",
        "The record exists in the wrong DNS zone or under the wrong subdomain."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We checked whether the selector-specific _domainkey TXT record exists and whether a usable public key can be found for the selector named by the sender.",
  
      nextSteps: [
        "Pull the selector value from a real DKIM-Signature header.",
        "Publish the public key at the exact selector._domainkey host.",
        "Check for typos, wrong zones, and incorrect DNS hosts.",
        "Re-test after DNS propagation using a fresh message."
      ],
  
      hub: {
        href: "/dkim",
        label: "DKIM Hub"
      },
  
      related: [
        {
          href: "/dkim/dkim-selector-explained",
          label: "DKIM selector explained"
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
        "Invalid DKIM key means the public key published in DNS cannot be used to verify the DKIM signature in your email. DKIM works by signing each message with a private key and allowing receiving servers to retrieve the matching public key from DNS. If that public key is malformed, truncated, incorrectly formatted, or missing critical parameters, the verification process fails. When DKIM fails consistently, mailbox providers may treat your messages as suspicious or rely entirely on SPF for DMARC alignment. Fixing the DNS key record ensures that receivers can validate the DKIM signature correctly and trust the authenticity of your messages.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Replace the invalid DKIM TXT record with the exact public key provided by your email service and make sure the value starts with v=DKIM1.",
  
      codeTitle: "Example valid DKIM key record",
      codeLanguage: "DNS TXT",
      code: `Type: TXT
  Host: dkim1._domainkey.example.com
  Value: v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY`,
  
      afterCodeText:
        "DKIM keys are easy to damage during copy-paste or DNS editing. Even a small formatting mistake can break signature verification.",
  
      whyTitle: "Why this happens",
      whyText:
        "DKIM validation fails when the public key in DNS cannot be parsed or does not match the expected format. This can happen if the key was copied incorrectly, split into multiple records by the DNS provider, truncated due to character limits, or edited manually. Because DKIM relies on a cryptographic key pair, even small formatting errors can prevent verification.",
  
      problemTitle: "Why invalid keys are dangerous",
      problemPoints: [
        "The sender may still sign messages, but receivers cannot verify them.",
        "A malformed key can look present in DNS while remaining unusable.",
        "Troubleshooting often focuses on the sender instead of the DNS value.",
        "DMARC may also fail if DKIM was the aligned path."
      ],
  
      deliverabilityTitle: "What this means for trust",
      deliverabilityText:
        "A broken DKIM key undermines one of the strongest domain-level proofs of authenticity available in email. If your domain depends on DKIM for alignment, an invalid key can silently weaken both deliverability and anti-spoofing at the same time.",
  
      causesTitle: "Common causes",
      causes: [
        "The DKIM key was copied incorrectly from the email provider.",
        "DNS automatically split the key into multiple TXT records.",
        "The public key was truncated due to DNS character limits.",
        "A wrong selector or incorrect DNS host was used.",
        "Manual edits removed required DKIM parameters."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We checked whether the DKIM selector record exists in DNS and whether the TXT value contains a properly formatted DKIM public key beginning with v=DKIM1 and including a valid p= parameter.",
  
      nextSteps: [
        "Copy the DKIM key fresh from the provider rather than reusing edited text.",
        "Check whether your DNS provider split or truncated the record.",
        "Verify the key is published under the correct selector host.",
        "Send a new test message after correcting the DNS record."
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
          href: "/dkim/dkim-selector-explained",
          label: "DKIM selector explained"
        }
      ]
    },
  
    "dkim/no-dkim-record-found": {
      title: "No DKIM Record Found",
      intro:
        "No DKIM record found means the receiving server could not find a valid DKIM public key in DNS for the selector your sender is expected to use. DKIM is one of the main authentication signals mailbox providers rely on to confirm that a message really came from infrastructure associated with your domain. Without a DKIM record, signed mail cannot be verified, and unsigned mail has to rely entirely on SPF or other reputation signals. This often appears when a provider setup was only partially completed, a selector was never published, or a DNS migration removed the TXT record that the provider expected to find.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Generate DKIM in your mail provider, publish the selector TXT record exactly as given, and verify that the record is visible in public DNS.",
  
      codeTitle: "Example DKIM record",
      codeLanguage: "DNS TXT",
      code: `Type: TXT
  Host: selector1._domainkey.example.com
  Value: v=DKIM1; k=rsa; p=YOUR_PUBLIC_KEY`,
  
      afterCodeText:
        "Most providers generate DKIM automatically inside their interface, but the DNS publishing step still has to be completed by you or your DNS administrator.",
  
      whyTitle: "Why this happens",
      whyText:
        "Many providers require you to complete DKIM by publishing one or more TXT records in DNS. If that step is skipped, mispublished, or lost during DNS changes, DKIM has no public key to verify against. The result is a missing authentication signal, even though the provider account itself may look fully set up.",
  
      problemTitle: "Why missing DKIM matters",
      problemPoints: [
        "Receivers cannot verify signed mail from your domain.",
        "DMARC may lose its aligned DKIM path.",
        "Your domain becomes more dependent on SPF alone.",
        "Inbox placement can become less stable, especially for new domains."
      ],
  
      deliverabilityTitle: "How missing DKIM affects reputation",
      deliverabilityText:
        "DKIM is one of the strongest persistent signals that a domain controls its mail stream. When it is missing, mailbox providers have fewer reasons to trust the message, especially if the domain is not yet well established or if SPF is not perfectly aligned.",
  
      causesTitle: "Common causes",
      causes: [
        "The provider-generated DKIM record was never added to DNS.",
        "The record was published at the wrong host.",
        "A DNS migration removed the selector record.",
        "The active sender uses a selector that is different from the one administrators configured."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We checked whether a valid DKIM selector record exists in public DNS and whether the expected host contains a usable DKIM public key.",
  
      nextSteps: [
        "Generate the DKIM selector from your actual sending provider.",
        "Publish the record exactly as instructed, including the selector host.",
        "Verify public DNS visibility after propagation.",
        "Send a fresh test message and inspect the DKIM-Signature header."
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
          href: "/dkim/dkim-selector-explained",
          label: "DKIM selector explained"
        }
      ]
    },
  
    /* =========================
       DMARC
    ========================= */
  
    "dmarc/dmarc-alignment-failed": {
      title: "DMARC Alignment Failed",
      intro:
        "DMARC alignment failed means SPF or DKIM may have produced a technical result, but neither one aligned correctly with the visible From domain. DMARC does not only ask whether a message was authenticated somewhere in the delivery chain; it checks whether the authenticated domain actually matches the domain shown to the recipient. If SPF passes for a return-path domain that does not align, or DKIM passes for a signing domain outside the visible From domain, DMARC still fails. This is one of the most common reasons why legitimate email lands in spam even when teams believe SPF or DKIM is already configured.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Make sure at least one authentication method both passes and aligns with the visible From domain: SPF must align through the return-path, or DKIM must align through the d= signing domain.",
  
      codeTitle: "Example aligned DMARC paths",
      codeLanguage: "Example",
      code: `From: billing@example.com
  SPF aligned pass: return-path uses example.com or a matching subdomain
  DKIM aligned pass: d=example.com or d=mailer.example.com`,
  
      afterCodeText:
        "DMARC does not care only about pass or fail. It also cares whether the passing domain is actually aligned with the visible From address.",
  
      whyTitle: "Why this happens",
      whyText:
        "DMARC sits on top of SPF and DKIM. A message only passes DMARC if at least one of those mechanisms both succeeds and aligns with the visible From domain. Alignment fails when providers sign or route mail through unrelated domains, when custom DKIM is not enabled, or when the return-path is controlled by the ESP instead of your own domain.",
  
      problemTitle: "Why alignment failures are so common",
      problemPoints: [
        "SPF or DKIM can look healthy in isolation while DMARC still fails.",
        "Many ESPs use their own domains by default unless branding is configured.",
        "A domain can have authentication but still lack aligned authentication.",
        "Legitimate mail may hit spam or rejection because the visible identity is not proven."
      ],
  
      deliverabilityTitle: "Why alignment matters more than raw pass results",
      deliverabilityText:
        "DMARC exists to tie authentication to the sender identity the recipient sees. That is why a valid-looking SPF or DKIM result is not enough if it belongs to the wrong domain. Alignment is what turns technical authentication into visible identity trust.",
  
      causesTitle: "Common causes",
      causes: [
        "The ESP signs DKIM with its own domain instead of your domain.",
        "SPF passes for a return-path domain that does not match the visible From domain.",
        "Custom DKIM or custom bounce domain setup was never completed.",
        "Strict DMARC settings were enabled before the mail flow was aligned."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We checked whether SPF and DKIM could contribute to a DMARC pass and whether either one aligned with the visible From domain instead of only passing in isolation.",
  
      nextSteps: [
        "Inspect both the return-path domain and the DKIM d= domain on a real delivered message.",
        "Confirm that at least one of them aligns with the visible From domain.",
        "Enable custom bounce domains or custom DKIM where needed.",
        "Re-test after alignment changes before moving to stronger DMARC enforcement."
      ],
  
      hub: {
        href: "/dmarc",
        label: "DMARC Hub"
      },
  
      related: [
        {
          href: "/dmarc/dmarc-aspf-adkim-explained",
          label: "DMARC aspf and adkim explained"
        },
        {
          href: "/dkim/dkim-alignment-failed",
          label: "DKIM alignment failed"
        },
        {
          href: "/dmarc/no-dmarc-record-found",
          label: "No DMARC record found"
        }
      ]
    },
  
    "dmarc/dmarc-aspf-adkim-explained": {
      title: "DMARC aspf and adkim Explained",
      intro:
        "The DMARC aspf and adkim tags control alignment strictness for SPF and DKIM. These tags decide whether subdomains are allowed to align with the visible From domain or whether only exact matches will pass. In relaxed mode, a subdomain can still align. In strict mode, the authenticated domain must exactly match the visible From domain. Many teams turn on DMARC without fully understanding these alignment controls, then wonder why perfectly valid-looking mail still fails DMARC. If SPF or DKIM appears to pass but DMARC fails, the aspf or adkim setting is often part of the explanation.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Use relaxed alignment unless you have a specific reason to require exact-match strict alignment across all senders.",
  
      codeTitle: "Example DMARC alignment settings",
      codeLanguage: "DNS TXT",
      code: `v=DMARC1; p=none; aspf=r; adkim=r; rua=mailto:dmarc@example.com`,
  
      afterCodeText:
        "Relaxed alignment is the more forgiving and more common default. Strict alignment should be used only when you fully understand every sending path for the domain.",
  
      whyTitle: "Why this matters",
      whyText:
        "Alignment mode directly affects whether SPF and DKIM results can contribute to DMARC. A sender that works under relaxed alignment may fail under strict alignment if the authenticated domain is only a subdomain of the visible From domain.",
  
      problemTitle: "Why alignment mode changes outcomes",
      problemPoints: [
        "A message can pass authentication but fail alignment depending on mode.",
        "Strict settings expose hidden sender inconsistencies more aggressively.",
        "Subdomain-based senders often work under relaxed mode but not strict mode.",
        "Teams often confuse authentication success with alignment success."
      ],
  
      deliverabilityTitle: "When strict alignment makes sense",
      deliverabilityText:
        "Strict alignment is not automatically better. It is only better when your mail ecosystem is simple, fully documented, and consistently branded. In mixed-provider environments, relaxed alignment is often the more realistic starting point.",
  
      causesTitle: "Common causes",
      causes: [
        "Strict alignment was enabled without testing all sending systems.",
        "Subdomains are used for mail, but exact-match alignment is required.",
        "Different providers use different return-path or DKIM d= domains.",
        "Teams confuse authentication success with alignment success."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the alignment mode concept for SPF and DKIM and how the aspf and adkim tags change DMARC behavior in practice.",
  
      nextSteps: [
        "Check whether your DMARC record uses relaxed or strict alignment.",
        "Compare that setting with your real sender architecture.",
        "Use relaxed mode first if several providers or subdomains are involved.",
        "Only move to strict mode when every sending path is fully aligned."
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
          label: "DMARC policy: none vs quarantine vs reject"
        },
        {
          href: "/dmarc/no-dmarc-record-found",
          label: "No DMARC record found"
        }
      ]
    },
  
    "dmarc/dmarc-fo-tag-explained": {
      title: "DMARC fo Tag Explained",
      intro:
        "The DMARC fo tag controls failure reporting options for forensic or failure reports. It determines under which combinations of SPF and DKIM failure a report should be generated. Although not every receiver sends forensic reports, the fo tag still matters because it shapes how detailed your DMARC reporting strategy can be. Teams often copy fo values from examples without understanding whether they want reports on any failure, only all failures, or only SPF- or DKIM-specific failures. If you are tuning DMARC visibility during rollout, the fo tag is one of the more advanced but useful controls to understand.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Use a simple DMARC policy first, and only add or change the fo tag if you specifically need forensic failure reporting behavior.",
  
      codeTitle: "Example DMARC fo tag",
      codeLanguage: "DNS TXT",
      code: `v=DMARC1; p=none; fo=1; rua=mailto:dmarc@example.com`,
  
      afterCodeText:
        "The fo tag controls reporting preference, not enforcement. It is useful, but it is not the first DMARC setting most domains need to optimize.",
  
      whyTitle: "Why this matters",
      whyText:
        "The fo tag changes when failure reports should be generated. A broader fo setting may increase visibility into authentication issues, but it can also create more report noise and depends heavily on receiver support.",
  
      problemTitle: "Why fo is often misunderstood",
      problemPoints: [
        "Many receivers do not send forensic reports consistently.",
        "Teams may expect high detail from a tag that depends on receiver behavior.",
        "The fo tag affects reporting conditions, not DMARC pass/fail logic.",
        "Copying example values without understanding them can create confusion."
      ],
  
      deliverabilityTitle: "Where fo fits in a DMARC rollout",
      deliverabilityText:
        "The fo tag is a secondary tuning control. It can improve visibility, but it does not replace the core work of aligning SPF and DKIM, choosing the right policy, and monitoring aggregate reports. Most domains should get those basics right first.",
  
      causesTitle: "Common causes",
      causes: [
        "The fo tag was copied from an example without understanding its effect.",
        "Teams expected forensic reports but used a restrictive fo value.",
        "A reporting platform recommended an fo value that was never reviewed.",
        "Administrators confused rua aggregate reporting with forensic failure reporting."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the role of the fo tag in DMARC and how it affects the conditions under which forensic-style failure reports may be requested.",
  
      nextSteps: [
        "Decide whether you actually need forensic-style reporting.",
        "Prioritize aggregate reporting and alignment fixes before fo tuning.",
        "Use a simple fo value only if it matches your reporting goals.",
        "Expect receiver support for forensic reports to vary."
      ],
  
      hub: {
        href: "/dmarc",
        label: "DMARC Hub"
      },
  
      related: [
        {
          href: "/dmarc/dmarc-rua-ruf-not-working",
          label: "DMARC rua/ruf not working"
        },
        {
          href: "/dmarc/dmarc-pct-tag-explained",
          label: "DMARC pct tag explained"
        },
        {
          href: "/dmarc/dmarc-aspf-adkim-explained",
          label: "DMARC aspf and adkim explained"
        }
      ]
    },
  
    "dmarc/dmarc-pct-tag-explained": {
      title: "DMARC pct Tag Explained",
      intro:
        "The DMARC pct tag controls the percentage of failing messages to which a DMARC enforcement policy should be applied. It is mainly used during staged rollout when a domain wants to move from monitoring to enforcement gradually rather than applying quarantine or reject to every failing message immediately. Used carefully, pct can help reduce operational risk during adoption. Used carelessly, it can create a false sense of protection because some failing mail will still bypass enforcement. Understanding the pct tag matters when you are planning a phased DMARC rollout and want to balance safety with meaningful protection.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Use pct only during controlled rollout, and move to 100 once your legitimate senders are fully authenticated and aligned.",
  
      codeTitle: "Example DMARC pct tag",
      codeLanguage: "DNS TXT",
      code: `v=DMARC1; p=quarantine; pct=25; rua=mailto:dmarc@example.com`,
  
      afterCodeText:
        "A pct value below 100 means not all failing mail is subject to the full DMARC enforcement action. It is a rollout lever, not a permanent security strategy.",
  
      whyTitle: "Why this matters",
      whyText:
        "A pct value below 100 means only a portion of failing messages are subject to the chosen DMARC enforcement action. That can reduce rollout risk, but it also means part of your spoofing exposure remains untreated.",
  
      problemTitle: "Why pct can mislead teams",
      problemPoints: [
        "A stricter policy may appear active while only part of the failing mail is affected.",
        "Domains can stay in partial enforcement longer than intended.",
        "Security and operations may misread the actual protection level.",
        "pct helps rollout, but it also prolongs partial exposure."
      ],
  
      deliverabilityTitle: "When pct is useful",
      deliverabilityText:
        "The pct tag is most useful during controlled deployment when you want to test enforcement without applying it to all failing mail immediately. It should support rollout, not replace it. Once your senders are aligned, leaving pct below 100 only weakens the domain's protection.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain is rolling out DMARC gradually.",
        "Administrators fear blocking legitimate mail too early.",
        "A consultant or platform recommended phased enforcement.",
        "The tag was left at a low value long after rollout should have finished."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the pct tag as a rollout control and its effect on how broadly DMARC enforcement is applied to failing mail.",
  
      nextSteps: [
        "Use pct only during a defined rollout phase.",
        "Monitor reports and sender alignment as the percentage increases.",
        "Move to pct=100 once legitimate senders are confirmed.",
        "Avoid leaving the domain in partial enforcement indefinitely."
      ],
  
      hub: {
        href: "/dmarc",
        label: "DMARC Hub"
      },
  
      related: [
        {
          href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
          label: "DMARC policy: none vs quarantine vs reject"
        },
        {
          href: "/dmarc/dmarc-fo-tag-explained",
          label: "DMARC fo tag explained"
        },
        {
          href: "/dmarc/no-dmarc-record-found",
          label: "No DMARC record found"
        }
      ]
    },
  
    "dmarc/dmarc-policy-none-vs-quarantine-vs-reject": {
      title: "DMARC Policy: None vs Quarantine vs Reject",
      intro:
        "DMARC policy determines what receivers should do when a message fails DMARC. The three standard modes are none, quarantine, and reject. None means monitor only. Quarantine asks receivers to treat failing mail as suspicious, often by routing it to spam. Reject asks receivers to block failing mail entirely. Choosing the right mode is one of the most important parts of a DMARC rollout because it affects both anti-spoofing protection and operational risk. Too weak, and spoofed mail keeps getting through. Too strong, too early, and legitimate mail can be harmed if alignment is not complete.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Start with p=none while you validate senders, then move to quarantine and finally reject once SPF and DKIM alignment are stable across all legitimate sources.",
  
      codeTitle: "Example monitoring policy",
      codeLanguage: "DNS TXT",
      code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com`,
  
      afterCodeText:
        "Monitoring mode is usually the safest starting point because it gives you visibility before you apply stronger enforcement to failing mail.",
  
      whyTitle: "Why this matters",
      whyText:
        "DMARC policy determines whether a failure is only observed, treated suspiciously, or blocked. The correct choice depends on how complete your sender inventory is and whether all legitimate mail sources already align with the visible From domain.",
  
      problemTitle: "How to think about DMARC policy levels",
      problemPoints: [
        "p=none gives visibility but no strong anti-spoofing enforcement.",
        "p=quarantine is a middle step that treats failing mail as suspicious.",
        "p=reject is strongest but requires confidence in alignment.",
        "Moving too fast can harm legitimate mail; moving too slowly leaves spoofing exposure."
      ],
  
      deliverabilityTitle: "Why staged rollout usually works best",
      deliverabilityText:
        "DMARC enforcement is not just a security choice. It is an operational decision. Strong enforcement works best when the domain's sender inventory is complete and alignment is stable. That is why many domains move from none to quarantine to reject rather than jumping directly to reject.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain is still discovering legitimate senders and stays at p=none.",
        "Teams moved to reject before alignment was complete.",
        "Security wants stronger anti-spoofing while operations fear false positives.",
        "Old providers still send mail outside the approved authentication design."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed DMARC enforcement modes and how each policy changes the operational and anti-spoofing outcome of a DMARC failure.",
  
      nextSteps: [
        "Start with p=none if your sender inventory is still incomplete.",
        "Use aggregate reports to identify legitimate and unauthorized sources.",
        "Move to quarantine once alignment is stable.",
        "Use reject when you are confident legitimate mail will not be harmed."
      ],
  
      hub: {
        href: "/dmarc",
        label: "DMARC Hub"
      },
  
      related: [
        {
          href: "/dmarc/dmarc-pct-tag-explained",
          label: "DMARC pct tag explained"
        },
        {
          href: "/dmarc/dmarc-aspf-adkim-explained",
          label: "DMARC aspf and adkim explained"
        },
        {
          href: "/dmarc/no-dmarc-record-found",
          label: "No DMARC record found"
        }
      ]
    },
  
    "dmarc/dmarc-rua-ruf-not-working": {
      title: "DMARC rua/ruf Not Working",
      intro:
        "DMARC rua and ruf not working usually means the reporting addresses in your DMARC record are not receiving the reports you expected. Aggregate reports use rua, while forensic or failure reports use ruf. In real-world deployments, aggregate reporting is much more common than forensic reporting, and some providers never send ruf reports at all. Reporting can also fail because the mailbox does not exist, third-party authorization is missing, the record is malformed, or the expectation of what reports should arrive does not match how receivers actually behave. This page helps separate true misconfiguration from normal DMARC reporting limitations.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Verify that the rua and ruf addresses are valid, properly formatted, and authorized if they point to a third-party reporting domain.",
  
      codeTitle: "Example DMARC reporting addresses",
      codeLanguage: "DNS TXT",
      code: `v=DMARC1; p=none; rua=mailto:dmarc@example.com; ruf=mailto:forensic@example.com`,
  
      afterCodeText:
        "Aggregate reports sent to rua are far more common than forensic reports sent to ruf. A lack of ruf traffic does not automatically mean the DMARC record is broken.",
  
      whyTitle: "Why this happens",
      whyText:
        "DMARC reports depend on both your record syntax and receiver behavior. Aggregate reports are common, but forensic reports are far less consistently sent. If the destination mailbox is wrong, third-party delegation is missing, or you expect immediate high report volume from a low-traffic domain, it may appear that reporting is broken when it is really just limited.",
  
      problemTitle: "Why DMARC reporting can be misleading",
      problemPoints: [
        "rua and ruf are not equally supported by receivers.",
        "A valid DMARC record can still produce fewer reports than expected.",
        "Third-party report destinations may require extra authorization.",
        "Low domain volume can make report flow look inconsistent."
      ],
  
      deliverabilityTitle: "What reports really help with",
      deliverabilityText:
        "DMARC reports do not directly improve inbox placement, but they are critical for understanding who sends mail using your domain and whether your authentication setup is aligned. Reporting failures reduce visibility, which makes policy rollout and spoofing defense harder.",
  
      causesTitle: "Common causes",
      causes: [
        "The rua or ruf email address is invalid or misspelled.",
        "Third-party reporting was configured without the required external reporting authorization.",
        "The DMARC record syntax is malformed.",
        "The domain receives fewer reports than expected because some providers do not send forensic reports."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed whether the DMARC reporting addresses are syntactically valid, realistic for receiver support, and correctly configured for aggregate and forensic reporting.",
  
      nextSteps: [
        "Verify the rua and ruf mailbox addresses exist and can receive mail.",
        "Check whether external reporting authorization is required for third-party destinations.",
        "Do not expect forensic reporting volume to match aggregate reporting volume.",
        "Monitor for aggregate reports first, since they are the most consistently supported."
      ],
  
      hub: {
        href: "/dmarc",
        label: "DMARC Hub"
      },
  
      related: [
        {
          href: "/dmarc/dmarc-fo-tag-explained",
          label: "DMARC fo tag explained"
        },
        {
          href: "/dmarc/no-dmarc-record-found",
          label: "No DMARC record found"
        },
        {
          href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
          label: "DMARC policy: none vs quarantine vs reject"
        }
      ]
    },
  
    "dmarc/dmarc-sp-subdomain-policy-explained": {
      title: "DMARC sp Subdomain Policy Explained",
      intro:
        "The DMARC sp tag controls the DMARC policy for subdomains when a parent domain publishes a DMARC record. It matters because many organizations protect the main domain but forget that subdomains can still be used for phishing, testing, or delegated sending. If the parent domain has a strong policy but the sp tag is omitted or misunderstood, subdomains may not be governed the way you expect. The sp tag allows you to set a different enforcement posture for subdomains than for the root domain, which is useful in staged deployments, large organizations, and mixed environments where subdomains are managed differently.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Use the sp tag if you want subdomains to follow a different DMARC enforcement policy than the parent domain.",
  
      codeTitle: "Example DMARC sp tag",
      codeLanguage: "DNS TXT",
      code: `v=DMARC1; p=reject; sp=quarantine; rua=mailto:dmarc@example.com`,
  
      afterCodeText:
        "The sp tag gives you explicit control over how subdomains are treated. Without it, teams often assume subdomain behavior instead of defining it clearly.",
  
      whyTitle: "Why this matters",
      whyText:
        "Without an sp tag, subdomains may inherit behavior in ways teams do not fully understand, or they may be left weaker than intended. The sp tag gives explicit control over how subdomain failures should be treated.",
  
      problemTitle: "Why subdomain policy is often overlooked",
      problemPoints: [
        "Organizations may secure the root domain while forgetting delegated subdomains.",
        "Subdomains can be used in phishing even when the parent is well protected.",
        "Different business units often manage subdomains differently.",
        "Assumptions about inheritance can leave gaps in enforcement."
      ],
  
      deliverabilityTitle: "Why the sp tag matters operationally",
      deliverabilityText:
        "Large organizations often use subdomains for different mail streams, brands, or teams. The sp tag lets you apply a stricter or softer policy to those subdomains without forcing the same posture everywhere immediately.",
  
      causesTitle: "Common causes",
      causes: [
        "The parent domain policy was configured, but subdomain behavior was never reviewed.",
        "Security expected subdomains to be rejected even though sp was missing.",
        "Different business units use subdomains for different mail flows.",
        "A staged rollout required a softer policy on subdomains than the main domain."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We reviewed the role of the sp tag in controlling subdomain policy and how it changes DMARC behavior beneath the parent domain.",
  
      nextSteps: [
        "List which subdomains are used for email and who controls them.",
        "Decide whether subdomains need the same or different DMARC enforcement.",
        "Use sp only when that distinction is intentional.",
        "Monitor subdomain traffic before raising enforcement."
      ],
  
      hub: {
        href: "/dmarc",
        label: "DMARC Hub"
      },
  
      related: [
        {
          href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
          label: "DMARC policy: none vs quarantine vs reject"
        },
        {
          href: "/dmarc/no-dmarc-record-found",
          label: "No DMARC record found"
        },
        {
          href: "/dmarc/dmarc-aspf-adkim-explained",
          label: "DMARC aspf and adkim explained"
        }
      ]
    },
  
    "dmarc/multiple-dmarc-records-found": {
      title: "Multiple DMARC Records Found",
      intro:
        "A domain must publish only one DMARC record at the _dmarc host. When multiple DMARC TXT records exist, receivers may ignore the policy or treat it as invalid because there is no single authoritative instruction to follow. This can happen during migrations, consultant handoffs, or incremental changes where new policies are added without removing old ones. The result is confusion at the receiver side and a loss of predictable DMARC enforcement. Even if both records look individually correct, publishing more than one creates ambiguity and undermines the point of DMARC as a clear domain policy.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Keep only one DMARC TXT record at the _dmarc host and merge any required settings into that single record.",
  
      codeTitle: "Example valid single DMARC record",
      codeLanguage: "DNS TXT",
      code: `Host: _dmarc.example.com
  Value: v=DMARC1; p=none; rua=mailto:dmarc@example.com`,
  
      afterCodeText:
        "Unlike ordinary TXT usage where multiple records may sometimes coexist, DMARC expects one clear policy record at the _dmarc host.",
  
      whyTitle: "Why this happens",
      whyText:
        "Multiple DMARC records often appear when a new monitoring platform, consultant, or policy rollout adds another TXT record at _dmarc without removing the old one. Unlike some DNS scenarios where multiple TXT records are acceptable, DMARC expects one clear policy record.",
  
      problemTitle: "Why multiple DMARC records break policy clarity",
      problemPoints: [
        "Receivers may ignore the DMARC policy entirely.",
        "DMARC enforcement becomes ambiguous instead of authoritative.",
        "Monitoring and rollout changes become harder to reason about.",
        "The domain may appear partially configured rather than intentionally protected."
      ],
  
      deliverabilityTitle: "Why this affects protection",
      deliverabilityText:
        "DMARC is supposed to tell receivers exactly how your domain wants failures treated. If the policy itself is ambiguous, the anti-spoofing value of DMARC drops sharply because the receiver no longer has one clear instruction to follow.",
  
      causesTitle: "Common causes",
      causes: [
        "A new DMARC platform added a second policy record.",
        "A DNS migration preserved old and new _dmarc TXT records.",
        "Different teams edited DMARC independently.",
        "Temporary rollout policies were left in place after new ones were added."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We looked for TXT records at the _dmarc host and verified whether more than one DMARC policy record is published.",
  
      nextSteps: [
        "Review every TXT record at the _dmarc host.",
        "Merge valid settings into one final DMARC record.",
        "Remove deprecated or duplicate policy records.",
        "Re-test after propagation to confirm a single policy remains."
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
          label: "DMARC policy: none vs quarantine vs reject"
        },
        {
          href: "/dmarc/dmarc-rua-ruf-not-working",
          label: "DMARC rua/ruf not working"
        }
      ]
    },
  
    "dmarc/no-dmarc-record-found": {
      title: "No DMARC Record Found",
      intro:
        "No DMARC record found means your domain has not published a DMARC policy at the _dmarc host. Without DMARC, mailbox providers have no explicit instruction for how your domain wants SPF and DKIM alignment failures handled. That weakens your anti-spoofing posture and removes the reporting layer that helps you understand who is sending mail using your domain. While SPF and DKIM can still exist without DMARC, they do not provide the same policy enforcement and visibility by themselves. This is one of the most common gaps on otherwise legitimate domains that have never completed a full authentication rollout.",
  
      fixTitle: "One-Minute Fix",
      fixText:
        "Publish a DMARC TXT record at _dmarc.yourdomain.com and start with monitoring mode if you are not ready for enforcement.",
  
      codeTitle: "Example DMARC record",
      codeLanguage: "DNS TXT",
      code: `Host: _dmarc.example.com
  Value: v=DMARC1; p=none; rua=mailto:dmarc@example.com`,
  
      afterCodeText:
        "Starting with p=none is usually the safest first step because it gives you reporting visibility without immediately enforcing quarantine or rejection.",
  
      whyTitle: "Why this happens",
      whyText:
        "Many domains stop after SPF and DKIM, or they assume the email provider already handles DMARC automatically. Others postpone DMARC because enforcement feels risky, but then never publish even a monitoring record. As a result, the domain has no policy layer and no reporting visibility.",
  
      problemTitle: "Why missing DMARC is a problem",
      problemPoints: [
        "Your domain publishes no explicit anti-spoofing policy to receivers.",
        "You lose aggregate reporting visibility into who sends mail using your domain.",
        "SPF and DKIM may exist, but they are not being tied to a clear domain policy.",
        "Attackers face less resistance when spoofing your visible domain identity."
      ],
  
      deliverabilityTitle: "How DMARC strengthens the full setup",
      deliverabilityText:
        "DMARC does not replace SPF or DKIM. It turns them into a coherent domain-level policy. Without DMARC, you may still have authentication signals, but you are missing the layer that tells receivers how to interpret alignment failures and how to report suspicious activity back to you.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain only configured SPF and DKIM but never added DMARC.",
        "DMARC rollout was postponed and never completed.",
        "A DNS migration removed the _dmarc record.",
        "Administrators assumed the provider created DMARC automatically."
      ],
  
      checkedTitle: "What we checked",
      checkedText:
        "We checked for a TXT record at the _dmarc host and found no valid DMARC policy record beginning with v=DMARC1.",
  
      nextSteps: [
        "Publish a monitoring DMARC record first if you are unsure about enforcement.",
        "Set up a working rua reporting address.",
        "Review aggregate reports before moving to quarantine or reject.",
        "Confirm SPF and DKIM alignment before increasing enforcement."
      ],
  
      hub: {
        href: "/dmarc",
        label: "DMARC Hub"
      },
  
      related: [
        {
          href: "/dmarc/multiple-dmarc-records-found",
          label: "Multiple DMARC records found"
        },
        {
          href: "/dmarc/dmarc-policy-none-vs-quarantine-vs-reject",
          label: "DMARC policy: none vs quarantine vs reject"
        },
        {
          href: "/dmarc/dmarc-aspf-adkim-explained",
          label: "DMARC aspf and adkim explained"
        }
      ]
    }
  };
export const spfErrors = {
    "spf/multiple-spf-records-found": {
      title: "Multiple SPF Records Found – Fix SPF Configuration Error (2026)",
  
      intro:
        "Your domain is publishing more than one SPF record, and that breaks SPF evaluation. SPF is designed to use exactly one TXT record that begins with v=spf1 for a given domain. When a receiving server finds two or more SPF policies, it cannot safely determine which policy should apply, so SPF returns a permanent error instead of a normal pass, fail, or softfail result. In real-world setups, this often happens after a business adds Google Workspace, Microsoft 365, SendGrid, Mailchimp, or another email platform one by one and pastes each provider's SPF instructions as a separate TXT record instead of merging them into one final policy.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Keep only one SPF TXT record for the domain and merge all legitimate sending services into that single SPF policy.",
  
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
        "This problem usually appears when different tools each provide their own SPF instructions and those instructions are added directly in DNS without consolidation. For example, a domain may already have an SPF record for Google Workspace, then later a team adds SendGrid or Microsoft 365 and pastes a second v=spf1 record instead of merging the new include mechanism into the original one. SPF does not support multiple active policies for the same domain, even when each record looks valid on its own.",
  
      problemTitle: "Why multiple SPF records are a problem",
      problemPoints: [
        "Receiving servers return an SPF permerror instead of a clear pass, fail, or softfail result.",
        "Legitimate mail can lose SPF authentication even when your approved senders are correct.",
        "DMARC may also fail when SPF was supposed to provide an aligned authentication path.",
        "Inbox placement becomes less predictable because your authentication setup looks broken rather than intentional."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
      deliverabilityText:
        "From a deliverability perspective, multiple SPF records create ambiguity at the exact moment mailbox providers want clarity. Your domain may have legitimate sending services and good intent, but the receiver still sees a broken SPF policy. That weakens trust, especially for newer domains, lower-volume senders, and domains that already rely heavily on SPF for DMARC alignment. Even when mail is not rejected immediately, authentication instability can make troubleshooting much harder and contribute to spam-folder placement.",
  
      causesTitle: "Common causes",
      causes: [
        "Google Workspace or Microsoft 365 was added after an older SPF record already existed.",
        "A marketing platform such as SendGrid or Mailchimp pasted its SPF instructions as a second SPF record.",
        "A DNS migration copied historical TXT records and accidentally preserved duplicate SPF entries.",
        "Different people updated DNS over time without consolidating everything into one final SPF policy."
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
  
    "spf/spf-include-flattening": {
      title: "SPF Include Flattening – Reduce DNS Lookups Safely (2026)",
  
      intro:
        "SPF include flattening is the process of replacing SPF include mechanisms with the actual IP addresses they resolve to. This technique is commonly used to reduce the number of DNS lookups performed during SPF evaluation. SPF has a strict limit of ten DNS lookups, and complex email infrastructures can easily exceed that limit when multiple providers are used.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "If your SPF record exceeds the DNS lookup limit, flatten the include mechanisms by replacing them with the IP addresses returned by those providers.",
  
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
        "Many modern email systems rely on include mechanisms to delegate SPF policies. When several services are combined, the total number of DNS lookups can exceed SPF limits.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "SPF evaluation stops after 10 DNS lookups.",
        "Receivers may return SPF permerror.",
        "Legitimate email may fail authentication.",
        "DMARC alignment may break."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When SPF exceeds lookup limits, receivers treat the record as invalid. That reduces authentication reliability and may lower sender trust.",
  
      causesTitle: "Common causes",
      causes: [
        "Several ESPs were added over time and each added another include chain.",
        "Old sending providers remained in SPF even after they stopped sending mail.",
        "Nested includes from third-party providers expanded far more than expected.",
        "No one reviewed the total SPF lookup count after adding new services."
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
        "Count the effective SPF lookup depth before flattening anything.",
        "Remove obsolete providers first so you do not flatten unnecessary entries.",
        "Flatten only the parts of SPF that truly need it.",
        "Document who maintains the flattened record going forward.",
        "Re-check SPF regularly so the flattened IP ranges do not become stale."
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
      title: "SPF IPv6 Misconfiguration – Fix SPF IPv6 Errors (2026)",
  
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
      title: "SPF Neutral Result Explained – Causes, Fix & Examples (2026)",
  
      intro:
        "An SPF neutral result means the sender's SPF policy does not make a strong authorization decision. This usually happens when the SPF record ends with ?all. In practice, neutral is neither a clear pass nor a clear denial, so it gives mailbox providers much less useful information than ~all or -all.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Replace the neutral ?all mechanism with ~all or -all once you have identified your legitimate senders.",
  
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
        "Neutral SPF is often left behind after an early testing phase, copied from an outdated tutorial, or kept because teams are afraid to move to a stricter policy before fully mapping their senders.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Neutral does not clearly authorize legitimate senders.",
        "It gives mailbox providers little anti-spoofing value.",
        "It can make teams think SPF is configured well when it is still weak.",
        "It reduces the usefulness of SPF as a trust signal."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Mailbox providers generally trust domains more when their authentication records make clear, consistent statements. A neutral SPF result signals indecision and weakens the practical value of SPF.",
  
      causesTitle: "Common causes",
      causes: [
        "The SPF record ends with ?all.",
        "A temporary testing setup was never tightened later.",
        "An old tutorial or template was copied into production.",
        "The team avoided moving to ~all or -all because the sender inventory was incomplete."
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
        "Inventory all legitimate senders before tightening the SPF qualifier.",
        "Replace ?all with ~all if you still need a safer transition stage.",
        "Move to -all only when every approved sender is covered.",
        "Send test mail after the change and inspect live headers.",
        "Review related SPF policy decisions in the SPF Hub."
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
      title: "SPF Permerror Explained – Too Many DNS Lookups Fix (2026)",
  
      intro:
        "SPF allows a maximum of ten DNS lookups during policy evaluation. If your record exceeds that limit, receivers return a permerror instead of a normal pass, fail, or softfail result. This is one of the most common SPF problems on growing domains, because each new email provider often adds another include, redirect, mx, or a-based lookup path.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Reduce the number of include, redirect, a, and mx mechanisms so the full SPF evaluation stays under the 10-DNS-lookup limit.",
  
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
        "SPF lookup limits are easy to exceed because one visible include can hide several more lookups underneath it. Over time, domains often accumulate several providers, legacy services, and redirect chains until SPF breaks under its own complexity.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "SPF evaluation fails with permerror instead of a usable result.",
        "Legitimate mail can lose SPF authentication.",
        "DMARC alignment may fail when SPF was the expected path.",
        "Authentication becomes inconsistent between mailbox providers."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When SPF returns permerror, mailbox providers see a broken authentication layer rather than a deliberate sender policy. That weakens trust and can contribute to spam placement or erratic filtering decisions.",
  
      causesTitle: "Common causes",
      causes: [
        "Too many email providers were added over time.",
        "Nested vendor include chains expanded beyond the SPF lookup limit.",
        "Legacy senders remained in SPF long after they stopped sending.",
        "A redirect combined with mx, a, and include mechanisms created too much DNS work."
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
        "List every active sender before making changes to SPF.",
        "Remove providers that no longer send mail for your domain.",
        "Avoid unnecessary mx and a mechanisms when simpler options exist.",
        "Flatten specific includes only if cleanup alone is not enough.",
        "Re-test the final SPF policy to confirm it stays under 10 lookups."
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
      title: "SPF Redirect Explained – How SPF Redirect Works (2026)",
  
      intro:
        "The SPF redirect mechanism tells receivers to ignore the current domain's local SPF logic and instead evaluate another domain's SPF record as the authoritative policy. Redirect is useful in some controlled environments, but it is often misunderstood. It is not the same as include. Include adds another sender policy into your evaluation. Redirect replaces the local policy path entirely.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Use redirect only when another domain should fully define SPF for the current domain. If you still need local authorization rules, use include instead.",
  
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
        "Teams often inherit SPF setups they did not design, and redirect is one of the easiest mechanisms to misunderstand. It is sometimes used when include was actually intended, especially during migrations or shared-domain setups.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Redirect can accidentally remove expected local SPF logic.",
        "Troubleshooting becomes harder because authorization lives on another domain.",
        "A broken redirected policy can affect several dependent domains at once.",
        "Teams often mistake redirect for include and publish the wrong SPF behavior."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Redirect itself is not bad, but it centralizes SPF dependency. If the target policy is wrong, stale, or overloaded, all dependent domains can inherit the problem immediately.",
  
      causesTitle: "Common causes",
      causes: [
        "Redirect was used instead of include.",
        "A legacy shared-policy setup was copied without understanding it.",
        "Subdomains were configured to inherit SPF from a central domain.",
        "The redirected target changed and unexpectedly broke several domains."
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
        "Decide whether you want inheritance or simple sender authorization.",
        "Use include if the current domain still needs local SPF logic.",
        "Verify the target redirected domain has a valid SPF record.",
        "Document every domain that depends on the redirected policy.",
        "Re-test SPF after any redirect target change."
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
      title: "SPF Softfail vs Fail – Key Differences Explained (2026)",
  
      intro:
        "SPF softfail and SPF fail are both negative outcomes, but they signal different levels of confidence. Softfail usually comes from the ~all qualifier and means the sender is probably unauthorized. Fail usually comes from -all and means the sender is definitely unauthorized according to the policy. The difference matters because mailbox providers often treat hard fail more aggressively than softfail.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Use ~all while you are still verifying all legitimate senders, then move to -all when your SPF record is complete and stable.",
  
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
        "The choice between ~all and -all is not just technical. It reflects how confident you are in your sender inventory. Moving to -all too early can break legitimate mail, while staying at ~all too long can weaken anti-spoofing protection.",
  
      problemTitle: "Impact on deliverability",
  
      problemPoints: [
        "A hard fail policy can block legitimate mail if SPF is incomplete.",
        "A softfail policy is safer during rollout but offers weaker enforcement.",
        "The wrong qualifier creates either delivery risk or weaker spoofing protection.",
        "Mailbox providers look for consistent, deliberate authentication behavior."
      ],
  
      deliverabilityTitle: "How mailbox providers interpret this",
  
      deliverabilityText:
        "Providers do not reward strictness for its own sake. They reward accurate authentication. A correct -all policy can be strong and clean, but an inaccurate one can hurt real mail. That is why many domains transition from ~all to -all gradually.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain is still in SPF rollout mode and uses ~all.",
        "Administrators moved to -all before fully mapping all senders.",
        "A forgotten third-party system still sends mail unexpectedly.",
        "Teams misunderstand the operational difference between softfail and fail."
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
        "Inventory every legitimate sender before moving to -all.",
        "Check live headers to verify that approved mail is already passing SPF.",
        "Use ~all during transition if the sender map is still incomplete.",
        "Move to -all only when the record is stable and trusted.",
        "Review related SPF policy topics in the SPF Hub."
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
      title: "SPF Syntax Error – How to Fix SPF Record Format (2026)",
  
      intro:
        "An SPF record syntax error means the TXT record published for your domain cannot be parsed as valid SPF. SPF records follow strict formatting rules: mechanisms like include or ip4 require specific syntax, and a missing colon, extra space, typo in a mechanism name, or malformed qualifier can cause receivers to treat the entire record as invalid. When that happens, SPF evaluation fails before it can reach a normal pass, fail, or softfail result.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Correct the syntax by fixing typos in mechanism names, removing stray spaces, and ensuring every include or other mechanism uses the exact format documented in the SPF specification.",
  
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
        "Syntax errors often creep in when records are hand-edited, copied from incomplete documentation, or migrated between DNS providers. A trailing space, missing hyphen in -all, or typo such as inclide instead of include is enough to invalidate the whole record.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Receivers cannot evaluate the SPF policy and may return permerror or ignore the record.",
        "Legitimate mail loses SPF authentication even when the intent of the policy is correct.",
        "DMARC alignment can fail when SPF cannot provide a usable result.",
        "Troubleshooting becomes harder because the policy looks present but is unusable."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When SPF cannot be parsed, mailbox providers see a broken authentication layer. That weakens sender trust and can contribute to spam placement, especially for domains that rely on SPF for DMARC alignment.",
  
      causesTitle: "Common causes",
      causes: [
        "A typo in a mechanism name such as include, ip4, or -all.",
        "Missing colon after include or redirect.",
        "Extra spaces inside the record where none are allowed.",
        "The record was copy-pasted from a source that introduced invisible or wrong characters."
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
        "Copy the current SPF record from live DNS and inspect it character by character.",
        "Verify every mechanism follows the SPF specification format.",
        "Fix typos, missing colons, and stray spaces.",
        "Publish the corrected record and allow time for propagation.",
        "Re-run the check to confirm the syntax error is resolved."
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
      title: "SPF Softfail Explained – Meaning, Risks & Fix (2026)",
  
      intro:
        "SPF softfail is the result produced when your SPF record ends with ~all and the connecting IP does not match any authorized mechanism. It means the sender is probably not authorized, but the policy does not make a hard denial. Mailbox providers typically treat softfail less aggressively than hard fail (-all), which is why many domains use ~all during rollout or when they are not yet confident that every legitimate sender is covered.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "If you intend to use softfail, ensure your SPF record ends with ~all. If you want stricter enforcement once your sender inventory is complete, replace ~all with -all.",
  
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
        "Softfail exists because moving to hard fail too early can break legitimate mail if any sender was forgotten. Domains often start with ~all, validate that all real senders pass SPF, and then switch to -all when they are confident.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Softfail by itself is not a problem. It becomes one if you stay at ~all indefinitely when hard fail would be appropriate.",
        "Some receivers may treat softfail and fail differently for filtering decisions.",
        "Domains that never tighten beyond softfail may leave spoofing protection weaker than intended.",
        "Teams sometimes misunderstand when to move from ~all to -all."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "Mailbox providers generally accept softfail as a valid policy signal. The main deliverability risk is staying at ~all when your record is incomplete, because that can allow spoofed mail to be treated less strictly. Once your sender map is complete, moving to -all can strengthen anti-spoofing without hurting legitimate traffic.",
  
      causesTitle: "Common causes",
      causes: [
        "The domain is in transition and uses ~all as a safer rollout stage.",
        "Administrators have not yet verified every legitimate sending source.",
        "A third-party system sends mail and was never added to SPF.",
        "The team prefers softfail over hard fail for operational reasons."
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
        "Verify every legitimate sender is in your SPF record.",
        "Check live headers to confirm approved mail passes SPF.",
        "Keep ~all if you still need flexibility during rollout.",
        "Switch to -all when your sender map is complete and stable.",
        "Review related SPF policy topics in the SPF Hub."
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
      title: "SPF Missing All Mechanism – Fix ~all / -all Issue (2026)",
  
      intro:
        "An SPF record must end with an all mechanism that tells receivers what to do with IPs that do not match any other mechanism. The all mechanism is usually ~all (softfail) or -all (hard fail). If your record has no all mechanism, receivers do not get a clear policy for unmatched senders. Many parsers treat such records as neutral or invalid, which weakens SPF as an authentication and anti-spoofing signal.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Add ~all or -all to the end of your SPF record. Use ~all while you are still validating senders; use -all when your record is complete.",
  
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
        "Incomplete SPF records often come from copy-pasting partial examples, adding only the include lines from provider documentation, or editing DNS without understanding that every SPF record must end with an all qualifier.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Receivers cannot apply a consistent default for unauthorized IPs.",
        "SPF may evaluate as neutral instead of softfail or fail for spoofed traffic.",
        "DMARC alignment can be harder to achieve when SPF results are ambiguous.",
        "The policy looks incomplete and may reduce trust with mailbox providers."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When SPF lacks an all mechanism, receivers treat the policy as incomplete. That can weaken anti-spoofing and make authentication less predictable. Adding ~all or -all gives a clear signal and improves the usefulness of SPF for deliverability.",
  
      causesTitle: "Common causes",
      causes: [
        "Provider documentation showed only the include line without the all qualifier.",
        "The record was truncated during manual editing or migration.",
        "Multiple people edited DNS and the final all was accidentally removed.",
        "An old template or tutorial omitted the all mechanism."
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
        "Open your current SPF record in DNS and check the end.",
        "Add ~all if you are still validating senders.",
        "Add -all if your record is complete and you want stricter enforcement.",
        "Publish the updated record and allow propagation.",
        "Re-run the check to confirm the all mechanism is present."
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
      title: "SPF IP Not Authorized – Why SPF Fails & How to Fix (2026)",
  
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
        "When SPF fails because the IP is not authorized, mailbox providers see authentication failure. That can lead to spam placement, rejection, or inconsistent filtering. Fixing the SPF record to include the real sending IPs restores authentication and improves deliverability.",
  
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
      title: "SPF Record Too Long – Fix DNS Length Limit Error (2026)",
  
      intro:
        "DNS TXT records have practical length limits. While the theoretical maximum is around 255 characters per string, many DNS providers and protocols use 255-character chunks. SPF records that exceed these limits can be truncated, split incorrectly, or rejected. When that happens, receivers may not see your full policy, and SPF evaluation can fail or return unexpected results.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Shorten your SPF record by removing obsolete providers, flattening includes to IP ranges where appropriate, and consolidating redundant mechanisms.",
  
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
        "Domains accumulate include mechanisms over time as they add ESPs, marketing tools, and relays. Each new provider adds more characters. Eventually the record grows past DNS chunk limits or becomes hard to manage.",
  
      problemTitle: "Why this is a problem",
  
      problemPoints: [
        "Truncated records may omit critical mechanisms, causing SPF to fail for legitimate senders.",
        "Some DNS providers reject or mishandle very long TXT records.",
        "Long records often correlate with high lookup counts, increasing permerror risk.",
        "Maintenance becomes harder as the record grows."
      ],
  
      deliverabilityTitle: "How this affects deliverability",
  
      deliverabilityText:
        "When an SPF record is truncated or malformed due to length, receivers may see an incomplete or invalid policy. That can break authentication and hurt deliverability. Shortening the record and keeping it within DNS limits restores reliable SPF evaluation.",
  
      causesTitle: "Common causes",
      causes: [
        "Several ESPs and marketing platforms were added over time.",
        "Legacy providers remained in SPF after they stopped sending.",
        "IP ranges were added manually instead of using shorter includes.",
        "No one reviewed total record length after adding new services."
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
        "List every provider that actually sends mail for your domain.",
        "Remove obsolete includes and IP mechanisms.",
        "Consider flattening only if cleanup is not enough.",
        "Keep the record under 255 characters per string where possible.",
        "Re-check SPF after changes to confirm the record is valid and complete."
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
      title: "SPF Record Example – Valid SPF Records (2026)",
  
      intro:
        "This page provides copy-paste SPF record examples for the most common sender setups. Each example is ready to adapt: replace the domain in include mechanisms with your provider's exact hostname, and ensure you publish only one SPF record for your domain. These examples cover single-provider and hybrid configurations for Google Workspace, Microsoft 365, SendGrid, and similar services.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Choose the example that matches your sending setup, adapt the include mechanisms if needed, and publish it as a single TXT record at the root of your domain.",
  
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
        "New teams often copy the wrong include hostname, publish multiple SPF records, or omit the final qualifier. Working examples reduce mistakes and show the correct structure for single-provider and hybrid setups.",
  
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
        "List every service that sends email for your domain.",
        "Choose the matching example or combine includes from several.",
        "Publish one SPF TXT record at the root of your domain.",
        "Run a live check to confirm the record is valid.",
        "Re-check after adding or removing providers."
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
      title: "SPF Record Syntax Explained – Complete SPF Guide (2026)",
  
      intro:
        "SPF records follow a strict syntax: a version prefix, a sequence of mechanisms, and a final all qualifier. Each mechanism (include, ip4, ip6, mx, a, redirect) has a specific format and meaning. Understanding the structure helps you read existing records, debug failures, and build correct policies from scratch.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Ensure your SPF record starts with v=spf1, uses mechanisms in the correct format (e.g. include:domain.com with a colon and no extra spaces), and ends with an all qualifier such as ~all or -all.",
  
      codeTitle: "Syntax breakdown",
      codeLanguage: "Plain text",
      code: `v=spf1          → version (required)
  include:domain  → mechanism:value (colon, no space)
  ip4:192.0.2.0/24 → IP range
  ~all            → qualifier + all (softfail)`,
  
      afterCodeText:
        "Mechanisms are evaluated left to right. The first match determines the result. The all mechanism is always last and defines the default for unmatched IPs.",
  
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
        "SPF parsers are strict. A missing colon, extra space, or typo in a mechanism name invalidates the entire record. Receivers may treat it as a permanent error rather than attempting a fallback.",
  
      problemTitle: "Why syntax errors are a problem",
  
      problemPoints: [
        "Receivers cannot evaluate the policy and may return permerror.",
        "Legitimate mail loses SPF even when the intent was correct.",
        "DMARC alignment can fail when SPF cannot produce a result.",
        "Debugging becomes harder when the record looks present but is invalid."
      ],
  
      deliverabilityTitle: "How syntax affects deliverability",
  
      deliverabilityText:
        "Invalid syntax prevents SPF from working at all. Mailbox providers see a broken record and may downgrade trust. Fixing syntax restores authentication and supports better deliverability.",
  
      causesTitle: "Common syntax mistakes",
  
      causes: [
        "Missing colon after include, redirect, or other mechanisms.",
        "Extra spaces inside the record where none are allowed.",
        "Typo in mechanism names (e.g. inclide instead of include).",
        "Malformed qualifier (e.g. - all with a space)."
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
        "Read your current SPF record character by character.",
        "Verify each mechanism has the correct format (mechanism:value).",
        "Ensure the record ends with ~all, -all, or ?all.",
        "Fix any typos or malformed syntax.",
        "Re-run the check to confirm the record parses correctly."
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
      title: "SPF Record Generator – Create SPF Record (Free Tool) (2026)",
  
      intro:
        "Building an SPF record from scratch involves identifying every sender, adding the right mechanisms in the correct order, and staying under the DNS lookup limit. This guide walks through the steps: start with v=spf1, add one include or ip4 per sending service, avoid unnecessary mx or a mechanisms, and end with a clear qualifier. Rushing or copying without understanding leads to permerrors, duplicates, or missing senders.",
  
      fixTitle: "One-Minute Fix",
  
      fixText:
        "Start with v=spf1, add include: or ip4: for each sending provider, keep the total lookup count under ten, and end with ~all or -all.",
  
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
        "Teams often add mechanisms one by one without checking the total lookup count or removing obsolete senders. A deliberate build process reduces permerrors and keeps the record maintainable.",
  
      problemTitle: "Why ad hoc building causes problems",
  
      problemPoints: [
        "Accumulating includes can exceed the 10-lookup limit.",
        "Legacy senders left in the record create confusion.",
        "Redundant mx or a mechanisms add lookups without clear benefit.",
        "No single source of truth for which senders are authorised."
      ],
  
      deliverabilityTitle: "How a clean build helps deliverability",
  
      deliverabilityText:
        "A lean, correct SPF record passes evaluation reliably. Overbuilt records risk permerror; underbuilt records fail for legitimate senders. A structured build balances both.",
  
      causesTitle: "Common build mistakes",
  
      causes: [
        "Adding mechanisms without tracking lookup count.",
        "Keeping old provider includes after switching services.",
        "Using mx or a when include would suffice.",
        "Forgetting to add a new sender when onboarding a tool."
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
        "List every service that sends mail for your domain.",
        "Get the exact include hostname from each provider.",
        "Build the record: v=spf1 plus includes plus ~all or -all.",
        "Verify the lookup count stays under ten.",
        "Publish and re-check after propagation."
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
    }
  };
export const spfErrors = {
    "spf/multiple-spf-records-found": {
      title: "Multiple SPF Records Found",
  
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
      title: "SPF Include Flattening",
  
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
      title: "SPF IPv6 Misconfiguration",
  
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
      title: "SPF Neutral Result Explained",
  
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
      title: "SPF Permerror: Too Many DNS Lookups",
  
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
      title: "SPF Redirect Explained",
  
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
      title: "SPF Softfail vs Fail",
  
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
    }
  };
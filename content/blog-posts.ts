import { BlogPost } from "../types";

export const BLOG_AUTHOR: BlogPost["author"] = {
  name: "Abu Rahat Sabir",
  role: "Author",
  avatar: "/images/hero/Abu Rahat Hero 01.webp",
};

export const BLOG_POST_ROUTE_ALIASES: Record<string, string> = {
  "blog-02": "resume-writing-guide-getting-shortlisted",
  "blog-semrush-bing-ai": "how-to-learn-computer-networking",
};

export function resolveBlogPostRouteId(routeId: string): string {
  return BLOG_POST_ROUTE_ALIASES[routeId] ?? routeId;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "resume-writing-guide-getting-shortlisted",

    title: "The Science of Getting Shortlisted",

    seoTitle: "Resume Writing Guide: Get Shortlisted Faster | Abu Rahat Sabir",

    date: "April 2026",

    publishedAt: "2026-04-01",

    dateModified: "2026-08-10",

    readTime: "30 min read",

    category: "Career",

    featuredRank: 1,

    tags: [
      "Resume Writing Guide",

      "ATS Resume Optimization",

      "Resume Bullet Writing",

      "Resume Mistakes",
    ],

    showFooterDate: false,

    footerTagLimit: 4,

    singleLineFooterTags: true,

    template: "flagship",

    bodyRenderer: "resumeGuide",

    excerpt:
      "Most resume advice gives you rules. This gives you the reasoning behind them. Every section. Every judgment call. Built from recruiter research, eye-tracking studies, and ATS data.",

    seoDescription:
      "A practical resume writing guide for getting shortlisted faster, with recruiter-backed rules for ATS optimization, resume bullets, formatting, and common mistakes.",

    author: BLOG_AUTHOR,

    content: `This resume writing guide explains how shortlisted resumes are judged by recruiters, ATS systems, and hiring managers. It turns that screening logic into practical rules for structure, bullets, evidence, formatting, tailoring, LinkedIn alignment, and final review so each section supports the target role.`,

    image: "/images/blogs/resume-writing-guide-getting-shortlisted-cover.webp",

    ogImage: "/images/blogs/resume-writing-guide-getting-shortlisted-og.webp",
  },
  {
    id: "how-to-learn-computer-networking",
    title: "How to Learn Computer Networking: A Complete Roadmap (2026)",
    seoTitle: "How to Learn Computer Networking: 2026 Roadmap | Abu Rahat Sabir",
    date: "August 2026",
    publishedAt: "2026-08-02",
    dateModified: "2026-08-10",
    readTime: "18 min read",
    category: "Networking",
    tags: [
      "Computer Networking",
      "CCNA",
      "Network+",
      "Home Lab",
      "Troubleshooting",
    ],
    showFooterDate: false,
    footerTagLimit: 5,
    singleLineFooterTags: true,
    template: "flagship",
    bodyRenderer: "networkingRoadmap",
    excerpt:
      "A practical, hands-on roadmap for learning computer networking in 2026: OSI model, home labs, CCNA vs Network+, troubleshooting, and the automation skills that actually stick.",
    seoDescription:
      "Learn computer networking with a practical 2026 roadmap covering the OSI model, home labs, subnetting, Network+ vs CCNA, troubleshooting, Linux, Python, and automation.",
    author: BLOG_AUTHOR,

    content: `Most people who set out to learn networking read a chapter, watch a video, and feel like they understand something - right up until a real network breaks and they have no idea where to even start looking. That gap between "I read about it" and "I can fix it" is the entire problem this guide is built to close.
  
  **Key takeaway:** You do not learn networking by studying more. You learn it by building something small, breaking it on purpose, and troubleshooting your way back - using the OSI model as your map and a certification syllabus as your curriculum, not your goal.
  
  ## Roadmap Snapshot
  - **osi-model:** Learn it as a diagnostic tool.
  - **home-lab:** Build something small and real.
  - **break-it:** Sabotage it on purpose.
  - **fix-it:** Troubleshoot layer by layer.
  - **fundamentals:** Subnetting, DNS, DHCP, and NAT.
  - **certify:** Use Network+ or CCNA for structure.
  - **automate:** Add Linux, Python, and Ansible.
  
  ## Why Most Self-Taught Learners Stall Out
  Ask ten people how to learn networking and you will get ten syllabi: OSI model, subnetting, routing protocols, VLANs, DNS, and so on. That list is not wrong. It is just not the thing that is actually holding most people back.
  
  The real failure point is **method**, not material. Networking is a physical, hands-on skill wearing a theoretical costume. You can read about subnetting fifty times and still freeze the first time you have to actually carve a /24 into usable ranges under time pressure. Understanding forms in your hands, on a keyboard, in a terminal - not on a page.
  
  So before you pick a course or a certification, fix the method first: less reading, sooner labbing, and a deliberate habit of breaking things so you are forced to understand why they broke.
  
  ## Learn the OSI Model as a Tool, Not Trivia
  Everyone tells beginners to "learn the OSI model," and then most beginners memorize seven words in order and move on. That is the wrong use of it entirely. The OSI model is not a fact to know - it is a **diagnostic checklist** you reach for the instant something breaks.
  
  Here is the version that actually gets used on the job:
  
  | Layer | Name | What to check |
  | --- | --- | --- |
  | 7 | Application | The app itself is broken, not the network - check the software. |
  | 6 | Presentation | Formatting, encryption, and TLS certificate issues. |
  | 5 | Session | Sessions dropping, timeouts, and authentication handshakes. |
  | 4 | Transport | Wrong port, blocked firewall rule, TCP vs UDP behavior. |
  | 3 | Network | Cannot reach the IP - routing table, gateway, subnet mismatch. |
  | 2 | Data Link | Wrong VLAN, switch port down, MAC or ARP problems. |
  | 1 | Physical | Cable unplugged, dead port, bad transceiver. Check this first, always. |
  
  Notice the direction: bottom to top. When something is broken, resist the urge to guess at Layer 7 first because that is where the symptom appeared. Start at Layer 1 and climb. It feels slower for the first few weeks. It becomes instinct after that, and it is the single habit that separates people who can troubleshoot from people who can only configure.
  
  Every new protocol you learn should get placed on this stack immediately. Do not just note that DNS is "application layer" - ask what would happen if DNS broke versus if the physical cable broke, and how the symptoms would look different. Comparing layers teaches you the model. Memorizing layers does not.
  
  ## Network+ vs. CCNA: Which Certification First
  This is the single most-searched question in this space, and the honest answer is: it depends on where you are starting from, not on which cert is "better."
  
  | Situation | Start here | Why |
  | --- | --- | --- |
  | **Complete beginner**, no IT background | CompTIA Network+ | Vendor-neutral, broader, and lighter on hands-on configuration - a gentler on-ramp into terminology and concepts. |
  | **Some IT, cloud, or sysadmin experience** | Cisco CCNA | You already have the mental scaffolding Network+ would teach; CCNA gets you straight into configuration and troubleshooting. |
  | **Aiming for a Network Engineer or NOC role** | CCNA, Network+ optional | CCNA is what hiring managers filter for in networking-specific roles; Network+ alone usually fits help desk and junior support postings better. |
  | **Aiming for general IT or help desk first** | CompTIA Network+ | Broad, transferable, and recognized across support and junior sysadmin roles without tying you to one vendor ecosystem. |
  
  Whichever you choose, treat the exam official objectives as your study outline - not because the certificate itself is the prize, but because it stops you from wandering aimlessly between topics or over-indexing on one niche subject you happen to find interesting.
  
  **Reality check:** Passing the exam and being useful on a network are two different skills. Plenty of certified people can answer multiple-choice questions about OSPF but cannot troubleshoot a real routing loop. Do not let exam-readiness substitute for lab time - treat the cert as a checkpoint along the way, not the finish line.
  
  ## Build a Home Lab Before You Feel Ready
  People wait far too long to start labbing because they assume they need to "know enough" first. That is backwards. The lab is how you get to know enough - waiting for confidence before you start is exactly what keeps knowledge stuck on the page.
  
  You do not need a rack of hardware. Here is a realistic on-ramp, roughly in order of difficulty:
  
  - **Carve out a subnet on your home router** - Most consumer routers already let you create a separate subnet. Attach two cheap client devices and start experimenting with routing and DHCP behavior for free.
  - **Install Cisco Packet Tracer or GNS3** - Free simulators let you build multi-router, multi-switch topologies without touching physical gear. Start with two routers and one subnet between them.
  - **Stand up a DHCP server and watch it work** - Configure DHCP yourself and observe an actual lease negotiation happen on the wire. This is where the theory finally clicks.
  - **Build a simple site-to-site VPN** - WireGuard is a friendly starting point. Connect two "sites" and ping across the tunnel.
  - **Register a cheap domain and point it at a server you control** - Get SSH working over the domain name instead of the raw IP. You will likely need port forwarding, which teaches NAT in a way no diagram can.
  - **Add DNS records for that domain** - A, CNAME, and MX records. Configure them yourself and understand exactly what each one resolves.
  
  None of this needs to look production-grade. It just needs to be yours, so that when it inevitably breaks, you have to actually diagnose it instead of following someone else's steps.
  
  ## The Build, Break, Fix, Theory Loop
  This is the actual engine behind everything above, and it is the part most guides skip entirely. The order you do things in matters as much as what you do.
  
  - **Step 01: Build small**
  - **Step 02: Break it on purpose**
  - **Step 03: Fix it, layer by layer**
  - **Step 04: Read theory last**
  
  Reading the theory **first** gives you a false sense of understanding - you can recognize the vocabulary without being able to apply it under pressure. Struggling with a real, broken thing first means the theory finally answers a question you already have, which is why it sticks the second time around.
  
  Build the smallest version of a concept, sabotage it by unplugging a cable, misconfiguring a gateway, or blocking a port, fix it using nothing but the OSI model, and only then go read the chapter that explains what you just did.
  
  ## Troubleshoot Like an Engineer, Not a Guesser
  There is a specific habit that separates people who "know" networking from people who can actually operate one: systematic troubleshooting. It is rarely taught directly, which means most people pick it up slowly through trial and error - but you can shortcut that by practicing it on purpose.
  
  The discipline is simple to describe and hard to hold onto under pressure: when something breaks, start at Layer 1 and climb. Is the cable plugged in? Is the interface up? Is the device getting an address? Can it resolve a name? Can it reach the gateway?
  
  It sounds almost too basic to write down, but under stress, most people skip straight to guessing instead of working the layers in order, and guessing is slower every single time.
  
  Build this into your lab practice deliberately: sabotage your own setup and force yourself to find the fault "the long way," layer by layer, even when you already suspect the cause. That discipline is exactly what gets tested when something breaks in a real environment at an inconvenient hour.
  
  ## Do Not Skip the Boring Fundamentals
  It is tempting to skip straight to the exciting stuff - BGP, MPLS, cloud networking constructs - but a huge share of real-world networking work is unglamorous plumbing: DNS records, DHCP leases, NAT rules, subnet math. These get treated as "basic" and skipped early, which is exactly backwards, because they are also the things that break most often in practice.
  
  - **Subnetting** - Practice until you can do it in your head, no calculator, under time pressure.
  - **DNS** - Run your own resolver, such as Pi-hole, and watch queries resolve in real time.
  - **DHCP** - Understand lease times, scopes, and reservations by configuring them yourself, not by reading a definition.
  - **NAT and port forwarding** - Configure it on your own router and trace exactly what happens to a packet as it crosses that boundary.
  
  None of this is advanced. But fluency here is what makes you fast and confident once you move on to the topics that actually feel advanced.
  
  ## Layer in Automation Early
  Traditional CLI-driven, box-by-box configuration is shrinking in relative importance. More of the real work now happens through automation, infrastructure-as-code, and cloud-native networking constructs. If you are learning networking today, folding in Linux, Python, JSON/YAML, and a tool like Ansible alongside the traditional material is not optional extra credit - it is increasingly part of the baseline job description.
  
  You do not need to master automation on day one. Treat it as a parallel track. Once you are comfortable manually configuring a router or a subnet, immediately ask yourself: how would I do this with a script instead? That single question will keep your skills relevant long after pure CLI knowledge starts losing value on its own.
  
  - **Linux fundamentals**
  - **Python basics**
  - **JSON / YAML**
  - **Ansible playbooks**
  - **Cloud VPC networking**
  - **REST API authentication**
  
  ## Free and Paid Resources Worth Your Time
  Tools change faster than methods do, so treat this as a starting point rather than gospel. These are the categories worth investing time in, regardless of which specific course you land on:
  
  - **Free video courses** - Vendor-neutral fundamentals courses, like Professor Messer's Network+ series, are a solid, no-cost entry point for absolute beginners.
  - **Free simulators** - Cisco Packet Tracer and GNS3 both let you build full topologies without hardware. Packet Tracer is friendlier for beginners, while GNS3 scales better to complex, realistic labs.
  - **Paid practice exams** - A well-built practice-exam bank is often the highest-leverage purchase you will make before sitting a certification because it exposes the gaps a course alone will not show you.
  - **Flashcard-based recall tools** - Useful for terminology and port numbers, but never a substitute for lab time. Recall is not the same skill as troubleshooting.
  - **Official vendor documentation** - CompTIA and Cisco exam objectives pages are the most accurate source for what is actually being tested this year, since course content can lag behind exam updates.
  
  ## A Realistic Timeline
  Timelines vary enormously based on background, but here is a grounded range for someone studying consistently, several hours a week, using the build-break-fix method above rather than pure reading:
  
  | Milestone | Typical timeframe |
  | --- | --- |
  | Comfortable with OSI model, IP basics, and simple subnetting | 3-5 weeks |
  | CompTIA Network+ ready | 2-3 months |
  | Cisco CCNA ready from a technical background | 3-4 months |
  | Cisco CCNA ready starting from zero | 5-7 months |
  | Comfortable troubleshooting a real, unfamiliar network | Ongoing - this is a career-long skill, not a milestone. |
  
  The range depends far more on how much time you spend actually configuring things versus reading about them than on raw hours logged. Two learners with identical study hours can land months apart depending on that one variable alone.
  
  ## Common Mistakes That Slow People Down
  - **Reading theory before touching a lab.** It creates a false sense of understanding that collapses the moment something actually breaks.
  - **Chasing every certification at once.** Trying to study Network+, CCNA, and cloud certs in parallel usually means none of them get the depth they need.
  - **Skipping the boring fundamentals.** Subnetting, DNS, and DHCP feel unglamorous, but they are the most common real-world failure points.
  - **Guessing instead of troubleshooting top-down or bottom-up.** Random guessing feels faster in the moment and is almost always slower overall.
  - **Ignoring automation entirely.** Treating scripting as "someone else's job" is a rapidly closing door in this field.
  - **Waiting to feel ready before labbing.** There is no readiness threshold. The lab is what creates the readiness, not the other way around.
  
  ## The Roadmap, Recapped
  - **Learn the OSI model as a troubleshooting tool** - Not a memorization exercise, but a bottom-to-top diagnostic checklist you reach for automatically.
  - **Pick Network+ or CCNA based on your starting point, not hype** - Use the exam objectives as your syllabus, whether or not you ever sit the exam.
  - **Build the smallest lab you can, immediately** - A home router subnet or a free simulator is enough to start. Do not wait to feel ready.
  - **Break it on purpose before reading the theory** - Struggle first, then read. The theory will answer questions you already have.
  - **Practice bottom-up troubleshooting deliberately** - Even when you suspect the cause, work the layers in order until it is automatic.
  - **Get fluent in the fundamentals that break most often** - Subnetting, DNS, DHCP, and NAT are unglamorous but constantly in play.
  - **Layer in Linux, Python, and Ansible from the start** - Not as an afterthought. Automation is increasingly part of the baseline skill set.
  
  ## FAQ
  ### What is the fastest way to learn computer networking?
  The fastest path is not reading more. It is labbing sooner. Learn the OSI model as a troubleshooting tool, then build a small home lab and configure real topologies immediately, using a certification syllabus like Network+ or CCNA as your curriculum rather than your ultimate goal.
  
  ### Should I get CompTIA Network+ before Cisco CCNA?
  If you are a complete beginner with no IT background, Network+ first is usually smoother because it is vendor-neutral and lighter on hands-on configuration. If you already have IT, cloud, or systems experience, you can typically go straight to CCNA and skip Network+ entirely.
  
  ### How long does it take to learn networking fundamentals?
  Most learners reach solid fundamentals in 2-3 months of consistent, hands-on study, and a full CCNA-level foundation in 4-7 months. The range depends far more on how much you lab versus how much you read than on raw hours studied.
  
  ### Do I need to buy hardware to learn networking?
  No. Free simulators like Cisco Packet Tracer and GNS3 let you build full router and switch topologies on a laptop. A home router and one or two spare machines are enough for early real-world practice before you ever need physical gear.
  
  ### Is networking still worth learning with the rise of cloud and automation?
  Yes, but the skill set has shifted. Traditional CLI-driven configuration is shrinking in relative importance, while networking fundamentals combined with Linux, Python, and Ansible are increasingly what employers expect from anyone entering the field.`,
    image: "/images/blogs/how-to-learn-computer-networking-cover.webp",
    ogImage: "/images/blogs/how-to-learn-computer-networking-og.webp",
  },
];

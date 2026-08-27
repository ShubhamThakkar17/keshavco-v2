export const faqPage = {
  eyebrow: "FAQs",
  h1: "Questions businesses ask us",
  intro: "If yours is not answered here, ask it directly — we will give you a straight answer.",
  closing: {
    heading: "Still have a question?",
    body: "Ask it directly. We will tell you honestly whether we are the right partner for your situation.",
  },
  seo: {
    title: "Frequently Asked Questions — KeshavCo",
    description:
      "How we work, what we cost, how long results take and how we differ from a marketing agency. Straight answers to common questions.",
  },
};

export type Faq = { id: string; question: string; answer: string };

export const faqs: Faq[] = [
  {
    id: "what-we-do",
    question: "What exactly does KeshavCo do?",
    answer:
      "We are a business growth partner. We help businesses launch, grow, expand and scale through strategy, technology, marketing and execution. Practically, that means we build the growth plan and then deliver it — across branding, websites, digital marketing and technology — so you work with one partner instead of six vendors.",
  },
  {
    id: "are-you-an-agency",
    question: "Are you a marketing agency?",
    answer:
      "No. An agency executes the marketing brief you give it. We work a step earlier — diagnosing the business problem, deciding what should be done and in what order, and then owning the execution across every channel it requires. Most of our clients engage us because they want the thinking as much as the delivery.",
  },
  {
    id: "vs-specialists",
    question: "How is working with you different from hiring several specialists?",
    answer:
      "With specialists, you own the coordination. You brief each one, resolve the contradictions between them, and remain the only person who sees the whole picture. With us, one team holds the strategy, manages the specialists and answers for the outcome. Your involvement drops to direction and review.",
  },
  {
    id: "business-size",
    question: "What size of business do you work with?",
    answer:
      "Mostly established SMEs and growing companies — manufacturing, healthcare, education, real estate, D2C, retail and professional services — along with founders launching new ventures. The common factor is not size but intent: businesses serious about growing and willing to work to a plan.",
  },
  {
    id: "pricing",
    question: "How do you price your engagements?",
    answer:
      "After the plan, not before. We start with a growth consultation, scope what your business actually needs, and then send a written proposal with deliverables, timelines and investment clearly stated. We do not publish price lists because we do not sell packages off a shelf.",
  },
  {
    id: "timeline",
    question: "How long before we see results?",
    answer:
      "It depends on the work. Paid campaigns produce enquiries within weeks. Website and CRM improvements show up in conversion within a month or two. SEO and brand compound over three to six months and keep paying afterwards. We tell you the expected timeline for each element in the plan, before you approve it.",
  },
  {
    id: "single-service",
    question: "Can we start with one service instead of a full engagement?",
    answer:
      "Yes. Many clients start with a specific piece — a website, a brand refresh, an ad campaign — and expand once they see how we work. We will still ask about the wider business context, because a good website built on the wrong positioning is a wasted website.",
  },
  {
    id: "who-does-the-work",
    question: "Who actually does the work?",
    answer:
      "Your strategy, priorities and reporting sit with our core team. Specialised execution — production, media buying, development and content — is delivered by a vetted specialist network we manage. You deal with one team throughout and never manage a vendor yourself.",
  },
  {
    id: "location",
    question: "Do you work with businesses outside your city?",
    answer:
      "Yes. Digital work is location-independent, and our specialist network lets us support clients across cities in India. Reviews and planning happen online or in person, depending on what the engagement needs.",
  },
];

/** The subset the home page shows, per the copy document. */
export const homeFaqIds = [
  "what-we-do",
  "are-you-an-agency",
  "vs-specialists",
  "pricing",
  "timeline",
  "who-does-the-work",
];

export const homeFaqs = homeFaqIds
  .map((id) => faqs.find((f) => f.id === id))
  .filter((f): f is Faq => Boolean(f));

/* ==========================================================
   SITE SETTINGS — edit this file to personalise the portfolio.
   Anything left as "" (empty) is shown as a clear placeholder
   instead of a fake detail.
   ========================================================== */
window.SITE = {
  // Text-based logo / personal brand shown in header and footer.
  brand: "Your Name",
  // Used in the footer copyright line. Leave "" to reuse brand.
  legalName: "",
  year: new Date().getFullYear(),

  // Public URL of the deployed portfolio (for social previews). Optional.
  siteUrl: "",

  // Hero availability badge. Keep enabled:false unless it is true.
  availability: {
    enabled: false,
    text: "Available for new projects"
  },

  contact: {
    email: "yahyaakhan132@gmail.com",
    whatsapp: "",       // digits only with country code, e.g. "923001234567"
    whatsappMessage: "Hi! I saw your portfolio and would like to talk about a project.",
    github: "",         // e.g. "https://github.com/your-username"
    // Optional extra links: { label: "LinkedIn", url: "https://..." }
    social: []
  },

  // Contact form delivery. Create a free form at https://formspree.io and
  // paste its endpoint here (e.g. "https://formspree.io/f/abcdwxyz").
  // Leave "" and the form will say clearly that delivery is not set up.
  form: {
    endpoint: ""
  },

  // Only list tools you actually use / can work with.
  stack: [
    { name: "AI-powered coding tools", note: "Faster, guided builds" },
    { name: "Base44", note: "Used on GreenScape" },
    { name: "Lovable", note: "Used on Bridal Beauty Studio" },
    { name: "Netlify", note: "Hosting for Study Hub" }
    // Add only after you confirm you can work with them, e.g.:
    // { name: "HTML & CSS", note: "Structure and styling" },
    // { name: "JavaScript", note: "Interactions" },
    // React, Next.js, Tailwind CSS, Git & GitHub, APIs & AI integrations ...
  ]
};

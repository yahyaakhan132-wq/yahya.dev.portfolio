/* ==========================================================
   PROJECTS — add a new entry to this array, redeploy, done.

   Fields
   - name         Project name
   - category     Short category label
   - description  1–2 factual sentences (only what the live site shows)
   - image        Optional path/URL of a real screenshot, e.g.
                  "assets/projects/greenscape.webp". Leave "" to show an
                  illustrative preview (clearly labelled as not a screenshot).
   - url          Live URL (opens in a new tab)
   - github       Optional repository URL
   - platform     Build/hosting platform (verified)
   - tags         Optional technology/feature tags (verified only)
   - status       "Demo" | "Client Project" | "Concept"
                  Only use "Client Project" if it is true.
   - featured     true = shown in the Work section
   - theme        Colours for the illustrative preview (only used when
                  there is no image): { bg, ink, accent, layout }
                  layout: "split" | "centered" | "cards"
   ========================================================== */
window.PROJECTS = [
  {
    name: "GreenScape",
    category: "Business Website",
    description:
      "A landscaping company website for Raleigh, NC covering lawn care, patios, retaining walls and lighting, with a free-estimate call to action.",
    image: "",
    url: "https://quirky-green-scape-flow.base44.app/",
    github: "",
    platform: "Base44",
    tags: ["Base44"],
    status: "Demo", // change to "Client Project" only if it was commissioned
    featured: true,
    theme: { bg: "#1B3022", ink: "#EAF3E4", accent: "#8CC63F", layout: "split" }
  },
  {
    name: "Bridal Beauty Studio",
    category: "Beauty & Bridal Website",
    description:
      "A multi-page website for a Karachi bridal and occasion makeup studio, with services by occasion, a bridal gallery, client reviews, studio details and WhatsApp booking.",
    image: "",
    url: "https://bridal-beauty-studio-site.lovable.app/",
    github: "",
    platform: "Lovable",
    tags: ["Lovable", "Multi-page"],
    status: "Demo", // change to "Client Project" only if it was commissioned
    featured: true,
    theme: { bg: "#F1E6D8", ink: "#3A2A22", accent: "#B9895B", layout: "centered" }
  },
  {
    name: "Study Hub",
    category: "Education Website",
    description:
      "A calm study site for students with study tips, subject guides, an exam checklist, a resources page and a contact page.",
    image: "",
    url: "https://study-hub-finalproject.netlify.app/",
    github: "",
    platform: "Netlify",
    tags: ["Netlify", "Multi-page"],
    status: "Demo",
    featured: true,
    theme: { bg: "#F6F3EC", ink: "#1F2A37", accent: "#E4572E", layout: "cards" }
  }
];

import { defineConfig } from "vite";

export default defineConfig({
  // Project site: https://alancai27.github.io/techinance/
  base: "/techinance/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        about: "about.html",
        courses: "courses.html",
        faqs: "faqs.html",
        contact: "contact.html",
        privacy: "privacy.html",
        terms: "terms.html",
      },
    },
  },
});

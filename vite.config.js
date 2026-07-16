import { defineConfig } from "vite";

export default defineConfig({
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

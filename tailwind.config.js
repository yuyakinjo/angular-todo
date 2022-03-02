module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  prefix: "tw-",
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};

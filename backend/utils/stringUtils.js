const slugify = require("slugify");
module.exports = {
  capitalize: (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  },
  slugify: (input) => {
    return slugify(input, {
      replacement: "-",
      remove: undefined,
      lower: true,
      locale: "vi",
      trim: true,
    });
  },
};

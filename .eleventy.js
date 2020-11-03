const fs = require("fs");

const { DateTime } = require("luxon");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const pluginPWA = require("eleventy-plugin-pwa");
const pluginSEO = require("eleventy-plugin-seo");

const htmlmin = require("html-minifier");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

const metaData = require("./views/_data/metadata.json");

const isProd = process.env.NODE_ENV === "production";
const srcDir = "./views";

module.exports = function (config) {
  // Plugins
  config.addPlugin(pluginRss);
  config.addPlugin(pluginSyntaxHighlight);
  config.addPlugin(pluginNavigation);
  config.addPlugin(pluginSEO, {
    title: metaData.title,
    description: metaData.description,
    url: metaData.url,
    author: metaData.author.name,
  });
  isProd && config.addPlugin(pluginPWA);

  config.setDataDeepMerge(true);

  config.addLayoutAlias("post", "layouts/post.njk");

  config.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  config.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  config.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  config.addCollection("tagList", require(`${srcDir}/_11ty/getTagList`));

  config.addPassthroughCopy("./views/images");
  config.addPassthroughCopy({ "./views/meta": "." });

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#",
  });
  config.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  config.setBrowserSyncConfig({
    callbacks: {
      ready: function (error, browserSync) {
        if (error) throw error;

        const content_404 = fs.readFileSync("dist/404.html");

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  config.addTransform("htmlmin", function (content, outputPath) {
    // TODO: Figure out what is causing parse issue in /reading
    if (outputPath.endsWith(".html") && !outputPath.includes("reading")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
      });
      return minified;
    }
    return content;
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    dir: {
      input: "./views",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
  };
};

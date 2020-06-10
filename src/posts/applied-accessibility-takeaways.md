---
title: Applied Accessibility Takeaways
date: 2018-11-06
tags: ["accessibility", "html", "css"]
layout: layouts/post.njk
---

This week I completed the Applied Accessibility section of [freeCodeCamp](https://www.freecodecamp.org/)'s new [Responsive Web Design Certification](https://learn.freecodecamp.org/) in order to improve the markup I write. In summary, here are my key takeaways:

- When dealing with images, always include `alt` attribute on a [`img` tag](https://www.w3schools.com/tags/tag_img.asp). This should be a short description of the image content and provide a text alternative for visually impaired users. Screen readers use the `alt` attribute to deliver important information. In cases where images are already described with text content or the image does not add meaning to the page, use a empty `alt` attribute. If the image is purely decorative, such as a background, [setting the image with CSS](https://css-tricks.com/replace-the-image-in-an-img-with-css/) is preferred.

- Headings should follow hierarchical relationships.  readers can be set to read only the headers on a page, thus heading tags should have semantic meaning and **not be selected based on their size**. Stick to using only one `h1` element per a page, which is the main subject of the page, and build a logical document outline from there.

- Instead of creating a abomination of nested `div` elements, [prefer using elements with semantic meaning](https://www.w3schools.com/html/html5_semantic_elements.asp):
  - Use the `main` element to wrap the main content of the page. Stick to one per a page.
  - Independent, self contained content should be in `article` tags.
  - Use `section` tag to group related content e.g. the different sections in a `article`.
  - Use the `header` tag to wrap navigational links and introductory information for its parent tag.
  - Nest navigational links within a `nav` tag.
  - Use a `footer` tag at bottom of a page with copyright information and related links.

- Always ensure you provide text alternatives for your content:
  - With `audio` elements you should provide a link to the transcript.
  - Time values should be wrapped in `time` tags with a associated `datetime` attribute to provide a standardizd time format for users.
  - Visual representations such as graphs should be wrapped in `figure` tags and have a descriptive `figcaption`. This provides semantic grouping as well as a text alternative.

- When working with forms:
- Use the [`label` tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label) with its `for` attribute with your form controls.
- Use the `formset` tags with a associated `legend` element for groupings of related form controls e.g. radio buttons.
- Make use of the [different `input` tag types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

- Sometimes, you may wish to provide content only to screen readers. This can be done using a simple CSS rule:

```css
.sr-only {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  top: auto;
  overflow: hidden;
}
```

- Color is important, but should not be the only way important information is conveyed. [Ensure that your chosen colors are accessible for color blind users](https://chrome.google.com/webstore/detail/i-want-to-see-like-the-co/jebeedfnielkcjlcokhiobodkjjpbjia?hl=en-GB). You also need to have enough contrast between colors. The Web Content Accessibility Guidelines (WCAG)recommends at least a 4.5 to 1 contrast ratio for normal text, colors and gray-scale combinations. Use [tools](http://contrast-ratio.com) to make sure you comply.

- When using anchor tags, use text that is descriptive. Screen readers have the functionality to only read the links on the page, but text such as "click here" or "read more" do not convey anything about the content on the link.

- To improve the efficiency of use for keyboard only users:
  - Use the [`accesskey` attribute](https://www.w3schools.com/tags/att_global_accesskey.asp) to provide a shortcut to focus/activate a element.
  - Use the [`tabindex` attribute](https://www.w3schools.com/tags/att_global_tabindex.asp) to ensure the correct tab order of elements. It also allows elements that are not normally focusable to receive focus.

Always [keep accessibility in mind](https://youtu.be/qdB8SRhqvFc) when building your applications.

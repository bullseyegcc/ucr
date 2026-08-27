# CMS blog content (from Figma)

Copy-paste ready fields for WordPress Posts. Maps to what the site reads via GraphQL (`title`, `excerpt`, `content`, `date`, `categories`, `featuredImage`, `postDetails.authorName`, `postDetails.authorImage`).

Figma file: [UCR sites (Copy)](https://www.figma.com/design/PYXFAmDvOQG42JHsS9sfRf/UCR-sites--Copy-)

- [Celebrating 10th Anniversary in 2018](#celebrating-10th-anniversary-in-2018)

Notes:

- Figma body copy is placeholder “responsive web design” content under an anniversary title. Paste as designed unless you replace with real anniversary copy.
- Featured image + author image must be uploaded in WordPress media.
- Related posts (“Latest news & insights”) are separate posts, not fields on this post.

---

## Celebrating 10th Anniversary in 2018

- Figma: [Blogs details](https://www.figma.com/design/PYXFAmDvOQG42JHsS9sfRf/UCR-sites--Copy-?node-id=1217-3386&m=dev)
- Suggested slug: `celebrating-10th-anniversary-in-2018`

| Field | Where in WP | Value |
| --- | --- | --- |
| Title | Post title | Celebrating 10th Anniversary in 2018 |
| Slug | Permalink | `celebrating-10th-anniversary-in-2018` |
| Category | Categories | Studio News |
| Date | Publish date | November 15, 2024 |
| Author name | ACF `author_name` / `postDetails.authorName` | Nabil Carton |
| Author image | ACF `author_image` | Upload circular author avatar from Figma |
| Featured image | Featured image | Upload hero portrait (man in suit) from Figma |

### Excerpt

```
In this digital age, where people access the internet through various devices and screen sizes, it's essential for websites to adapt and provide an optimal user experience on any platform.
```

### Content (post body / WYSIWYG)

```html
<p>In this digital age, where people access the internet through various devices and screen sizes, it's essential for websites to adapt and provide an optimal user experience on any platform. This is where responsive web design comes into play. Responsive web design ensures that your website looks great and functions well, regardless of whether it's viewed on a desktop, laptop, tablet, or smartphone. In this article, we'll explore the significance of responsive web design and provide some valuable tips for designing responsive layouts, optimizing images, and implementing mobile-first strategies.</p>

<h2>The significance of responsive web design</h2>
<p>Responsive web design is all about creating websites that automatically adjust their layout and content to fit the device on which they are being viewed. Here are a few key reasons why responsive web design is significant:</p>
<ol>
  <li><strong>Improved User Experience:</strong> Responsive websites provide a seamless user experience by adapting to different screen sizes and resolutions. Users can easily navigate, read content, and interact with your website, resulting in higher engagement and increased conversions.</li>
  <li><strong>Mobile-Friendly Approach:</strong> With the rise of mobile browsing, having a mobile-friendly website is crucial. Responsive web design allows your website to be accessible and functional on smartphones and tablets, ensuring that mobile users have a positive experience.</li>
  <li><strong>Search Engine Optimization (SEO):</strong> Search engines favor mobile-friendly websites and rank them higher in search results. A responsive design helps improve your website's visibility and reach, leading to increased organic traffic.</li>
</ol>

<h2>Tips for Designing Responsive Layouts</h2>
<p>Creating a responsive layout requires careful planning and implementation. Consider the following tips to design a responsive website:</p>
<ol>
  <li><strong>Use a Grid System:</strong> Grid systems help maintain consistency and structure across different screen sizes. Design your layout using a grid, which enables elements to align properly and resize proportionally.</li>
  <li><strong>Prioritize Content:</strong> Identify the most important content elements and ensure they are prominently displayed on all devices. Optimize the content hierarchy to maintain clarity and readability.</li>
  <li><strong>Breakpoints:</strong> Set breakpoints to define where your layout should adapt to different screen sizes. Test your website at various breakpoints to ensure a smooth transition between different layouts.</li>
</ol>

<!-- Mid-article image: upload the team collaboration photo from Figma and insert it here in the editor -->

<blockquote>
  <p>“A Well-Crafted Design System Acts As A Bridge Between Creativity And Efficiency Bridge, Empowering Designers To Innovate While Ensuring A Cohesive And Consistent User Experience.”</p>
</blockquote>

<h2>Optimizing Images for Responsive Web Design</h2>
<p>Creating a responsive layout requires careful planning and implementation. Consider the following tips to design a responsive website:</p>
```

### Images to upload

1. **Featured / hero:** portrait of man in suit (dark frame treatment in Figma)
2. **In-content:** team at table with laptops
3. **Author avatar:** circular headshot used next to “by Nabil Carton”

export function url(page) {
    const title = page.src.slug.replace(/[\W*]/gi, '-')
    return `/blog/${title}/`;
  }
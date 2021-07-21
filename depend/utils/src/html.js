export function stripHtmlTag(html) {
  if (html) {
    return html.replace(/<[^>]+>/g,"");
  }
}

// book.typ — Custom book-style template

#import "@preview/book.typ": *
#import "typst:std" as std

// =============== Page Setup ===============
#set page(
  paper: "a4",
  margin: (top: 2cm, bottom: 2cm, left: 2cm, right: 2cm)
)

// =============== Fonts and Typography ===============
#font("Linux Libertine O") // or lmodern alternative
#set text(size: 15pt)

// =============== Colors and Links ===============
#let link-color = rgb("0000ff")
#let cite-color = rgb("000000")
#let url-color = rgb("ffc0cb") // pink

#set link(
  color: link-color,
  hover: underline,
)

// =============== Document Metadata ===============
#show: title-page
#title-page(
  title: strong(#title),
  subtitle: emph(#subtitle),
  author: [
    #for(author in authors) {
      #author.name
      #if not(author == authors.last()) { and }
    }
  ]
)

// =============== Table of Contents ===============
#toc(depth: 2)

// =============== Quote Styling ===============
#let quote-style = block[
  inset(left: 4pt),
  rule(left: 2pt, color: rgb(0.0, 0.0, 0.55)),
  background: rgb(0.95, 0.95, 1),
  padding: 6pt,
]

// Example usage: quote-style[This is a styled quote.]


// =============== Bibliography ===============
#bibliography("references.bib") // Replace with your actual .bib file

// =============== Content Insertion ===============
#body()


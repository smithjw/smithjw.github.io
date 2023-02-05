---
comments: true
date: "2022-06-18T00:00:00Z"
image: /images/02_MacDevOps_JamesSmith.jpg
image_alt: Presentation SketchNotes
tags:
  - jekyll
  - hugo
  - github
title: 'Migrating from Jekyll to Hugo'
type: post
fediverse: 109811260017364964
---

`brew install hugo`

`hugo import smithjw.github.io hugomigration`

Run `add_alias.sh PATH/TO/POSTSDIR`

Will look for all `*.md` files in the given directoy and add an aliases block to each articles frontmatter.

It's very basic and just takes the dates/title from the filename and arranges them into the standard link format for a Hugo site.

If you've customised this, it probably won't work for you

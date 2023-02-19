---
comments: true
draft: true
date: "2023-02-20T00:00:00Z"
featuredImage: https://d33wubrfki0l68.cloudfront.net/c38c7334cc3f23585738e40334284fddcaf03d5e/2e17c/images/hugo-logo-wide.svg
tags:
  - jekyll
  - hugo
  - github
title: 'Migrating from Jekyll to Hugo'
type: post
---

Things look different here because I've switched over from Jekyll to Hugo, read on if you're interested in how that went for me
<!--more-->

External References:
- [Adding comments to your static blog with Mastodon (2020-12-20)](https://carlschwan.eu/2020/12/29/adding-comments-to-your-static-blog-with-mastodon/) - Carl Schwan
- [Add Mastodon replies to your blog (2022-12-22)](https://www.codingwithjesse.com/blog/add-mastodon-replies-to-your-blog/) - Jesse Skinner
  - This post was the first I found, but is much more complex to setup
- [Mastodon as comment system for your static blog (2022-12-25)](https://danielpecos.com/2022/12/25/mastodon-as-comment-system-for-your-static-blog/) - Daniel Pecos Martínez
  - Updated code from this piece
- [How to add comments to Jekyll blog (2021-12-29)](https://www.joelchrono12.xyz/blog/how-to-add-mastodon-comments-to-jekyll-blog/) - Joel Garcia
  - Nicer CSS from here
- Share Button - https://github.com/Aly-ve/Mastodon-share-button

`brew install hugo`

`hugo import smithjw.github.io hugomigration`

Run `add_alias.sh PATH/TO/POSTSDIR`

Will look for all `*.md` files in the given directoy and add an aliases block to each articles frontmatter.

It's very basic and just takes the dates/title from the filename and arranges them into the standard link format for a Hugo site.

If you've customised this, it probably won't work for you


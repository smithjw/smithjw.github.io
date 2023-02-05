#!/bin/bash

# Create aliases for old posts.

DIR="$1"

for filename in "$DIR"/*.md; do
    echo "Adding frontmatter to: $filename"

    basename=$(basename "$filename" ".md")
    year="${basename:0:4}"
    month="${basename:5:2}"
    day="${basename:8:2}"
    title="${basename:11}"

    alias_block="/$year/$month/$day/$title"
    echo "Adding alias from: $alias_block"
    sed -i '' "1s#---#---\naliases:\n  - $alias_block#g" "$filename"

done

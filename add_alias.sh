#!/bin/bash

# Create aliases for old posts.

DIR="content/writing"

for filename in "$DIR"/*.md; do
    basename=$(basename "$filename" ".md")
    year="${basename:0:4}"
    month="${basename:5:2}"
    day="${basename:8:2}"
    title="${basename:11}"

    alias_block="aliases:\n  - /$year/$month/$day/$title"
    echo "$alias_block"
    sed -i '' "1s#---#---\n$alias_block#g" "$filename"

done

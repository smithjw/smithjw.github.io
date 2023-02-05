---
aliases:
  - /2018/02/15/Set-Random-Wallpapers-at-Enrolment
comments: true
date: "2018-02-15T00:00:00Z"
tags:
- Onboarding
- Bash
- Jamf
- AppleScript
title: Setting a Random Wallpaper at Enrolment
type: post
---

As part of the onboarding at Culture Amp, I configure the dock at set a default wallpaper. This isn't necessarily to lock down what Camper's can do with their Macs but more-so to get them up and running as quickly as possible and in a consistent environment.

In the past I've simply installed a package that dropped an image into a folder and then run a `postinstall` script to set it as the wallpaper like so.

{{< highlight bash >}}
osascript -e 'tell application "Finder" to set desktop picture to POSIX file "/Library/Application Support/IT Assets/Wallpaper.png"'
{{< / highlight >}}

While this is an easy solution, I've recently been given a bunch more wallpapers that are currently being used throughout our meeting rooms and wanted to add some randomisation to what is being set on new Macs. After a but of Googling and BASHing my head against a wall I've come up with the following script. This script will look all files in a given folder and select one of them to set as the background. Feel free to use this as you see fit and let me know if you run into any issues

Enjoy!

{{< highlight bash >}}
#!/bin/bash

# Create an array with the contents of a folder
wallpapers=(/Library/Desktop\ Pictures/Some\ Folder/*)
# Seed a random number
RANDOM=$$$(date +%s)

# Select one of the wallpapers from the array
selectedWallpaper=${wallpapers[$RANDOM % ${#wallpapers[@]} ]}

echo "${selectedWallpaper}"

# Set this wallpaper during enrolment
osascript -e 'tell application "Finder" to set desktop picture to POSIX file "'"$selectedWallpaper"'"'

exit 0
{{< / highlight >}}

---

---
title: "Installing the Xcode xip on end-user systems"
tags: [jamf, standard-user, xcode, pkg]
type: post
comments: true
image: /images/xcode-12-256x256.png
---

<p align="center">
    <img alt="Xcode App Icon" src="/images/xcode-12-256x256.png">
</p>

I recently (just yesterday), updated how we're installing Xcode on end-user systems at work and thought I might share the steps/script that we're using.

## Tools
- [unxip][1]
- [swiftDialog][2]
- [Apple Developer Downloads][4]

## Setup
1. Install [`unxip`][1] to a common location on disk
    - In my case it's `/Library/Management/Tools/unxip`
    - `unxip` is used as it is able to expand the Xcode.app file in about 3 minutes
2. Download the current version of Xcode from the Apple Developer site as a `xip`
3. Rename Xcode to `.xip.pkg` which enables Jamf to take the upload and store it in your Cloud Distribution Point
4. Create a Policy in Jamf to Cache the `.xip.pkg` file only scoped to All Computers, an Ongoing recurrence, and with a Custom Trigger
    - I use `cache-Xcode-13.4`
5. Create a second policy that runs the script below
    - Make sure Parameter 4 is the version of Xcode you're deploying, eg `13.4`
    - Make sure Parameter 5 is the Custom Trigger you set on the first Policy, eg `cache-Xcode-13.4`
6. This policy should be available via Self Service for end-users to run

## Script Walkthrough
- This script utilises [`unxip`][1] for the quick expansion of the Xcode xip on end-user systems and [`swiftDialog`][2] for displaying progress to the end-user
- You will need to pre-install `unxip` on end-user systems outside of this script as the release binary is not signed, nor packaged
- The script will check for `swiftDialog` prior to kicking off, but because Bart provides a signed Package on his repo, the script will download/install it if not present
- Once `swiftDialog` is running, it will check for the cached version of the Xcode.xip.pkg on the system. If not found that will be downloaded using your defined Custom Trigger
- Once cached, `unxip` is used to unpack the `.xip` and move it into place in the Applications folder.
    - As we don't know if the end-user has multiple versions of Xcode in use, we are naming the app according to the format `Xcode-MAJOR.MINOR.app`
- The script will then ensure the installing user is in the correct permissions groups
- And finally we will install the underlying packages within the `.app` bundle

[You can view the gist here][3]

{% gist b61a180b099624cebf61a8460fc594ed %}

---

[1]:    https://github.com/saagarjha/unxip
[2]:    https://github.com/bartreardon/swiftDialog
[3]:    https://gist.github.com/smithjw/b61a180b099624cebf61a8460fc594ed
[4]:    https://developer.apple.com/download/applications/

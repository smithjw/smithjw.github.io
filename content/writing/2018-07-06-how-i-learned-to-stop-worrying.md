---
aliases:
  - /2018/07/06/how-i-learned-to-stop-worrying
date: "2018-07-06T00:00:00Z"
tags:
- DEP
- Apple
- Setup Assistant
- Internet Recovery
- macOS
title: How I Learned to Stop Worrying (about DEP) and Love the Nuke & Pave
type: post
---

I ran into an interesting issue today, Macs that I know were in DEP would not show the Remote Management screen after connecting to Wi-Fi in the Setup Assistant.

I tried these Macs to Wi-Fi again (as sometimes is required), no luck there; I tried ethernet, still no go. Let's shut down the Mac, un-assigned it from its DEP Pre-Stage, then assigned it again, nope, still not having a bar of it.

Marcus Ransom kindly provided me with the answer to the behaviour that I was seeing. Several days earlier I had unboxed these Macs and booted into the Setup Assistant to confirm they were in DEP. After discovering they weren't, I reached out to our supplier who added them promptly. Fast forward to today and they were having no bar of it.

It seems that if a Mac isn't enrolled into DEP and proceeds past the Wi-Fi Network page it will write the following file `/var/db/Configuration Profiles/Settings/.cloudConfigNoActivationRecord`. Once this file exists, even after a Mac is enrolled into DEP and assigned to a Pre-Stage, it will no longer check for that activation record during the Setup Assistant.

I had several paths forward here after finding this out but by far the cleanest method was to boot the Mac into Internet Recovery, Nuke the APFS Container, re-create it, and then install a fresh copy of macOS High Sierra.

15 mins later the three Macs booted to the Setup Assistant and after connecting to the network, proudly displayed the Remote Management screen of the Setup Assistant.

---

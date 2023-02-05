---
comments: true
date: "2018-04-23T00:00:00Z"
tags:
- DEP
- JAMF
- Casper
- APFS
- macOS
- Snapshot
title: Creating APFS Snapshots at the Setup Assistant
type: post
---

For the last few days I've been creating a set of enrolment policies for a loaner Mac, eg one that can be handed out in an instant to an employee if they forget their Mac at home (happens more than you think), or if theirs is damaged. At the centre of this is [Apple's Device Enrolment Program (DEP for short)][6] to auto-enrol the Mac and run all the Jamf policies.

Initially I would test this in a VM, but as I got closer to a final set, I began testing on physical hardware. This is where I ran into the issue of needing to reinstall the OS after each trial to run it through the DEP enrolment process correctly. This added 40+ mins of waiting to each run-through.

What I've now done is create an APFS snapshot of the Mac before it runs through the Setup Assistant. Doing this enables me to reset the Mac to factory state in under 5 mins. Think of it as the macOS equivalent of Erase All Contents and Settings in iOS.

In order to create this snapshot we'll need to launch the Terminal while in the Setup Assistant by pressing `⌃⌥⌘T` (thanks to [Chris Collins][1], [Ross Derewianko][2], and [Erik Gomez][3] for highlighting this for me).

Once the Terminal is open type `tmutil snapshot` and press Enter. After 10-15 seconds, you'll see a success message along the lines of `Created local snapshot with date: YYYY-MM-DD-HHmmss`.

Now that the snapshot has been successfully created, you're free to setup the Mac as normal. When you want to restore the Mac to factory fresh state, simply reboot the Mac into the Recovery Partition (`⌘R` while booting), and select Restore from Time Machine (This method has been highlighted by [François Levaux-Tiffreau][4] and [Rich Trouton][5]).

Hope this helps y'all with testing!

---

[1]:https://chris-collins.io/2018/03/15/Using-Terminal-At-macOS-Setup-Assistant/
[2]:https://www.rderewianko.com/mind-blown-run/
[3]:https://blog.eriknicolasgomez.com/2018/03/26/macOS-testing-tricks-reusing-base-images-and-obtaining-a-root-shell-prior-to-SetupAssistant-with-LanguageChooser/
[4]:https://maclovin.org/blog-native/2017/restoring-from-a-snapshot-with-apfs
[5]:https://derflounder.wordpress.com/2017/11/02/apple-software-updates-creating-apfs-snapshots-on-macos-high-sierra/
[6]:https://www.apple.com/business/dep/

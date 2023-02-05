---
categories: []
comments: true
date: "2013-08-20T00:00:00Z"
meta: {}
published: true
status: publish
tags: []
title: Global shortcut to add a marker in Logic Pro X
type: post
---
**UPDATE:**
 I've just modified the scripts to check if Logic Pro X is the frontmost app. If Logic is in the background, the functionality is the same, but if is the frontmost application, it adds a marker without switching applications.`

I've been looking for a way to create a marker in Logic Pro X while podcasting without having Logic in the foreground at all times.


After a bit of tinkering, I settled on an AppleScript that does the trick. This AppleScript will activate Logic, simulate the key combination to create a marker 
(^K), pause for 1/2 a second (anything less and I've found it to only work some of the time), then switch back to the last application 
(⌘⇥).

This can be activated in any number of ways. For example:

* If you own 
[EventScripts](https://itunes.apple.com/au/app/eventscripts/id525319418?mt=12?at=10l4I8) (you really should), you can activate it from an 
[iPhone or iPad](https://itunes.apple.com/au/app/eventscripts-mobile/id549019577?mt=8?at=10l4I8) on the same local network
* If you're an 
[Alfred](http://alfredapp.com) fan, you can use 
[this little workflow](https://www.dropbox.com/s/18kp0ajl5m59aof/Logic%20Pro%20X%20-%20Podcasters.alfredworkflow) to trigger the marker creation by double tapping the Control (^) Key or activating Alfred and typing "mark". This can also be set to any key combination that you like.
* If you want to get really crafty and activate it by double tapping any modifier key without tying it to Alfred, you could use the following template from my 
[KeyRemap4Macbook](https://pqrs.org/macosx/keyremap4macbook/) 
private.xml file (
[More on KeyRemap here](http://smithjw.me/blog/keyremap4macbook-alfred-file-selection)), and set the script to run from any other application that can launch scripts via keyboard shortcuts.

Hope someone out there finds some use out of this. If you've got any questions, feel free to shout out :D.

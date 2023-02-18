---
aliases:
  - /2011/11/12/getting-sick-beard-to-reply-you-on-twitter
categories: []
comments: true
date: "2011-11-12T00:00:00Z"
meta: {}
published: true
status: publish
tags:
- Automation
- Mac mini
- NZB
- Server
- Sick Beard
- Torrent
title: Getting Sick Beard to @ reply you on Twitter
type: post
---
Pretty simply tip here, all you need to do is edit a couple of config files and you're good to go. You'll want to shutdown Sick Beard before you do this as otherwise the changes don't hold. Navigate to wherever you've got Sick Beard installed on your computer and open up the config.ini file located at /Sick\ Beard/config.ini

On about line 121 you'll find the Twitter section. What you want to change is the option marked twitter_prefix. I've changed mine to "Hey @smithjw" so that every time Sick Beard sends a notification on Twitter it will @ reply me from the account that I've set up for my server @_SteveSmith_

![](/static/4f331d1f8754c7ec090e554a/50fe1c99e4b01c920a89f452/50fe1c99e4b01c920a89f4a5/1321080398553/config.ini.png/1000w)

If you also want to change what Sick Beard says when it notifies you when it starts and completes files open up common.py located in  /Sick\ Beard/sickbeard/common.py. Down on line 42 you can set the text that you would like to be displayed.

 

![](/static/4f331d1f8754c7ec090e554a/50fe1c99e4b01c920a89f452/50fe1c99e4b01c920a89f4a6/1321080421047/common.py.png/1000w)

Enjoy!

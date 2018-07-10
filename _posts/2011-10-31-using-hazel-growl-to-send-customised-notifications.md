---
layout: post
title: Using Hazel & Growl to Send Customised Notifications!
categories: []
tags: []
status: publish
type: post
comments: true
published: true
meta: {}
---
This is just a quick post to explain how I am able to use Steve, my Mac mini server, to send custom notifications to myself and my fiancé Christina. I am in the process of a writeup on my entirely automated TV setup but that can wait for another day.

Once my shows are downladed I set Hazel to renaming them and once complete they will be coloured blue. This sets off the next Hazel rule (note you need to have the new beta version to take advantage of nested rules which you can find 
[here](http://www.noodlesoft.com/forums/viewtopic.php?f=5&t=1219)) that watches for files that are coloured blue and then, depending on the file name, will either send a notification email to Christina or myself.

The way that I have the rules set up are as follows:

![](/static/4f331d1f8754c7ec090e554a/50fe1c99e4b01c920a89f452/50fe1c99e4b01c920a89f494/1320226721717/Hazel%20Rule.png/1000w)

Hazel then sends a notification to Growl along the lines of "Hello Christina, I've taken the liberty of downloading [Hazel fills the filename in here] for you. Enjoy." , which I have set up with 
[SMPT mail](http://code.google.com/p/growl-mail-smtp/wiki/Documentation). SMPT Mail will send all notifications to an email address from whatever accound you would like. This saves having to leave your mail client of choice open all the time. I can just as easily configure Growl to send notifications to Prowl if I wanted.

![](/static/4f331d1f8754c7ec090e554a/50fe1c99e4b01c920a89f452/50fe1c99e4b01c920a89f495/1320227413607/Growl%20Rule.png/1000w)

There you have it, a simple way to configure personalised notification when your TV shows or Movies are downloaded. If you've got any tips or ideas on how I can improve this, please let me know. Cheers

 

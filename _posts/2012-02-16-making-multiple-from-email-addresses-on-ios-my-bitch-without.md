---
layout: post
title: Making multiple 'From' email addresses on iOS my bitch without adding extra
  accounts
categories: []
tags:
- Gmail
- Google
- Google Apps
- Mail
- Mail.app
- iOS
status: publish
type: post
published: true
meta: {}
---
This all came about because of work. I got a call from a client that we regularly work with asking if it's possible to consolidate his some 20 email accounts into one of his Google Apps accounts (this also works with regular Gmail accounts too) while still being able to reply and send from the individual addresses. As it turns out this can be quite tricky but I managed to find an article that outlined the steps perfectly, or so I thought to begin with. 

Firstly, a very quick word on my clients set up so far. With his multple accounts he has set them to forward all messages received to his one Google Apps account. 
I haven't had any experience with using Google's "Mail Fetcher" so I can't speak to how this will work with that system. I've just tested Gmail/Google Apps' "Mail Fetcher" and it works a ok as well.

The original article is by 
[Nick Cernis](https://twitter.com/#!/nickcernis/) on his website 
[Modern Nerd](http://modernerd.com/). Let me just say that you should first head over to the article, 
[this is the article](http://modernerd.com/post/535350679/solved-gmail-ipad-iphone-and-multiple-from), and read it because it's all layed out nice and neatly with pretty screenshots. Once you're done there, come back here and I'll explain the rest. I'll preface the article by saying that on your iOS device you'll need to set up your Gmail/Google Apps account using IMAP and not Exchange. It might be an idea to set up your Mail with IMAP and you Contacts & Calendars with Exchange if you need them.

Are you back? Good, let's procede.

Once you've added the addition addresses into your Mail Settings you might need to restart your device. Now when you go to reply or send a message if you tap on the "From:" field you will be presented with a list of email addresses to send messages from.

![](/static/4f331d1f8754c7ec090e554a/50fe1c99e4b01c920a89f452/50fe1c99e4b01c920a89f485/1329360390033/2012-02-16%2013.45.14.png/1000w)

At this stage if you tried to send an email from one of these additional address they would still be received on the other end as originating from your master Gmail/Google Apps account. This is where the fun part comes in. I will say that I'm not quite sure why or how this works, but it does :).

Log into your Gmail/Google Apps account, the one that you're using as the catch all account, and procede to Settings -> Accounts. There you will see an option to "Send mail as:". What you need to do is to add in all the addition email accounts that you wish to send email messages from. 
[Here](http://support.google.com/mail/bin/answer.py?hl=en&answer=22370&topic=1669030&ctx=topic) is the relevant Google Help article which explains all the ins and outs of adding multiple "Send mail as:" addresses. If you're sending mail on behalf of someone else it might also pay to 
[read this](http://support.google.com/mail/bin/answer.py?hl=en&answer=1710338&ctx=gmail) Google Help article on treating addresses as aliases or not. I chose to add in each additional email accounts own SMTP server and this seems to be working perfectly. You will be sent an email to each of the accounts that you add as confirmation that you actually have the rights to access it.

Once that is all done, when you try to send an email from one of these additonal accounts, it will show up correctly in their inbox as coming from the correct account.

As an added bonus, because all those other accounts are forwarding their messages into the one Gmail/Google Apps account, when you hit reply, Mail automatically fills in the correct "From:" address, just like if you had previously set up multiple inboxes on your device.

If you would like to set this up in Mail.app on your Mac, the process is just as simple. Open up your account settings and add the additional emails separated by commas in the "Email Address:" section.

If this isn't working for you feel free to leave a comment or send me an email :).

As always, hope this helps you.

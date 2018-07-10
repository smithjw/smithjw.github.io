---
layout: post
title: Initiating Screen Sharing or Back to My Mac from the command line
categories: []
tags:
- ARD
- Apple Remote Desktop
- Back to My Mac
- CLI
- Command Line
- Hacks
- Screen Sharing
- Terminal
- iCloud
status: publish
type: post
comments: true
published: true
meta: {}
---
Just some information on how to start a Screen Sharing or Back to My Mac (BTMM from now on) session from the command line.

To launch a Screen Sharing session from the terminal on your local network, simply type

open vnc://ip.address.of.computer:5900(this is the default Screen Sharing port)

To launch into a BTMM session is a bit trickier. First we need to either find your iCloud Member number or the specific Macs BTMM IPv6 address.

To grab your iCloud member number, open your Terminal client of choice and type

dns-sd -E

You'll get a readout like this

Looking for recommended registration domains:
    DATE: ---Wed 01 Aug 2012---
    11:16:33.698  ...STARTING...
    Timestamp     Recommended Registration domain
    11:16:33.699  Added     (More)               local
    11:16:33.699  Added                          icloud.com
                                                 - > btmm
                                                 - - > members
                                                 - - - > 000000000 (This is your member number :D)

Then you can type the following into the command line to start the BTMM session

open vnc://computername.membernumber.members.btmm.icloud.com1

Another way to launch a BTMM session is to use the unique IPv6 that is given to any Mac enabled with BTMM. So far, that only two places that I've been able to see this address is by opening up the new version of Apple Remote Desktop for Mountain Lion which now also shows your BTMM machines as well as Macs on the local network.

 

![](/static/4f331d1f8754c7ec090e554a/50fe1c99e4b01c920a89f452/50fe1c99e4b01c920a89f498/1343787972433/Screen%20Shot%202012-08-01%20at%2011.46.08%20AM.png/1000w)

You can then copy the IPv6 address and add it into the 
open vnc:// command.

This address can also be found after initiating a BTMM session from the Finder, navigating to 
~/Library/Application Support/Screen Sharing/, & opening the file relating to Whichever computer that you just BTMMed.

If using the IPv6 address, make sure you put it in square brackets. It won't work otherwise.

open vnc://[IPv6 address of mac]

1. On a side note, as has been seen in many posts, you can also use this address to ssh into any of your Macs using the following command

ssh -2 -6 username@computername.membernumber.members.btmm.icloud.com**Update**
 on 2012-08-01 05:53 by James SmithYou can also grab your member number by typing this into the Terminal

echo show Setup:/Network/BackToMyMac | scutil | sed -n 's/.* : *\(.*\).$/\1/p'

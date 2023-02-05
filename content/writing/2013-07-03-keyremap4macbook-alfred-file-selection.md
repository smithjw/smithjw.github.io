---
categories: []
comments: true
date: "2013-07-03T00:00:00Z"
meta: {}
published: true
status: publish
tags: []
title: KeyRemap4Macbook & Alfred File Selection
type: post
---
I've really enjoyed the switch from 
[LaunchBar](http://www.obdev.at/products/launchbar/index.html) to 
[Alfred](http://www.alfredapp.com), right around the time that version 2 was released, bar one little niggle that I've encountered. I've dived head first into the 
[Workflows Forum](http://www.alfredforum.com/forum/3-share-your-workflows/) discovering neat and interesting ways of interacting with apps on my local Mac and even my Mac mini media server at home. One of the features that I haven't used extensively, that little niggle, is Alfred's File Selection.


Alfred's File Selection is comparable to LaunchBar's Instant Send, which I used avidly, and enables you to directly modify files by selecting them anywhere in the Finder and double tapping on one of the Mac's Modifier keys; I had it set up to use a double tap of the Command key. The downside of Alfred's File Selection is that it's only accessable using a standard keyboard shortcut rather than, in my opinion, the more accessable double Command tap.


Wanting to emulate LaunchBar's function, I set about trying to enable this functionality using my favourite keyboard hacking application, 
[KeyRemap4Macbook](https://pqrs.org/macosx/keyremap4macbook/index.html.en) (not just for Macbooks). This took a bit of time on my pBrt as I was trying to get through the documentation which is a bit over the place. Once I worked my way though the 
[Examples](https://pqrs.org/macosx/keyremap4macbook/xml.html.en#examples) & 
[Basic Syntax](https://pqrs.org/macosx/keyremap4macbook/xml.html.en#basic-syntax) documents, as well as trawling through the 
[samples.xml](https://github.com/tekezo/KeyRemap4MacBook/blob/master/src/core/server/Resources/include/checkbox/samples.xml#L633) file to find any mention of 
DoublePressModifier, a function which enables exactly what I'm after. I finally came up with the solution!


Just paste the following bit of code into your 
private.xml file, click the ReloadXML button, and select "Double Command to Alfred File Selection".


****



<item>
        <name>Double Command to Alfred File Selection</name>
        <appendix>(+ Home to beginning of line)</appendix>
        <identifier>private.DoubleCommand</identifier>
        <autogen>
            --DoublePressModifier--
            KeyCode::COMMAND_L,
            KeyCode::COMMAND_L,
            KeyCode::A, ModifierFlag::CONTROL_L | ModifierFlag::OPTION_L
        </autogen>
    </item>


****



This remap will still enable the 
⌘ (Command) key to act as it normalLy would but when double tapped, KeyRemap4MacBook will send 
^+⌥+A (Control + Option + A). Your 
private.xml file can be located in the Misc & Uninstall section of KeyRemap4MacBook
  
      
![](http://static1.squarespace.com/static/4f331d1f8754c7ec090e554a/50fe1c99e4b01c920a89f452/51d388d8e4b0f8d8d12bdc10/1372817632227/Screenshot+2013-07-03+10.57.35.png.35.png?format=original)
  


If you'd like to modify this to use a different Modifier key, simply change all instances 
COMMAND_L to the desired Modifier key, or, if you have a different shortcut setup to activate File Selection, change the third 
KeyCode line to the currently active shortcut.


###Edit:



So thanks to twitter buddy 
[@sayzlim](https://twitter.com/sayzlim) who pointed out that 
[Alfred can indeed use double taps](https://twitter.com/sayzlim/status/352267592272064512) as a way of activating functions, I now need to find another use for my KeyRemap4MacBook code. Oh well. Thanks mate :D
  
      
![](http://static1.squarespace.com/static/4f331d1f8754c7ec090e554a/50fe1c99e4b01c920a89f452/51d3c91be4b0ab4d475f1b35/1372834083008/Screenshot+2013-07-03+16.41.38.png.38.png?format=original)

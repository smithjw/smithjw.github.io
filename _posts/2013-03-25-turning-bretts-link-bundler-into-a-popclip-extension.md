---
layout: post
title: Turning @ttscoff's Link Bundler into a PopClip extension
categories: []
tags: []
status: publish
type: post
published: true
meta:
  passthrough_url: http://brettterpstra.com/2013/03/16/a-link-bundler-service-for-bitly/
---
Building on 
[Brett Terpstra's](http://brettterpstra.com) link bundling service for Bit.ly, I thought I'd turn it into a 
[PopClip](http://pilotmoon.com/popclip/) extension. All you need to do is follow 
[Brett's instructions](http://brettterpstra.com/2013/03/16/a-link-bundler-service-for-bitly/) to install the service then install my PopClip extension and you should be good to go.Here are his instructions >Installation and Configuration


The installation takes a bit of effort, but it’s not too bad.


You can install the Service by unzipping it and double-clicking the .workflow file. A dialog will pop up asking if you want to install it or open it in Automator. We want to open it in Automator first because we need to make a small edit.


Next, you need an API key.


1. Set up a bit.ly account if you don’t have one


2. Log in to your Bit.ly account


3. Go to http://dev.bitly.com/my_apps.html


4. Click “Manage my apps” and enter your password


5. Copy the Generic Access Token


6. Go back to the workflow open in Automator


7. Scroll down to the first “Run Shell Script” action


8. Find the line at the top that looks like:


    bitly_key = ‘xxxxxxx’


9. Paste your key between the single quotes and save


10. Close the file, go back to where you opened it from and double click it again, this time choosing the “Install” option.




  
— http://brettterpstra.com/2013/03/16/a-link-bundler-service-for-bitly/You can find my PopClip extension 
[here](/s/LinkBundle.popclipextz)

---
title: "Launching GIFs from the Terminal"
tags: [jamf, gif, postinstall, pkg]
type: post
comments: true
---

Did you know that you can launch a playing GIF from the Terminal? I didn't until today; but it's really quite simple.

I'm working on deploying a new feature to my Mac users and wanted an easy way to show them how it works. I could launch a web-browser linking to a specific support article but wanted something that was simple and caused less friction which is where the thought of displaying a GIF to them after the Policy ran came to mind. 

If you run `open -a /path/to/super-cool-gif.gif`, the GIF will open in Preview but won't be animated 🙁.

![Preview](/images/terminal_gifs/terminal_gif_1.png)

What I actually wanted was this 😃!

![Animation](/images/terminal_gifs/terminal_gif_2.gif)

QuickLook will display GIFs in an animated fashion and as I leanrnt today from an [11 year old superuser post][1], you can trigger this from the Terminal with `qlmanage -p`.

When you have your super cool GIF to display for a user, make sure you're running this command from the specified user's context. In my case it was included in an [Outset OnDemand][2] script which would fire after the Policy executes but you could also try via `sudo -u`.

{% highlight bash %}

#!/bin/bash
# Outset OnDemand running via Jamf Pro Script Policy

loggedInUser=$( echo "show State:/Users/ConsoleUser" | scutil | awk '/Name :/ && ! /loginwindow/ { print $3 }' )
onDemand=/usr/local/outset/on-demand/show-gif.sh

/bin/cat > "$onDemand" << EOF
#!/bin/bash

qlmanage -p "/path/to/super-cool-gif.gif" 2>/dev/null

exit 0
EOF

chown root:wheel "$onDemand"
chmod 755 "$onDemand"

sudo -u "$loggedInUser" /usr/local/outset/outset --on-demand

exit 0

{% endhighlight %}

{% highlight bash %}

#!/bin/bash
# Running directly in script via Jamf Pro Policy

loggedInUser=$( echo "show State:/Users/ConsoleUser" | scutil | awk '/Name :/ && ! /loginwindow/ { print $3 }' )

sudo -u "$loggedInUser" qlmanage -p "/path/to/super-cool-gif.gif" 2>/dev/null

exit 0
{% endhighlight %}

In both of these examples, I've added `2>/dev/null` because the `qlmanage` process is quite chatty.

Hope this helps!

---

[1]:    https://superuser.com/questions/93383/open-file-with-quick-look-from-command-shell
[2]:    https://github.com/chilcote/outset/wiki/OnDemand

---
title: "Programming YubiKeys in a VM"
tags: [List, Of, Tags]
type: post
---

I've finally had some time to play with the [YubiKey 4C][2] and decided I wanted to get it functioning as a second factor with [Okta][2]. [This guide][3] from Yubico seemed fairly straight-forward but I immediately ran into an issue. While the [YubiKey Personalization Tool][4] (what you use to program the YubiKey) would recognise my YubiKey, it would show that there was an unknown error.

![YubiKey Personalization Tool Error](/images/YubiKey/YubiKey01.png)

I did a but of hunting online and didn't find much so reached out to Yubico's support. To their credit I got a reply within an hour with a solution to the problem. It turns out the Personalization Tool is incompatible with [Karabiner-Elements][5] (a popular key remapper for macOS - they must get this a lot as I did indeed have it installed).

Not wanting to delete it from my system, I decided I'd try to get the YubiKey app installed in a macOS VM. This also seems to be a better idea as the guide above says you should create your YubiKey configuration on an air-gapped (not connected to a network) machine. I spun up a macOS VM without network drivers and set to work. Here comes hurdle number 2; it seems that out of the box VMWare VMs don't like sharing the YubiKey from the Host into the VM.

If you open up the settings of a VM, you will see an item in the USB & Bluetooth tab for the YubiKey but enabling it does nothing.

![YubiKey Personalization Tool Error](/images/YubiKey/YubiKey02.png)

Luckily it's a pretty easy fix which I'll outline below:

1. Make sure your VM is shut down
2. Navigate to your VM in the Finder
3. Right click on the VM and select Show Package Contents
4. Open the `.vmx` file with a plain-text editor (I like [Atom][6])
5. Add the following two lines at the end of the file and save
  {% highlight bash %}
    usb.generic.allowHID = "TRUE"
    usb.generic.allowLastHID = "TRUE"
  {% endhighlight %}
6. Relaunch your VM
7. With your VM booted, open the Settings, and navigate into the USB & Bluetooth table
  ![VMWare Settings](/images/YubiKey/YubiKey03.png)
8. Click to enable the item that DOES NOT begin with "Shared".
  ![YubiKey Enabled](/images/YubiKey/YubiKey04.png)
9. The Shared will disappear and the YubiKey Personalization Tool within your VM should recognise the YubiKey
  ![YubiKey Personalization Tool Success](/images/YubiKey/YubiKey05.png)

I hope this helps. Please let me know if the above method does not work for you.

---

[1]:  https://www.okta.com
[2]:  https://www.yubico.com/product/yubikey-4-series/#yubikey-4c
[3]:  https://www.yubico.com/wp-content/uploads/2015/11/Programming_YubiKeys_for_Okta.pdf
[4]:  https://itunes.apple.com/au/app/yubikey-personalization-tool/id638161122?mt=12
[5]:  https://github.com/tekezo/Karabiner-Elements
[6]:  https://atom.io/

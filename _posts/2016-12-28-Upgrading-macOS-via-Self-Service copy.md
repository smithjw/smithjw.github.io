---
title: "Upgrading macOS via Self Service"
tags: [DEP, Self Service, JAMF, macOS Sierra]
type: post
comments: true
---

Taking many pointers [from this great post by Rich Trouton][1] a year ago, I wanted to write a followup to how I’m deploying macOS Sierra in my environment. I've followed a lot of the steps that Rich has outlined but it's probably easier to describe the full set of steps I'm taking rather than describing the differences. 

Firstly I'm downloading the most recent version of the macOS Sierra installer from the App Store then running it through [createOSXinstallPkg][2] using the following command:

```
sudo ./createOSXinstallPkg --plist /path/to/xml.plist
```

The `--plist` option allows me to set all my arguments in a single file rather than having to specify them each time there's a new version of Sierra out.

```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Source</key>
    <string>/Volumes/Macintosh HD/Applications/Install macOS Sierra.app</string>
    <key>Output</key>
    <string>/Volumes/Macintosh HD/Installers/</string>
    <key>Identifier</key>
    <string>com.cultureamp.InstallmacOS.pkg</string>
</dict>
</plist>
```

Once this pkg has been created I upload it to the JSS using Casper Admin, adding it to the macOS Installers Category (this can be any Category that you like).

---

Next up is creating the Policy that will cache the pkg on all eligible Macs. I'm deciding to do this automatically so that when a user decides to upgrade, it will execute almost instantaneously.
![](/images/install_macOS/01a_cache_general.png)
*Set to recurring check-in with one execution per computer*
![](/images/install_macOS/01b_cache_package.png)
*Define the pkg and set Action to Cache*
![](/images/install_macOS/01c_cache_maintenance.png)
*Update Inventory so that the Macs are added to the appropriate Smart Group*

The Cache Policy is scoped to a Smart Group of Macs that have an outdated version of macOS installed.
![](/images/install_macOS/01d_cache_scope.png)
![](/images/install_macOS/02a_group_outdated.png)
*A Smart Group with the criteria Operating System not like 10.12 will match all Macs that aren't currently on Sierra*

---

The Install Policy has a custom trigger of `installSierra` which is executed by a script in the Update to macOS Sierra Policy (described below). I've set Action in the Packages step to Install Cached which ensures that it will use the pkg that had been packaged in the previous Cache policy. 
![](/images/install_macOS/03a_install_general.png)
*Custom Trigger set to installSierra*
![](/images/install_macOS/03b_install_package.png)
*Action set to Install Cached*

Under the Restart section, I've enabled authenticated restart which will forgo prompting the user for a pre-boot password to unlock their Macs. This only affects Users who have FileVault 2 enabled but given my entire fleet has it on, it will greatly reduce friction for these Updates.
![](/images/install_macOS/03c_install_restart.png)
*Enabled authenticated restart as our entire fleet has FV2 enabled*
![](/images/install_macOS/03d_install_maintenance.png)
*Updating Inventory to make sure that the Mac falls into the correct Smart Groups*

The Install Policy is Scoped to Macs that have the package cached and excludes Macs already on Sierra (this probably isn't necessary as my Install rule only Scopes to Macs on previous versions but I'd rather be safe).
![](/images/install_macOS/03e_install_scope.png)
This is accomplished by setting the Criteria to Cached Packages. To fill the Value field, you'll either need to click the small button next to the field which will show all packages that are currently cached on your fleet, or enter the filename in full. Even with the Operator set to `has`, it wouldn't match to a partial name.
![](/images/install_macOS/04a_group_cache_before.png)
*Select Cached Packages as a Criteria*
![](/images/install_macOS/04b_group_cache_select.png)
*Select the macOS installer package*
![](/images/install_macOS/04c_group_cache_after.png)
*Voilà*

![](/images/install_macOS/05a_group_sierra_installed.png)

---

The final piece in the puzzle is a Policy that runs via Self Service only. When I want to upgrade all Macs automatically, I can simply add a recurring check-in (once per computer) or scheduled execution. If you were going down the automated route, I would highly recommend sending out lots of comms before actually pushing the metaphorical red button.
![](/images/install_macOS/06a_upgrade_general.png)
My version of the script can be found [here][3] (the original version by Rich is [here][4]). Mine simply takes out the checks for Auto Login as we don't allow that at work (neither should you) and modifies the messages that the user sees.
![](/images/install_macOS/06b_upgrade_scripts.png)
*Here I set the amount of free space required to upgrade and the version number of the OS that's being installed*

Like the Install Policy, the Upgrade Policy is scoped to a Smart Group where the package has already been cached and excludes Macs on macOS Sierra.
![](/images/install_macOS/06c_upgrade_scope_target.png)
![](/images/install_macOS/06d_upgrade_scope_exclusions.png)
Here I'm enabling the Upgrade Policy for use in Self Service and Featuring it on the main page. 
![](/images/install_macOS/06e_upgrade_self_service.png)

---

And that's it you should now be able to deploy the latest version of macOS via Self Service. Please let me know if you have any issues and how you go in your own environment.

---
---


[1]:	https://derflounder.wordpress.com/2015/11/23/providing-os-x-upgrades-via-caspers-self-service/
[2]:	https://github.com/munki/createOSXinstallPkg
[3]:	https://github.com/smithjw/JAMF_goodies/blob/master/Scripts/selfServiceSierraInstall.sh
[4]:	https://github.com/rtrouton/rtrouton_scripts/blob/master/rtrouton_scripts/Casper_Scripts/self_service_os_install/sierra/self_service_sierra_os_install.sh

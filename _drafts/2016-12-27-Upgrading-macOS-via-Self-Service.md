---
title: "Upgrading macOS via Self Service"
tags: [DEP, AD, JAMF]
type: post
---

Following along [from this great post by Rich Trouton][1] I wanted to write a followup to how I’m deploying macOS Sierra in my environment. I've followed a lot of the steps that Rich has outlined but it's probably easier to describe the full set of steps I'm taking rather than describing the differences. 

Firstly I'm downloading the most recent version of the macOS Sierra installer from the App Store then running it through `[createOSXinstallPkg][2]` using the following command:

```sudo ./createOSXinstallPkg --plist /path/to/xml.plist```

The `--plist` option allows me to set all my arguments in a single file rather than having to specify them each time there's a new version of Sierra out.

**Include example plist here**

Once this pkg has been created I upload it to the JSS using Casper Admin adding it to the macOS Installers Category.

Next up is creating the Policy that will cache the pkg on all eligible Macs. I'm deciding to do this automatically so that when a user decides to upgrade, it will execute almost instantaneously.

![](/images/install_macOS/01a_cache_general.png)
![](/images/install_macOS/01b_cache_package.png)
![](/images/install_macOS/01c_cache_maintenance.png)

This Policy is scoped to a Smart Group of Macs that have an outdated version of macOS installed
![](/images/install_macOS/01d_cache_scope.png)

![](/images/install_macOS/02a_group_outdated.png)

The Install Policy has a custom trigger of `installSierra` which is executed by a script in the Update to macOS Sierra Policy (described below)
![](/images/install_macOS/03a_install_general.png)
![](/images/install_macOS/03b_install_package.png)
![](/images/install_macOS/03c_install_restart.png)
![](/images/install_macOS/03d_install_maintenance.png)
![](/images/install_macOS/03e_install_scope.png)

![](/images/install_macOS/04a_group_cache_before.png)
![](/images/install_macOS/04b_group_cache_select.png)
![](/images/install_macOS/04c_group_cache_after.png)

![](/images/install_macOS/05a_group_sierra_installed.png)

![](/images/install_macOS/06a_upgrade_general.png)
![](/images/install_macOS/06b_upgrade_scripts.png)
![](/images/install_macOS/06c_upgrade_scope_target.png)
![](/images/install_macOS/06d_upgrade_scope_exclusions.png)
![](/images/install_macOS/06e_upgrade_self_service.png)

![](/images/install_macOS/)



[1]:	https://derflounder.wordpress.com/2015/11/23/providing-os-x-upgrades-via-caspers-self-service/
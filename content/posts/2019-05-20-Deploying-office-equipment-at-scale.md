---
aliases:
  - /2019/05/20/Deploying-office-equipment-at-scale
date: "2019-05-20T00:00:00Z"
tags:
- Jamf
- AppConfig
- MDM
- iOS
- macOS
- Zoom
title: Automatic Configuration of Zoom Rooms on macOS & iOS
type: post
---

Towards the start of 2019, Culture Amp moved into a new and larger office in Melbourne. To ensure that all equipment deployed into the conference rooms around the office were working effectvively, we wiped all devices before redeploying them into the rooms. The last time I'd done this, while I could push out the Zoom apps to all Macs and iPads in the space, you would need to login to the Zoom Rooms app manually and then and select the room to associate the device with. Thankfully, Zoom [released support][1] for Managed App Config on iOS, and reading custom Configuration Profiles on macOS to remove the time-consuming step of logging in and configuring manually.

Utilising an Activation Code that is generated by Zoom when creating a new room (you can also regenerate this code if the room had been created prior), the first time Zoom Rooms launches on the device, the app will be automatically configured for that specific room and set to the correct type (iPad Controller or Room Scheduler).

In my case, I'm using Jamf for the deployment of my devices but all other MDM vendors should support Managed App Config (specific to iOS devices) and pushing custom Configuration Profiles out to Macs.

If you're interested and want to read on, below I'll take you through the following:

- How to setup Zoom Rooms and generate an Activation Code
- How to setup the required Extension Attributes in Jamf for deployment to devices
- How to use Jamf's Inventory Preload feature to upload data to EAs in bulk
- How to configure the Zoom Rooms app on iOS to deploy and auto-activate iPads
- How to configure the Zoom Rooms app on macOS to deploy and auto-activate Mac minis

---------------

## Setting up the resources in Zoom
Setting up rooms in the Zoom web portal is fairly easy and can either be created from linked calendars or by navigating the Zoom Room hierarchy to the specific office and clicking **+ Add Room**. From there you'll be prompted to enter a name for the room and given the option to link the room to a Calendar (optional). Once this room is created you'll see it in your list of rooms and an Activation Code will be present that you can use for auto-configuration.

You can find Zoom's support article on creating Zoom Rooms [here][2].

![Zoom Rooms Activation Code](/images/zoom_auto_config/zoom_1.png)

If you had previously created a room and can't see this activation code, you can click the **Regenerate** link.

![Zoom Rooms Activation Code](/images/zoom_auto_config/zoom_2.png)

## Setting up text Extension Attributes in Jamf to hold the activation data for Zoom
In order to push the Activation Code and Device Type down to your devices, you can use the following steps.

Due to how Jamf handles Payload Variables in custom configurations (more on this later), we'll be using the **Room** field under the **User & Location** section of the devices record to hold the Activation Code. Because the iPad version of Zoom Rooms allows configuration as either a controller or a scheduling display, we'll create a new EA called **iPad Type** to hold this information.

### iOS Devices
1. Login to Jamf
1. Navigate to **Settings**
1. Click on **Extension Attributes** under the **Device Management** section
![iOS EA 1](/images/zoom_auto_config/iOS_EA_1.png)
1. Click **+ New**
1. Enter the following information
    - DISPLAY NAME -> iPad Type
    - DATA TYPE -> String
    - INVENTORY DISPLAY -> This is up to you
    - INPUT TYPE -> Pop-up Menu
    - POP-UP MENU CHOICES ->
        - controller
        - scheduling display
    ![iOS EA 2](/images/zoom_auto_config/iOS_EA_2.png)
1. Click **Save**
1. You can now grab the ID from the URL of the EA (You'll need this later).
![iOS EA 3](/images/zoom_auto_config/iOS_EA_3.png)

## Using Inventory Preload in Jamf to stage information across your iOS/macOS devices
Now that we have the Activation Code from the Zoom portal and have created the EA required to store it and the iPad Type, we can generate a CSV that we'll upload to Jamf and preload our data.

As mentioned above we'll be using the Activation Code will link the iPad or Mac to the specific room first launch of the Zoom Rooms app, and iPad Type is used to define whether the iPad is a Scheduling Display or a Room Controller. When adding this information to your CSV file you'll want to enter either `scheduling display` or `controller` in the **EA iPad Type** column (note the lowercase words).

Once you've got the Serial Number for each device (Macs & iPads) we can start populating the CSV. If these devices haven't been enrolled before, this data will be staged with Jamf until they enrol for the first time. If they are already enrolled, you'll see this data appear in its record the next time it performs a Recon.

Here's a very small example of how your CSV should be setup to configure one Zoom Room with a Mac, and two iPads:


| Serial Number | Device Type   | Room                | EA iPad Type       |
| ------------- | ------------- | ------------------- | ------------------ |
| GG8YXXXXJ111  | Mobile Device | 1111-2222-3333-4444 | controller         |
| GG8YXXXXJ222  | Mobile Device | 1111-2222-3333-4444 | scheduling display |
| C07XXXXNJ333  | Computer      | 1111-2222-3333-4444 |                    |

>For any Inventory Preload with Jamf you'll need to define the Serial Number & Device Type at the very minimum but there are a wealth of other fields that you can preload with data ([You can view these here][3]). As you can see in the example above, I've prefixed the column header for iPad Type with ***EA***; This is so that Jamf knows to put this data in the EA we created earlier.

## Auto-configuring Zoom Rooms controller on macOS
In order to configure Zoom Rooms on the Mac mini to be signed in and associated with a room, we'll need to push down a Custom Profile. So that we don't need to craft a profile for each Mac that we're going to provision, we'll utilise Payload Variables ([which are documented here][4]). By using these variables in the profile, when it is pushed down to a given Mac, Jamf will replace that variable with the value from that device's record. In this case we're using the **Room** field to hold our Activation Codes so in the `plist`, we'll put in the variable `$ROOM`.

You can see an example of the profile that we'll be deploying below. In order to upload this to Jamf you'll want to do the following:

1. Save the below as a `plist` on your Mac
1. Generate a new `PayloadUUID` (an easy way to do this is to run `uuidgen` in the teminal)
1. In Jamf, navigate to **Computers**
1. Click on **Configuration Profiles**
1. Click **+ New**
1. Give your Profile a name
1. Click on **Custom Settings** in the sidebar, then click **Config**
    - Preference Domain -> `us.zoom.custom`
    - Upload the saved `plist`
    - Set your Scope
    - Click **Save**

Once the profile pushes down to the Mac, you'll see that the varible has been replaced with the contents of the EA for that Mac.

{{< highlight xml >}}
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>PayloadType</key>
        <string>us.zoom.custom</string>
        <key>PayloadVersion</key>
        <integer>1</integer>
        <key>PayloadIdentifier</key>
        <string>us.zoom.mdm.configure.custom</string>
        <key>PayloadUUID</key>
        <string>338F730B-176E-47CB-819F-A8F3B2008B88</string>
        <key>PayloadDisplayName</key>
        <string>Zoom Rooms ConfIFGURATION</string>
        <key>Configuration</key>
        <dict>
            <key>ActivationCode</key>
            <string>$ROOM</string>
        </dict>
    </dict>
</plist>
{{< / highlight >}}

![macOS Zoom Profile](/images/zoom_auto_config/macOS_profile.png)

## Auto-configuring Zoom Rooms controller on iOS
In order to configure the Zoom Rooms Controller on iOS, we're going to utilise [Managed App Config][5] which will deploy a configuration for Zoom Rooms when Jamf pushes the app down to the device. If you already push out Zoom Rooms to your fleet, you'll want to add the Zoom Rooms app a second time to your catalog of apps to configure with the following settings. You can then get creative with scoping so that the version with the App Config settings only deploys to devices where you've added the Activation Code and iPad Type fields.

Once you've added the Zoom Rooms app, you'll need to enter the following on the **App Configuration** page substituting `#` at the end of the variable `$EXTENSIONATTRIBUTE_#` with the ID of the EA you created for Mobile Devices earlier.

{{< highlight xml >}}
<dict>
    <key>WorkMode</key>
    <string>$EXTENSIONATTRIBUTE_#</string>
    <key>ActivationCode</key>
    <string>$ROOM</string>
</dict>
{{< / highlight >}}

## Summary
Thanks to Dan Jacobson @ Datadog for working out the required `PayloadIdentifier` for this to work on macOS with the Configuration Profile.

Hopefully this helps you get your Zoom Rooms up and running in a smooth and scaleable fashion. Let me know if anything doesn't work for you or if I've made a horrible error in the post 😂.

---
[1]: https://support.zoom.us/hc/en-us/articles/360021322672-Auto-Sign-in-for-Zoom-Rooms
[2]: https://support.zoom.us/hc/en-us/articles/202822279-Add-Zoom-Rooms-on-Web-Portal
[3]: https://docs.jamf.com/10.12.0/jamf-pro/administrator-guide/Inventory_Preload.html
[4]: https://docs.jamf.com/10.12.0/jamf-pro/administrator-guide/Computer_Configuration_Profiles.html
[5]: https://www.appconfig.org/
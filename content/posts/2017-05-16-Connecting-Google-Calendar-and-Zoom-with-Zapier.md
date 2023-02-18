---
aliases:
  - /2017/05/16/Connecting-Google-Calendar-and-Zoom-with-Zapier
comments: true
date: "2017-05-16T00:00:00Z"
tags:
- GCal
- Google Calendar
- Zapier
- Zoom
- Zoom.us
title: Connecting Gooogle Calendar & Zoom with Zapier
type: post
---

At [Culture Amp][1] I've setup all of our conference rooms as [Zoom Rooms][2]. In a nutshell, Zoom Rooms allow anyone to walk into a conference room and start a video conference without needing to bring their own computer.

On the backend, Zoom Rooms are connected with Google Calendar room resources for scheduling. This means that by booking a calendar appointment as normal, and simply inviting the specific room, anyone can easily book a confernce room with VC.

Inside the rooms is an iPad on the table which is used to start the meeting and control the room. This iPad shows a list of the booked meetings along with a button to start the selected meeting. In order for this iPad, the calendar invite needs one crucial piece of information, a link to a particular Zoom meeting.

90% of the time, this is populated into the calendar invite by the Zoom Chrome plugin but when a user forgets to do this or is using another browser, they usually forget. When this meeting is about to start, there is a mad rush to generate a link, manually input the Zoom Meeting ID, or just generate a link on the fly and invite the remote participants manually.

The other time that I run into this issue is when someone books a room from the iPad mini that is mounted outside each room. When someone books a room like this, the meeting will show on the resource's calendar, but as above, the Zoom Rooms iPad will not be able to start a meeting from this event on the list.

I wanted to find an automated way to populate Zoom links for these events booked into conference rooms that don't already include Zoom links, and I think I've found a pretty painless way to do just that.

---

The glue that holds this all together is [Zapier][3] (it's like IFTTT on steroids). I can't say enough how great Zapier is; It saves me so much time at work, the cost is definitely worth it. For us, it's a pretty easy sell as we already use it for a bunch of other automations within the business but plans start from as little as $0 per month. If you want to implement the same type of Zap (what Zapier call thier recipes/automations) as I'm showing here, you'll need to be on the $20pm plan which gves you the ability to make 3+ step Zaps.

Onto the Zap!

First up is the Trigger. I've selected to use custom values for my room resources but so long as the Calendar account you're syncing with Zaper has edit access to all of your room resources, they should auto-populate. The custom ID is simply the email address associated with the resource which you can get from the [G Suite Admin interface][4]

![Google Calendar Trigger](/images/Zapier-GCal-Zoom/1.png)

Then I filter out any calendar event that already has a Zoom meeting link in the description.

![Filter](/images/Zapier-GCal-Zoom/2.png)

Here I create a new meeting using the information that Zapier pulled from the initial trigger.

![Create Zoom Meeting](/images/Zapier-GCal-Zoom/3.png)

The last step is to edit the original calendar event which I do by pulling in the same calendar id and event id from the initial trigger. Zapier can't append to meeting descriptions so in order to add the link, you need to pull in the description from the event in step one, then insert the Zoom meeting link from step 3.

![Insert Zoom Meeting Link](/images/Zapier-GCal-Zoom/4.png)

Once your Zap is created, Zapier will monitor the calendar in question every 5 minutes for changes and run whenever a new event is created.

If you want this to work for multiple calendars, you will need to copy the Zap and insert the calendar resource email for each one you need to monitor.

If you run into any issues, let me know


---

[1]:	https://cultureamp.com
[2]:	https://zoom.us/zoomrooms
[3]:	https://zapier.com/app/explore
[4]:	https://admin.google.com/AdminHome#AppDetails:service=Calendar

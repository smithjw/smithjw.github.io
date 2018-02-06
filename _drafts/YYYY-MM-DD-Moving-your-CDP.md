---
title: "Moving Jamf CDP Regions"
tags: [Jamf, CDP, S3, AWS]
type: post
---

Create new S# bucket in desired region
copy across all content using ec2 instance for fast transfer
Reconfigure cloudfront
log into db using tool of choice (Sequel Pro)
Edit the `cloud_distribution_point` table
    - `directory` = new Bucket name
    - `cdn_url` = new cloudfront url


[Link][1]

![Image Alt Text](/images/image.name.png)

{% highlight bash %}

{% endhighlight %}

---

[1]:

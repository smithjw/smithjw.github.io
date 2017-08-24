---
title: "Using ElastiCache with Jamf Pro in Clustered Environments"
tags: [jamf, jss, elasticache, memcached, casper, clustered]
type: post
---

So the beta program for Jamf Pro 10 finally opened and I thought to myself "Why yes, I do want to play with the new shiny!". I set to work creating a clone of my Jamf database (hosted in [Amazon RDS][1]), and created a new [EC2][2] instance to run the beta on. Once I'd connected to the Jamf Pro web app, I ran into my first hurdle.

Because I had cloned my DB, Jamf thought I was still running a clustered environment and informed me that I needed to switch to `memcached`. The second hurdle was trying to get `memcached` functioning on the same EC2 instance as the Jamf Pro 10 beta. I did some Googling and realised that Amazon offers cache in the cloud service called [ElastiCache][3] offering Redis and `memcached` flavours which will suit my needs nicely as all my other Jamf infrastructure is in AWS already.

Below is a guide on how to setup a `memcached` cluster on ElastiCache and get it talking with Jamf Pro

![Image Alt Text](/images/ElastiCache1.png)
![Image Alt Text](/images/ElastiCache2.png)
![Image Alt Text](/images/ElastiCache3.png)
![Image Alt Text](/images/ElastiCache4.png)
![Image Alt Text](/images/ElastiCache5.png)
![Image Alt Text](/images/ElastiCache6.png)
![Image Alt Text](/images/ElastiCache7.png)
![Image Alt Text](/images/ElastiCache8.png)

---

[1]:	https://aws.amazon.com/rds/
[2]:  https://aws.amazon.com/ec2/
[3]:  https://aws.amazon.com/elasticache/

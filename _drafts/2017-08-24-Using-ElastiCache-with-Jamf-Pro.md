---
title: "Using ElastiCache with Jamf Pro in Clustered Environments"
tags: [jamf, jss, elasticache, memcached, casper, clustered]
type: post
---

So the beta program for Jamf Pro 10 finally opened and I thought to myself "Why yes, I do want to play with the new shiny!". I set to work creating a clone of my Jamf database (hosted in [Amazon RDS][1]), and created a new [EC2][2] instance to run the beta on. Once I'd connected to the Jamf Pro web app, I ran into my first hurdle.

Because I had cloned my DB, Jamf thought I was still running a clustered environment and informed me that I needed to switch to `memcached`. The second hurdle was trying to get `memcached` functioning on the same EC2 instance as the Jamf Pro 10 beta. I did some Googling and realised that Amazon offers cache in the cloud service called [ElastiCache][3] offering Redis and `memcached` flavours which will suit my needs nicely as all my other Jamf infrastructure is in AWS already.

Below is a guide on how to setup a `memcached` cluster on ElastiCache and get it talking with Jamf Pro

First we need to create a Security Group for our cluster to enable or Jamf Pro instances to talk to the ElastiCache cluster. Open up your EC2 dashboard and click on Security Groups in the list on the left, followed by the Create Security Group button.

![Image Alt Text](/images/ElastiCache1.png)

Now enter a name for your group, I used the creative name `jss-memcached`. Add an Inbound Custom TCP rule that allows traffic on port 11211 from your instances IP addresses. I've selected Anywhere in this example as I'm creating the cluster in a subnet group with only private subnets not accessible from the Internet.

![Image Alt Text](/images/ElastiCache2.png)

Head on over to the ElastiCache AWS service and click Get Started Now

![Image Alt Text](/images/ElastiCache3.png)

Select Memcached as the Cluster Engine and give your cluster a name

![Image Alt Text](/images/ElastiCache4.png)

By default, creating a cluster will provision a node with 13.5GB of memory, way too much for small instances. I've selected a `cache.t2.small` node for my testing.

![Image Alt Text](/images/ElastiCache5.png)

Scroll further down and expand the Advanced Memcached settings section

![Image Alt Text](/images/ElastiCache6.png)

You'll want to create a new Subnet Group, give it a name, and select several private subnets for your ElastiCache nodes to operate in.

![Image Alt Text](/images/ElastiCache7.png)

Select the `jss-memcached` Security Group we created earlier and click Create. Your Cluster will be created and we can grab the individual Endpoint addresses of our ElastiCache nodes.

![Image Alt Text](/images/ElastiCache8.png)

Click the Cluster's name to view more detail about it and copy each of the Nodes' Endpoint addresses.

![Image Alt Text](/images/ElastiCache9.png)
![Image Alt Text](/images/ElastiCache10.png)

Now let's configure Jamf Pro to use `memcached` rather than `ehcache`.

{% highlight bash %}
# Open cache.properties
sudo nano /path/to/Tomcat/ROOT/WEB-INF/classes/dal/cache.properties

# Change ehcache to memcached
# Be sure to remove DBAPPLIED_ from the start of the line
cache.type=memcached

# Open memcached.properties
sudo nano /path/to/Tomcat/ROOT/WEB-INF/classes/dal/memcached.properties

# Add the following lines substituting in your Endpoint addresses
# This will point Jamf at your newly created memcached nodes
memcached.endpoints[0]=endpoint.address.01.amazonaws.com:11211
memcached.endpoints[1]=endpoint.address.02.amazonaws.com:11211

# Restart Jamf Pro
sudo /etc/init.d/jamf.tomcat8 restart
{% endhighlight %}

After the restart Jamf Pro will now be using `memcached` on ElastiCache 🙌🏽. If you have any issues with this, please hit me up on the [MacAdmins.Org Slack team][4]; I'm @smithjw.
---

[1]:	https://aws.amazon.com/rds/
[2]:  https://aws.amazon.com/ec2/
[3]:  https://aws.amazon.com/elasticache/
[4]:  https://macadmins.herokuapp.com/

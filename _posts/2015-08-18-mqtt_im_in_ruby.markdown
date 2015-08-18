---
layout: post
title:  "How to build an IM client in ruby and MQTT"
date:   2015-08-18 17:50:54
categories: ruby, mqtt
---

What are we building today?


We are building a dead simple Instant messaging system with ruby and MQTT. It is only moderately complex than a 'hello, world!' app. It will help us to get a basic idea about how MQTT works and how it can be appropraited to make a messenger app.

Ingredients

1. Your Macbook

2. ruby-mqtt gem.

3. MQTT broker, we will be using mosquito mqtt broker.

4. ruby installed in your machine.

Steps

run brew install mosquito in your terminal.

create a directory named mqtt_im.

Navigate to mqtt_im in your terminal and type in the below command.

{% highlight lisp %}
gem install mqtt
{% endhighlight %}

Inside that directory create a file called Client1.rb and paste the content of the below gist in to it.

<script src="https://gist.github.com/dhaneshnm/9beadb285b38dbc8d18c.js"></script>

Inside the same directory create a file called Client1.rb and paste the content of the below gist in to it. Now change 'Client' in to 'Client2' and vice versa in that script. So that it publishes to the topic Client2 and subscribes from Client1.

In fresh terminal window run the below command,

{% highlight lisp %}
/usr/local/sbin/mosquitto -c /usr/local/etc/mosquitto/mosquitto.conf
{% endhighlight %}

Open another fresh terminal window and type in,

{% highlight lisp %}
 ruby Client1.rb
{% endhighlight %}

Open yet another fresh terminal and window type in,

{% highlight lisp %}
ruby Client2.rb
{% endhighlight %}


Now if you type some thing in the window where you ran Client1 that will show up in the window where you ran Client2 and vice-versa. In other words your ruby/mqtt IM system is ready.



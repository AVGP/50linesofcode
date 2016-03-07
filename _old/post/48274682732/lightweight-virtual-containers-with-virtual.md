{
  "title": "Lightweight virtual containers with virtual networking",
  "date": "2013-04-18 13:00:00 GMT"
}

---

#Lightweight virtual containers with virtual networking
#What and why?

Sometimes you want to have a quick &amp; cheap way of isolating a few processes in a lightweight, para-virtualized environment.

When full-blown virtualization, for instance with Xen or KVM, is just too much (or not suitable, because you're already running in a virtual environment) and process-level isolation (what for example [docker.io](http://www.docker.io/) provides) isn't enough, **[user mode linux](http://user-mode-linux.sourceforge.net/)** is for you.

# Example: 

## Multiple isolated build environments for Continuous Integration

One scenario is running integration tests between multiple components on a shared CI server (e.g. Jenkins).

Let's elaborate this scenario a little more:

Say, we have a Jenkins instance that is used to build multiple projects, say an API and a "frontend webapp" (I'll reference it as "Frontend" from now on).
The API can be build and tested independently, but that requires the installation of a bunch of libraries, gems and other fun things.

The Frontend is a little more complex: In addition to the need of its own dependencies (gems, libs, modules, ...) it also needs a running instance of the latest stable API and a running API also needs a database and other components (let's say a message queue).

The safest bet is to have every system under test (API stand-alone, Frontend instance + API instance + database + message queue) isolated, always freshly created when the tests start and torn down when done.

Our goal is to setup a virtual container in which we can build the API and another virtual container in which we will setup the database, the message queue, the API and a third one for the frontend, with a virtual network between the second and third container.

With user-mode linux you can achieve this goal pretty fast&amp;easily:

## Install user-mode-linux and the utilities needed:

    $ apt-get install wget user-mode-linux uml-utilities bridge-utils debootstrap realpath
    
## Setup a new machine

[You can use my create_machine script](https://gist.github.com/AVGP/5410903) which is based on [this article](http://eggdrop.ch/texts/uml/):

    $ wget https://gist.github.com/AVGP/5412047/raw/ee9057124fa32edbf5c427955cc0be4012015ec5/create_machine_switched.sh
    $ chmod +x create_machine_switched.sh
    $ ./create_machine_switched.sh

The script will ask you for a few things:
* The hostname of the container (we'll use "API-build", "API-run" and "Frontend")
* If you want SSH to be installed ("y" for our example)
* If you want to configure the network ("y" for our example)
* Couple of network settings. For this example we're using the following settings:
  * IP-Address: 10.10.10.2 for API-build, 10.10.10.3 for API-run, 10.10.10.4 for Frontend build
  * Network: 10.10.10.0
  * Broadcast: 10.10.10.255
  * Subnet: 255.255.255.0
  * Gateway: 10.10.10.1
* Root password for the container

## Setting up the host-side networking

Before starting the container, we need to set up the host and the network switching on the host machine.

First of all add the following to ```/etc/network/interfaces```:

        auto tap0
        iface tap0 inet static
                address 10.1.0.1
                netmask 255.255.255.0
                tunctl_user uml-net
Then edit ```/etc/default/uml-utilities``` by uncommenting the line with the ```UML_SWITCH_OPTIONS``` and, if needed, change it to look like this:

    UML_SWITCH_OPTIONS="-tap tap0"
Then stop the uml-utilities daemon, bring up ```tap0``` and start uml-utilities again:

    $ /etc/init.d/uml-utilities stop
    $ ifup tap0
    $ /etc/init.d/uml-utilities start
Afterwards, you can start the container by changing in their directories and execute ```./run```, preferably do this in a screen (or tmux) session:

## Start the containers

    $ cd API-run
    $ ./run
and the same for the other two machines.
You should be abled to login as root on all running instances and ping to the internet as well as to the other instances.

    root@API-run # ifconfig eth0
        eth0   Link encap:Ethernet  HWaddr d2:45:9b:1f:ba:c6
                  inet addr:10.10.10.3  Bcast:10.10.10.255  Mask:255.255.255.0
                  UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
                  RX packets:25 errors:0 dropped:0 overruns:0 frame:0
                  TX packets:43 errors:0 dropped:0 overruns:0 carrier:0
                  collisions:0 txqueuelen:1000
                  RX bytes:1092 (1.0 KiB)  TX bytes:2198 (2.1 KiB)
                  Interrupt:5
    root@API-run # ping -c1 10.10.10.4
    PING 10.10.10.4 (10.10.10.4) 56(84) bytes of data.
    64 bytes from 10.10.10.4: icmp_req=1 ttl=64 time=0.192 ms

    --- 10.10.10.4 ping statistics ---
    1 packets transmitted, 1 received, 0% packet loss, time 0ms
    rtt min/avg/max/mdev = 0.192/0.192/0.192/0.000 ms
 
##Setup the NAT on the host

For the containers to be abled to reach the internet, you need to enable masquerading and IP-Forwarding using these two commands:

    $ iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
    $ echo '1' &gt; /proc/sys/net/ipv4/ip_forward
   
Now you can setup all the applications inside the containers (you may use provisioners, such as [chef]() or [puppet]()) and enjoy your virtual testing environment and its virtual networking.

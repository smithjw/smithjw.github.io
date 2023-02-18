---
comments: true
date: "2022-06-18T00:00:00Z"
draft: true
image: /images/02_MacDevOps_JamesSmith.jpg
image_alt: Presentation SketchNotes
tags:
  - unifi
  - udm
  - udmpro
title: 'UDM Pro Shenannigans with Upgrades'
type: post
fediverse: 109811260017364964
---

podman is gone
on boot scripts gone

need to reinstall

Follow the guide in [unifi-utilities](https://github.com/unifi-utilities/) to get the on-boot-scripts installed again.

[Install command is here ](https://github.com/unifi-utilities/unifios-utilities/tree/main/on-boot-script#install)

Using [`UDM-Persistent-SSH-Keys`](https://github.com/fire1ce/UDM-Persistent-SSH-Keys) for SSH access

Threw error that it couldn't touch the files
```
touch: cannot touch '/data/ssh/authorized_keys /root/.ssh/authorized_keys': No such file or directory
chmod: cannot access '/data/ssh/authorized_keys /root/.ssh/authorized_keys': No such file or directory
```

Created manually...

```
touch /data/ssh/authorized_keys
touch /root/.ssh/authorized_keys

chmod 0644/data/ssh/authorized_keys
chmod 0644/root/.ssh/authorized_keys
```

Added public key into file
`echo "PUBLIC_KEY_HERE" >> /data/ssh/authorized_keys`

cron job
rsync -a ~/working/unifi/on_boot.d/25-add-cron-jobs.sh unifi:/data/on_boot.d/25-add-cron-jobs.sh

podman
https://github.com/unifi-utilities/unifios-utilities/tree/main/podman-install
Copy on_boot.d/00-podman.sh to /data/on_boot.d
Copy the contents of conf to /data/podman/conf
cd /data/on_boot.d
curl -O "https://raw.githubusercontent.com/unifi-utilities/unifios-utilities/main/podman-install/on_boot.d/00-podman.sh"

mkdir -p /data/podman/conf
cd /data/podman/conf
curl -O https://raw.githubusercontent.com/unifi-utilities/unifios-utilities/main/podman-install/conf/libpod.conf
curl -O https://raw.githubusercontent.com/unifi-utilities/unifios-utilities/main/podman-install/conf/policy.json
curl -O https://raw.githubusercontent.com/unifi-utilities/unifios-utilities/main/podman-install/conf/registries.conf
curl -O https://raw.githubusercontent.com/unifi-utilities/unifios-utilities/main/podman-install/conf/storage.conf

Copy cronjobs/update-podman to /data/cronjobs

curl -O https://raw.githubusercontent.com/unifi-utilities/unifios-utilities/main/podman-install/cronjobs/update-podman


Install
/data/on_boot.d/00-podman.sh --force
/data/on_boot.d/25-add-cron-jobs.sh


DNS settings
rsync -a ~/working/unifi/on_boot.d/10-dns.sh unifi:/data/on_boot.d/10-dns.sh


Now following [Run Pi-hole on your UDM](https://github.com/unifi-utilities/unifios-utilities/tree/main/run-pihole#run-pi-hole-on-your-udm)

1. Ignore this as `05-install-cni-plugins.sh` is handled by the remote install script
2. Copy custom 20-dnsipv6.conflist over to UDM Pro
   ```
   rsync -a ~/working/unifi/20-dnsipv6.conflist unifi:/data/podman/cni/20-dnsipv6.conflist
   chmod +x /data/podman/cni/20-dnsipv6.conflist
   mkdir -p /etc/cni/net.d
   cp /data/podman/cni/20-dnsipv6.conflist /etc/cni/net.d/dns.conflist
   ```


Copy pihole script
rsync -a ~/working/unifi/data/scripts/custom_pihole_dote.sh unifi:/data/scripts/custom_pihole_dote.sh


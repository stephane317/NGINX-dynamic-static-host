# POC-landing

The aims of this project is to deploye automatically, the whole landing page without to change configuration


deployement auto landing page



### GCP instance
User:
password:

### EC2 instance
User: 
password: 

# SSL OVH
docker-compose run --rm certbot certonly --register-unsafely-without-email --dns-ovh --dns-ovh-credentials /var/www/certbot/config/ovh.conf --dns-ovh-propagation-seconds 60 -d "unita.fr"

### Install env

# Tools
- git
- node & npm
- pm2
- docker
- docker-compose

# SSH Gitlab

# SSH new user

certbot certonly --dns-ovh --dns-ovh-credentials dns-config/ovh.conf --non-interactive --agree-tos --email stephane.nimer@hotmail.fr --debug-challenges -d nendi.tech -d *.nendi.tech --logs-dir ./log/  --config-dir certbot/config --logs-dir certbot/logs --work-dir certbot/work
check new user



<!-- make ssl-do-e-cotiz -->
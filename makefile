.PHONY: up
up:
	docker-compose build
	docker-compose up -d

.PHONY: down
down:
	docker-compose down -v --remove-orphans

.PHONY: restart
rs: down up

.PHONY: do-e-cotiz
ssl-do-e-cotiz: 
	certbot certonly \
  --dns-digitalocean \
  --dns-digitalocean-credentials ./dns-config/digital-ocean.conf \
  --dns-digitalocean-propagation-seconds 60 \
	--config-dir ./ssl \
	--work-dir ./test \
	--logs-dir ./log \
  -d *.e-cotiz.com

.PHONY: ovh-ssl-referiz
ssl-ovh-referiz: 
	certbot certonly \
  --dns-ovh \
  --dns-ovh-credentials ./dns-config/ovh-referiz.conf \
  --dns-ovh-propagation-seconds 60 \
	--config-dir ./ssl \
	--work-dir ./test \
	--logs-dir ./log \
  -d *.referiz.com


.PHONY: ovh-ssl-espacesdons
ssl-ovh-espacesdons: 
	certbot certonly \
  --dns-ovh \
  --dns-ovh-credentials ./dns-config/ovh-espacedons.conf \
  --dns-ovh-propagation-seconds 60 \
	--config-dir ./ssl \
	--work-dir ./test \
	--logs-dir ./log \
  -d *.espacedons.com



	
FROM certbot/certbot

COPY certbot-renew.sh /usr/local/bin/certbot-renew.sh
RUN chmod +x /usr/local/bin/certbot-renew.sh

ENTRYPOINT ["/usr/local/bin/certbot-renew.sh"]

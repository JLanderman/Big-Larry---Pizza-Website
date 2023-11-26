#!/bin/bash
# Will renew certificates when run on EC2
certbot renew --quiet
sudo nginx -s reload
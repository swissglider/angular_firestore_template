#!/bin/bash

# ng build --prod --output-path www --base-href /homeoverview/ --deploy-url /homeoverview/
# scp -r www/* root@192.168.90.1:/opt/iobroker/node_modules/iobroker.homeoverview/www/
# ssh -l root -t 192.168.90.1 'cd /opt/iobroker; iobroker upload homeoverview'

# # for local webserver
# ng build --prod --output-path www --base-href /
# scp -r www/* root@192.168.88.100:/var/www/html/


# for firebase
ng build --prod --output-path www --base-href / --aot
firebase deploy
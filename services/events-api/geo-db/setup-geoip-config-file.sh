#!/bin/bash
sed -i "s|YOUR_ACCOUNT_ID_HERE|$_MAXMIND_ACCOUNT_ID |g" ./GeoIP.conf
sed -i "s|YOUR_LICENSE_KEY_HERE|$_MAXMIND_LICENSE_KEY |g" ./GeoIP.conf

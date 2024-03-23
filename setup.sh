#!/bin/bash

# Update and Upgrade the System
sudo apt-get update && sudo apt-get upgrade -y

# Install Essentials
sudo apt-get install -y build-essential libssl-dev wget curl git

# Elasticsearch Installation
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list
sudo apt-get update && sudo apt-get install elasticsearch

# Ruby and Rails Installation
sudo apt-get install -y ruby-full
gem install rails

# PHP, Composer, Laravel Installation
sudo apt-get install -y php php-mbstring php-xml composer mysql-server
composer global require laravel/installer

# Node.js and Express Installation
sudo rm -f /etc/apt/sources.list.d/nodesource.list
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Python, Django, PostgreSQL Installation
sudo apt-get install -y python3 python3-pip postgresql postgresql-contrib
pip3 install django psycopg2 django-health-check pybreaker

# Reminder for Manual Steps
echo "Remember to manually add resilience patterns to your code."
echo "Elasticsearch, Ruby on Rails, PHP with Laravel, Node.js with Express, and Python with Django have been installed."
echo "Please configure Elasticsearch replicas, MySQL and PostgreSQL replication, and integrate the resilience patterns into your application as discussed."

[![!Presentation Build](https://github.com/jeremythuff/aggieaid/actions/workflows/build-test-client.yml/badge.svg)](https://github.com/jeremythuff/aggieaid/actions)

# aggieaid
Updated: 11/2/2022 2:05PM CST

![Aggie Aid Logo](https://github.com/jeremythuff/aggieaid/blob/ryan/AggieAidLogo.PNG)

## Purpose
Aggie Aid is a platform designed to connect Texas A&M University students with worthwhile volunteer oppertunities in the local Bryan/College Station area. Our team's overall goal is to encourage students to engage in one of Texas A&M core values: selfless service.

## Features
- Users will be able to create and manage accounts. Accounts will contain contact and sign-in information, as well as statistics based on the user's usage of the system
- Volunteers will be able to sign up for available events
- Organizers will be able to create events
- Emails will be sent as confirmations and feedback for various states

## Build Information
- Hosted on AWS ECS using Docker
- Built using mainly Java/Javascript
- Will use a 3 tier architecture on the public cloud
  - Presentation Layer will use React, will be supported by Nginx, and will consume a REST API
  - Business Logic Layer will be a Java Spring-Boot webapp. Will utilize JPA and Hibernate, and will have an embedded Tomcat server
  - Persistence Layer will use MariaDB and Galera clustering

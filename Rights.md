# Roles

## simple user and his own data

|                              | ****create**** | ****read**** | ****write**** | ****delete**** |
|------------------------------|:--------------:|:------------:|:-------------:|:--------------:|
| users                        | x              | x            |               |                |
| users:roles                  |                | x            |               |                |
| users:groups                 |                | x            |               |                |
| profiles                     | x              | x            |               |                |
| authGroup:groupsArray(entry) |                | x            |               |                |
| authRole:rolesArray(entry)   |                | x            |               |                |
| blacklist                    |                | x            |               |                |
| documents                    | x              | x            | x             | x              |
| documents:entry              |                | x            | x             |                |
| documents:owner              |                | x            |               |                |
| documents:groups             |                | x            |               |                |

## simple user and others users

| ****                         | ****create**** | ****read**** | ****write**** | ****delete**** |
|------------------------------|:--------------:|:------------:|:-------------:|:--------------:|
| users                        |                |              |               |                |
| users:roles                  |                |              |               |                |
| users:groups                 |                |              |               |                |
| profiles                     |                | x            |               |                |
| authGroup:groupsArray(entry) |                | x            |               |                |
| authRole:rolesArray(entry)   |                | x            |               |                |
| blacklist                    |                | x            |               |                |
| documents                    |                | x            |               |                |
| documents:entry              |                | x            |               |                |
| documents:owner              |                | x            |               |                |
| documents:groups             |                | x            |               |                |

## admin

|                              | ****create**** | ****read**** | ****write**** | ****delete**** |
|------------------------------|:--------------:|:------------:|:-------------:|:--------------:|
| user                         | x              | x            | x             | x              |
| users:roles                  |                | x            | x             |                |
| users:groups                 |                | x            | x             |                |
| profiles                     | x              | x            | x             | x              |
| authGroup:groupsArray(entry) |                | x            | x             |                |
| authRole:rolesArray(entry)   |                | x            | x             |                |
| blacklist                    |                | x            | x             |                |
| documents                    | x              | x            | x             | x              |
| documents:entry              |                | x            | x             |                |
| documents:owner              |                | x            | x             |                |
| documents:groups             |                | x            | x             |                |

## authWriter

|                                      | **create** | **read** | **write** | **delete** |
|--------------------------------------|:----------:|:--------:|:---------:|:----------:|
| users                                | x          | x        | x         | x          |
| users:roles                          |            | x        | x         |            |
| users:groups                         |            | x        | x         |            |
| ADMIN \- users                       |            | x        |           |            |
| ADMIN \- users:roles                 |            | x        |           |            |
| ADMIN \- users:groups                |            | x        |           |            |
| profiles                             | x          | x        | x         | x          |
| ADMIN \- profiles                    |            | x        |           |            |
| authGroup:groupsArray(entry)         | x          | x        | x         | x          |
| authRole:rolesArray(entry)           | x          | x        | x         |            |
| blacklist                            |            | x        | x         |            |
| blacklist \(add admin to Blacklist\) |            | x        |           |            |
| documents                            | x          | x        | x         | x          |
| documents:entry                      |            | x        | x         |            |
| documents:owner                      |            | x        | x         |            |
| documents:groups                     |            | x        | x         |            |

## authReader

|                                        | ****create**** | ****read**** | ****write**** | ****delete**** |
|----------------------------------------|:--------------:|:------------:|:-------------:|:--------------:|
| users                                  |                | x            |               |                |
| users:roles                            |                | x            |               |                |
| users:groups                           |                | x            |               |                |
| ADMIN \- users                         |                | x            |               |                |
| ADMIN \- users:roles                   |                | x            |               |                |
| ADMIN \- users:groups                  |                | x            |               |                |
| profiles                               |                | x            |               |                |
| ADMIN \- profiles                      |                | x            |               |                |
| authGroup:groupsArray(entry)           |                | x            |               |                |
| authRole:rolesArray(entry)             |                | x            |               |                |
| blacklist                              |                | x            |               |                |
| blacklist \(add admin to Blacklist\)   |                | x            |               |                |
| documents                              |                | x            |               |                |
| documents:entry                        |                | x            |               |                |
| documents:owner                        |                | x            |               |                |
| documents:groups                       |                | x            |               |                |

## documentsAdmin

|                              | ****create**** | ****read**** | ****write**** | ****delete**** |
|------------------------------|:--------------:|:------------:|:-------------:|:--------------:|
| users                        |                |              |               |                |
| users:roles                  |                |              |               |                |
| users:groups                 |                |              |               |                |
| profiles                     |                |              |               |                |
| authGroup:groupsArray(entry) |                | x            | x             |                |
| authRole:rolesArray(entry)   |                |              |               |                |
| blacklist                    |                |              |               |                |
| documents                    | x              | x            | x             | x              |
| documents:entry              |                | x            | x             |                |
| documents:owner              |                | x            | x             |                |
| documents:groups             |                | x            | x             |                |


## moderator

|                                | ****create**** | ****read**** | ****write**** | ****delete**** |
|--------------------------------|:--------------:|:------------:|:-------------:|:--------------:|
| users                          |                |              |               |                |
| users:roles                    |                |              |               |                |
| users:groups                   |                |              |               |                |
| profiles                       |                |              |               |                |
| authGroup:groupsArray\(entry\) |                | x            | x             |                |
| authRole:rolesArray\(entry\)   |                |              |               |                |
| blacklist                      |                |              |               |                |
| documents                      | x              | x            | x             | x              |
| documents:entry                |                | x            | x             |                |
| documents:owner                |                | x            |               |                |
| documents:groups               |                | x            | x             |                |


## editor

|                                | ****create**** | ****read**** | ****write**** | ****delete**** |
| ------------------------------ |:--------------:|:------------:|:-------------:|:--------------:|
| users                          |                |              |               |                |
| users:roles                    |                |              |               |                |
| users:groups                   |                |              |               |                |
| profiles                       |                |              |               |                |
| authGroup:groupsArray\(entry\) |                |              |               |                |
| authRole:rolesArray\(entry\)   |                |              |               |                |
| blacklist                      |                |              |               |                |
| documents                      | x              | x            | x             | x              |
| documents:entry                |                | x            | x             |                |
| documents:owner                |                | x            |               |                |
| documents:groups               |                | x            |               |                |

## Roles

### admin
|                       | ****create**** | ****read**** | ****write**** | ****delete**** |
|-----------------------|:--------------:|:------------:|:-------------:|:--------------:|
| user                  | x              | x            | x             | x              |
| users:roles           |                | x            | x             |                |
| users:groups          |                | x            | x             |                |
| profiles              | x              | x            | x             | x              |
| authGroup:groupsArray |                | x            | x             |                |
| authRole:rolesArray   |                | x            | x             |                |
| blacklist             |                | x            | x             |                |
| documents             | x              | x            | x             | x              |
| documents:entry       |                | x            | x             |                |
| documents:owner       |                | x            | x             |                |
| documents:groups      |                | x            | x             |                |



### authWriter

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
| authGroup:groupsArray                |            | x        | x         |            |
| authRole:rolesArray                  |            | x        | x         |            |
| blacklist                            |            | x        | x         |            |
| blacklist \(add admin to Blacklist\) |            | x        |           |            |
| documents                            | x          | x        | x         | x          |
| documents:entry                      |            | x        | x         |            |
| documents:owner                      |            | x        | x         |            |
| documents:groups                     |            | x        | x         |            |



### authReader


### documentsAdmin


### moderator


### editor
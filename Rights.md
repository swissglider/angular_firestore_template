## Roles

### admin

|                       | create | read | write | delete |
|-----------------------|--------|------|-------|--------|
| user                  | x      | x    | x     | x      |
| users:roles           |        | x    | x     |        |
| users:groups          |        | x    | x     |        |
| profiles              | x      | x    | x     | x      |
| authGroup:groupsArray |        | x    | x     |        |
| authRolerolesArray    |        | x    | x     |        |
| blacklist             |        | x    | x     |        |
| documents             | x      | x    | x     | x      |
| documents:entry       |        | x    | x     |        |
| documents:owner       |        | x    | x     |        |
| documents:groups      |        | x    | x     |        |


### authWriter

|                       | create |      | read | write | delete |
|-----------------------|--------|------|------|-------|--------|
|                       | admin  | rest |      |       |        |
|-----------------------|--------|------|------|-------|--------|
| user                  | x      |      | x    | x     | x      |
| users:roles           |        |      | x    | x     |        |
| users:groups          |        |      | x    | x     |        |
| profiles              | x      |      | x    | x     | x      |
| authGroup:groupsArray |        |      | x    | x     |        |
| authRolerolesArray    |        |      | x    | x     |        |
| blacklist             |        |      | x    | x     |        |
| documents             | x      |      | x    | x     | x      |
| documents:entry       |        |      | x    | x     |        |
| documents:owner       |        |      | x    | x     |        |
| documents:groups      |        |      | x    | x     |        |


### authReader


### documentsAdmin


### moderator


### editor
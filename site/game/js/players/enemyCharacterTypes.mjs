
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { EnemyCharacterSwarmer } from "./enemyCharacterSwarmer.mjs";
import { EnemyCharacterDefault } from "./enemyCharacterDefault.mjs";
import { EnemyCharacterWaver } from "./enemyCharacterWaver.mjs";
import { EnemyCharacterSpiker } from "./enemyCharacterSpiker.mjs";



export var EnemyCharacterTypes = [
    function (scope,x,y) { return new EnemyCharacter(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterDefault(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterSwarmer(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterWaver(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterSpiker(scope,x,y)},
]
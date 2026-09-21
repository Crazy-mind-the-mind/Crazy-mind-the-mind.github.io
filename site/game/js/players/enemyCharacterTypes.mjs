
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { EnemyCharacterSwarmer } from "./enemyCharacterSwarmer.mjs";
import { EnemyCharacterDefault } from "./enemyCharacterDefault.mjs";



export var EnemyCharacterTypes = [
    function (scope,x,y) { return new EnemyCharacter(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterDefault(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterSwarmer(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterSwarmer(scope,x,y)},
]
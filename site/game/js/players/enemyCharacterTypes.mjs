
import { EnemyCharacter } from "./enemyCharacter.mjs";
import { EnemyCharacterSwarmer } from "./enemyCharacterSwarmer.mjs";
import { EnemyCharacterDefault } from "./enemyCharacterDefault.mjs";
import { EnemyCharacterWaver } from "./enemyCharacterWaver.mjs";
import { EnemyCharacterSpiker } from "./enemyCharacterSpiker.mjs";
import { EnemyCharacterTanker } from "./enemyCharacterTanker.mjs";
import { EnemyCharacterSplitter } from "./enemyCharacterSplitter.mjs";



export const EnemyCharacterTypes = [
    function (scope,x,y) { return new EnemyCharacter(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterDefault(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterSwarmer(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterWaver(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterSpiker(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterTanker(scope,x,y)},
    function (scope,x,y) { return new EnemyCharacterSplitter(scope,x,y)},
]

export const EnemyCharacterTypesNames={
    "EnemyCharacter":0,
    "EnemyCharacterDefault":1,
    "EnemyCharacterSwarmer":2,
    "EnemyCharacterWaver":3,
    "EnemyCharacterSpiker":4,
    "EnemyCharacterTanker":5,
    "EnemyCharacterSplitter":6
}
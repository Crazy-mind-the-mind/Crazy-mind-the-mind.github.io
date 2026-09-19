import { Projectile } from "./projectile.mjs";
import { ProjectilePellet } from "./projectilePellet.mjs";
import { ProjectileSlugShot } from "./projectileSlugShot.mjs";
import { ProjectileWaverPellet } from "./projectileWaverPellet.mjs";



export var ProjectileTypes = [
	function (scope,x,y) {return new Projectile(scope,x,y)},
	function (scope,x,y) {return new ProjectilePellet(scope,x,y)},
	function (scope,x,y) {return new ProjectileWaverPellet(scope,x,y)},
	function (scope,x,y) {return new ProjectileSlugShot(scope,x,y)},
];
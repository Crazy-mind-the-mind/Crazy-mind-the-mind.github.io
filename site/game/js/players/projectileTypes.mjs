import { Projectile } from "./projectile.mjs";


import { ProjectilePellet } from "./projectilePellet.mjs";
import { ProjectileRocket } from "./projectileRocket.mjs";
import { ProjectileSlugShot } from "./projectileSlugShot.mjs";
import { ProjectileWaverPellet } from "./projectileWaverPellet.mjs";



export const ProjectileTypes = [
	function (scope,x,y) {return new Projectile(scope,x,y)},
	function (scope,x,y) {return new ProjectilePellet(scope,x,y)},
	function (scope,x,y) {return new ProjectileWaverPellet(scope,x,y)},
	function (scope,x,y) {return new ProjectileSlugShot(scope,x,y)},
	function (scope,x,y) {return new ProjectileRocket(scope,x,y)},
];
export const ProjectileTypesNames = {
	"Projectile":0,	
	"ProjectilePellet":1,	
	"ProjectileWaverPellet":2,	
	"ProjectileSlugShot":3,	
	"ProjectileRocket":4,	
};
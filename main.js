
var spawnManager = require("spawn_manager");
var roleHarvester = require("creep.harvester");
var roleUpgrader = require("creep.upgrader");
var roleBuilder = require("creep.builder");

module.exports.loop = function()
{
	spawnManager.run(Game.spawns["Home"]);

	for(let idx in Game.creeps)
	{
		var creep = Game.creeps[idx];
		switch(creep.memory.role)
		{
			case "builder":
			{
				roleBuilder.run(creep);
			}
			break;
			
			case "upgrader":
			{
				roleUpgrader.run(creep);
			}
			break;

			case "harvester":
			{
				roleHarvester.run(creep);
			}
			break;
		}
	}
}

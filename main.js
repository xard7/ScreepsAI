
require("prototypes")();

var spawnManager = require("spawn_manager");
var roleHarvester = require("creep.harvester");
var roleUpgrader = require("creep.upgrader");
var roleBuilder = require("creep.builder");
var rolePorter = require("creep.porter");

module.exports.loop = function()
{
	//memory cleanup
    for (let idx in Memory.creeps)
    {
        if (Game.creeps[idx] == undefined)
        {
            delete Memory.creeps[idx];
        }
	}


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

			case "porter":
			{
				rolePorter.run(creep);
			}
			break;
		}
	}
}

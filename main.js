require("prototypes")();
var Utility = require("utility");

var spawnManager = require("spawn_manager");
var roleHarvester = require("creep.harvester");
var roleUpgrader = require("creep.upgrader");
var roleEngineer = require("creep.engineer");
var roleBuilder = require("creep.builder");
var rolePorter = require("creep.porter");
var roleTower = require("structure.tower");
var roleLink = require("structure.link");

module.exports.loop = function()
{
    Utility.executeMemoryStuff();

    var Spawn = Game.spawns["Home"];
	spawnManager.run[Spawn.room.controller.level - 1](Spawn);
	    
	for(let towerId in Memory.Towers)
	{
	    let tower = Game.getObjectById(towerId);
	    roleTower.run(tower);
	}
	    
	for(let linkId in Memory.Links)
	{
	    let link = Game.getObjectById(linkId);
        roleLink.run(link);
	}

	for(let idx in Game.creeps)
	{
		var creep = Game.creeps[idx];

		if(Utility.getNumberOfHarvesters() == 0)
		{
			roleHarvester.run(creep);
		}
		else
		{
			switch(creep.memory.role)
			{
				case "harvester":
				{
					roleHarvester.run(creep);
				}
				break;
				
				case "upgrader":
				{
					roleUpgrader.run(creep);
				}
				break;

				case "engineer":
				{
					roleEngineer.run(creep);
				}
				break;
				
				case "builder":
				{
					roleBuilder.run(creep);
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
}

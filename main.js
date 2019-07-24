const CONST = require("consts");

require("prototypes")();
const Utility = require("utility");

const spawnManager = require("spawn_manager");
const roleCreep = require("behaviors");

const roleHarvester = require("creep.harvester");
const roleUpgrader = require("creep.upgrader");
const roleEngineer = require("creep.engineer");
const roleBuilder = require("creep.builder");
const rolePorter = require("creep.porter");
const roleTower = require("structure.tower");
const roleLink = require("structure.link");

module.exports.loop = function()
{
    Utility.executeMemoryStuff();

    const Spawner = Game.spawns["Home"];
	const spawnFuncs = spawnManager.run[Spawner.room.controller.level - 1];
	for(let i = 0; i < spawnFuncs.length; i++)
	{
		if(spawnFuncs[i].func(Spawner, spawnFuncs[i].minimalNumberOfCreeps))
		{
			break;
		}
	}
	    
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
		let creep = Game.creeps[idx];

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

				case "universal":
				{

				}
				break;
			}
		}
	}
}

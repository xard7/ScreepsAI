const CONST = require("consts");

require("prototypes")();
const Utility = require("utility");

const spawnManager = require("spawn_manager");
const roleCreep = require("creep.universal");

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

    //console.log("ENERGY CAPACITY: " + Game.rooms["E3S24"].energyCapacityAvailable + " ENERGY AVAILABLE: " + Game.rooms["E3S24"].energyAvailable);

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
					const testWeights = 
					{
						"goto_source": 10.0,
					    "harvest": 10.0,

					    "goto_drop": 0.5,
					    "pickup_drop": 0.0,

					    "goto_extension": 0.3,
					    "goto_cargo": 0.4,
					    "goto_controller": 10.6,
					    "transfer": 0.0,

					    "goto_flag": 0.0,
					};

					roleCreep.run(creep, testWeights);
				}
				break;
			}
		}
	}
}

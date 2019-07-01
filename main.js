
require("prototypes")();
var Utility = require("utility");

var spawnManager = require("spawn_manager");
var roleHarvester = require("creep.harvester");
var roleUpgrader = require("creep.upgrader");
var roleBuilder = require("creep.builder");
var rolePorter = require("creep.porter");
var roleEngineer = require("creep.engineer");

module.exports.loop = function()
{
	//if(Memory.Sources != undefined) delete Memory.Sources;
	if(Memory.Sources == undefined)
	{
    	Memory.Sources = {};

		var room = Game.spawns["Home"].room;
		var Sources = room.find(FIND_SOURCES);
		for(let source of Sources)
		{
			Memory.Sources[source.id] = 
			{
				availableFields: Utility.getNumberOfAvailableFields(source.pos),
				harvesters: {},
			};
		}
	}

	//memory cleanup
	{
	    for (let idx in Memory.creeps)
	    {
	        if (Game.creeps[idx] == undefined)
	        {
	            delete Memory.creeps[idx];
	        }
		}
	    for (let idx in Memory.Sources)
	    {
	    	for(let hName in Memory.Sources[idx].harvesters)
	    	{
		        if (Game.creeps[hName] == undefined)
		        {
		            delete Memory.Sources[idx].harvesters[hName];
		        }
	    	}
		}
	}

    var Spawn = Game.spawns["Home"];
	spawnManager.run[Spawn.room.controller.level - 1](Spawn);

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

				case "engineer":
				{
					roleEngineer.run(creep);
				}
				break;
			}
		}
	}
}

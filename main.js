
require("prototypes")();

var spawnManager = require("spawn_manager");
var roleHarvester = require("creep.harvester");
var roleUpgrader = require("creep.upgrader");
var roleBuilder = require("creep.builder");
var rolePorter = require("creep.porter");
var roleEngineer = require("creep.engineer");
var Utility = require("utility");

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

			case "engineer":
			{
				roleEngineer.run(creep);
			}
			break;
		}
	}
}

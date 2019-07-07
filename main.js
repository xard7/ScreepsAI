
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
	
	//if(Memory.Links != undefined) delete Memory.Links;
	if(Memory.Links == undefined)
	{
	    Memory.Links = {};
	    var room = Game.spawns["Home"].room;
	    var links = room.find(FIND_MY_STRUCTURES,
    	    {
    	        filter:
    	        {
    	            structureType: STRUCTURE_LINK
    	        }
    	    });
    	for(let link of links)
    	{
    	    let cargo = link.pos.findInRange(FIND_MY_STRUCTURES, 3,
    	        {
    	            filter:
    	            {
    	                structureType: STRUCTURE_STORAGE
    	            }
    	        });
    	    if(Object.keys(cargo).length != 0)
    	    {
    	        Memory.Links[link.id] = true;
    	    }
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
	
	var structs = Spawn.room.find( FIND_MY_STRUCTURES,
	    {
	        filter: function(s)
	        {
	            return s.structureType == STRUCTURE_TOWER || s.structureType == STRUCTURE_LINK;
	        }
	    });
	    
	for(let struct of structs)
	{
	    switch(struct.structureType)
	    {
	        case STRUCTURE_TOWER:
            {
        	    roleTower.run(struct);
            }
	        break;
	        
	        case STRUCTURE_LINK:
            {
                roleLink.run(struct);
            }
	        break;
	    }
	    
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

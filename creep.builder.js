var Utility = require("utility");

module.exports =
{
	run: function(creep)
	{
		if(!creep.memory.bussy)
		{
		    if(!Utility.pickupEnergy(creep, 7))
		    {
		    	var storage = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
		    		{
		    			filter: function(s)
		    			{
		    				return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] != 0;
		    			}
		    		});
		    	if(storage)
		    	{
					if(creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    				{
    					creep.moveTo(storage);
    				}
		    	}
		    	else
		    	{
	    			var source = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
	    			if(source.energy > 100)
	    			{
	    				if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
	    				{
	    					creep.moveTo(source);
	    				}
	    			}
	    			else
	    			{
	    				source = creep.pos.findClosestByPath(FIND_SOURCES);
	    				if(creep.harvest(source) == ERR_NOT_IN_RANGE)
	    				{
	    					creep.moveTo(source);
	    				}
	    			}
	    		}
		    }

			var carry = _.sum(creep.carry);
			if(carry == creep.carryCapacity)
			{
				creep.memory.bussy = true;
			}
		}
		else
		{
		    var isRepairing = false;
		    var constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES,
				{
					filter: function(s)
					{
						return s.structureType == STRUCTURE_EXTENSION;
					}
				});
				
			if(!constructionSite)
			{
				constructionSite = creep.pos.findClosestByPath(FIND_STRUCTURES,
				    {
				        filter: function(s)
        				{
					    const terrain = Game.rooms[s.pos.roomName].getTerrain();
        					return s.hits < s.hitsMax  && creep.memory.role == "builder";
        				}
				        
				    });
				isRepairing = true;
			}
			
			if(!constructionSite)
			{
				constructionSite = creep.pos.findClosestByPath(FIND_MY_CONSTRUCTION_SITES);
				isRepairing = false;
			}

			if(constructionSite)
			{
			    var r = OK;
			    if(isRepairing)
			    {
			        r = creep.repair(constructionSite);
			    }
			    else
			    {
			        r = creep.build(constructionSite);
			    }
			    
				switch(r)
				{
					case ERR_NOT_IN_RANGE:
					{
						creep.moveTo(constructionSite);
					}
					break;

					case ERR_NOT_ENOUGH_RESOURCES:
					{
						creep.memory.bussy = false;
					}
					break;
				}
			}
			else
			{
				require("creep.upgrader").run(creep);
			}
		}
	},
};
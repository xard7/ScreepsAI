module.exports = 
{
	getNumberOfAvailableFields: function(pos)
	{
		const terrain = Game.rooms[pos.roomName].getTerrain();
		var num = 0;
		for(let x = (pos.x - 1); x <= (pos.x + 1); x++)
		{
			for(let y = (pos.y - 1); y <= (pos.y + 1); y++)
			{
				if(terrain.get(x, y) != TERRAIN_MASK_WALL)
				{
					num ++;
				}
			}
		}

		return num;
	},
	
	getNeighborFields: function(pos)
	{
	    const terrain = Game.rooms[pos.roomName].getTerrain();
	    var retArray = [];
		for(let _x = (pos.x - 1); _x <= (pos.x + 1); _x++)
		{
			for(let _y = (pos.y - 1); _y <= (pos.y + 1); _y++)
			{
				if(terrain.get(_x, _y) != TERRAIN_MASK_WALL)
				{
					if(_x != pos.x || _y != pos.y)
					{
					    retArray.push({x: _x, y: _y});
					}
				}
			}
		}
		
		return retArray;
	},
	
	getNumberOfHarvesters: function()
	{
		return _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	},
	
	getDestForEnergy: function()
	{
		
	},
	
	pickupEnergy: function(creep, range)
	{
	    var droppedSource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
            {
    	        filter: function(resource)
    			{
    				return creep.pos.inRangeTo(resource, range);
    			}
    		});
        if(droppedSource)
        {
    	    if(creep.pickup(droppedSource) == ERR_NOT_IN_RANGE)
    		{
    			creep.moveTo(droppedSource);
    			return true;
    		}
        }
        else
        {
	        return false;
        }
	},
	
	executeMemoryStuff : function()
	{
	    var Spawn = Game.spawns["Home"];
	    
    	if(Memory.Links_tmp == undefined)
    	{
    	    Memory.Links_tmp = {};
    	    var links = Spawn.room.find(FIND_MY_STRUCTURES,
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
        	        Memory.Links_tmp[link.id] = true;
        	    }
        	}
    	}
    	
    	if(Memory.Sources == undefined)
    	{
        	Memory.Sources = {};
    		var Sources = Spawn.room.find(FIND_SOURCES);
    		for(let source of Sources)
    		{
    			Memory.Sources[source.id] = 
    			{
    				availableFields: Utility.getNumberOfAvailableFields(source.pos),
    				harvesters: {},
    			};
    		}
    	}
    	
    	if(Memory.Towers == undefined)
    	{
    	    Memory.Towers = {};
    	    var towers = Spawn.room.find(FIND_MY_STRUCTURES,
        	    {
        	        filter:
        	        {
        	            structureType: STRUCTURE_TOWER
        	        }
        	    });
            for(let tower of towers)
            {
                Memory.Towers[tower.id] = true;
            }
    	}
    	
    	if(Memory.Links == undefined)
    	{
    	    Memory.Links = {};
    	    var links = Spawn.room.find(FIND_MY_STRUCTURES,
        	    {
        	        filter:
        	        {
        	            structureType: STRUCTURE_LINK
        	        }
        	    });
        	    
        	for(let link of links)
        	{
        	    Memory.Links[link.id] = true;
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
    	
    	//if(Memory.Links_tmp != undefined) delete Memory.Links_tmp;
	    //if(Memory.Sources != undefined) delete Memory.Sources;
    	//if(Memory.Towers != undefined) delete Memory.Towers;
    	//if(Memory.Links != undefined) delete Memory.Links;
	},
};
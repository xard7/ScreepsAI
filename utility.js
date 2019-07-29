module.exports = 
{
    printDebug: function(data, header = "")
    {
        let reFunc = function(d, level)
            {
                let tabs = "";
                for(let i = 0; i < level; i++)
                {
                    tabs += "   ";
                }

                if(typeof(d) == "object")
                {
                    for(let c in d)
                    {
                        if(typeof(d[c]) == "object")
                        {
                            console.log(tabs + c + ":");
                            reFunc(d[c], level + 1);
                        }
                        else
                        {
                            console.log(tabs + c + ": " + d[c]);
                        }
                    }
                }
                else
                {
                    console.log(tabs + header + ": " + d);
                }
            };

        console.log("Print Debug");
        reFunc(data, 1, reFunc);
    },

	getNumberOfAvailableFields: function(pos)
	{
		const terrain = Game.rooms[pos.roomName].getTerrain();
		let num = 0;
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
	    let retArray = [];
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
	    const droppedSource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
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
	    const Spawner = Game.spawns["Home"];
	    
    	if(Memory.Links_tmp == undefined)
    	{
    	    Memory.Links_tmp = {};
    	    const links = Spawner.room.find(FIND_MY_STRUCTURES,
        	    {
        	        filter:
        	        {
        	            structureType: STRUCTURE_LINK
        	        }
        	    });
        	for(let link of links)
        	{
        	    const cargo = link.pos.findInRange(FIND_MY_STRUCTURES, 3,
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
    		const Sources = Spawner.room.find(FIND_SOURCES);
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
    	    const towers = Spawner.room.find(FIND_MY_STRUCTURES,
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
    	    const links = Spawner.room.find(FIND_MY_STRUCTURES,
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

        if(Memory.Rooms == undefined)
        {
            Memory.Rooms = 
            {
                "E3S24":
                {
                    Sources: {},
                    ThinkingIds: {},
                },

                "E4S24":
                {
                    Sources: {},
                    ThinkingIds: {},
                }
            };

            for(let roomName in Memory.Rooms)
            {
                if(Game.rooms[roomName] == undefined)
                {
                    continue;
                }

                const Sources = Game.rooms[roomName].find(FIND_SOURCES);
                for(let source of Sources)
                {
                    let getNumberOfAvailableFieldsFunc = function(pos)
                        {
                            const terrain = Game.rooms[pos.roomName].getTerrain();
                            let num = 0;
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
                        };

                    Memory.Rooms[roomName].Sources[source.id] = 
                    {
                        availableFields: getNumberOfAvailableFieldsFunc(source.pos),
                        harvesters: {},
                    };
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
            for(let roomName in Memory.Rooms)
            {
                let Sources = Memory.Rooms[roomName].Sources;
                for (let idx in Sources)
                {
                    for(let hName in Memory.Rooms[roomName].Sources[idx].harvesters)
                    {
                        if (Game.creeps[hName] == undefined)
                        {
                            delete Memory.Rooms[roomName].Sources[idx].harvesters[hName];
                        }
                    }
                }
            }
    	}
    	
    	//if(Memory.Links_tmp != undefined) delete Memory.Links_tmp;
	    //if(Memory.Sources != undefined) delete Memory.Sources;
    	//if(Memory.Towers != undefined) delete Memory.Towers;
    	//if(Memory.Links != undefined) delete Memory.Links;
        //if(Memory.Rooms != undefined) delete Memory.Rooms;
	},
};
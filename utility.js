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
	}
};
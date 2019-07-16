/***************************************************************

creep.memory = 
{
	behaviorState 		: bState;
	currentPath 		: path;
	behaviorWeight 		: number;
}

****************************************************************/

const bState =
{
	IDLE 		= 0,
	PICKUP_DROP	= 2,
	GOTO_DROP	= 1,
};

const dropCheck = 
{
	NONE 		= 0,
	TOMBSTONE 	= 1,
	RESOURCE	= 2,
};

module.exports =
{
	checkDrop: function(creep)
	{
		var tombstone = creep.pos.findClosestByRange(FIND_TOMBSTONES,
            {
    	        filter: function(t)
    			{
    				let path = creep.pos.findPathTo(t);
    				return (path.length * 1.3 < t.tickToDecay);
    			}
    		});
		if(tombstone)
		{
			return {type: dropCheck.TOMBSTONE, id: tombstone.id};
		}
		else
		{
			var droppedResource = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
            {
    	        filter: function(r)
    			{
    				let path = creep.pos.findPathTo(r);
    				return (path.length * 1.3 < r.amount);
    			}
    		});

	        if(droppedResource)
	        {
	    	    return {type: dropCheck.RESOURCE, id : droppedResource.id};
	        }
	    }

	    return {type: dropCheck.NONE, id: -1};
	},

	getAndSavePath: function(creep, target)
	{
		var path = creep.pos.findPathTo(target, {serialize: true});
		if(path.length)
		{
			creep.memory.currentPath = path;
			return true;
		}
		return false;
	}
};
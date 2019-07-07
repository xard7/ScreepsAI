module.exports =
{
	run: function(creep)
	{
		if(!creep.memory.bussy)
		{
		    if(!Utility.pickupEnergy(creep, 7))
		    {
    			var cargo = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
    			    {
    			        filter: function(s)
    			        {
    			            return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] != 0;
    			        }
    			    });
    			    
    			if(creep.withdraw(cargo, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
    			{
    				creep.moveTo(cargo);
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
    		var dest = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, 
    			{
    				filter: function(s)
    				{
    				    var extensions = s.structureType == STRUCTURE_EXTENSION && s.energy < s.energyCapacity;
    					var towers = s.structureType == STRUCTURE_TOWER && s.energy < s.energyCapacity;
    					var links = s.structureType == STRUCTURE_LINK && s.energy < s.energyCapacity;
    				    
    					return extensions || towers || links;
    				}
    			});
			
		    if(dest)
	        {
    			switch(creep.transfer(dest, RESOURCE_ENERGY))
    			{
    				case ERR_NOT_IN_RANGE:
    				{
    					creep.moveTo(dest);
    				}
    				break;
    
    				case ERR_NOT_ENOUGH_RESOURCES:
    				{
    					creep.memory.bussy = false;
    				}
    				break;
    			}
		    }
		}
	},
};
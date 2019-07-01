module.exports =
{
	run: function(creep)
	{
		if(!creep.memory.bussy)
		{
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
			if(creep.memory.source != undefined && creep.memory.role == "harvester")
			{
				source = Game.getObjectById(creep.memory.source);
				Memory.Sources[creep.memory.source].harvesters[creep.name] = true;
			}
			
			if(creep.harvest(source) == ERR_NOT_IN_RANGE)
			{
				creep.moveTo(source);
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
    					return s.structureType == STRUCTURE_EXTENSION && s.energyCapacity - s.energy > 0;
    				}
    			});
    			
			if(!dest)
			{
			    dest = Game.spawns["Home"];
			}
			
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
	},
};
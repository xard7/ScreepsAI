module.exports =
{
	run: function(creep)
	{
		if(!creep.memory.bussy)
		{
			let dest = Game.spawns["Home"];
			if(dest.energy == dest.energyCapacity)
			{
				if(creep.withdraw(dest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
				{
					creep.moveTo(dest);
				}
			}
			else
			{
				dest = creep.pos.findClosestByPath(FIND_MY_STRUCTURES,
					{
						filter: function(s)
        				{
        				    const cargo = s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0;
        					const links = s.structureType == STRUCTURE_LINK && s.energy > 0;
        				    
        					return cargo || links;
        				}
					});
				if(dest)
				{
					if(creep.withdraw(dest, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
					{
						creep.moveTo(dest);
					}
				}
				else
				{
					dest = creep.pos.findClosestByPath(FIND_SOURCES);
					if(creep.harvest(dest) == ERR_NOT_IN_RANGE)
					{
						creep.moveTo(dest);
					}
				}
			}

			const carry = _.sum(creep.carry);
			if(carry == creep.carryCapacity)
			{
				creep.memory.bussy = true;
			}
		}
		else
		{
			if(creep.room.controller)
			{
				switch(creep.upgradeController(creep.room.controller))
				{
					case ERR_NOT_IN_RANGE:
					{
						creep.moveTo(creep.room.controller);
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
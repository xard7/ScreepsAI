module.exports =
{
	run: function(creep)
	{
		if(!creep.memory.bussy)
		{
			var source = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
			if(source.energy == source.energyCapacity)
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

			var carry = _.sum(creep.carry);
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
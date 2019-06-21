module.exports =
{
	run: function(creep)
	{
		if(!creep.memory.bussy)
		{
			var source = creep.pos.findClosestByPath(FIND_SOURCES);
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
			var Home = Game.spawns["Home"];
			switch(creep.transfer(Home, RESOURCE_ENERGY))
			{
				case ERR_NOT_IN_RANGE:
				{
					creep.moveTo(Home);
				}
				break;

				case ERR_NOT_ENOUGH_RESOURCES:
				{
					creep.memory.bussy = false;
				}
				break;

				/*default:
				{
					if(Home.energy == Home.energyCapacity)
					{
						//creep.drop(RESOURCE_ENERGY);
					}
				}*/
			}
		}
	},
};
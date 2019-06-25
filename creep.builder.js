module.exports =
{
	run: function(creep)
	{
		if(!creep.memory.bussy)
		{
			var source = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
			if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
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
			var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,
				{
					filter: function(s)
					{
						return s.structureType == STRUCTURE_EXTENSION;
					}
				});

			if(!constructionSite)
			{
				constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
			}

			if(constructionSite)
			{
				switch(creep.build(constructionSite))
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
				require("creep.porter").run(creep);
			}
		}
	},
};
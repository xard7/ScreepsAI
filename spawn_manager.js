module.exports =
{	
	run: function(Spawner)
	{
		var minimalNumberOfHarverters = 0;
		for(let idx in Memory.Sources)
		{
			minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
		}

		const minimalNumberOfUpgraders 	= 2;
		const minimalNumberOfBuilders 	= 1;
		const minimalNumberOfPorters 	= 1;

		var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
		var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
		var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
		var numberOfPorters = _.sum(Game.creeps, (c) => c.memory.role == "porter");

		if(numberOfHarvesters < minimalNumberOfHarverters)
		{
			var sourceId = undefined;
			for(let idx in Memory.Sources)
			{
				var sH = Object.keys(Memory.Sources[idx].harvesters).length;
				if(sH < Memory.Sources[idx].availableFields)
				{
					sourceId = idx;
					break;
				}
			}
			Spawner.spawnCustomCreep("Harvester", "harvester", "WCMM", {source: sourceId});
		}
		else if(numberOfUpgraders < minimalNumberOfUpgraders)
		{
			Spawner.spawnCustomCreep("Upgrader", "upgrader");
		}
		else if(numberOfBuilders < minimalNumberOfBuilders)
		{
			Spawner.spawnCustomCreep("Builder", "builder", "WCMM");
		}
		else if(numberOfPorters < minimalNumberOfPorters)
		{
			Spawner.spawnCustomCreep("Porter", "porter", "WCMM");
		}
		else
		{
			//Spawner.spawnCustomCreep("Harvester", "harvester", "WCCMMM");
		}
	},
};
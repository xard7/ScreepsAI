module.exports =
{	
	run: function(Spawner)
	{
		var minimalNumberOfHarverters = 0;
		for(let idx in Memory.Sources)
		{
			minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
		}

		var minimalNumberOfUpgraders = 1;
		if(Spawner.room.controller.level > 1)
		{
			minimalNumberOfUpgraders = 1;
		}

		var minimalNumberOfBuilders = 0;
		if(Spawner.room.controller.level > 1)
		{
			minimalNumberOfBuilders = 1;
		}

		var minimalNumberOfPorters = 0;
		if(Spawner.room.controller.level > 2)
		{
			minimalNumberOfPorters = 2;
		}
		if(Spawner.room.controller.level > 1)
		{
			minimalNumberOfPorters = 1;
		}

		var minimalNumberOfEngineers = 0;
		if(Spawner.room.controller.level > 1)
		{
			minimalNumberOfEngineers = 1;
		}

		var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
		var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
		var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
		var numberOfPorters = _.sum(Game.creeps, (c) => c.memory.role == "porter");
		var numberOfEngineers = _.sum(Game.creeps, (c) => c.memory.role == "engineer");

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
		else if(numberOfPorters < minimalNumberOfPorters)
		{
			Spawner.spawnCustomCreep("Porter", "porter", "WCCMM");
		}
		else if(numberOfUpgraders < minimalNumberOfUpgraders)
		{
			Spawner.spawnCustomCreep("Upgrader", "upgrader");
		}
		else if(numberOfBuilders < minimalNumberOfBuilders)
		{
			Spawner.spawnCustomCreep("Builder", "builder", "WWCMM");
		}
		else if(numberOfEngineers < minimalNumberOfEngineers)
		{
			Spawner.spawnCustomCreep("Engineer", "engineer", "WWCMM");
		}
		else
		{
			//Spawner.spawnCustomCreep("Harvester", "harvester", "WCCMMM");
		}
	},
};
module.exports =
{
	run: function(Spawner)
	{
		/*if(Spawner.memory.uniqueCounter == undefined)
		{
			Spawner.memory.uniqueCounter = 0;
		}

		Spawner.memory.uniqueCounter ++;*/

		const minimalNumberOfHarverters = 5;
		const minimalNumberOfUpgraders 	= 2;
		const minimalNumberOfBuilders 	= 1;
		const minimalNumberOfPorters 	= 1;

		var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
		var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
		var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
		var numberOfPorters = _.sum(Game.creeps, (c) => c.memory.role == "porter");

		if(numberOfHarvesters < minimalNumberOfHarverters)
		{
			Spawner.spawnCustomCreep("Harvester", "harvester", "WCCMMM");
		}
		else if(numberOfUpgraders < minimalNumberOfUpgraders)
		{
			Spawner.spawnCustomCreep("Upgrader", "upgrader");
		}
		else if(numberOfBuilders < minimalNumberOfBuilders)
		{
			Spawner.spawnCustomCreep("Builder", "builder", "WWCMM");
		}
		else if(numberOfPorters < minimalNumberOfPorters)
		{
			Spawner.spawnCustomCreep("Porter", "porter", "WCCMM");
		}
		else
		{
			//Spawner.spawnCustomCreep("Harvester", "harvester", "WCCMMM");
		}
	},
};
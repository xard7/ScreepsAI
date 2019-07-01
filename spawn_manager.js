const v1 = function(Spawner) // level 1
{
	var minimalNumberOfHarverters = 0;
	for(let idx in Memory.Sources)
	{
		minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
	}

	var minimalNumberOfUpgraders = 1;
	var minimalNumberOfEngineers = 0;
	var minimalNumberOfBuilders = 0;

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
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
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("Upgrader", "upgrader", "WCMM");
	}
	else if(numberOfEngineers < minimalNumberOfEngineers)
	{
		Spawner.spawnCustomCreep("Engineer", "engineer", "WCMM");
	}
	else if(numberOfBuilders < minimalNumberOfBuilders)
	{
		Spawner.spawnCustomCreep("Builder", "builder", "WCMM");
	}
}

const v2 = function(Spawner) // level 2
{
	var minimalNumberOfHarverters = 0;
	for(let idx in Memory.Sources)
	{
		minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
	}

	var minimalNumberOfUpgraders = 2;
	var minimalNumberOfEngineers = 0;
	var minimalNumberOfBuilders = 0;

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
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
		if(numberOfHarvesters > 2)
		{
		    Spawner.spawnCustomCreep("Harvester", "harvester", "WWCCMM", {source: sourceId});
		}
		else
		{
		    Spawner.spawnCustomCreep("Harvester", "harvester", "WCMM", {source: sourceId});
		}
	}
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("Upgrader", "upgrader", "WWCCMM");
	}
	else if(numberOfEngineers < minimalNumberOfEngineers)
	{
		Spawner.spawnCustomCreep("Engineer", "engineer", "WWCCMM");
	}
	else if(numberOfBuilders < minimalNumberOfBuilders)
	{
		Spawner.spawnCustomCreep("Builder", "builder", "WWCCMM");
	}
}

const v3 = function(Spawner) // level 2
{
	var minimalNumberOfHarverters = 0;
	for(let idx in Memory.Sources)
	{
		minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
	}

	var minimalNumberOfUpgraders = 6;
	var minimalNumberOfEngineers = 1;
	var minimalNumberOfBuilders = 2;

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");
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
		if(numberOfHarvesters > 3)
		{
		    Spawner.spawnCustomCreep("Harvester", "harvester", "WWWCCCMMM", {source: sourceId});
		}
		else if(numberOfHarvesters > 1)
		{
		    Spawner.spawnCustomCreep("Harvester", "harvester", "WWCCMM", {source: sourceId});
		}
		else
		{
		    Spawner.spawnCustomCreep("Harvester", "harvester", "WCMM", {source: sourceId});
		}
	}
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("Upgrader", "upgrader", "WWWCCCMMM");
	}
	else if(numberOfEngineers < minimalNumberOfEngineers)
	{
		Spawner.spawnCustomCreep("Engineer", "engineer", "WWWCCCMMM");
	}
	else if(numberOfBuilders < minimalNumberOfBuilders)
	{
		Spawner.spawnCustomCreep("Builder", "builder", "WWWCCCMMM");
	}
}

const v4 = v3;
const v5 = v4;
const v6 = v5;
const v7 = v6;
const v8 = v7;

module.exports =
{	
	run: [v1, v2, v3, v4, v5, v6, v7, v8]
};
const v1 = function(Spawner) // level 1
{
	var minimalNumberOfHarverters = 0;
	for(let idx in Memory.Sources)
	{
		minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
	}

	var minimalNumberOfUpgraders = 1;

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");


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
		
	    Spawner.spawnCustomCreep("H", "harvester", "WCMM", {source: sourceId});
	}
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("U", "upgrader", "WCMM");
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

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");


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
		    Spawner.spawnCustomCreep("H", "harvester", "WWCCMM", {source: sourceId});
		}
		else
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WCMM", {source: sourceId});
		}
	}
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("U", "upgrader", "WWCCMM");
	}
}

const v3 = function(Spawner) // level 3
{
	var minimalNumberOfHarverters = 0;
	for(let idx in Memory.Sources)
	{
		minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
	}

	var minimalNumberOfUpgraders = 6;
	var minimalNumberOfEngineers = 1;
	var minimalNumberOfBuilders = 1;

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	var numberOfEngineers = _.sum(Game.creeps, (c) => c.memory.role == "engineer");
	var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");


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
		    Spawner.spawnCustomCreep("H", "harvester", "WWWCCCMMM", {source: sourceId});
		}
		else if(numberOfHarvesters > 1)
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WWCCMM", {source: sourceId});
		}
		else
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WCMM", {source: sourceId});
		}
	}
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("U", "upgrader", "WWWCCCMMM");
	}
	else if(numberOfEngineers < minimalNumberOfEngineers)
	{
		Spawner.spawnCustomCreep("E", "engineer", "WWWCCCMMM");
	}
	else if(numberOfBuilders < minimalNumberOfBuilders)
	{
		Spawner.spawnCustomCreep("B", "builder", "WWWCCCMMM");
	}
}

const v4 = function(Spawner) // level 4
{
	var minimalNumberOfHarverters = 0;
	for(let idx in Memory.Sources)
	{
		minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
	}

	var minimalNumberOfUpgraders = 5;
	var minimalNumberOfEngineers = 1;
	var minimalNumberOfBuilders = 1;

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	var numberOfEngineers = _.sum(Game.creeps, (c) => c.memory.role == "engineer");
	var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");

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
		    Spawner.spawnCustomCreep("H", "harvester", "WWWWCCCCMMMM", {source: sourceId});
		}
		else if(numberOfHarvesters > 2)
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WWCCMM", {source: sourceId});
		}
		else
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WCMM", {source: sourceId});
		}
	}
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("U", "upgrader", "WWWWCCCCMMMM");
	}
	else if(numberOfEngineers < minimalNumberOfEngineers)
	{
		Spawner.spawnCustomCreep("E", "engineer", "WWWWCCCMMMM");
	}
	else if(numberOfBuilders < minimalNumberOfBuilders)
	{
		Spawner.spawnCustomCreep("B", "builder", "WWWWCCCMMMM");
	}
}

const v5 = function(Spawner) // level 5
{
	var minimalNumberOfHarverters = 0;
	for(let idx in Memory.Sources)
	{
		minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
	}

	var minimalNumberOfUpgraders = 5;
	var minimalNumberOfEngineers = 1;
	var minimalNumberOfBuilders = 1;
	var minimalNumberOfPorters = 0;
	
	var cargo = Spawner.pos.findClosestByRange(FIND_MY_STRUCTURES,
		{
			filter: function(s)
			{
				return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 100000;
			}
		});
	if(cargo)
	{
	    minimalNumberOfPorters = 1;
	}

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	var numberOfEngineers = _.sum(Game.creeps, (c) => c.memory.role == "engineer");
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
		if(numberOfHarvesters > 3)
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WWWWCCCCMMMM", {source: sourceId});
		}
		else if(numberOfHarvesters > 2)
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WWCCMM", {source: sourceId});
		}
		else
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WCMM", {source: sourceId});
		}
	}
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("U", "upgrader", "WWWWCCCCMMMM");
	}
	else if(numberOfEngineers < minimalNumberOfEngineers)
	{
		Spawner.spawnCustomCreep("E", "engineer", "WWWWCCCMMMM");
	}
	else if(numberOfBuilders < minimalNumberOfBuilders)
	{
		Spawner.spawnCustomCreep("B", "builder", "WWWWCCCMMMM");
	}
	else if(numberOfPorters < minimalNumberOfPorters)
	{
		Spawner.spawnCustomCreep("P", "porter", "CCCCCCCMMMMM");
	}
}

const v6 = function(Spawner) // level 6
{
	var minimalNumberOfHarverters = 0;
	for(let idx in Memory.Sources)
	{
		minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
	}

	var minimalNumberOfUpgraders = 5;
	var minimalNumberOfEngineers = 1;
	var minimalNumberOfBuilders = 2;
	var minimalNumberOfPorters = 0;
	
	var cargo = Spawner.pos.findClosestByRange(FIND_MY_STRUCTURES,
		{
			filter: function(s)
			{
				return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 200000;
			}
		});
	if(cargo)
	{
	    minimalNumberOfPorters = 2;
	}

	var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
	var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
	var numberOfEngineers = _.sum(Game.creeps, (c) => c.memory.role == "engineer");
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
		if(numberOfHarvesters > 3)
		{
		    Spawner.spawnCustomCreep("H", "harvester", undefined, {source: sourceId});
		}
		else if(numberOfHarvesters > 2)
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WWCCMM", {source: sourceId});
		}
		else
		{
		    Spawner.spawnCustomCreep("H", "harvester", "WCMM", {source: sourceId});
		}
	}
	else if(numberOfUpgraders < minimalNumberOfUpgraders)
	{
		Spawner.spawnCustomCreep("U", "upgrader");
	}
	else if(numberOfEngineers < minimalNumberOfEngineers)
	{
		Spawner.spawnCustomCreep("E", "engineer");
	}
	else if(numberOfBuilders < minimalNumberOfBuilders)
	{
		Spawner.spawnCustomCreep("B", "builder");
	}
	else if(numberOfPorters < minimalNumberOfPorters)
	{
		Spawner.spawnCustomCreep("P", "porter", "CCCCCCCMMMMM");
	}
}

const v7 = v6;
const v8 = v7;

module.exports =
{	
	run: [v1, v2, v3, v4, v5, v6, v7, v8]
};
const HARVESTER = 0;
const UPGRADER 	= 1;
const ENGINEER	= 2;
const BUILDER	= 3;
const PORTER	= 4;
const UNIVERSAL	= 5;

const v1 = 
[
	// HARVESTERS
	{
		minimalNumberOfCreeps: 0,
		func: function(Spawner, minimalNumberOfCreeps) 
		{
			let minimalNumberOfHarverters = 0;
			for(let idx in Memory.Sources)
			{
				minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
			}

			const numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
			if(numberOfCreeps < minimalNumberOfHarverters)
			{
				let sourceId = undefined;
				for(let idx in Memory.Sources)
				{
					let sH = Object.keys(Memory.Sources[idx].harvesters).length;
					if(sH < Memory.Sources[idx].availableFields)
					{
						sourceId = idx;
						break;
					}
				}

			    return Spawner.spawnCustomCreep("H", "harvester", undefined, {source: sourceId})
			}
			return false;
		}
	},

	// UPGRADERS
	{
		minimalNumberOfCreeps: 1,
		func: function(Spawner, minimalNumberOfCreeps) 
		{
			const numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
			if(numberOfCreeps < minimalNumberOfCreeps)
			{
				return Spawner.spawnCustomCreep("U", "upgrader");
			}

			return false;
		}
	},

	// ENGINEERS
	{
		minimalNumberOfCreeps: 0,
		func: function(Spawner, minimalNumberOfCreeps)
		{
			return false;
		}
	},

	// BUILDERS
	{
		minimalNumberOfCreeps: 0,
		func: function(Spawner, minimalNumberOfCreeps)
		{
			return false;
		}
	},

	// PORTERS
	{
		minimalNumberOfCreeps: 0,
		func: function(Spawner, minimalNumberOfCreeps)
		{
			return false;
		}
	},

	// UNIVERSAL
	{
		minimalNumberOfCreeps: 0,
		func: function(Spawner, minimalNumberOfCreeps)
		{
			return false;
		}
	}
];

const v2 = v1;
{
	v2[UPGRADER].minimalNumberOfCreeps = 2;
};

const v3 = v2;
{
	v3[UPGRADER].minimalNumberOfCreeps = 5;
	v3[ENGINEER].minimalNumberOfCreeps = 1;
	v3[ENGINEER].func = function(Spawner, minimalNumberOfCreeps) 
	{
		const numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role == "engineer");
		if(numberOfCreeps < minimalNumberOfCreeps)
		{
			return Spawner.spawnCustomCreep("E", "engineer");
		}

		return false;
	};

	v3[BUILDER].minimalNumberOfCreeps = 1;
	v3[BUILDER].func = function(Spawner, minimalNumberOfCreeps) 
	{
		const numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role == "builder");
		if(numberOfCreeps < minimalNumberOfCreeps)
		{
			return Spawner.spawnCustomCreep("B", "builder");
		}

		return false;
	};
};

const v4 = v3;
const v5 = v4;

const v6 = v5;
{
	v6[PORTER].minimalNumberOfCreeps = 2;
	v6[PORTER].func = function(Spawner, minimalNumberOfCreeps)
	{
		let minimalNumberOfPorters = 0;
		const cargo = Spawner.pos.findClosestByRange(FIND_MY_STRUCTURES,
		{
			filter: function(s)
			{
				return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 200000;
			}
		});
		if(cargo)
		{
		    minimalNumberOfPorters = minimalNumberOfCreeps;
		}

		const numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role == "porter");
		if(numberOfCreeps < minimalNumberOfPorters)
		{
			return Spawner.spawnCustomCreep("B", "porter", "CCCCCCCMMMMM");
		}

		return false;
	};
};

const v7 = v6;
{
	v7[HARVESTER].func = function(Spawner, minimalNumberOfCreeps) 
	{
		let minimalNumberOfHarverters = 0;
		for(let idx in Memory.Sources)
		{
			minimalNumberOfHarverters += Memory.Sources[idx].availableFields;
		}

		const numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
		if(numberOfCreeps < minimalNumberOfHarverters - 1)
		{
			let sourceId = undefined;
			for(let idx in Memory.Sources)
			{
				let sH = Object.keys(Memory.Sources[idx].harvesters).length;
				if(sH < Memory.Sources[idx].availableFields)
				{
					sourceId = idx;
					break;
				}
			}

		    return Spawner.spawnCustomCreep("H", "harvester", undefined, {source: sourceId})
		}
		return false;
	};
	
	v7[UNIVERSAL].minimalNumberOfCreeps = 0;
	v7[UNIVERSAL].func = function(Spawner, minimalNumberOfCreeps)
	{
		const numberOfCreeps = _.sum(Game.creeps, (c) => c.memory.role == "universal");
		if(numberOfCreeps < minimalNumberOfCreeps)
		{
			return Spawner.spawnCustomCreep("MM", "universal", "M");
		}
		return false;
	};
};

const v8 = v7;

module.exports =
{	
	run: [v1, v2, v3, v4, v5, v6, v7, v8]
};
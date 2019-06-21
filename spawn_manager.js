module.exports =
{
	run: function(Spawner)
	{
		if(Spawner.memory.uniqueCounter == undefined)
		{
			Spawner.memory.uniqueCounter = 0;
		}

		Spawner.memory.uniqueCounter ++;

		const minimalNumberOfHarverters = 5;
		const minimalNumberOfUpgraders 	= 2;
		const minimalNumberOfBuilders 	= 2;

		var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == "harvester");
		var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == "upgrader");
		var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == "builder");

		var retErr;
		var creepName = "UNDEFINED";
		if(numberOfHarvesters < minimalNumberOfHarverters)
		{
			creepName = "Harvester" + Spawner.memory.uniqueCounter;
			retErr = Spawner.spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {memory: {role: "harvester", bussy: false}});
		}
		else if(numberOfUpgraders < minimalNumberOfUpgraders)
		{
			creepName = "Upgrader" + Spawner.memory.uniqueCounter;
			retErr = Spawner.spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {memory: {role: "upgrader", bussy: false}});
		}
		else if(numberOfBuilders < minimalNumberOfBuilders)
		{
			creepName = "Builder" + Spawner.memory.uniqueCounter;
			retErr = Spawner.spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {memory: {role: "builder", bussy: false}});

			console.log("d " + retErr);
		}
		else
		{
			creepName = "Builder" + Spawner.memory.uniqueCounter;
			retErr = Spawner.spawnCreep([WORK, CARRY, MOVE, MOVE], creepName, {memory: {role: "builder", bussy: false}});
		}

		switch(retErr)
		{
			case OK:
				console.log("Creep with name " + creepName + " spawned successfully.");
			break;

			case ERR_NOT_OWNER:
				Spawner.memory.uniqueCounter--;
				console.log("Player are not the owner of this spawn!");
			break;

			case ERR_NAME_EXISTS:
				Spawner.memory.uniqueCounter--;
				console.log("Creep with name " + creepName + " arleady exists!");
			break;

			case ERR_INVALID_ARGS:
				Spawner.memory.uniqueCounter--;
				console.log("Body is not properly described or name was not provided!");
			break;

			case ERR_RCL_NOT_ENOUGH:
				Spawner.memory.uniqueCounter--;
				console.log("Player Room Controller level is insufficient to use this spawn!");
			break;

			case ERR_BUSY:
			case ERR_NOT_ENOUGH_ENERGY:
				Spawner.memory.uniqueCounter--;
			break;
		}
	},
};
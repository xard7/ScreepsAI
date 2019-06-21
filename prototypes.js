module.exports = function()
{
	StructureSpawn.prototype.spawnCustomCreep = function(name, roleName, bodyStr)
	{
		if(this.memory.uniqueCounter == undefined)
		{
			this.memory.uniqueCounter = 0;
		}
		this.memory.uniqueCounter ++;

		var body = [];
		if(typeof(bodyStr) == "string")
		{
			for(let s of bodyStr)
			{
				switch(s)
				{
					case 'W':
					{
						body.push(WORK);
					}
					break;

					case 'C':
					{
						body.push(CARRY);
					}
					break;

					case 'M':
					{
						body.push(MOVE);
					}
					break;

					default:
					{
						body.push(MOVE);
					}
				}
			}
		}
		else
		{
			body = [WORK, CARRY, MOVE, MOVE];
		}

		var retErr;
		var creepName = name + this.memory.uniqueCounter;
		retErr =  this.spawnCreep(body, creepName, {memory: {role: roleName, bussy: false}});

		switch(retErr)
		{
			case OK:
				console.log("Creep with name " + creepName + " spawned successfully.");
			break;

			case ERR_NOT_OWNER:
				this.memory.uniqueCounter--;
				console.log("Player are not the owner of this spawn!");
			break;

			case ERR_NAME_EXISTS:
				this.memory.uniqueCounter--;
				console.log("Creep with name " + creepName + " arleady exists!");
			break;

			case ERR_INVALID_ARGS:
				this.memory.uniqueCounter--;
				console.log("Body is not properly described or name was not provided!");
			break;

			case ERR_RCL_NOT_ENOUGH:
				this.memory.uniqueCounter--;
				console.log("Player Room Controller level is insufficient to use this spawn!");
			break;

			case ERR_BUSY:
			case ERR_NOT_ENOUGH_ENERGY:
				this.memory.uniqueCounter--;
			break;
		}
	};
};
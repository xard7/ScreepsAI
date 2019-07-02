module.exports = function()
{
	StructureSpawn.prototype.spawnCustomCreep = function(name, roleName, bodyName, opt)
	{
		if(this.memory.uniqueCounter == undefined)
		{
			this.memory.uniqueCounter = 0;
		}
		this.memory.uniqueCounter ++;

		var body = [];
		if(typeof(bodyName) == "string")
		{
			for(let s of bodyName)
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
			var e = this.room.energyAvailable;
			var numberOfParts = Math.floor(e / 200);
			if(numberOfParts < 4)
			{
				body = [WORK, CARRY, MOVE, MOVE];
			}
			else
			{
	            for (let i = 0; i < numberOfParts; i++)
	            {
	                body.push(WORK);
	            }
	            for (let i = 0; i < numberOfParts; i++)
	            {
	                body.push(CARRY);
	            }
	            for (let i = 0; i < numberOfParts; i++)
	            {
	                body.push(MOVE);
	            }
	        }
		}

		var context = 
		{
			memory: 
			{
				role: roleName, 
				bussy: false
			}
		};
		if(opt != undefined)
		{
			Object.assign(context.memory, opt);
		}

		var retErr;
		var creepName = name + this.memory.uniqueCounter;
		retErr =  this.spawnCreep(body, creepName, context);

		switch(retErr)
		{
			case OK:
				console.log("Creep with name " + creepName + " spawned successfully.");
				return Game.creeps[creepName];
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
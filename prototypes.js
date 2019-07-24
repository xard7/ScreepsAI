module.exports = function()
{
	const CONST = require("consts");

	StructureSpawn.prototype.spawnCustomCreep = function(creepName, roleName, bodyName, opt)
	{
		if(this.memory.uniqueCounter == undefined)
		{
			this.memory.uniqueCounter = 0;
		}
		this.memory.uniqueCounter ++;

		let body = [];
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
			let energyAvailable = this.room.energyAvailable;
			
			for(let i = 0; i < 3; i++)
			{
			    if(energyAvailable - 250 > 0)
			    {
			        body.push(WORK);
			        body.push(CARRY);
			        body.push(MOVE);
			        body.push(MOVE);
			        energyAvailable -= 250;
			    }
			    else
			    {
			        break;
			    }
			}
		}

		const context = 
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

		let retErr;
		const creepFullName = creepName + this.memory.uniqueCounter;
		retErr =  this.spawnCreep(body, creepFullName, context);

		switch(retErr)
		{
			case OK:
				console.log("Creep with name " + creepFullName + " spawned successfully.");
				return creepFullName;
			break;

			case ERR_NOT_OWNER:
				console.log("Player are not the owner of this spawn!");
			break;

			case ERR_NAME_EXISTS:
				console.log("Creep with name " + creepFullName + " arleady exists!");
			break;

			case ERR_INVALID_ARGS:
				console.log("Body is not properly described or name was not provided!");
			break;

			case ERR_RCL_NOT_ENOUGH:
				console.log("Player Room Controller level is insufficient to use this spawn!");
			break;

			case ERR_BUSY:
			case ERR_NOT_ENOUGH_ENERGY:
			break;
		}

		this.memory.uniqueCounter--;
		return false;
	};

	Creep.prototype.checkDrop = function()
	{
		let ret = {type: CONST.eDropCheck.NONE, id: -1, path: ""}
		const tombstone = this.pos.findClosestByRange(FIND_TOMBSTONES,
            {
    	        filter: function(t)
    			{
    				let path = this.pos.findPathTo(t);
    				return (path.length * 1.1 < t.tickToDecay);
    			}
    		});
		if(tombstone)
		{
			ret.type = CONST.eDropCheck.TOMBSTONE;
			ret.id = tombstone.id;
			ret.path = creep.room.findPath(this.pos, tombstone.pos, {serialize: true});
		}
		else
		{
			const droppedResource = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
            {
    	        filter: function(r)
    			{
    				let path = this.pos.findPathTo(r);
    				return (path.length * 1.1 < r.amount);
    			}
    		});

	        if(droppedResource)
	        {
				ret.type = CONST.eDropCheck.RESOURCE;
				ret.id = droppedResource.id;
				ret.path = creep.room.findPath(this.pos, droppedResource.pos, {serialize: true});
	        }
	    }

	    return ret;
	},

	Creep.prototype.getAndSavePath = function(target)
	{
		const path = this.pos.findPathTo(target, {serialize: true});
		if(path.length)
		{
			this.memory.currentPath = path;
			return true;
		}
		return false;
	}
};
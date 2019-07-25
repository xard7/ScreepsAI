module.exports = function()
{
	const CONST = require("consts");

	const testWeights = 
	{
		"goto_source": 1.0,
	    "harvest": 1.0,

	    "goto_drop": 0.5,
	    "pickup_drop": 0.5,

	    "goto_extension": 0.3,
	    "goto_cargo": 0.4,
	    "goto_controller": 0.6,
	    "transfer": 0.0,

	    "goto_flag": 0.0,
	};

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
					
					case 'A':
				    {
						body.push(ATTACK);
				    }
					break;
					
					case 'R':
				    {
						body.push(RANGED_ATTACK);
				    }
					break;
					
					case 'T':
				    {
						body.push(TOUGH);
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
    	const creep = this;
		let ret = {type: CONST.eDropCheck.NONE, id: null, path: ""}
		const tombstone = this.pos.findClosestByRange(FIND_TOMBSTONES,
            {
    	        filter: function(t)
    			{
    				if(Memory.Rooms[creep.room.name].ThinkingIds[t.id] != undefined)
    				{
    					return false;
    				}

    				let path = creep.pos.findPathTo(t);
    				return (path.length * 1.1 < t.tickToDecay);
    			}
    		});
		if(tombstone)
		{
			ret.type = CONST.eDropCheck.TOMBSTONE;
			ret.id = tombstone.id;
			ret.path = this.pos.findPathTo(tombstone.pos, {serialize: true});
		}
		else
		{
			const droppedResource = this.pos.findClosestByRange(FIND_DROPPED_RESOURCES,
            {
    	        filter: function(r)
    			{
    				if(Memory.Rooms[creep.room.name].ThinkingIds[r.id] != undefined)
    				{
    					return false;
    				}

    				let path = creep.pos.findPathTo(r);
    				return (path.length * 1.1 < r.amount);
    			}
    		});

	        if(droppedResource)
	        {
				ret.type = CONST.eDropCheck.RESOURCE;
				ret.id = droppedResource.id;
				ret.path = this.pos.findPathTo(droppedResource.pos, {serialize: true});
	        }
	    }

	    return ret;
	};

	Creep.prototype.checkSource = function(roomName)
	{
		let ret = {id: null, path: ""};
		let pathLength = 99999;

		for(const sourceId in Memory.Rooms[roomName].Sources)
		{
			const source = Memory.Rooms[roomName].Sources[sourceId];
			if(Object.keys(source.harvesters).length < source.availableFields)
			{
				const sourceObj = Game.getObjectById(sourceId);
				const path = this.pos.findPathTo(sourceObj);
				if(pathLength > path.length)
				{
					pathLength = path.length;
					ret.id = sourceId;
					ret.path = Room.serializePath(path);
				}
			}
		}

		return ret;
	};

	Creep.prototype.checkExtension = function()
	{
    	const creep = this;
		let ret = {id: null, path: ""};

		let extension = this.pos.findClosestByPath(FIND_MY_STRUCTURES, 
			{
				filter: function(e)
				{
					if(Memory.Rooms[creep.room.name].ThinkingIds[e.id] != undefined)
    				{
    					return false;
    				}

				    return e.structureType == STRUCTURE_EXTENSION && e.energy < e.energyCapacity;
				}
			});

		if(extension)
		{
		    ret.path = this.pos.findPathTo(extension.pos, {serialize: true});
			ret.id = extension.id;
		}

		return ret;
	};

	Creep.prototype.checkCargo = function()
	{
		let ret = {id: null, path: ""};

		let cargo = this.pos.findClosestByPath(FIND_MY_STRUCTURES, 
			{
				filter: 
				{
				    structureType: STRUCTURE_STORAGE,
				}
			});

		if(cargo)
		{
		    ret.path = this.pos.findPathTo(cargo.pos, {serialize: true});
			ret.id = cargo.id;
		}

		return ret;
	};

	Creep.prototype.checkFlag = function()
	{
		let ret = {id: null, path: ""};

		let flag = creep.pos.findClosestByPath(FIND_FLAGS);

		if(flag)
		{
		    ret.path = this.pos.findPathTo(flag.pos, {serialize: true});
			ret.id = flag.id;
		}

		return ret;
	};

	Creep.prototype.think = function()
    {
    	let currentWeight = this.memory.Behavior.Weight;
    	let currentState = this.memory.Behavior.State;
    	let currentId = this.memory.Behavior.Id;
    	const carryCount = _.sum(this.carry);

    	switch(currentState)
    	{
    		case CONST.eState.TRANSFER:
    		{
    			if(carryCount == 0)
    			{
    				currentWeight = 99999;
    			}
    		}
    		break;

    		case CONST.eState.HARVEST:
    		case CONST.eState.PICKUP_DROP:
    		{
    			if(carryCount > 0)
    			{
    				currentWeight = 99999;
    			}
    		}
    		break;
    	}

    	if(carryCount == this.carryCapacity)
    	{
    		const extensionData = this.checkExtension();
    		if(extensionData.id != null)
    		{
	    		const pathLength = Room.deserializePath(extensionData.path).length;
    			const extensionWeight = testWeights["goto_extension"] * pathLength;
    			if(extensionWeight < currentWeight)
    			{
	    			if(pathLength <= 1)
	    			{
	    				currentWeight = testWeights["transfer"] * pathLength;
	    				currentState = CONST.eState.TRANSFER;
	    			}
	    			else
	    			{
	    				currentWeight = extensionWeight;
	    				currentState = CONST.eState.GOTO_EXTENSION;
	    			}
	    			currentId = extensionData.id;
	    		}
    		}

	    	const cargoData = this.checkCargo();
	    	if(cargoData.id != null)
	    	{
	    		const pathLength = Room.deserializePath(cargoData.path).length;
	    		const cargoWeight = testWeights["goto_cargo"] * pathLength;
	    		if(cargoWeight < currentWeight)
	    		{
		    		if(pathLength <= 1)
		    		{
			    		currentWeight = testWeights["transfer"] * pathLength;
			    		currentState = CONST.eState.TRANSFER;
		    		}
		    		else
		    		{
						currentWeight = cargoWeight;
		    			currentState = CONST.eState.GOTO_CARGO;
		    		}
		    		currentId = cargoData.id;
	    		}
	    	}
    	}
    	else
    	{
	    	/*const dropData = this.checkDrop();
	    	if(dropData.type != CONST.eDropCheck.NONE)
	    	{
		    	const pathLength = Room.deserializePath(dropData.path).length;
	    		const dropWeight = testWeights["goto_drop"] * pathLength;
	    		if(dropWeight < currentWeight)
	    		{
		    		if(pathLength <= 1)
		    		{
				    	currentWeight = testWeights["pickup_drop"] * pathLength;
				    	currentState = CONST.eState.PICKUP_DROP;
		    		}
		    		else
		    		{
			    		currentWeight = testWeights["goto_drop"] * pathLength;
			    		currentState = CONST.eState.GOTO_DROP;
			    	}
			    	currentId = dropData.id;
			    }
	    	}*/

	    	const harvestData = this.checkSource(this.room.name);
	    	if(harvestData.id != null)
	    	{
	    		const pathLength = Room.deserializePath(harvestData.path).length;
	    		const harvestWeight = testWeights["goto_source"] * pathLength;
	    		if(harvestWeight < currentWeight)
	    		{
		    		if(pathLength <= 1)
		    		{
			    		currentWeight = testWeights["harvest"] * pathLength;
			    		currentState = CONST.eState.HARVEST;
		    		}
		    		else
		    		{
						currentWeight = harvestWeight;
		    			currentState = CONST.eState.GOTO_SOURCE;
		    		}
		    		currentId = harvestData.id;
	    		}
	    	}
	    }
    	
    	//let flagData = 0;
    	//let flagWeight = 99999;

    	let isDirty = false;
    	if(currentState != this.memory.Behavior.State)
    	{
			this.memory.Behavior =
			{
				State: currentState,
				Weight: currentWeight,
				Id: currentId,
			};

			isDirty = true;
    	}

        return isDirty;
    };
};
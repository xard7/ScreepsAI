/***************************************************************

creep.memory.Behavior = 
{
	State 	: eState,
	Weight 	: number,
	Id 		: string,
}

****************************************************************/

const CONST = require("consts");
const Utility = require("utility");

module.exports =
{    
	run: function(creep, roleWeights)
	{
		if(creep.memory.Behavior == undefined)
		{
			creep.memory.Behavior = 
			{
				State: CONST.eState.IDLE,
				Path: "",
				Weight: 999999,
				Id: "",
			};
		}
		else
		{
                        //creep.moveTo(Game.spawns["Home"]);
            creep.think(roleWeights);

            let target = Game.getObjectById(creep.memory.Behavior.Id);

            if(target)
            {
                switch(creep.memory.Behavior.State)
                {
                	case CONST.eState.GOTO_SOURCE:
                    {
                        creep.moveTo(target);
                    }
                    break;

                    case CONST.eState.GOTO_DROP:
                    case CONST.eState.GOTO_EXTENSION:
                    {
                        Memory.Rooms[creep.room.name].ThinkingIds[target.id] = creep.name;
                    }
                    case CONST.eState.GOTO_CARGO:
                	{
                        creep.moveTo(target);
                	}
                	break;

                	case CONST.eState.HARVEST:
                	{
                        creep.harvest(target);
                	}
                	break;
                	
                	case CONST.eState.PICKUP_DROP:
                	{
                        if(creep.withdraw(target, RESOURCE_ENERGY) != OK)
                        {
                            creep.pickup(target);
                        }
                	}
                	break;

                    case CONST.eState.TRANSFER:
                    {
                        creep.transfer(target, RESOURCE_ENERGY);
                    }
                }
            }
		}
        Utility.printDebug(creep.memory, "Creep memory");
	}
};
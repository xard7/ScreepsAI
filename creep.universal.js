/***************************************************************

creep.memory.Behavior = 
{
	State 	: eState,
	Weight 	: number,
	Id 		: string,
}

****************************************************************/

const CONST = require("consts");

module.exports =
{    
	run: function(creep)
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
            creep.think();

            let target = Game.getObjectById(creep.memory.Behavior.Id);

            if(target)
            {
                switch(creep.memory.Behavior.State)
                {
                	case CONST.eState.GOTO_SOURCE:
                    case CONST.eState.GOTO_DROP:
                    case CONST.eState.GOTO_EXTENSION:
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
	}
};
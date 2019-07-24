/***************************************************************

creep.memory.Behavior = 
{
	State 		: bState;
	currentPath : path;
	Weight 		: number;
}

****************************************************************/

const CONST = require("consts");

const testWeights = 
{
    "harvest": 2.0,
    "pick_drop": 1.0,
    "scout": 0.1,
};

module.exports =
{
    think: function(creep)
    {
    	let dropData = creep.checkDrop();
    	let dropWeight = 99999;
    	if(dropData.type != CONST.eDropCheck.NONE)
    	{
    		dropWeight = testWeights * dropData.path.length;
    	}

    	let harvestData = 0;
    	let harvestWeight = 99999;

        return CONST.bState.IDLE;
    },
    
	idle: function(creep)
	{

	},

	run: function(creep)
	{
		if(creep.memory.Behavior == undefined)
		{
			creep.memory.Behavior = 
			{
				State: CONST.bState.IDLE,
				currentPath: "",
				Weight: 0.0
			};
		}
		else
		{
            //let thinkState = 
		}
	}
};
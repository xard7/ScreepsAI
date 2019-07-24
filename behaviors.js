/***************************************************************

creep.memory.Behavior = 
{
	State 		: bState;
	currentPath : path;
	Weight 		: number;
}

****************************************************************/

const CONST = require("consts");

module.exports =
{
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
				Weight: 0
			};
		}
		else
		{

		}
	}
};
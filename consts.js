module.exports = 
{
	bState:
	{
		IDLE: 0,

		GOTO_DROP: 1,
		PICKUP_DROP: 2,

		GOTO_HARVEST: 3,
		HARVEST: 4,

		GOTO_CARGO: 5,
	},

	eDropCheck:
	{
		NONE: 0,
		TOMBSTONE: 1,
		RESOURCE: 2,
	}
};
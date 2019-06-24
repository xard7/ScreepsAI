module.exports =
{
	run: function(creep)
	{
		if((creep.ticksToLive % 300) == 0)
		{
			creep.memory.plansDone = false;
		}
		if(creep.memory.plansDone == undefined || !creep.memory.plansDone)
		{
			creep.memory.plansDone = true;

			var sources = creep.room.find(FIND_SOURCES);
			var spawn = Game.spawns["Home"];
			var paths = [];
			for(let source of sources)
			{
				let p = creep.room.findPath(spawn.pos, source.pos);
				paths.push(Room.serializePath(p))
			}
			{
				let p = creep.room.findPath(spawn.pos, creep.room.controller.pos);
				paths.push(Room.serializePath(p));
			}

			for(let path of paths)
			{
				let p = Room.deserializePath(path)
				for(let pathVal of p)
				{
					let ret = creep.room.createConstructionSite(pathVal.x, pathVal.y, STRUCTURE_ROAD);
				}
			}
		}

		require("creep.builder").run(creep);
	},
};
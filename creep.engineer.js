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
			var spawn = Game.spawns["Home"];

			creep.memory.plansDone = true;

			{ // Extensins
				for(let i = 0; i < 3; i++)
				{

					creep.room.createConstructionSite(spawn.pos.x - 3 + i, spawn.pos.y + 3, STRUCTURE_EXTENSION);
					creep.room.createConstructionSite(spawn.pos.x + 3 + i, spawn.pos.y - 3, STRUCTURE_EXTENSION);
				}
				for(let i = 0; i < 3; i++)
				{
					creep.room.createConstructionSite(spawn.pos.x + 3, spawn.pos.y - 3 + i, STRUCTURE_EXTENSION);
					creep.room.createConstructionSite(spawn.pos.x - 3, spawn.pos.y + 3 + i, STRUCTURE_EXTENSION);
				}
			}

			{ // Roads.
				var sources = creep.room.find(FIND_SOURCES);
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
						creep.room.createConstructionSite(pathVal.x, pathVal.y, STRUCTURE_ROAD);
					}
				}
			}
		}

		require("creep.builder").run(creep);
	},
};
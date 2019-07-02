var Utility = require("utility");

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
			const terrain = Game.rooms[spawn.pos.roomName].getTerrain();

			creep.memory.plansDone = true;

			//if(false)
			{ // Extensins
				for(let i = 0; i < 4; i++)
				{
					creep.room.createConstructionSite(spawn.pos.x - 3 + i, spawn.pos.y + 3, STRUCTURE_EXTENSION);
					creep.room.createConstructionSite(spawn.pos.x - 3, spawn.pos.y + 3 + i, STRUCTURE_EXTENSION);
					creep.room.createConstructionSite(spawn.pos.x + 3 + i, spawn.pos.y - 3, STRUCTURE_EXTENSION);
					creep.room.createConstructionSite(spawn.pos.x + 3, spawn.pos.y - 3 + i, STRUCTURE_EXTENSION);

					//creep.room.createConstructionSite(spawn.pos.x + (i * 2), spawn.pos.y + (i * 2), STRUCTURE_EXTENSION);
				}
			}

			{ // Roads.
				var sources = creep.room.find(FIND_SOURCES);
				var paths = [];
				if(Memory.Roads == undefined)
				{
					// from sources
					for(let source of sources)
					{
	    				// road around source
					    let roadList = Utility.getNeighborFields(source.pos);
	    				for(let roadPos of roadList)
	    				{
	    				    creep.room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
	    				}
	    				
						let p = creep.room.findPath(spawn.pos, source.pos, 
						    {
						        ignoreRoads: true,
						        ignoreCreeps: true,
						        swampCost: 1,
						        serialize: true
						    });
						paths.push(p)
					}
					// from controller
					{
						// road around controller
					    let roadList = Utility.getNeighborFields(creep.room.controller.pos);
	    				for(let roadPos of roadList)
	    				{
	    				    creep.room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
	    				}

						let p = creep.room.findPath(spawn.pos, creep.room.controller.pos,
						    {
						        ignoreRoads: true, 
						        ignoreCreeps: true,
						        swampCost: 1,
						        serialize: true
						    });
						paths.push(p);
					}
					Memory.Roads = paths;
				}
				else
				{
					paths = Memory.Roads;
				}
				
				// road around spawn
    		    /*let roadList = Utility.getNeighborFields(spawn.pos);
    			for(let roadPos of roadList)
    			{
    			    creep.room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
			    }*/

				for(let path of paths)
				{
					let p = Room.deserializePath(path)
					for(let pathVal of p)
					{
						for(let i = -1; i <= 1; i++)
						{
							for(let j = -1; j <= 1; j++)
							{
							    let tt = terrain.get(pathVal.x + i, pathVal.y + j)
								if( tt == TERRAIN_MASK_SWAMP)
								{
									creep.room.createConstructionSite(pathVal.x + i, pathVal.y + j, STRUCTURE_ROAD);
								}
							}
						}
					}
				}
			}
		}

		require("creep.builder").run(creep);
	},
};
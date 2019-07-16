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
			var Spawn = Game.spawns["Home"];
			const terrain = Game.rooms[Spawn.pos.roomName].getTerrain();

			creep.memory.plansDone = true;

			//if(false)
			{ // Extensins, storage, links
				for(let i = 0; i < 4; i++)
				{
					creep.room.createConstructionSite(Spawn.pos.x - 3 + i, Spawn.pos.y + 3, STRUCTURE_EXTENSION);
					creep.room.createConstructionSite(Spawn.pos.x - 3, Spawn.pos.y + 3 + i, STRUCTURE_EXTENSION);
					creep.room.createConstructionSite(Spawn.pos.x + 3 + i, Spawn.pos.y - 3, STRUCTURE_EXTENSION);
					creep.room.createConstructionSite(Spawn.pos.x + 3, Spawn.pos.y - 3 + i, STRUCTURE_EXTENSION);

					creep.room.createConstructionSite(Spawn.pos.x + 2 +  (i * 2), Spawn.pos.y + 2 + (i * 2), STRUCTURE_EXTENSION);
				}
				
				creep.room.createConstructionSite(Spawn.pos.x - 2, Spawn.pos.y - 2, STRUCTURE_STORAGE);
				
				{
				    var stor = creep.room.find(FIND_MY_STRUCTURES, 
				        {
				            filter:
				            {
				                structureType: STRUCTURE_STORAGE
				            }
				        });
				    if(stor && Object.keys(stor).length != 0)
				    {
				        let availablePos = Utility.getNeighborFields(stor[0].pos);
				        creep.room.createConstructionSite(availablePos[0].x, availablePos[0].y, STRUCTURE_LINK);
				    }
				    
				    var availablePos = Utility.getNeighborFields(creep.room.controller.pos);
				    var des = availablePos[Math.floor(Object.keys(availablePos).length * 0.5)];
				    creep.room.createConstructionSite(des.x, des.y, STRUCTURE_LINK);
				}
			}

			{ // Roads.
				var paths = [];
				if(Memory.Roads == undefined)
				{
					// from sources
				    var sources = creep.room.find(FIND_SOURCES);
					for(let source of sources)
					{
	    				// road around source
					    let roadList = Utility.getNeighborFields(source.pos);
	    				for(let roadPos of roadList)
	    				{
	    				    creep.room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
	    				}
	    				
						let p = creep.room.findPath(Spawn.pos, source.pos, 
						    {
						        ignoreRoads: true,
						        ignoreCreeps: true,
						        swampCost: 1,
						        serialize: true
						    });
						paths.push(p)
					}
					
					// from minerals
					var minerals = creep.room.find(FIND_MINERALS)
					for(let mineral of minerals)
					{
					    let roadList = Utility.getNeighborFields(mineral.pos);
					    for(let roadPos of roadList)
	    				{
	    				    creep.room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
	    				}
	    				
	    				let p = creep.room.findPath(Spawn.pos, source.pos, 
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

						let p = creep.room.findPath(Spawn.pos, creep.room.controller.pos,
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
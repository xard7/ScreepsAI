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
			const Spawner = Game.spawns["Home"];
			const terrain = Game.rooms[Spawner.pos.roomName].getTerrain();

			creep.memory.plansDone = true;

			//if(false)
			{ // Extensins, storage, links
				for(let i = 1; i < 10; i++)
				{
					for(let j = 0; j <= i; j++)
					{
						let xx = Spawner.pos.x - (i * 2); let yy = Spawner.pos.y - (j * 2);
						let tt = terrain.get(xx, yy);
						if( tt != TERRAIN_MASK_SWAMP)
						{
							creep.room.createConstructionSite(xx, yy, STRUCTURE_EXTENSION);
						}

						xx = Spawner.pos.x - (i * 2); yy = Spawner.pos.y + (j * 2);
						tt = terrain.get(xx, yy);
						if( tt != TERRAIN_MASK_SWAMP)
						{
							creep.room.createConstructionSite(xx, yy, STRUCTURE_EXTENSION);
						}

						xx = Spawner.pos.x + (i * 2); yy = Spawner.pos.y - (j * 2);
						tt = terrain.get(xx, yy);
						if( tt != TERRAIN_MASK_SWAMP)
						{
							creep.room.createConstructionSite(xx, yy, STRUCTURE_EXTENSION);
						}

						xx = Spawner.pos.x + (i * 2); yy = Spawner.pos.y + (j * 2);
						tt = terrain.get(xx, yy);
						if( tt != TERRAIN_MASK_SWAMP)
						{
							creep.room.createConstructionSite(xx, yy, STRUCTURE_EXTENSION);
						}
					}
				}
				
				creep.room.createConstructionSite(Spawner.pos.x - 2, Spawner.pos.y - 2, STRUCTURE_STORAGE);
				
				{
				    const cargo = creep.room.find(FIND_MY_STRUCTURES, 
				        {
				            filter:
				            {
				                structureType: STRUCTURE_STORAGE
				            }
				        });
				    if(cargo && Object.keys(cargo).length != 0)
				    {
				        const availablePos = Utility.getNeighborFields(cargo[0].pos);
				        creep.room.createConstructionSite(availablePos[0].x, availablePos[0].y, STRUCTURE_LINK);
				    }
				    
				    const availablePos = Utility.getNeighborFields(creep.room.controller.pos);
				    const des = availablePos[Math.floor(Object.keys(availablePos).length * 0.5)];
				    creep.room.createConstructionSite(des.x, des.y, STRUCTURE_LINK);
				}
			}

			{ // Roads.
				let paths = [];
				if(Memory.Roads == undefined)
				{
					// from sources
				    const sources = creep.room.find(FIND_SOURCES);
					for(let source of sources)
					{
	    				// road around source
					    const roadList = Utility.getNeighborFields(source.pos);
	    				for(let roadPos of roadList)
	    				{
	    				    creep.room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
	    				}
	    				
						let p = creep.room.findPath(Spawner.pos, source.pos, 
						    {
						        ignoreRoads: true,
						        ignoreCreeps: true,
						        swampCost: 1,
						        serialize: true
						    });
						paths.push(p)
					}
					
					// from minerals
					const minerals = creep.room.find(FIND_MINERALS)
					for(let mineral of minerals)
					{
					    const roadList = Utility.getNeighborFields(mineral.pos);
					    for(let roadPos of roadList)
	    				{
	    				    creep.room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
	    				}
	    				
	    				let p = creep.room.findPath(Spawner.pos, source.pos, 
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
					    const roadList = Utility.getNeighborFields(creep.room.controller.pos);
	    				for(let roadPos of roadList)
	    				{
	    				    creep.room.createConstructionSite(roadPos.x, roadPos.y, STRUCTURE_ROAD);
	    				}

						let p = creep.room.findPath(Spawner.pos, creep.room.controller.pos,
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
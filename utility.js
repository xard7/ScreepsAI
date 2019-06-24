module.exports = 
{
	getNumberOfAvailableFields: function(pos)
	{
		const terrain = Game.rooms[pos.roomName].getTerrain();
		var num = 0;
		for(let x = (pos.x - 1); x <= (pos.x + 1); x++)
		{
			for(let y = (pos.y - 1); y <= (pos.y + 1); y++)
			{
				if(terrain.get(x, y) != TERRAIN_MASK_WALL)
				{
					num ++;
				}
			}
		}

		return num;
	}
};
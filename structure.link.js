module.exports = 
{
    run: function(link)
    {
        if(Memory.Links_tmp[link.id])
        {
            var l = link.pos.findClosestByPath(FIND_MY_STRUCTURES,
        		{
        			filter: function(s)
        			{
        				return s.structureType == STRUCTURE_LINK && s.id != link.id;
        			}
        		});
        	if(l)
        	{
        	    link.transferEnergy(l);
        	}
        }
    }
};
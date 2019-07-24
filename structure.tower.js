module.exports = 
{
    run: function(tower)
    {
        const hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	    if(hostile != null)
	    {
	        tower.attack(hostile);
	    }
    }
};
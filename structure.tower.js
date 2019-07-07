module.exports = 
{
    run: function(tower)
    {
        let hostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
	    if(hostile != null)
	    {
	        tower.attack(hostile);
	    }
    }
};
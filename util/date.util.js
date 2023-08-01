// Extend Date object to add a method to convert to SQL datetime
Date.prototype.toSQLDateTime = function() {
    return this.toISOString().slice(0, 19).replace('T', ' ');
}

Date.prototype.getAutoPickUpTime = function() {
    return new Date(new Date().getTime() - 30*60000);
}
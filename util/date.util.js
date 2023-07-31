// Extend Date object to add a method to convert to SQL datetime
Date.prototype.toSQLDateTime = function() {
    return this.toISOString().slice(0, 19).replace('T', ' ');
}
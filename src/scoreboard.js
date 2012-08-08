/* the goal of this score board is to keep track of statistics
 * related to the functioning of different parts of the system
 * and make it easy to get that information on to the screen */

function ScoreBoard() {
    this.items = {};
}

ScoreBoard.prototype.create_count_item = function(name) {
    this.items[name] = 0;
}

ScoreBoard.prototype.report_count_item = function(name, value) {
    this.items[name] = value;
}

ScoreBoard.prototype.get_count_item = function(name) {
    return this.items[name];
}

ScoreBoard.prototype.create_avg_item = function(name, size) {
    this.items[name] = new RollingAverage(size);
}

ScoreBoard.prototype.report_avg_item = function(name, item) {
    this.items[name].add_item(item);
}

ScoreBoard.prototype.get_avg_item = function(name) {
    return this.items[name].get_average();
}

function RollingAverage(data_limit) {
    this.data_limit = data_limit;
    this.data = new Array();
    this.oldest_index = 0;
}

RollingAverage.prototype.add_item = function(item) {
    //overwrite oldest item
    this.data[this.oldest_index] = item;

    //plan on the place to put the next item and restart at 0 if needed
    this.oldest_index++;
    if (this.oldest_index >= this.data_limit) {
        this.oldest_index = 0;
    }
}

RollingAverage.prototype.get_average = function() {
    if (this.data.length == 0) {
        return 0;
    }

    var sum = 0;
    for (var i = 0; i < this.data.length; i++) {
        sum += this.data[i];
    }

    return (sum / this.data.length);
}

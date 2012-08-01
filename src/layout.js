function Layout() {
    this.num_rows = 2;
    this.num_columns = 2;
    this.camera_dimension_ratio = 4 / 3;

    //scale images whenever the browser display area changes
    var that = this;
    window.onresize = function(e) {
        that.set_dimensions();
    }
}

Layout.prototype.screen_width = function() {
    return window.innerWidth;
};

Layout.prototype.screen_height = function() {
    return window.innerHeight;
};

Layout.prototype.get_delay_image_height = function() {
    return this.screen_height() / this.num_rows;
};

Layout.prototype.get_delay_image_width = function() {
    return this.get_delay_image_height() * this.camera_dimension_ratio;
};

Layout.prototype.set_dimensions = function() {
    this.set_delay_image_dimensions();
    this.set_outer_div_width();
}

Layout.prototype.set_delay_image_dimensions = function() {
    //set dimensions of images
    var height = this.get_delay_image_height();
    var width = this.get_delay_image_width();
    $(".delay").each(function(index, elem) {
        $(elem).css({'width': width, 'height': height});
    });
};

Layout.prototype.set_outer_div_width = function() {
    //set width of outer div to proper size to facilitate centering
    var div_width = this.get_delay_image_width() * this.num_columns;
    $("div#images").css({'width': div_width});
}

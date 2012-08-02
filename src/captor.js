/* A lot of help with getUserMedia came from Eric Bidelman's Photobooth demo:
   http://html5-demos.appspot.com/static/getusermedia/photobooth.html
*/

/* handle potentially prefixed functions */
navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.getUserMedia;
window.URL = window.URL || window.webkitURL;

function Captor(scoreboard) {
    this.scoreboard = scoreboard;
    this.scoreboard.create_avg_item("copy_to_canvas_time", 100);
    this.scoreboard.create_avg_item("to_data_url_time", 100);

    this.create_elements();

    var that = this;
    navigator.getUserMedia({video: true},
        function(stream) {
            that.got_stream(stream);
        }, function() {
            that.no_stream()
        });
}

Captor.prototype.create_elements = function() {
    $('body').append('<video id="monitor" autoplay style="display:none"></video>');
    $('body').append('<canvas id="mirror" style="display:none"></canvas>');
    this.video_element = $("video#monitor").get(0);
    this.canvas_element = $("canvas#mirror").get(0);
    this.context = this.canvas_element.getContext('2d');
}

Captor.prototype.got_stream = function(stream) {
    /* connect media stream to video element */
    if (window.URL) {
        this.video_element.src = window.URL.createObjectURL(stream);
    } else {
        this.video_element.src = stream; //opera
    }

    /* handle error conditions */
    this.video_element.onerror = function(e) {
        stream.stop();
    };
    stream.onended = this.no_stream;

    /* set canvas to have same dimension as video element */
    /* video.onloadmetadata is not firing in chrome so we
     * fake it with this timeout.  See crbug.com/110938 */
    var that = this;
    setTimeout(function() {
        that.canvas_element.width = that.video_element.videoWidth;
        that.canvas_element.height = that.video_element.videoHeight;
    }, 50);
}

Captor.prototype.no_stream = function(e) {
    alert("No camera available or permission was denied.");
}

Captor.prototype.get_frame = function() {
    var start = (new Date).getTime();

    /* copy video data on to the canvas */
    this.context.drawImage(this.video_element, 0, 0);
    var copy_to_canvas_time = (new Date).getTime();

    /* return an image of the canvas data as a data URL
     * webp was too slow to return from toDataURL
     * png was too slow when updating all of the images */
    var frame_data =  this.canvas_element.toDataURL('image/jpeg');
    var to_data_url_time = (new Date).getTime();

    this.scoreboard.report_avg_item("copy_to_canvas_time", copy_to_canvas_time - start);
    this.scoreboard.report_avg_item("to_data_url_time", to_data_url_time - start);

    return frame_data;
}

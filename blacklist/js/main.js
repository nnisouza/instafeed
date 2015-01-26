 var eq, howMuch, timeoutId;
$( document ).ready(function() {
    feed = new Instafeed({
        get: 'tagged',
        tagName: 'juefill',
        userId: 141970,
        accessToken: '141970.467ede5.edbc9c37472d41b790e1db8948793f11',
        sortby: 'least-recent',
        resolution: 'thumbnail',
        links: 'false',
        limit: '60',
        template: '<li><input type="checkbox" id="{{id}}" name="{{id}}"/><label for="{{id}}"><img src="{{image}}"/></label></li>', 
        after: function(){
            $.ajaxSetup({ cache: false });
            $.getJSON( 'blacklist.json', function( json ) {
                for(var i = 0; i < json.length; i++) {
                    var blacklist = json[i];
                    var select = $('input#' + blacklist.id);
                    select.prop('checked', true);
                }
            });
        }
    });
    feed.run();
});
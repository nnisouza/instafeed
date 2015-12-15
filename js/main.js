var eq, howMuch, timeoutId;
$( document ).ready(function() {
    feed = new Instafeed({
        get: 'tagged',
        tagName: 'formaturaGnz2015',
        userId: 141970,
        accessToken: '141970.467ede5.edbc9c37472d41b790e1db8948793f11',
        sortby: 'least-recent',
        resolution: 'standard_resolution',
        links: 'false',
        limit: '60',
        template: '<li class="{{id}}"><span class="instaitem"><span style="background-image: url({{image}});background-size: cover;-webkit-filter: blur(8px);background-position: center center;background-attachment: fixed;"></span><img src="{{image}}"/></span></span><div></div></li>', 
        after: function(){
            $.ajaxSetup({ cache: false });
            $.getJSON( 'blacklist/blacklist.json', function( json ) {
                for(var i = 0; i < json.length; i++) {
                    var blacklist = json[i];
                    var select = $('.' + blacklist.id);
                    select.remove();
                }
                timeoutId = setTimeout(leAnimation, 6000);

                setTimeout(function(){
                    $('.loader').addClass('hide');
                }, 6000);
            });
            eq = 0;
            //timeoutId = setTimeout(leAnimation, 6000);
            //setTimeout(function(){
            //    $('.loader').addClass('hide');
            //}, 6000);
        }
    });

    feed.run();

    function lastOne() {
        $('.loader').removeClass('hide');
        $('#instafeed li').remove();
        feed.run();
        eq = 0;
    };
    function leAnimation() {
        howMuch = $('#instafeed li').length;
        clearTimeout(timeoutId);
        if (eq == 0) {
            if ($('li').eq(0).hasClass('active')) {
                eq++
            } else {
                $('li').eq(eq).addClass('active');
                eq++
            }
        } else {
            $('li').eq(eq - 1).removeClass('active');
            $('li').eq(eq).addClass('active');
            eq++;
            if (eq > howMuch) {
                lastOne();
                $('li').eq(eq).addClass('active');
                eq++
            }
        }
        setTimeout(leAnimation, 6000);
    }
});
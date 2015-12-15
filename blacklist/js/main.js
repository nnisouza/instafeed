var eq, howMuch, timeoutId;
var el = document.documentElement,
    rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;

$( document ).ready(function() {
    apply();
    
    if(rfs) {
        $('#fullscreen').show();
    }
    
    $('#fullscreen').click(function() {
        $(this).hide();
        rfs.call(el);
    });
    
    $('#reload').click(update);
    
    $('form').submit(function(e) {
        e.preventDefault();
        var url = $(this).attr('action');
        var data = $(this).serialize();
        
        $('#submit').html('<i class="fa fa-circle-o-notch fa-spin"></i> &nbsp; Salvando...');
        
        $.post(url, data, function() {
            update();
            
            $('#submit').addClass('success');
            $('#submit').html('<i class="fa fa-check"></i> &nbsp; Salvo com sucesso');
            
            setTimeout(function() {
                $('form').removeClass('dirty');
            }, 800);
            setTimeout(function() {
                $('#submit').removeClass('success');
                $('#submit').html('<i class="fa fa-floppy-o"></i> &nbsp; Salvar alterações');
            }, 900);
        });
    });
});

function update() {
    $('#reload').html('<i class="fa fa-refresh fa-spin"></i> &nbsp; Carregando...');
    $('#instafeed li').remove();
    apply();
}

function apply() {
    feed = new Instafeed({
        get: 'tagged',
        tagName: 'formaturaGnz2015',
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
            
            $('input').click(function() {
                $('form').addClass('dirty');
            });
            
            $('#reload').html('<i class="fa fa-refresh"></i> &nbsp; Atualizar lista');
        }
    });
    feed.run();
    
}
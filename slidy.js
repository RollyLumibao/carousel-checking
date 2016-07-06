jQuery(document).ready(function ($) {

    var $slider = $('#slider');
    var slideCount = $('#slider ul li').length;
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var sliderUlWidth = slideCount * slideWidth;
    var mouseIn=false;
    var activeInd=0;
    var directionIs="totheright";
   //
    $('#slider').css({ 
        width: slideWidth, 
        height: slideHeight 
    });
    
    $('#slider ul').css({ 
        width: sliderUlWidth, 
        marginLeft: - slideWidth
     });
    
    $('#slider ul li:last-child').prependTo('#slider ul');
    
    //functions 

    setInterval(function ()
     {
    if (mouseIn) return;
         if(directionIs==="totheright")
         {
            moveRight();
         }
        else if(directionIs==="totheleft")
         {
            moveLeft();
         }
     }, 2000
    );
   
   showDots();

             function showDots()
              {
                    var m = '';
                    for ( var i = 0 ; i <slideCount ; i ++ ) 
                    {
                        m += '<b no="'+i+'">-</b>';
                    }
                    $slider.append('<nav class="dots">' + m + '</nav>');
                    var $dots = $slider.find('.dots');
                    $dots.css( {
                        'position': 'absolute',
                        'z-index': 987654321,
                        'bottom' : 0,
                        'left' : 0,
                        'right' : 0,
                        'text-align' : 'center',
                        'font-size': '40px',
                        'color': 'black',
                        'line-height' : '20px',
                        'cursor': 'pointer',

                    });
                    $dots.find(':eq(0)').css({
                        'color': 'white'
                    });
                  
                }

                 function moveDots() {
                    
                    var $dots = $slider.find('.dots');
                    $dots.find('b').css('color', '#494949');
                    $dots.find('b:eq("'+getActiveNo()+'")').css('color', 'white');
                    
                }

                function increaseActiveNo() {
                    ++ activeInd;
                }
                function decreaseActiveNo() {
                    -- activeInd;
                }

                function getActiveNo() {
                    if ( activeInd >= slideCount ) activeInd = 0;
                    else if ( activeInd < 0 ) activeInd = slideCount - 1;
                    return activeInd;
                }
                
                

           
    function moveLeft() 
    {
         decreaseActiveNo();
         moveDots();
        $('#slider ul').animate({
            left: + slideWidth

        }, 400, function () {

            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight()
    {
        increaseActiveNo();
         moveDots();
        $('#slider ul').animate({
            left: - slideWidth
          
        }, 400, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        directionIs="totheleft";
        moveLeft();
    });

    $('a.control_next').click(function () {
         directionIs="totheright";
         moveRight();
    });
    

     $slider
        .on('mouseenter', pauseAnimation)
        .on('mouseleave', resumeAnimation);

         function pauseAnimation() {
                    mouseIn = true;
        }
        function resumeAnimation() {
                    mouseIn = false;
        }

});    


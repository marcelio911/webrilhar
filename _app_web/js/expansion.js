$(document).ready(
	//menu
	function(){$('.topo').fadeIn(0, function(){});$(".linha").hover(function(){$(this).children('ul').addClass('expanded');$('.expanded').fadeIn('fast', function() {});});$("#conteudo").hover(function(){$('.expanded').fadeOut('slow',function(){});$('.expanded').removeClass('expanded');});$(".expanded").mouseout(function(){$('.expanded').fadeOut('slow',function(){});$('.expanded').removeClass('expanded');}); }
);

//banner
$("#container_mas div:not(jobBox)").live({
	mouseenter:
	   function() {
			$(this).find("a span.details").fadeIn(100);	
	   },
	mouseleave:
	   function() {
			$(this).find("a span.details").fadeOut(100);
	   }
});


//animacao banner
$('#promocoes').live({
   mouseenter:
	   function(){
		$(this).stop().animate({backgroundColor:'#FBEFED'}, {duration:500});
	  },
   mouseleave:
   function(){
    $(this).stop().animate({backgroundColor:'#fafafa'}, {duration:500});
  }
 });

 
 function rotateImages(){    
var curPhoto = jQuery("#slides .ativo");
    var nxtPhoto = curPhoto.next();     
    var curTab = jQuery("#controle ul li.ativo");
    var nxtTab = curTab.next();             
    var curTxt = jQuery(".descricao .texto-desc.ativo");
    var nxtTxt = curTxt.next();             
    if (nxtPhoto.length == 0) {
        nxtPhoto = jQuery('#slides .slideimg:first');   
        nxtTab = jQuery('#controle ul li:first-child');
        nxtTxt = jQuery('.descricao .texto-desc:first-child');                  
    }                   

    curTab.removeClass('ativo');
    nxtTab.addClass('ativo');
    showImage(nxtPhoto, 300);
    showTxt(nxtTxt,300);
 }// aquela que faz o baguio girar
function showImage(img, duration){
		jQuery('.ativo img').css({'width':'600px'});
        jQuery('#slides .slideimg').fadeOut(300).removeClass('ativo').addClass('inativo');
        img.animate({opacity:1.0, left:"45px"}, duration, function(){        
			jQuery(this).removeClass('inativo');
			jQuery(this).addClass('ativo').fadeIn(300);
			jQuery('.ativo img').animate({width:'700px', top:"45px"},3000, function(){});
			jQuery('#promocoes').stop().animate({duration:100});
		});     
}//mostraimg
function showTxt(img, duration){ 
      jQuery('.descricao .texto-desc').fadeOut(300).removeClass('ativo').addClass('inativo')
        img.animate({opacity:1.0}, duration, function(){        
        jQuery(this).removeClass('inativo');
        jQuery(this).addClass('ativo').fadeIn(300);
    });     
}//mostra texto

jQuery(document).ready(function( $ ){
	//top	
   $(window).scroll(function () {
        if ($(this).scrollTop() > 80) {
            $('#top').css({
                'position' : 'fixed',
                'top' : '0',
				'display': 'table'
            });
        } else {
            $('#top').css({
                'display': 'none'
            });
        }
    });
 
	//splash
	$('.splash img').stop().animate({opacity: 1},6000, function(){
		$(this).css("-webkit-transform", "rotate("+ $("#txtDeg").val() + "deg)");
		$('.inicial').animate({left:'0'},1000, function(){
			window.location.href='index2.php';
		});
	});
	
	
    $('#controle li a').each(function(index){
    $(this).prepend('<span class="myNumberClass">'+ (index+1) +'</span>')
});//contagem do controle
    $('.descricao .texto-desc').each(function(e){
        if(e == 0){
            $(this).addClass('ativo');
        }
        else {
            $(this).addClass('inativo');
        }
    });//set ativo inativo DESCRICAO
    $('.slideimg').each(function(e){
        if(e == 0){
            $(this).addClass('ativo');
        }
        else {
            $(this).addClass('inativo');
        }
    });//set ativo inativo #slideimg

function runRotateImages(){
    xx = setInterval("rotateImages()", 7000);   
}//roda
runRotateImages();  
    $("#promocoes").hover(
        function(){                 
            clearTimeout(xx);
        }, 
        function(){                 
            runRotateImages();
        }
    )
//agora click function pros controle uhul
$('#controle ul li a').click(function(event){
    event.preventDefault();
    alert('muahuahua');

})
});//docready
 
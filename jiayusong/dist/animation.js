function numAnimation( i , j , randNumber ){  
   var numberCell = $('#number-cell-' + i + "-" + j );  
  
    numberCell.css('background-color',getBackGroundColor( randNumber ) );  
    numberCell.css('color',getNumberColor( randNumber ) );  
    numberCell.text( randNumber );  
  
    numberCell.animate({  
        width:'100px',  
        height:'100px',  
        top:Top( i , j ),  
        left:Left( i , j )  
    },50);  
}  
function moveAnimation( fromx , fromy , tox, toy ){  
  
    var numberCell = $('#number-cell-' + fromx + '-' + fromy );  
    numberCell.animate({  
        top:Top( tox , toy ),  
        left:Left( tox , toy )  
    },200);  
}  
function updateScore(score)  
{  
    $('#score').text(score);  
}  
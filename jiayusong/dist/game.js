var arr=new Array();  
  var score=0;  //创建score变量用来存储分数
var hasConflicted=new Array();  //这个是用来帮助后面判断前面的数字是否已经叠加的状况 防止出现2 2 4 直接8了的情况
//页面加载完成后，开始一个新游戏  
$(document).ready(function(){  
    newGame();  
});  
  
function newGame()  
{  
     
    init();  //初始化 
  randomOneNumber();  
  randomOneNumber();  //随机生成一个数字，就如同我们看到的新游戏时的两个数字  
  
  updateScore(score);   //刷新分数 
}  



function init()  
{  
    for(var i=0;i<5;i++)  
    {  
        for(var j=0;j<5;j++)  
        {  
            var gridCell=$("#grid-cell-"+i+"-"+j);  
            gridCell.css("top",Top(i,j));  
            gridCell.css("left",Left(i,j));  
        }  
    }  
//以上为gridcell定义位置
        for(var i=0;i<5;i++)  
    {  
      arr[i]=new Array();  
    hasConflicted[i]=new Array();  
        for(var j=0;j<5;j++)  
        {  
          arr[i][j]=0;  
      //此处依然为每个数字没有发生叠加  
      hasConflicted[i][j]=false;  
        }  
    }  
  score=0;  
    updateBoardView(); //刷新 
  
      
}  

  function updateBoardView()  
  {  
 //先移掉上一次面板数据  再放新的
    $(".number-cell").remove();  
    
    for(var i=0;i<5;i++)  
    {  
            for(var j=0;j<5;j++)  
            {   
                $(".grid-container").append("<div class='number-cell' id='number-cell-"+i+'-'+j+"'></div>");    
                var theNumberCell=$("#number-cell-"+i+"-"+j);   
            //如果此数字块的值为0，则此数字块不显示  
                  if(arr[i][j]==0)  
              {  
                theNumberCell.css('width','0px');  
                theNumberCell.css('height','0px');  
                theNumberCell.css('top',Top(i,j)+50);  
                theNumberCell.css('left',Left(i,j)+50);  
              }  
              //若不为0，则显示  
              else  
              {  
                theNumberCell.css('width','100px');  
                theNumberCell.css('height','100px');  
                theNumberCell.css('top',Top(i,j));  
                theNumberCell.css('left',Left(i,j));  
                theNumberCell.css('background-color',getBackGroundColor(arr[i][j]));  
                theNumberCell.css('color',getNumberColor(arr[i][j]));  
                theNumberCell.text(arr[i][j]);  
  
              }   
              //没有发生叠加  
              hasConflicted[i][j]=false;     
            }  
    }  
      
      
  
  }  
 

function randomOneNumber()  
{  
//先判断是否有剩余空间
    if (noSpace(arr))   
    {  
       return false;  
    }  
  
    //随机选择一个位置 定义坐标x,y 即 i,j  
    var randomX=parseInt(Math.floor(Math.random()*5));  
    var randomY=parseInt(Math.floor(Math.random()*5));  
       
    while(true)  
    {  
      if(arr[randomX][randomY]==0)  
      {  
         break;  
      }  
      randomX=parseInt(Math.floor(Math.random()*5));  
      randomY=parseInt(Math.floor(Math.random()*5));  
    }    
    var randNumber=Math.random() < 0.5 ? 2 : 4 ;   
    arr[randomX][randomY]=randNumber;  
    numAnimation(randomX,randomY,randNumber); //显示 
    return true;  
}  


$(document).keydown(function(event){  
     //首先先阻止键盘的默认事件 
     event.preventDefault();  
 
    switch(event.keyCode)  
    {    
      case 37:   
         if(moveLeft())  
         {  
            setTimeout('randomOneNumber()',210);  
            setTimeout('isGameOver()',300);  
         }  
      break;  
      case 38:  
          if(moveUp())  
         {  
            setTimeout('randomOneNumber()',210);  
            setTimeout('isGameOver()',300);  
         }    //up  
      break;  
      case 39:   
         if(moveRight())  
           {  
            setTimeout('randomOneNumber()',210);  
            setTimeout('isGameOver()',300);  
           }   //right  
      break;  
      case 40:   
        if(moveDown())  
           {  
            setTimeout('randomOneNumber()',210);  
            setTimeout('isGameOver()',300);  
           }   //down  
      break;  
      default:  
      break;  
    }    
});  

function moveLeft()  
{  
 
    if(!canMoveLeft(arr))  
    {  
      return false;  
    }  
   
    for(var i=0;i<5;i++)  
    {  
      for(var j=1;j<5;j++)  
      {  //移动的只能为不为0的numbercell
        if(arr[i][j]!=0)  
        {  
          for(var k=0;k<j;k++)  
          {  
         //如果[i][j]位置的数字要运动到[i][k]位置，且此位置为0，  
            //并且两个位置之间numbercell都是0
            if(arr[i][k]==0&&noRowBlock(i,k,j,arr))  
            {  
              //可以移动到[i][k]位置
              moveAnimation( i , j , i , k );  
              arr[i][k]=arr[i][j]  
              arr[i][j]=0;  
              continue;  
            }  
            //如果有可以叠加的情况 即相等的两个中间要么没有numbercell要么其均为零
            else if(arr[i][k]==arr[i][j]&&noRowBlock(i,k,j,arr)&&!hasConflicted[i][k])  
            {  
           
              moveAnimation( i , j , i , k ); 
              arr[i][k]+=arr[i][j];  
              arr[i][j]=0;  
              
              score+=arr[i][k];  
              updateScore(score);  
    
              hasConflicted[i][k]=true;  //将目的位置标记为发生过叠加  
              continue;  
            }  
          }  
        }  
      }  
    }  
    setTimeout('updateBoardView()',200);  
    return true;  
}  
function moveUp()  
{  
    if(!canMoveUp(arr))  
    {  
      return false;  
    }  
    //moveLeft  
    for(var i=1;i<5;i++)  
    {  
      for(var j=0;j<5;j++)  
      {  
        if(arr[i][j]!=0)  
        {  
          for(var k=0;k<i;k++)  
          {  
            if(arr[k][j]==0&&noColBlock(j,k,i,arr))  
            {  
              moveAnimation( i , j , k , j );  
              arr[k][j]=arr[i][j]  
              arr[i][j]=0;  
              continue;  
            }  
            else if(arr[k][j]==arr[i][j]&&noColBlock(j,k,i,arr)&&!hasConflicted[k][j])  
            {  
              moveAnimation( i , j , k , j );  
              arr[k][j]+=arr[i][j];  
              arr[i][j]=0;  
              score+=arr[k][j];  
              updateScore(score);  
              hasConflicted[k][j]=true;  
              continue;  
            }  
          }  
        }  
      }  
    }  
    setTimeout('updateBoardView()',200);  
    return true;  
}  
function moveRight()  
{  
    if(!canMoveRight(arr))  
    {  
      return false;  
    }  
    //moveLeft  
    for(var i=0;i<5;i++)  
    {  
      for(var j=3;j>=0;j--)  
      {  
        if(arr[i][j]!=0)  
        {  
          for(var k=4;k>j;k--)  
          {  
            if(arr[i][k]==0&&noRowBlock(i,j,k,arr))  
            {  
              moveAnimation( i , j , i , k );  
              arr[i][k]=arr[i][j]  
              arr[i][j]=0;  
              continue;  
            }  
            else if(arr[i][k]==arr[i][j]&&noRowBlock(i,j,k,arr)&&!hasConflicted[i][k])  
            {  
              moveAnimation( i , j , i , k );  
              arr[i][k]+=arr[i][j];  
              arr[i][j]=0;  
              score+=arr[i][k];  
              updateScore(score);  
              hasConflicted[i][k]=true;  
              continue;  
            }  
          }  
        }  
      }  
    }  
    setTimeout('updateBoardView()',200);  
    return true;  
}  
function moveDown()  
{  
    if(!canMoveDown(arr))  
    {  
      return false;  
    }  
    //moveLeft  
    for(var i=0;i<4;i++)  
    {  
      for(var j=0;j<5;j++)  
      {  
        if(arr[i][j]!=0)  
        {  
          for(var k=4;k>i;k--)  
          {  
            if(arr[k][j]==0&&noColBlock(j,i,k,arr))  
            {  
              moveAnimation( i , j , k , j );  
              arr[k][j]=arr[i][j]  
              arr[i][j]=0;  
              continue;  
            }  
            else if(arr[k][j]==arr[i][j]&&noColBlock(j,i,k,arr)&&!hasConflicted[k][j])  
            {  
              moveAnimation( i , j , k , j );  
              arr[k][j]+=arr[i][j];  
              arr[i][j]=0;  
              score+=arr[k][j];  
              updateScore(score);  
              hasConflicted[k][j]=true;  
              continue;  
                
            }  
          }  
        }  
      }  
    }  
    setTimeout('updateBoardView()',200);  
    return true;  
}  
//判断是否游戏结束的具体过程  
function isGameOver()  
{  
  //如果已经没有空间可产生新数字并且现有的数字没有可移动的了  
  if (noSpace(arr) && noMove())   
  {  
    //则弹出Game Over!  
    alert('Game Over!');  
  }  
}  
//判断没有数字可移动的过程  
function noMove()  
{  
  if(canMoveDown(arr)||canMoveLeft(arr)||canMoveRight(arr)||canMoveUp(arr))  
  {  
    return false;  
  }  
  return true;  
}  
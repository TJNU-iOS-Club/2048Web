function Top(i,j)  
{  
    return 20+i*120;  
}  
function Left(i,j)  
{  
    return 20+j*120;  
}  
function getBackGroundColor(number)  
{  
   switch(number)  
   {  
        case 2:return "#eee4da";break;  
        case 4:return "#ede0c8";break;  
        case 8:return "#f2b179";break;  
        case 16:return "#f59563";break;  
        case 32:return "#f67c5f";break;  
        case 64:return "#f65e3b";break;  
        case 128:return "#edcf72";break;  
        case 256:return "#edcc61";break;  
        case 512:return "#9c0";break;  
        case 1024:return "#33b5e5";break;  
        case 2048:return "#09c";break;  
        case 4096:return "#a6c";break;  
        case 8192:return "#93c";break;  
   }  
   return "black";  
}  
function getNumberColor( number ){  
    if( number <= 5 )  
        return "#776e65";  
  
    return "white";  
}  
function noSpace(arr)  
{  
    for(var i=0;i<5;i++)  
    {  
        for (var j=0;j<5;j++)  
        {  
            if(arr[i][j]==0)  
            {  
                return false;  
            }  
        }  
    }  
    return true;  
}  
  
function canMoveLeft(arr)  
{  
   for(var i=0;i<5;i++)  
  {  
      for (var j=1;j<5;j++)  
      {  
        if(arr[i][j]!=0)  
        {  
          if(arr[i][j-1]==0||arr[i][j-1]==arr[i][j])  
          {  
            return true;  
          }  
        }  
      }  
  }  
  return false;  
}  
function canMoveUp(arr)  
{  
  for(var i=1;i<5;i++)  
  {  
      for (var j=0;j<5;j++)  
      {  
        if(arr[i][j]!=0)  
        {  
          if(arr[i-1][j]==0||arr[i-1][j]==arr[i][j])  
          {  
            return true;  
          }  
        }  
      }  
  }  
  return false;  
}  
function canMoveRight(arr)  
{  
   for(var i=0;i<5;i++)  
  {  
      for (var j=0;j<4;j++)  
      {  
        if(arr[i][j]!=0)  
        {  
          if(arr[i][j+1]==0||arr[i][j+1]==arr[i][j])  
          {  
            return true;  
          }  
        }  
      }  
  }  
  return false;  
}  
function canMoveDown(arr)  
{  
  for(var i=0;i<4;i++)  
  {  
      for (var j=0;j<5;j++)  
      {  
        if(arr[i][j]!=0)  
        {  
          if(arr[i+1][j]==0||arr[i+1][j]==arr[i][j])  
          {  
            return true;  
          }  
        }  
      }  
  }  
  return false;  
}  
function noRowBlock(row,col1,col2,arr)  
{  
  for(var i=col1+1;i<col2;i++)  
  {  
    if(arr[row][i]!=0)  
    {  
      return false;  
    }  
  }  
  return true;  
}  
function noColBlock(col,row1,row2,arr)  
{  
  for(var i=row1+1;i<row2;i++)  
  {  
    if(arr[i][col]!=0)  
    {  
      return false;  
    }  
  }  
  return true;  
}  
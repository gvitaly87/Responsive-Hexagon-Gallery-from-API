'use strict';
import populateGallery from './populate-gallery.mjs';

populateGallery();

// 2-cols 1037px; 3-cols 1557px 4-cols 2077px etc. 
//each time add 520px starting at 517
// get Starting Column number
let prevColNum = Math.floor( (innerWidth -517) / 520 ) + 1;

const adjustGrid = (cols) => {
  const figureList = document.querySelectorAll('figure');
  const rows = Math.ceil( figureList.length / cols ); 

  document.querySelector(':root').style.setProperty("--gridRowsD2", Math.ceil( rows / 2 ));

  for ( let i = 0 ; i < rows ; i++ ) {
    for ( let j = 0 ; j < cols; j++ ) {
      const figCount = i * cols + j;
      // only need to adjust the even rows using class even-row 
      if( i % 2 == 0 ) {
        if (figureList[figCount].classList.contains('even-row')){
          figureList[figCount].classList.remove('even-row');
        }
      } else {
        figureList[figCount].classList.add('even-row');
      }
    }
  }
};

adjustGrid(prevColNum);

window.addEventListener('resize', () => {
  let colsNum = Math.floor( (innerWidth -517) / 520 ) + 1;
  // Need to update the grid only if the column number changes
  if (colsNum !== prevColNum)  {
    adjustGrid(colsNum);
    prevColNum = colsNum;
  }
});
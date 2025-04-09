/*
这个js是给跨性别群体的彩蛋，在每年“国际跨性别现身日”中触发。
Index中的标题中的“GTEJR”五个字母会变成跨性别旗的五个颜色
*/



function updateText() {
    const targetMonth = 3; // JavaScript 的月份从 0 开始，0 代表一月
    const targetDay = 1;
  // 2 31
    const today = new Date();
  
    if (today.getMonth() === targetMonth && today.getDate() === targetDay) {
      const coloredGTEJR = `
        <span class="c-t1">隨</span>
        <span class="c-t2">機</span>
        <span class="c-t3">點</span>
        <span class="c-t2">名</span>
        <span class="c-t1">機</span>
      `;
      const originalText = document.getElementById("Main_title").textContent;
      const newText = originalText.replace("隨機點名機", coloredGTEJR);
      document.getElementById("Main_title").innerHTML = newText;
    }
  }
  
  updateText();
  setInterval(updateText, 24 * 60 * 60 * 1000);
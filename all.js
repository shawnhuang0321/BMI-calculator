var datalist = document.querySelector('#datalist');
var resultBtn = document.querySelector('#resultBtn');
var data = JSON.parse(localStorage.getItem('bmiData')) || []
updateList(data);

// 監聽
resultBtn.addEventListener('click', calBMI, false);
datalist.addEventListener('click', cancel, false);

// 新增
function calBMI() {

    // 身高 體重 BMI
    let htNum = document.querySelector('#height').value;
    let wtNum = document.querySelector('#weight').value;

    // 判斷輸入的內容是否為有效數字
    if( htNum.trim() == '' || wtNum.trim() == '' || isNaN(htNum) || isNaN(wtNum) ){
        alert('請填入有效數字');
        return;
    }

    let ht = parseInt(htNum);
    let wt = parseInt(wtNum);
    let bmi = (wt / [( ht / 100 ) * ( ht / 100 )]).toFixed(1);
    let bmicolor = '';
    let bmistatus = '';

    // 時間
    let timeYear = new Date().getFullYear();
    let timeMonth = new Date().getMonth() + 1;
    let timeDate = new Date().getDate();
    let timeHours = new Date().getHours();
    let timeMin = new Date().getMinutes();

    // 判斷 BMI 並給予特定 class
    if( bmi <= 18.5 ){
        bmicolor = 'BMIlv2'
        bmistatus = '過輕'
    }
    else if( bmi >18.5 && bmi <=23.9 ){
        bmicolor = 'BMIlv1'
        bmistatus = '理想'
    }
    else if( bmi >23.9 && bmi <=27.9 ){
        bmicolor = 'BMIlv3'
        bmistatus = '過重'
    }
    else if( bmi >27.9 ){
        bmicolor = 'BMIlv5'
        bmistatus = '肥胖'
    }

    // 加入 localstorage
    let bmiData = {
        dataBmicolor: bmicolor,
        dataBmistatus: bmistatus,
        dataBmi: bmi,
        dataHtNum: htNum,
        dataWtNum: wtNum,
        dataTime: timeYear + '/' + timeMonth + '/' + timeDate + '  ' + timeHours + ':' + timeMin
    }
    data.unshift(bmiData);
    localStorage.setItem('bmiData', JSON.stringify(data));
    updateList(data);
    document.querySelector('#height').value = '';
    document.querySelector('#weight').value = ''
}

// 刪除 
function cancel(e) {
    e.preventDefault();
    if( e.target.nodeName !== 'A' ){
        return;
    }
    var num = e.target.dataset.num;
    data.splice(num, 1);
    updateList(data);
    localStorage.setItem('bmiData',JSON.stringify(data));
}

// 更新 list
function updateList(items) {
    let str = '';
    for( i=0; i<data.length; i++ ){
        str += `<li class="personInfo ${items[i].dataBmicolor}">
        <div class="status">
            <p>${items[i].dataBmistatus}</p>
        </div>
        <div class="BMI">
            <p>BMI <span>${items[i].dataBmi}</span></p>
        </div>
        <div class="tall">
            <p>Height <span>${items[i].dataHtNum}</span> cm</p>
        </div>
        <div class="fat">
            <p>Weight <span>${items[i].dataWtNum}</span> kg</p>
        </div>
        <div class="day">
            <p>${items[i].dataTime}</p>
        </div>
        <a href="#" class="cancel" data-num="${i}">&times;</a>
        </li>`
    }
    datalist.innerHTML = str;
}

var app = new Vue({
    el:'#app',
    data:function(){
    	return {
    		singleRadio:'pureNew',
	        age:'',
	        startWork:'',
	        retireAge:'',
	        income:'',
	        defaultIncomeRate: 3,
	        defaultRetirmentRate: 6,
	        voluteerRate: 0,
	        retirmentRoi: 3,
	        result:'',
	        monthResult:'',
	        monthRetirmentTxt:'預估每月可領退休金',
	        oldMoney:'',
	        convertToNew:'',
	        desIsShow:false,
	        canClick:true,
	        cookieId:'',
	        retireLife:0,
	        readingIsShow:false,
	        admirTxtArray:[
	            {
	                'isShow':false,
	                'txt':'年齡不得為空'
	            },
	            {
	                'isShow':false,
	                'txt':'年齡不得小於開始工作年齡',
	            },
	            {
	                'isShow':false,
	                'txt':'開始工作年齡不得為空',
	            },
	            {
	                'isShow':false,
	                'txt':'開始工作年齡不得小於16歲',
	            },
	            {
	                'isShow':false,
	                'txt':'預計退休年齡不得為空',
	            },
	            {
	                'isShow':false,
	                'txt':'您已退休，無法計算',
	            },
	            {
	                'isShow':false,
	                'txt':'轉入新制當年年齡不得為空',
	            },
	            {
	                'isShow':false,
	                'txt':'轉入新制當年年齡不得小於16歲',
	            },
	            {
	                'isShow':false,
	                'txt':'每月薪資不得為空'
	            },
	            {
	                'isShow':false,
	                'txt':'退休金提繳率不得低於6%'
	            },
	            {
	                'isShow':false,
	                'txt':'自願提繳率不得高於6%'
	            },
	        ]
    	}
        
    },
    watch: {
        singleRadio: function () {
            this.age =''; this.retireAge = ''; this.income = ''; 
            this.startWork =''; this.result = ''; this.monthResult = ''; this.convertToNew = ''; this.oldMoney = '';
            this.defaultIncomeRate = 3; this.voluteerRate = 0; this.defaultRetirmentRate = 6; this.retirmentRoi = 3;
            this.canClick = true; this.retireLife = 0;
            for (var i = 0; i<11; i++) {
                this.admirTxtArray[i].isShow = false;
            }
        },
        age:function() {
            this.canClick = true;
        },
        income:function() {
            this.canClick = true;
        },
        retireAge:function() {
            this.canClick = true;
        },
        convertToNew:function() {
            this.canClick = true;
        },
        startWork:function() {
            this.canClick = true;
        },
        firstMoney:function() {
            this.canClick = true;
        },
        defaultRetirmentRate:function() {
            this.canClick = true;
        },
        defaultIncomeRate:function() {
            this.canClick = true;
        },
        voluteerRate:function() {
            this.canClick = true;
        },
        retirmentRoi:function() {
            this.canClick = true;
        }


    },
    computed: {
        remainAge: function() {
            if (this.age >= 37 && this.age < 85) {
                return 82 - this.age;
            }else if(this.age >= 85) {
                return 7
            }else {
                return 81 - this.age;
            }
        },
        workYear: function() {
            return this.retireAge - this.startWork;
        },
        workYear1: function() {
            return this.retireAge - this.convertToNew;
        },

        // 計算每年提繳額
        calYearWithdraw: function() {
            var monthlyWithdraw = this.salaryWithdraw;
            var monthlyWithdrawRate = [];
            var numbered = Number(this.defaultRetirmentRate);
            var numbered2 = Number(this.voluteerRate);
            monthlyWithdraw.forEach(function(item){
                var plusItem = (item * numbered/100) + (item * numbered2/100);
                monthlyWithdrawRate.push(plusItem);
            });
            return monthlyWithdrawRate;
        },
        // 月退金部分
        // 月退金提繳額度
        salaryWithdraw: function() {
            var salaryForm = this.salaryAll;
            var newSalayForm = [];
            salaryForm.forEach(function(income){
                switch(true) {
                    case 1500 > income && income > 0 :
                        income = 1500;
                        break;
                    case 3001 > income && income > 1500 :
                        income = 3000;
                        break;
                    case 4501 > income && income > 3000 :
                        income = 4500;
                        break;
                    case 6001 > income && income > 4500 :
                        income = 6000;
                        break;
                    case 7501 > income && income > 6000 :
                        income = 7500;
                        break;
                    case 8701 > income && income > 7500 :
                        income = 8700;
                        break;
                    case 9901 > income && income > 8700 :
                        income = 9900;
                        break;
                    case 11101 > income && income > 9900 :
                        income = 11100;
                        break;
                    case 12541 > income && income > 11100 :
                        income = 12540;
                        break;
                    case 13501 > income && income > 12540 :
                        income = 13500;
                        break;
                    case 15841 > income && income > 13500 :
                        income = 15840;
                        break;
                    case 16501 > income && income > 15840 :
                        income = 16500;
                        break;
                    case 17281 > income && income > 16500 :
                        income = 17280;
                        break;
                    case 17881 > income && income > 17280 :
                        income = 17880;
                        break;
                    case 19048 > income && income > 17880 :
                        income = 19047;
                        break;
                    case 20009 > income && income > 19047 :
                        income = 20008;
                        break;
                    case 21010 > income && income > 20008 :
                        income = 21009;
                        break;
                    case 22001 > income && income > 21009 :
                        income = 22000;
                        break;
                    case 23101 > income && income > 22000 :
                        income = 23100;
                        break;
                    case 24001 > income && income > 23100 :
                        income = 24000;
                        break;
                    case 25201 > income && income > 24000 :
                        income = 25200;
                        break;
                    case 26401 > income && income > 25200 :
                        income = 26400;
                        break;
                    case 27601 > income && income > 26400 :
                        income = 27600;
                        break;
                    case 28801 > income && income > 27600 :
                        income = 28800;
                        break;
                    case 30301 > income && income > 28800 :
                        income = 30300;
                        break;
                    case 31801 > income && income > 30300 :
                        income = 31800;
                        break;
                    case 33301 > income && income > 31800 :
                        income = 33300;
                        break;
                    case 34801> income && income > 33300 :
                        income = 34800;
                        break;
                    case 36301 > income && income > 34800 :
                        income = 36300;
                        break;
                    case 38201 > income && income > 36300 :
                        income = 38200;
                        break;
                    case 40101 > income && income > 38200 :
                        income = 40100;
                        break;
                    case 42001 > income && income > 40100 :
                        income = 42000;
                        break;
                    case 43901 > income && income > 42000 :
                        income = 43900;
                        break;
                    case 45801 > income && income > 43900 :
                        income = 45800;
                        break;
                    case 48201 > income && income > 45800 :
                        income = 48200;
                        break;
                    case 50601 > income && income > 48200 :
                        income = 50600;
                        break;
                    case 53001 > income && income > 50600 :
                        income = 53000;
                        break;
                    case 55401 > income && income > 53000 :
                        income = 55400;
                        break;
                    case 57801 > income && income > 55400 :
                        income = 57800;
                        break;
                    case 60801 > income && income > 57800 :
                        income = 60800;
                        break;
                    case 63801 > income && income > 60800 :
                        income = 63800;
                        break;
                    case 66801 > income && income > 63800 :
                        income = 66800;
                        break;
                    case 69801 > income && income > 66800 :
                        income = 69800;
                        break;
                    case 72801 > income && income > 69800 :
                        income = 72800;
                        break;
                    case 76501 > income && income > 72800 :
                        income = 76500;
                        break;
                    case 80201 > income && income > 76500 :
                        income = 80200;
                        break;
                    case 83901 > income && income > 80200 :
                        income = 83900;
                        break;
                    case 87601 > income && income > 83900 :
                        income = 87600;
                        break;
                    case 92101 > income && income > 87600 :
                        income = 92100;
                        break;
                    case 96601 > income && income > 92100 :
                        income = 96600;
                        break;
                    case 101101 > income && income > 96600 :
                        income = 101100;
                        break;
                    case 105601 > income && income > 101100 :
                        income = 105600;
                        break;
                    case 110101 > income && income > 105600 :
                        income = 110100;
                        break;
                    case 115501 > income && income > 110100 :
                        income = 115500;
                        break;
                    case 120901 > income && income > 115500 :
                        income = 120900;
                        break;
                    case 126301 > income && income > 120900 :
                        income = 126300;
                        break;
                    case 131701 > income && income > 126300 :
                        income = 131700;
                        break;
                    case 137101 > income && income > 131700 :
                        income = 137100;
                        break;
                    case 142501 > income && income > 137100 :
                        income = 142500;
                        break;
                    case 147901 > income && income > 142500 :
                        income = 147900;
                        break;
                    case  income > 147901 :
                        income = 150000;
                        break;
                }
                newSalayForm.push(income);
            });	
            return newSalayForm;
        },
        // 薪資部分
        // 計算一生的薪資
        salaryAll: function() {
            var defautlGrouth = (this.defaultIncomeRate/100);
            var currentIncome = this.income;
            if (this.singleRadio == 'pureNew') {
                var beforeCurrentYears = this.age - this.startWork;
                var afterCurrentYears = this.retireAge - this.age;
                var currentIncomeArray = [currentIncome];
                for (var i = 1; i< beforeCurrentYears + 1; i++) {
                    var preYearIncome = Math.round(currentIncomeArray[i-i] * (1 - defautlGrouth));
                    currentIncomeArray.splice(0,0,preYearIncome);
                }
                for (var i =beforeCurrentYears; i<afterCurrentYears+beforeCurrentYears-1; i++) {
                    var afterYearIncome = Math.round(currentIncomeArray[i] * (1 + defautlGrouth));
                    currentIncomeArray.push(afterYearIncome);
                }
                return currentIncomeArray;
            }else {
                var beforeCurrentYears = this.age - this.convertToNew;
                var afterCurrentYears = this.retireAge - this.age;
                var currentIncomeArray = [currentIncome];
                for (var i = 1; i< beforeCurrentYears + 1; i++) {
                    var preYearIncome = Math.round(currentIncomeArray[i-i] * (1 - defautlGrouth));
                    currentIncomeArray.splice(0,0,preYearIncome);
                }
                for (var i =beforeCurrentYears; i<afterCurrentYears+beforeCurrentYears-1; i++) {
                    var afterYearIncome = Math.round(currentIncomeArray[i] * (1 + defautlGrouth));
                    currentIncomeArray.push(afterYearIncome);
                }
                return currentIncomeArray;
            }
            
        },
       
    },
    methods: {
        calResult:function() {
            // 錯誤警示部分
            // 今年幾歲
            if (this.age == '') {
                this.admirTxtArray[0].isShow = true;
            }else {
                this.admirTxtArray[0].isShow = false;
            }
            if (this.age < this.startWork) {
                this.admirTxtArray[1].isShow = true;
            }else {
                this.admirTxtArray[1].isShow = false;
            }
            // 開始工作年齡
            if (this.startWork == '') {
                this.admirTxtArray[2].isShow = true;
            }else {
                this.admirTxtArray[2].isShow = false;
            }
            if(this.startWork < 16 && this.startWork != '') {
                this.admirTxtArray[3].isShow = true;
            }else {
                this.admirTxtArray[3].isShow = false;
            }

            // 退休年齡
            if (this.retireAge == '') {
                this.admirTxtArray[4].isShow = true;
            }else {
                this.admirTxtArray[4].isShow = false;
            }
            if (this.retireAge < this.age ) {
                this.admirTxtArray[5].isShow = true;
            }else {
                this.admirTxtArray[5].isShow = false;
            }
            // 薪資
            if(this.income == '') {
                this.admirTxtArray[8].isShow = true;
            }else {
                this.admirTxtArray[8].isShow = false;
            }
            // 提繳率
            // 僱主提繳率
            if(this.defaultRetirmentRate < 6) {
                this.admirTxtArray[9].isShow = true;
            }else {
                this.admirTxtArray[9].isShow = false;
            }
            // 自願提繳率
            if(this.voluteerRate < 0 || this.voluteerRate > 6) {
                this.admirTxtArray[10].isShow = true;
            }else {
                this.admirTxtArray[10].isShow = false;
            }
            // 開始計算
            // 先計算第一年退休金
            // 第一年提繳退休金額
            if (this.canClick == true && this.admirTxtArray[0].isShow == false && this.admirTxtArray[1].isShow == false && this.admirTxtArray[2].isShow == false && this.admirTxtArray[3].isShow == false && this.admirTxtArray[4].isShow == false && this.admirTxtArray[5].isShow == false && this.admirTxtArray[8].isShow == false && this.admirTxtArray[9].isShow == false && this.admirTxtArray[10].isShow == false) {
            	// 計算有幾年退休生活
            	var retirmentRemainAge =  this.age + this.remainAge - this.retireAge;
            	this.retireLife = retirmentRemainAge;
                // 開始計算退休金
                var firstMoney = this.calYearWithdraw[0];
                // 月利率 = 年利率/12
                var retireRoi = this.retirmentRoi;
                // 第一年期數
                var firstTime = 12;
                var resultArray = [];
                var firstResult = firstMoney;
                var firstRate = Math.pow((1+retireRoi/100) ,(1/12));
                for (i = 1; i<= firstTime; i++) {
                    firstResult = firstResult*firstRate + firstMoney;
                }
                resultArray.push(Math.round(firstResult-firstMoney));
                // 計算一生退休金
                // 第一年退休金額
                var result = resultArray[0];
                // 每年提撥金額，扣除第一年
                var cloned = this.calYearWithdraw;
                var shifted = cloned.shift();
                var money = cloned;
                // 從第二年開始計算，每年計算一次
                money.forEach(function(item){
                    for (i = 1; i <= 12; i++) {
                        result = result*firstRate + item;
                    }
                    resultArray.push(Math.round(result-item));
                });
                this.result = resultArray[resultArray.length-1];
                // 計算每月可領退休金
                // 平均餘命
                var avgAge;
                if (this.retireAge >= 60) {
                    avgAge = this.retireLife;
                    this.monthRetirmentTxt = '預估每月可領退休金';
                }else if (this.retireAge < 60) {
                    avgAge = (this.retireLife) - (60 - this.retireAge);
                    this.monthRetirmentTxt = '60歲後預估每月可領退休金';
                }
                    
                // 利率:1.1843%
                var rate = 1.1843/100;
                // 分子
                var child = Math.pow((1/(1+rate)),avgAge);
                // 分母
                var mom = Math.pow((1+rate),1/12);
                var x = (1 - child)/ (12*(mom - 1))*mom;
                var monthResult = Math.round(this.result/x/12);
                this.monthResult = monthResult;
                this.canClick = false;
                
                $.ajax({
                    url:'https://money.udn.com/rssfeed/news/1001/5592/12040?ch=money',
                    type:'GET',
                    dataType:'xml',
                    success:function(xml) {
                        var myTitle;
                        var myLink;
                        var titleArray = [];
                        var linkArray = [];
                        $(xml).find('item').each(function(i) {
                            myTitle = $(this).children('title').text();
                            titleArray.push(myTitle);
                            myLink = $(this).children('link').text();
                            linkArray.push(myLink);
                        });

                        for (i = 0; i<3; i++) {
                            $('a.'+i).attr('href', linkArray[i]).attr('target','_blank').text(titleArray[i]);
                        }
                    }
                });
                if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
					this.readingIsShow = false;
					
				}else {
					this.readingIsShow = true;

				}

            }
            // 以下為資料蒐集
            var str = document.cookie.split(';');
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth() +1;
            var day = time.getDate();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var cookieTag;
            var cookieTag2;

            // 處理cookie
            str.forEach(function(item,index){
            	if(item.indexOf('udnmember') >= 0) {
            		cookieTag = item
            	}else if(item.indexOf('udnmember') < 0 && item.indexOf('_ga=') >= 0) {
            		cookieTag2 = item;
            	}

            });
            console.log(cookieTag);
            console.log(cookieTag2);
            if (cookieTag != undefined) {
            	this.cookieId = cookieTag;
            }else {
            	this.cookieId = cookieTag2;
            }
            // 表格內容有誤的傳回這條
            if (this.admirTxtArray[0].isShow == true || this.admirTxtArray[1].isShow == true || this.admirTxtArray[2].isShow == true || this.admirTxtArray[3].isShow == true || this.admirTxtArray[4].isShow == true || this.admirTxtArray[5].isShow == true || this.admirTxtArray[8].isShow == true || this.admirTxtArray[9].isShow == true || this.admirTxtArray[10].isShow == true) {
                $.get('https://script.google.com/macros/s/AKfycbyutXqBN7C5VuJSLkRM38eh9hbAt8H3hcG8JZml18lmrfP9xQhW/exec', {
                        'time': year + '/' + month + '/' + day + '/' + hours + ':' + minutes, 
                        'system': '純新制',
                        'cookie':this.cookieId,
                        'age':this.age,
                        'workAge':this.startWork,
                        'retireAge': this.retireAge,
                        'oldPension':'無',
                        'salary': this.income,
                        'salaryTxt':this.admirTxtArray[8].isShow? this.admirTxtArray[8].txt : '',
                        'admireTxt': this.admirTxtArray[0].isShow? this.admirTxtArray[0].txt : '',
                        'admireTxt_1':this.admirTxtArray[1].isShow? this.admirTxtArray[1].txt : '',
                        'admireTxt1': this.admirTxtArray[2].isShow? this.admirTxtArray[2].txt :'',
                        'admireTxt1_1':this.admirTxtArray[3].isShow? this.admirTxtArray[3].txt : '',
                        'admireTxt2':this.admirTxtArray[4].isShow? this.admirTxtArray[4].txt : '',
                        'admireTxt2_1':this.admirTxtArray[5].isShow? this.admirTxtArray[5].txt : '', 
                        'oldSystemTxt5':'',
                        'oldSystemTxt5_1':''  
                    }

                );
            // 表格無誤
            }else {
                 $.get('https://script.google.com/macros/s/AKfycbzx2LmasI5CsGKz3BY9OVKS9jP0ObPzeCYLIaMEzxW5Im7iYr0/exec', {
                        'time': year + '/' + month + '/' + day + '/' + hours + ':' + minutes, 
                        'system': '純新制',
                        'cookie':this.cookieId,
                        'age':this.age,
                        'workAge':this.startWork,
                        'retireAge': this.retireAge,
                        'oldPension':'無',
                        'salary': this.income,
                        'salaryGR': this.defaultIncomeRate,
                        'pensionGR': this.defaultRetirmentRate, 
                        'result':this.result,
                        'monthResult': this.monthResult           
                   }
                );
            }

            
            
        
        },
        calResult1:function() {
            // 錯誤警示部分
            // 今年幾歲
            if (this.age == '') {
                this.admirTxtArray[0].isShow = true;
            }else {
                this.admirTxtArray[0].isShow = false;
            }
            if (this.age < this.convertToNew) {
                this.admirTxtArray[1].isShow = true;
            }else {
                this.admirTxtArray[1].isShow = false;
            }
            // 轉入新制年齡
            if (this.convertToNew == '') {
                this.admirTxtArray[6].isShow = true;
            }else {
                this.admirTxtArray[6].isShow = false;
            }
            if(this.convertToNew < 16 && this.convertToNew != '') {
                this.admirTxtArray[7].isShow = true;
            }else {
                this.admirTxtArray[7].isShow = false;
            }

            // 退休年齡
            if (this.retireAge == '') {
                this.admirTxtArray[4].isShow = true;
            }else {
                this.admirTxtArray[4].isShow = false;
            }
            if (this.retireAge < this.age ) {
                this.admirTxtArray[5].isShow = true;
            }else {
                this.admirTxtArray[5].isShow = false;
            }
            // 薪資
            if(this.income == '') {
                this.admirTxtArray[8].isShow = true;
            }else {
                this.admirTxtArray[8].isShow = false;
            }
            // 提繳率
            // 僱主提繳率
            if(this.defaultRetirmentRate < 6) {
                this.admirTxtArray[9].isShow = true;
            }else {
                this.admirTxtArray[9].isShow = false;
            }
            // 自願提繳率
            if(this.voluteerRate < 0 || this.voluteerRate > 6) {
                this.admirTxtArray[10].isShow = true;
            }else {
                this.admirTxtArray[10].isShow = false;
            }
            // 開始計算
            // 先計算移入舊制專戶的退休金
            // 第一年提繳退休金額
            if (this.canClick == true && this.admirTxtArray[0].isShow == false && this.admirTxtArray[1].isShow == false && this.admirTxtArray[4].isShow == false && this.admirTxtArray[5].isShow == false && this.admirTxtArray[6].isShow == false && this.admirTxtArray[7].isShow == false && this.admirTxtArray[8].isShow == false && this.admirTxtArray[9].isShow == false && this.admirTxtArray[10].isShow == false) {
                var firstMoney = this.oldMoney;
                // 月利率 = 年利率/12
                var retireRoi = this.retirmentRoi;
                // 第一年期數
                var firstTime = 12;
                var resultArray = [];
                var firstResult = firstMoney;
                var firstRate = Math.pow((1+retireRoi/100) ,(1/12));
                for (i = 1; i<= firstTime; i++) {
                    firstResult = firstResult*firstRate + firstMoney;
                }
                resultArray.push(Math.round(firstResult-firstMoney));
                // 計算一生退休金
                // 第一年退休金額
                var result = resultArray[0];
                // 每年提撥金額，扣除第一年
                var cloned = this.calYearWithdraw;
                var shifted = cloned.shift();
                var money = cloned;
                // 從第二年開始計算，每年計算一次
                money.forEach(function(item){
                    for (i = 1; i <= 12; i++) {
                        result = result*firstRate + item;
                    }
                    resultArray.push(Math.round(result-item));
                });
                this.result = resultArray[resultArray.length-1];
                // 計算每月可領退休金
                // 平均餘命
                var avgAge;
                if (this.retireAge >= 60) {
                    avgAge = this.retireLife;
                    this.monthRetirmentTxt = '預估每月可領退休金';
                }else if (this.retireAge < 60) {
                    avgAge = 60 - this.retireLife;
                    this.monthRetirmentTxt = '60歲後預估每月可領退休金';
                }
                // 利率:1.1843%
                var rate = 1.1843/100;
                // 分子
                var child = Math.pow((1/(1+rate)),avgAge);
                // 分母
                var mom = Math.pow((1+rate),1/12);
                var x = (1 - child)/ (12*(mom - 1))*mom;
                var monthResult = Math.round(this.result/x/12);
                this.monthResult = monthResult;
                this.canClick = false;
                this.readingIsShow = true;
                $.ajax({
                    url:'https://money.udn.com/rssfeed/news/1001/5592/12040?ch=money',
                    type:'GET',
                    dataType:'xml',
                    success:function(xml) {
                        console.log(xml);
                        var myTitle;
                        var myLink;
                        var titleArray = [];
                        var linkArray = [];
                        $(xml).find('item').each(function(i) {
                            myTitle = $(this).children('title').text();
                            titleArray.push(myTitle);
                            myLink = $(this).children('link').text();
                            linkArray.push(myLink);
                        });

                        for (i = 0; i<3; i++) {
                            $('a.'+i).attr('href', linkArray[i]).attr('target','_blank').text(titleArray[i]);
                        }

                    }
                });
            }
            // 以下為資料蒐集
            var str = document.cookie.split(';');
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth() +1;
            var day = time.getDate();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            var cookieTag;
            var cookieTag2;

            // 處理cookie，若有udnmember就抓，無則抓_ga
            str.forEach(function(item,index){
            	if(item.indexOf('udnmember') >= 0) {
            		cookieTag = item
            	}else if(item.indexOf('udnmember') < 0 && item.indexOf('_ga=') >= 0) {
            		cookieTag2 = item;
            	}

            });
            console.log(cookieTag);
            console.log(cookieTag2);
            if (cookieTag != undefined) {
            	this.cookieId = cookieTag;
            }else {
            	this.cookieId = cookieTag2;
            }

            // 表格內容有誤的傳回這條
            if (this.admirTxtArray[0].isShow == true || this.admirTxtArray[1].isShow == true || this.admirTxtArray[2].isShow == true || this.admirTxtArray[3].isShow == true || this.admirTxtArray[4].isShow == true || this.admirTxtArray[5].isShow == true || this.admirTxtArray[8].isShow == true || this.admirTxtArray[9].isShow == true || this.admirTxtArray[10].isShow == true) {
                $.get('https://script.google.com/macros/s/AKfycbyutXqBN7C5VuJSLkRM38eh9hbAt8H3hcG8JZml18lmrfP9xQhW/exec', {
                        'time': year + '/' + month + '/' + day + '/' + hours + ':' + minutes, 
                        'system': '舊制轉新制',
                        'cookie':this.cookieId,
                        'age':this.age,
                        'workAge':this.startWork,
                        'retireAge': this.retireAge,
                        'oldPension':'無',
                        'salary': this.income,
                        'salaryTxt':this.admirTxtArray[8].isShow? this.admirTxtArray[8].txt : '',
                        'admireTxt': this.admirTxtArray[0].isShow? this.admirTxtArray[0].txt : '',
                        'admireTxt_1':this.admirTxtArray[1].isShow? this.admirTxtArray[1].txt : '',
                        'admireTxt1': this.admirTxtArray[2].isShow? this.admirTxtArray[2].txt :'',
                        'admireTxt1_1':this.admirTxtArray[3].isShow? this.admirTxtArray[3].txt : '',
                        'admireTxt2':this.admirTxtArray[4].isShow? this.admirTxtArray[4].txt : '',
                        'admireTxt2_1':this.admirTxtArray[5].isShow? this.admirTxtArray[5].txt : '', 
                        'oldSystemTxt5':'',
                        'oldSystemTxt5_1':''  
                   }

                );
                // 表格無誤
            }else {
                 $.get('https://script.google.com/macros/s/AKfycbzx2LmasI5CsGKz3BY9OVKS9jP0ObPzeCYLIaMEzxW5Im7iYr0/exec', {
                        'time': year + '/' + month + '/' + day + '/' + hours + ':' + minutes, 
                        'system': '舊制轉新制',
                        'cookie':this.cookieId,
                        'age':this.age,
                        'workAge':this.startWork,
                        'retireAge': this.retireAge,
                        'oldPension':'無',
                        'salary': this.income,
                        'salaryGR': this.defaultIncomeRate,
                        'pensionGR': this.defaultRetirmentRate, 
                        'result':this.result,
                        'monthResult': this.monthResult           
                   }
                );
            }
            
        },
        reCal:function() {
            this.age =''; this.retireAge = ''; this.income = ''; 
            this.startWork =''; this.result = ''; this.monthResult = ''; this.convertToNew = ''; this.oldMoney = '';
            this.defaultIncomeRate = 3; this.voluteerRate = 0; this.defaultRetirmentRate = 6; this.retirmentRoi = 3;
            this.canClick = true; this.retireLife = 0;
            for (var i = 0; i<11; i++) {
                this.admirTxtArray[i].isShow = false;
            }
        },
        formatPrice:function(value) {
            var val = (value/1).toFixed(0).replace(',', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },

    },

})



    $(document).ready(function(){

/*自動載入捲動項目*/
        $(function() {
            $('#infinite-container').infinitescroll({
                loading:{
                          finishedMsg        : "<em>這已經是最後一個項目了.</em>",/*最後一頁顯示的字*/
                          msgText            : "<em>載入更多項目...</em>",/*自動載入中的暫時顯示的字*/
                          speed                : 'fast',/*載入速度*/
                        },
                itemSelector    : ".content", /*你要讀入的內容物是什麼，在此例子是讀入下一頁的li，並插入#contentserial裏面*/
                animate            : false, /*動畫效果。這個一定要取消，否則在有資料庫多欄讀入的網頁會出錯，會亂跳*/
                extraScrollPx    : 0, /*刷入新網頁後，要自動往上移多少空間，我選擇不要*/
                pixelsFromNavToBottom    : 30, /*距離滑到最底部的距離多少時要開始啟動，在此指定30px*/
                path:".pagination__next",
                history: 'push',
                dataType: 'html',
                append: ".content", // 匯入物件類別
  		        status: ".scroller-status", // 捲軸狀態類別
                historyTitle: true,
                appendCallback: true,
                
            });
        },/*想要執行的東西，就是擺在這裏下面，請注意從arrayOfNewElems是必要的，逗點也不要忘記*/
        function(arrayOfNewElems){

            $('#intro').waypoint(function (direction) {
                    if (direction == "down") {
                        $('#kv-1').addClass("show");
                    } else {
                        $('#kv-1').removeClass("show");
                    }
                }, {
                    offset: 'bottom-in-view';
            });

            $('#kv-1').appendTo('<p style="background-color: red;">Sed tellus magna, pellentesque ut venenatis eu, molestie eget odio. Maecenas id finibus nisl. Aliquam et odio ante. Sed suscipit tortor mauris, a porttitor tortor accumsan eu. Etiam mauris magna, sodales sit amet cursus vel, hendrerit non arcu. Nunc non vestibulum arcu, eu fringilla orci. Integer egestas risus ultrices ipsum finibus pellentesque. Morbi lacinia felis dui. In eget lectus at elit commodo bibendum non sed ligula. Pellentesque dignissim, ante eget condimentum tincidunt, lacus urna consequat dui, a egestas lorem ligula ac odio. Duis arcu risus, bibendum sed condimentum et, efficitur vitae nulla. Nullam convallis quis sem id iaculis.</p>');}
        );
    });



$(document).ready(function(){

	$('#infinite-container').infinitescroll({
		loading:{
                  finishedMsg        : "<em>這已經是最後一個項目了.</em>",/*最後一頁顯示的字*/
                  msgText            : "<em>載入更多項目...</em>",/*自動載入中的暫時顯示的字*/
                  speed                : 'fast',/*載入速度*/
                },
        itemSelector    : ".content", /*你要讀入的內容物是什麼，在此例子是讀入下一頁的li，並插入#contentserial裏面*/
	    animate            : false, /*動畫效果。這個一定要取消，否則在有資料庫多欄讀入的網頁會出錯，會亂跳*/
	    extraScrollPx    : 0, /*刷入新網頁後，要自動往上移多少空間，我選擇不要*/
	    pixelsFromNavToBottom    : 30, /*距離滑到最底部的距離多少時要開始啟動，在此指定30px*/
	    path:".pagination__next",
	    history: 'push',
	    dataType: 'html',
	    append: ".content", // 匯入物件類別
        status: ".scroller-status", // 捲軸狀態類別
	    historyTitle: true,
	    appendCallback: true,

	});
});
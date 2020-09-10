
var app = new Vue({
    el: '#app',
    data: {
        select: '個人申報',
        income: '',
        incomes: '',
        parents: '',
        down70: '',
        up70: '',
        exampleSubtract: '',
        pmdisorder: '',
        education: '',
        child: '',
        isShow: true,
        singleRadio: '標準扣除額',
        cookieID:''
        
    },
    computed: {
        noTax: function () {
            var no70 = this.down70;
            var yes70 = this.up70;
            return no70 * 88000 + yes70 * 132000;
        },
        normalSubtract: function () {
            var vm = this;
            if (vm.select == '個人申報') {
                return 120000;
            } else if (vm.select == '夫妻合併') {
                return 240000;
            }
        },
        incomeSp: function () {
            var a = 0;
            var b = 0;
            var c = 0;
            if(this.income >= 200000 ) {
                a = 200000;
            }else {
                a = this.income;
            }
            if (this.incomes >= 200000) {
                b = 200000;
            }else {
                b = this.incomes;
            }
            if (this.parents >= 200000) {
                c = 200000;
            }else {
                c = this.parents;
            }

            return Number(a) + Number(b) + Number(c);

        },
        pmdisorderSp: function () {
            return this.pmdisorder * 200000;
        },
        educationSp: function () {
            return this.education * 25000;
        },
        childSp: function () {
            return this.child * 120000;
        },
        subtotal: function () {
            var extraSubtract = this.pmdisorderSp + this.educationSp + this.childSp;
            if (this.singleRadio == '列舉扣除額') {
                return this.exampleSubtract + extraSubtract + this.incomeSp;
            } else {
                return this.normalSubtract + extraSubtract + this.incomeSp;
            }
        },
        lifespent: function () {
            return (this.down70 + this.up70) * 171000 - this.noTax - this.subtotal + this.incomeSp;
        },
        totalIncome: function () {
            return Number(this.income) + Number(this.incomes) + Number(this.parents);
        },
        totalSubstract: function () {

            if (this.lifespent > 0) {
                return this.lifespent + this.subtotal;
            } else {
                return this.subtotal;
            }

        },
        pureIncome: function () {
            return this.totalIncome - this.noTax - this.totalSubstract;
        },
        taxpercent: function () {
            var allincome = this.pureIncome;
            if (allincome > 4530000) {
                return Math.floor(allincome * 0.4 - 829600);
            } else if (allincome <= 4530000 && allincome > 2420000) {
                return Math.floor(allincome * 0.3 - 376600);
            } else if (allincome > 1210000 && allincome <= 2420000) {
                return Math.floor(allincome * 0.2 - 134600);
            } else if (allincome > 540000 && allincome <= 1210000) {
                return Math.floor(allincome * 0.12 - 37800);
            } else if (allincome > 0) {
                return Math.floor(allincome * 0.05);
            } else {
                return 0;
            }
        },
        defaultText: function() {
            if (this.pmdisorderSp > 0) { 
                return this.pmdisorderSp;
            }else {
                return '自動計算免填';
            }    
        },
        defaultText1: function() {
            if(this.educationSp > 0) {
                return this.educationSp;
            }else {
                return '自動計算免填';
            }
        },
        defaultText2: function() {
            if(this.childSp > 0) {
                return this.childSp;
            }else {
                return '自動計算免填';
            }
        },
        defaultText3: function() {
            if(this.incomeSp > 0) {
                return this.incomeSp;
            }else {
                return '自動計算免填';
            }
        },
    },
    watch: {
        select: function () {
            this.income = ''; this.incomes = ''; this.parents = '';
            this.up70 = ''; this.down70 = ''; this.exampleSubtract = '';
            this.pmdisorder = ''; this.education = ''; this.child = '';
            this.isShow = true; this.singleRadio = '標準扣除額';
        }

    },
    methods: {
        reCalculate: function () {
            this.income = ''; this.incomes = ''; this.parents = '';
            this.up70 = ''; this.down70 = ''; this.exampleSubtract = '';
            this.pmdisorder = ''; this.education = ''; this.child = '';
            this.isShow = true; this.singleRadio = '標準扣除額'; this.select = '個人申報';

        },
        calculated: function () {
            this.isShow = false;
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth() +1;
            var day = time.getDate();
            var hours = time.getHours();
            var minutes = time.getMinutes();
            // 抓取cookie ID
            var str = document.cookie.split(";");
            var str2 = str[1].split('=');
            var str3 = str2[1];
            this.cookieID = str3;
            
            $.get('https://script.google.com/macros/s/AKfycbyTG_kRze7HfY2QAnvufOGPd_H--i6v7rB2JjKlfRHyq_-XjFJ-/exec', {
                    'income': this.income,
                    'incomes':this.incomes,
                    'familyIncome':this.parents,
                    'no70': this.down70,
                    'yes70': this.up70,
                    'disorder': this.pmdisorder,
                    'education': this.education,
                    'child': this.child,
                    'finalTax': this.taxpercent,
                    'cookieId': this.cookieID,
                    'time': year + '/' + month + '/' + day + '  ' + hours + ':' + minutes,
                    'isMerrige': this.select,
                    'normalSubstract':this.singleRadio + ' / ' + this.exampleSubtract

               },

            );
        },
        formatPrice(value) {
            var val = (value/1).toFixed(0).replace(',', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

    }


});


$(function () {
    var countries = [

    {
        "name": "新台幣 TWD",
        "code": "twd",
        
    },

    {
         "name": "人民幣 CNY",
         "code": "cny"
    },

    {
        "name": "澳幣 AUD",
        "code": "aud"
    },

    {
        "name": "加拿大幣 CAD",
        "code": "cad"
    },

    {
        "name": "瑞士法郎 CHF",
        "code": "chf"
    },

    {
        "name": "歐元 EUR",
        "code": "eur"
    },

    {
        "name": "英鎊 GBP",
        "code": "gbp"
    },

    {
        "name": "港幣 HKD",
        "code": "hkd"
    },

    {
        "name": "印尼盾 IDR",
        "code": "idr"
    },

    {
        "name": "日圓 JPY",
        "code": "jpy"
    },

    {
        "name": "韓元 KRW",
        "code": "krw"
    },

    {
        "name": "馬來西亞幣 MYR",
        "code": "myr"
    },

    {
        "name": "紐幣 NZD",
        "code": "nzd"
    },

    {
        "name": "菲律賓披索 PHP",
        "code": "php"
    },

    {
        "name": "瑞典克朗 SEK",
        "code": "sek"
    },

    {
        "name": "新加坡幣 SGD",
        "code": "sgd"
    },

    {
        "name": "泰銖 THB",
        "code": "thb"
    },

    {
        "name": "美元 USD",
        "code": "usd"
    },

    {
        "name": "越南盾 VND",
        "code": "vnd"
    },

    
]

    var countryInput = $(document).find('.countrypicker');
    var countryList = "";


    //set defaults
    for (i = 0; i < countryInput.length; i++) {

        //check if flag
        flag = countryInput.eq(i).data('flag');
        
        if (flag) {
            countryList = "";
            
            //for each build list with flag
            $.each(countries, function (index, country) {
                var flagIcon = "img/flags/" + country.code + ".png";
                countryList += "<option data-country-code='" + country.code + "' data-tokens='" + country.code + " " + country.name + "' style='padding-left:25px; background-position: 4px 7px; background-image:url(" + flagIcon + ");background-repeat:no-repeat;' value='" + country.name + "'>" + country.name + "</option>";
            });

            //add flags to button
            countryInput.eq(i).on('loaded.bs.select', function (e) {
                var button = $(this).closest('.btn-group').children('.btn');
                button.hide();
                var def = $(this).find(':selected').data('country-code');
                var flagIcon = "img/flags/" + def + ".png";
                button.css("background-size", '20px');
                button.css("background-position", '10px 9px');
                button.css("padding-left", '40px');
                button.css("background-repeat", 'no-repeat');
                button.css("background-image", "url('" + flagIcon + "'");
                button.show();
            });

            //change flag on select change
            countryInput.eq(i).on('change', function () {
                button = $(this).closest('.btn-group').children('.btn');
                def = $(this).find(':selected').data('country-code');
                flagIcon = "img/flags/" + def + ".png";
                button.css("background-size", '20px');
                button.css("background-position", '10px 9px');
                button.css("padding-left", '40px');
                button.css("background-repeat", 'no-repeat');
                button.css("background-image", "url('" + flagIcon + "'");
                
            });
       
        }else{
            countryList ="";
            
            //for each build list without flag
            $.each(countries, function (index, country) {
                countryList += "<option data-country-code='" + country.code + "' data-tokens='" + country.code + " " + country.name + "' value='" + country.name + "'>" + country.name + "</option>";
            });
            
            
        }
        
         //append country list
        countryInput.eq(i).html(countryList);


        //check if default
        def = countryInput.eq(i).data('default');
        //if there's a default, set it
        if (def) {
            countryInput.eq(i).val(def);
            console.log(countryInput.eq(i).val(def));
        }


    }
    // $('.convert').click(function() {
        
    //     console.log($('.countrypicker').eq(0).val());
    //     var currency1text = $('.test1').find('option:selected').text();     
    //     var checkIndex1 = $(".test1").find('option:selected').index();
    //     var currency2text = $('.test2').find('option:selected').text();
    //     var checkIndex2 = $(".test2").find('option:selected').index();
    //     var checkVal2 = $(".test2").find('option:selected').val();
       
    //     $('.test2').children().each(function() {
    //         if($(this).text() == currency1text) {
    //             $(this).prop('selected', true);
    //         }
    //     });
    //     $('.test1').children().each(function() {
    //         if($(this).text() == currency2text) {
    //             $(this).prop('selected', true);
    //         }
    //     });
    //     // 變換button1
    //     var button1 = $('.test1').closest('.btn-group').children('.btn');
    //     def1 = $('.test1').find('option:selected').data('country-code');
    //     flagIcon1 = "img/flags/" + def1 + ".png";
    //     button1.css("background-size", '20px');
    //     button1.css("background-position", '10px 9px');
    //     button1.css("padding-left", '40px');
    //     button1.css("background-repeat", 'no-repeat');
    //     button1.css("background-image", "url('" + flagIcon1 + "'");
    //     button1.children('span.filter-option').text(currency2text);
    //     var li1 = $('.test1').closest('.btn-group').children('.open').children('.inner').children('li');
    //     li1.eq(checkIndex1).removeClass('selected');
    //     li1.eq(checkIndex2).addClass('selected');
    //     // 變換button2
    //     var button2 = $('.test2').closest('.btn-group').children('.btn');
    //     def2 = $('.test2').find('option:selected').data('country-code');
    //     flagIcon2 = "img/flags/" + def2 + ".png";
    //     button2.css("background-size", '20px');
    //     button2.css("background-position", '10px 9px');
    //     button2.css("padding-left", '40px');
    //     button2.css("background-repeat", 'no-repeat');
    //     button2.css("background-image", "url('" + flagIcon2 + "'");
    //     button2.children('span.filter-option').text(currency1text);
    //     var li2 = $('.test2').closest('.btn-group').children('.open').children('.inner').children('li');
    //     li2.eq(checkIndex2).removeClass('selected');
    //     li2.eq(checkIndex1).addClass('selected');
    // });
    
});
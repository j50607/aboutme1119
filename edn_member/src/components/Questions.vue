<template>
  <div class="questions">
    <h6 class="title">常見問題</h6>
    <div class="accordion" id="accordionExample">
      <div class="card">
        <div class="card-header" id="headingOne">
          <h2 class="mb-0">
            <button
              class="btn btn-link"
              type="button"
              data-toggle="collapse"
              data-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              加入udn會員需要費用嗎？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>

        <div
          id="collapseOne"
          class="collapse show"
          aria-labelledby="headingOne"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            不需要。加入udn會員是完全免費的。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTwo">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              要如何加入udn會員？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseTwo"
          class="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            請於經濟日報網頁面右上角點選「註冊」或是經濟日報App選單點選「登入」，即可加入udn會員。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThree">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              我沒有收到加入會員啟用信，怎麼辦？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseThree"
          class="collapse"
          aria-labelledby="headingThree"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            如果未收到認證信函，請至會員中心點選「重寄啟用信」，我們就會再次寄發啟用信件。（未經認證的帳號將於 40 天內自動刪除會員資料。）
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingFour">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              如何修改帳號的對應 E-mail ？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseFour"
          class="collapse"
          aria-labelledby="headingFour"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            可透過 <a href="https://cas.udn.com/cas/meb/Ca1m01.do" target="_blank">線上修改服務</a>，修改E-mail 或停用不再使用的帳號。

          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingFive">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              會員改用 E-mail 登入之後，還可以修改 E-mail 嗎？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseFive"
          class="collapse"
          aria-labelledby="headingFive"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            可以。修改 E-mail 之後系統會再次寄出啟用信；只要完成啟用，就可使用新的 E-mail 登入會員。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingSix">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              如何修改密碼？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseSix"
          class="collapse"
          aria-labelledby="headingSix"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            點選<router-link to="/mb_data">修改密碼</router-link>，確認送出後，系統將發送重設密碼通知函到您的 E-mail，請依照信件指示重設密碼。若重複收到多封通知函，請以最新一封為主；若沒收到，建議至垃圾郵件夾查看。
            。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingSeven">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseSeven"
              aria-expanded="false"
              aria-controls="collapseSeven"
            >
              如何修改會員基本資料？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseSeven"
          class="collapse"
          aria-labelledby="headingSeven"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            點選<router-link to="/mb_data">我的資料</router-link>，即可修改、填寫所有會員的資料。為享有更多各式會員好康服務，建議詳實填寫。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingEight">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseEight"
              aria-expanded="false"
              aria-controls="collapseEight"
            >
              可以管理自已訂閱的電子報嗎？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseEight"
          class="collapse"
          aria-labelledby="headingEight"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            可透過<a href="https://cas.udn.com/cas/meb/Ca1e01.do" target="_blank">會員報管理</a>，取消 / 訂閱所有udn會員電子報份。
            。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingNine">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseNine"
              aria-expanded="false"
              aria-controls="collapseNine"
            >
              可以解除綁定 Facebook 帳號嗎？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseNine"
          class="collapse"
          aria-labelledby="headingNine"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            可透過<router-link to="/mb_data">解除綁定</router-link>Facebook 帳號，解除後將保留udn會員帳號，但不再提供 Facebook 帳號登入經濟日報網服務。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTen">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTen"
              aria-expanded="false"
              aria-controls="collapseTen"
            >
              可以刪除自已的會員帳號嗎？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseTen"
          class="collapse"
          aria-labelledby="headingTen"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            可以，但帳號一經刪除，相關服務即終止，不能再使用，且相關設定、發表內容或交易紀錄將清除，可能包括：聯合新聞網、聯合知識庫、udn 部落格、經濟日報、udn STYLE、udn 會員等網站服務。若有疑慮，請先作確認；如仍需刪除，請點選連結<a href="https://cas.udn.com/cas/meb/Ca1d01.do" target="_blank">會員刪除帳號</a>。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingEleven">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseEleven"
              aria-expanded="false"
              aria-controls="collapseEleven"
            >
              為什麼我不能使用經濟日報看盤系統？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseEleven"
          class="collapse"
          aria-labelledby="headingEleven"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            看盤系統是會員專屬服務，請確認是否登入。若仍無法使用，請您檢查瀏覽器更新至最新版本。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingTweleve">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseTweleve"
              aria-expanded="false"
              aria-controls="collapseTweleve"
            >
              使用股市看盤系統需要什麼資格嗎？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseTweleve"
          class="collapse"
          aria-labelledby="headingTweleve"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            只要是udn會員即可免費使用股市看盤服務。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingThirteen">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseThirteen"
              aria-expanded="false"
              aria-controls="collapseThirteen"
            >
              使用股市看盤系統需要安裝什麼軟體（工具）嗎？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseThirteen"
          class="collapse"
          aria-labelledby="headingThirteen"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            不需要另外安裝軟體（工具），只要一般瀏覽器皆可使用，我們建議您使用Google旗下的Chrome最新版網頁瀏覽器。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingFourteen">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFourteen"
              aria-expanded="false"
              aria-controls="collapseFourteen"
            >
              此股市看盤系統是否為即時報價？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseFourteen"
          class="collapse"
          aria-labelledby="headingFourteen"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            是即時報價。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingFifteen">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseFifteen"
              aria-expanded="false"
              aria-controls="collapseFifteen"
            >
              此股市看盤系統是否有下單功能
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseFifteen"
          class="collapse"
          aria-labelledby="headingFifteen"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            沒有下單功能，若有需要請自行洽詢證券業者。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingSixteen">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseSixteen"
              aria-expanded="false"
              aria-controls="collapseSixteen"
            >
              此股市看盤系統是否有自選股功能？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseSixteen"
          class="collapse"
          aria-labelledby="headingSixteen"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            此看盤系統可以自設20組自選股，每組自選股可有50檔個股。
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="headingSeventeen">
          <h2 class="mb-0">
            <button
              class="btn btn-link collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#collapseSeventeen"
              aria-expanded="false"
              aria-controls="collapseSeventeen"
            >
              股市看盤系統頁面載入速度很慢？
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>
        <div
          id="collapseSeventeen"
          class="collapse"
          aria-labelledby="headingSeventeen"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            股市看盤系統下載速度會因使用者的使用環境差異而有所不同；此股市看盤系統為專業看盤系統，第一次載入時請給它多一點的時間。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '常見問題'
  }
}
</script>
<style scoped>
.card {
  border: none;
  padding: 20px 0;
  background-color: #f9f9f9;
}
.card:first-child {
  padding-top: 0;
}
.card-header {
  background-color: #f9f9f9;
  padding: 0;
  border: none;
}
.card-header h2 {
  line-height: 0;
}
.card-header h2:hover button.btn-link{
  color: #7d7d7d;

}
.card-body {
  background-color: #f9f9f9;
  padding: 2px 45px 0 0;
  font-size: 15px;
  font-weight: 100;
  line-height: 1.5;
  color: #000;
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-line;
}
button.btn-link {
  width: 100%;
  position: relative;
  display: flex;
  justify-self: flex-start;
  padding: 0;
  padding-right: 60px;
  color: #000;
  font-size: 15px!important;
  text-decoration: none;
  text-align: left;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
}
a {
  color: #d72c1d;
}
.symbol {
  position: absolute;
  right: 0;
  top: 0;
}
.fa-minus, .fa-plus {
  font-size: 16px;
  margin-right: 5px;
  font-weight: lighter;
}
button.btn-link[aria-expanded="true"] .fa-plus{
  display: none;
}
button.btn-link[aria-expanded="true"] .fa-minus{
  display: block;
}
button.btn-link[aria-expanded="false"] .fa-plus{
  display: block;
}
button.btn-link[aria-expanded="false"] .fa-minus{
  display: none;
}
</style>

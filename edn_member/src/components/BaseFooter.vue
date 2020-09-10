<template>
  <div class="footer">
    <footer class="only_web">
      <div class="first">
        <span>
          <a href="https://event.udn.com/AD/" target="_blank">刊登網站廣告</a>
        </span>
        <span>
          <a href="http://udn.com/page/topic/496" target="_blank">網站總覽</a>
        </span>
        <span>
          <a href="http://udn.com/page/topic/184" target="_blank">FAQ</a>‧
          <a href="https://co.udn.com/co/contactus" target="_blank">客服</a>
        </span>
        <span>
          <a href="http://udndata.com/faq/authority.html" target="_blank">新聞授權</a>
        </span>
      </div>
      <div class="second">
        <span>
          <a href="https://member.udn.com/member/rule.jsp" target="_blank">服務條款</a>‧
          <a href="http://udn.com/page/topic/495" target="_blank">著作權</a>‧
          <a href="http://www.udngroup.com/members/udn_privacy" target="_blank">隱私權聲明</a>
        </span>
        <span>
          <a href="http://www.udngroup.com/" target="_blank">聯合報系</a>
        </span>
      </div>
      <div class="third">
        <span><a href="http://www.udngroup.com/activies/subscription_info" target="_blank">訂報紙</a></span>
        <span><a href="https://co.udn.com/co/index" target="_blank">關於我們</a></span>
        <span><a href="https://co.udn.com/co/index" target="_blank">招募夥伴</a></span>
      </div>
      <!-- <ul class="footer_list">
        <li>
          <a href="">刊登網站廣告</a>
        </li>
        <li>
          <a href="">網站總覽</a>
        </li>
        <li class="end">
          <a href="">FAQ</a>
          ‧
          <a href="">客服</a>
        </li>
        <li>
          <a href="">新聞授權</a>
        </li>
        <li>
          <a href="">服務條款</a>
          ‧
          <a href="">著作權</a>
          ‧
          <a href="">隱私權聲明</a>
        </li>
        <li>
          <a href="">聯合報系</a>
        </li>
        <li>
          <a href="">訂報紙</a>
        </li>
        <li>
          <a href="">關於我們</a>
        </li>
        <li>
          <a href="">招募夥伴</a>
        </li>
      </ul> -->
    </footer>
    <p>聯合線上公司 著作權所有 © udn.com All Rights Reserved.</p>
  </div>
</template>
<script>
</script>

<style scoped>
  .footer {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 20px 0;
    background-color: #f9f9f9;
    z-index: 998;
  }
  footer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  footer.only_web {
    display: flex!important;
    flex-wrap: wrap;
    justify-content: center;
  }
  footer a {
    color: #7d7d7d;
    font-weight: 300;
    position: relative;
    font-size: 12px;
  }
  footer span {
    color: #7d7d7d;
    font-size: 12px;
    position: relative;
    padding-right: 8px;
    margin-right: 8px;
  }
  footer span:after {
    content:'';
    width: 1px;
    height: 10px;
    background-color: #7d7d7d;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .third span:last-child {
    margin-right: 0;
  }
  .third span:last-child:after {
    display: none;
  }
  .footer p {
    width: 100%;
    display: inline-block;
    color:#7d7d7d;
    font-size: 12px;
    text-align: center;
    margin: 0;
    font-weight: 300;
  }
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 767px) {
    .footer {
      padding: 10px 17px;
    }
    footer {
      padding-bottom: 10px
    }
    footer.only_web {
      display: none!important;
    }
    footer div {
      line-height: 1;
    }
    footer a {
      font-size: 11px;
    }
    footer div span:last-child:after {
      display: none;
    }
    .footer p {
      font-size: 11px;
    }
  }
</style>

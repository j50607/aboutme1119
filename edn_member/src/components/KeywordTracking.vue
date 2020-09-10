<template>
  <div class="keyword_article">
    <h6 class="title">我的追蹤</h6>
    <div class="nokeywords" v-if="keywordArray.length === 0">
      您目前還沒有追蹤任何新聞唷！
    </div>
    <div class="keywords" v-else>
      <div class="keyword">
        <span>彭博周報</span>
        <i class="fal fa-times"></i>
      </div>
      <div class="keyword">
        <span>房市</span>
        <i class="fal fa-times"></i>
      </div>
      <div class="keyword">
        <span>防疫</span>
        <i class="fal fa-times"></i>
      </div>
    </div>
    <hr />
    <div class="content">
      <div class="nokeywords_details" v-if="keywordArray.length === 0">
        歡迎前往<a href="https://money.udn.com/money/index">文章頁</a>點選「新聞關鍵字」加入追蹤！
      </div>

      <div class="articles" v-else>
        <div class="article_info">
          <p class="article_publish_time">新聞發表時間：7日內</p>
          <p class="keyword_traced">
            您已追蹤<span class="quantity">
              1
            </span>／50個關鍵字
          </p>
        </div>
        <div class="article">
          <div href="" class="article_url">
            <div class="article_img">
              <img
                src="https://placeimg.com/83/83"
                alt="文章圖片"
                class="article_img"
              />
            </div>
            <div class="article_content">
              <div class="article_time">
                <span class="category">
                  會員專區
                </span>
                <span class="time">
                  2020-07-23
                </span>
              </div>
              <div class="article_title">
                <h5>
                  兩岸貨運一艙難求 疫情指揮別鎖在緊箍咒Almost we know it, yes as
                  you know I will be a rich man directly! cool very cool
                </h5>
                <div class="desc only_web">
                  <p>
                    台灣連續42天沒有出現新冠肺炎本土病例，證明台灣防疫有成，多項嚴格管制措施可逐漸鬆綁，
                    然而，從疫情爆發迄今，全球貨運需求有增無減球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需球貨運需
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      keywordArray: [1]
    }
  }
}
</script>
<style scoped>
.nokeywords {
  color: #d72c1d;
}
.nokeywords_details {
  color: #7d7d7d;
  font-size: 15px;
}
.nokeywords_details a {
  color: #d72c1d;
  text-decoration: underline;
}
hr {
  margin: 20px 0 10px 0;
}
.keywords {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.keywords .keyword {
  background-color: #fff;
  color: #7d7d7d;
  margin-right: 10px;
  padding: 6px 30px 6px 10px;
  font-weight: 300;
  font-size: 13px;
  border-radius: 5px;
  border: 1px solid #dbdbdb;
  cursor: pointer;
  position: relative;
}
.keywords .keyword:hover {
  color: #fff;
  border: 1px solid #d72c1d;
  background-color: #d72c1d;
}
i.fal.fa-times {
  font-size: 3px;
  font-weight: 500;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}
.article_info {
  font-size: 15px;
  display: flex;
  justify-content: space-between;
  color: #7d7d7d;
}
.quantity {
  color: #d72c1d;
}
.article {
  margin-bottom: 10px;
  position: relative;
  min-height: 83px;
  width: 100%;
}

.article_url {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  color: #000;
}
.article_img {
  margin-right: 15px;
  width: 83px;
  height: 83px;
}
.article_img img {
  width: 83px;
  height: 83px;
  object-fit: cover;
}
.article_content {
  width: 100%;
  flex: 1;
  overflow: hidden;
}
.article_time {
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 4px;
}
.category {
  margin-right: 10px;
}
.article_title h5 {
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  margin-bottom: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}
.desc p {
  font-size: 15px;
  font-weight: 100;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-word;
  word-wrap: break-word;
  white-space: normal;
  margin-bottom: 0;
}
a:hover {
  text-decoration: none;
}

@media screen and (max-width: 767px) {
  /* width */
  .article::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 0;
    height: 0;
    display: none;
  }
  .article {
    align-items: stretch;
    margin-bottom: 10px;
    overflow-x: scroll;
  }
  .article_img {
    display: none;
  }
  .article_url {
    justify-content: space-between;
    width: 100%;
  }
  .article_time {
    font-size: 12px;
  }
  .article_title {
    overflow: hidden;
  }
  .article_title h5 {
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    word-break: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>

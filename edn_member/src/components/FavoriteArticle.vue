<template>
  <div class="fav_article">
    <div
      v-for="article in articles"
      :key="article.id"
      class="article"
      @scroll="detectScroll"
    >
      <div class="cancel_collect only_web">
        <i class="fas fa-times-circle" />
        <span>取消收藏</span>
      </div>
      <a :href="article.url" class="article_url" target="_blank">
        <div class="article_img only_web">
          <img
            :src="article.imgUrl"
            alt=""
            class="img-responsive"
          >
        </div>
        <div class="article_content">
          <div class="article_time">
            <div class="category">
              {{ article.category }}
            </div>
            <div class="time">
              {{ article.time }}
            </div>
          </div>
          <div class="article_title">
            <h5>{{ article.title }}</h5>
            <div class="desc only_web">
              {{ article.description }}
            </div>
          </div>
        </div>
      </a>
      <div class="cancel_collect mobile">
        <i class="fas fa-times-circle" />
        <span>取消收藏</span>
      </div>
    </div>
  </div>
</template>
<script>
// import $ from 'jquery'
export default {
  metaInfo: {
    title: '我的文章'
  },
  data () {
    return {
      articles: [
        {
          url: 'https://money.udn.com/money/story/12937/4488235',
          imgUrl:
            'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/13/2/7727050.jpg',
          title: '【外媒綜合】該追高還是等下波底部？投資人真的很掙扎',
          description:
            '美國失業率急升之際，美股上周居然大漲12%，創下46年來單周最大漲勢。同樣地，台股也連續兩周漲幅在5%以上，Lorem, ipsum dolor.',
          id: 1,
          category: '會員專區',
          time: '2020-04-27 02:42'
        },
        {
          url: 'https://money.udn.com/money/story/12937/4488235',
          imgUrl:
            'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/13/2/7727050.jpg',
          title: '【外媒綜合】該追高還是等下波底部？投資人真的很掙扎',
          description:
            '美國失業率急升之際，美股上周居然大漲12%，創下46年來單周最大漲勢。同樣地，台股也連續兩周漲幅在5%以上，Lorem, ipsum dolor.',
          id: 2,
          category: '會員專區',
          time: '2020-04-27 02:42'
        },
        {
          url: 'https://money.udn.com/money/story/12937/4488235',
          imgUrl:
            'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/13/2/7727050.jpg',
          title: '【外媒綜合】該追高還是等下波底部？投資人真的很掙扎',
          description:
            '美國失業率急升之際，美股上周居然大漲12%，創下46年來單周最大漲勢。同樣地，台股也連續兩周漲幅在5%以上，Lorem, ipsum dolor.',
          id: 3,
          category: '會員專區',
          time: '2020-04-27 02:42'
        },
        {
          url: 'https://money.udn.com/money/story/12937/4488235',
          imgUrl:
            'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/13/2/7727050.jpg',
          title: '該追高還是等下波底部？投資人真的很掙扎',
          description:
            '美國失業率急升之際，美股上周居然大漲12%，創下46年來單周最大漲勢。同樣地，台股也連續兩周漲幅在5%以上，Lorem, ipsum dolor.',
          id: 4,
          category: '會員專區',
          time: '2020-04-27 02:42'
        },
        {
          url: 'https://money.udn.com/money/story/12937/4488235',
          imgUrl:
            'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/13/2/7727050.jpg',
          title: '該追高還是等下波底部？投資人真的很掙扎',
          description:
            '美國失業率急升之際，美股上周居然大漲12%，創下46年來單周最大漲勢。同樣地，台股也連續兩周漲幅在5%以上，Lorem, ipsum dolor.',
          id: 5,
          category: '會員專區',
          time: '2020-04-27 02:42'
        },
        {
          url: 'https://money.udn.com/money/story/12937/4488235',
          imgUrl:
            'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/13/2/7727050.jpg',
          title: '該追高還是等下波底部？投資人真的很掙扎',
          description:
            '美國失業率急升之際，美股上周居然大漲12%，創下46年來單周最大漲勢。同樣地，台股也連續兩周漲幅在5%以上，Lorem, ipsum dolor.',
          id: 6,
          category: '會員專區',
          time: '2020-04-27 02:42'
        },
        {
          url: 'https://money.udn.com/money/story/12937/4488235',
          imgUrl:
            'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2020/04/13/2/7727050.jpg',
          title: '該追高還是等下波底部？投資人真的很掙扎',
          description:
            '美國失業率急升之際，美股上周居然大漲12%，創下46年來單周最大漲勢。同樣地，台股也連續兩周漲幅在5%以上，Lorem, ipsum dolor.',
          id: 7,
          category: '會員專區',
          time: '2020-04-27 02:42'
        }
      ],
      scrollLeft: 0
    }
  },
  methods: {
    detectScroll: function (e) {
      const vm = this
      // console.log(e)
      vm.scrollLeft = e.target.scrollLeft
      if (e.target.scrollLeft >= 35) {
        e.target.children[2].classList.add('showup')
      } else {
        e.target.children[2].classList.remove('showup')
      }
      // setTimeout(function () {
      //   $(e.target).animate({
      //     scrollLeft: 0
      //   })
      // }, 5000)
    }
  }
}
</script>
<style scoped>
.fav_article {
  padding-left: 10px;
}
.article {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 10px;
  position: relative;
  min-height: 80px;
}
.cancel_collect {
  margin-right: 20px;
  width: auto;
  text-align: center;
  font-size: 13px;
  font-weight: 300;
  color: #c2c2c2;
  cursor: pointer;
}
.cancel_collect span {
  display: block;
  width: 100%;
}
.cancel_collect:hover {
  color: #000;
}
.fa-times-circle {
  font-size: 24px;
  text-align: center;
  margin-bottom: 3px;
}
.article_url {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  flex: 1;
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
.article_time {
  display: flex;
  color: #000;
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 4px;
}
.category {
  margin-right: 10px;
}
.article_title h5{
  color: #000;
  font-size: 15px;
  text-align-last: left;
  margin-bottom: 2px;
}
.desc {
  font-size: 15px;
  font-weight: 100;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  word-break: break-word;
  word-wrap: break-word;
  white-space: normal;
}
.article_title:hover {
  color: darkblue;
}
a:hover {
  text-decoration: none;
}
.cancel_collect.mobile {
  display: none;
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

  .fav_article {
    padding-left: 0;
  }
  .article_url {
    justify-content: space-between;
    width: 100%;
  }
  .article_time {
    font-size: 12px;
  }
  .article_title {
    width: 100%;
  }
  .cancel_collect {
    margin: 0;
    padding:5px;
    position: absolute;
    right: 0;
    transform: translateX(120%);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    height:100%;
    transition: all .5s linear;
  }
  .cancel_collect.mobile {
    display: flex;
  }
  .cancel_collect.showup {
    background-color: #000;
    color: #fff;
  }

}
</style>

/* eslint-disable vue/no-unused-components */
<template>
  <div class="compaigns">
    <!-- <Loading :active.sync="isLoading" /> -->
    <h6 class="title">展覽
    </h6>
    <div class="nav">
      <a
        v-for="(years, index) in totalCompaign"
        :key="years[0].id"
        class="year"
        :class="{ active: index === faceValue }"
        @click="toggleClass(index)"
      >
        {{ years[0].year }}
      </a>
    </div>
    <ul
      v-for="(compaigns, index) in totalCompaign"
      :key="compaigns[0].id + 10"
      class="compaign"
      v-show="index === faceValue"
    >
      <li
        v-for="compaign in compaigns"
        :key="compaign.id"
        class="compaign_list"
      >
        <a href="javascript:;" class="compaign_url">
          <div class="compaign_status" @mouseover="changeimg(compaign.status)" @mouseleave="defaultimg(compaign.status)" :class="{'is-over':compaign.status === 'over'}">
            <img :src="(compaign.status === 'over') ? 'static/img/join-gray.png' : 'static/img/join-black.png'" alt="" class="join">
            <span>{{(compaign.status === 'signup') ? '我要參加' : '活動截止'}}
            </span>
          </div>
          <div class="compaign_content">
            <div class="time">
              {{ compaign.date }}
            </div>
            <div class="compaign_title">
              <h5>{{ compaign.title }}</h5>
            </div>
            <div class="compaign_desc only_web">
              {{ compaign.content }}
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
// import $ from 'jquery'
export default {
  metaInfo: {
    title: '文章收藏'
  },
  data () {
    return {
      joinImgUrl: 'static/img/join-black.png',
      totalCompaign: [
        [
          {
            type: '展覽',
            id: 1,
            title: '第四屆創業之星選秀大賽',
            content: '自2017年經濟日報首次啟動創業之星選秀活動，期盼為台灣產業尋找新動力。此活動受到熱烈響應，在2019年第三屆報名選秀件數達110件，可見國內產業創新發展之蓬勃，也急需一扇窗讓世界看',
            year: '報名中',
            date: '2020-1-1',
            status: 'signup'
          }
        ],
        [
          {
            type: '展覽',
            id: 2,
            title: '這是標題',
            content: '這是內容',
            year: '活動截止',
            date: '2020-1-1',
            status: 'over'
          },
          {
            type: '展覽',
            id: 3,
            title: '這是標題',
            content: '這是內容',
            year: '2019年',
            date: '2020-1-1',
            status: 'over'
          },
          {
            type: '展覽',
            id: 4,
            title: '這是標題',
            content: '這是內容',
            year: '2019年',
            date: '2020-1-1',
            status: 'over'
          }
        ]
      ],
      faceValue: 0,
      isLoading: true
    }
  },
  created () {
    // const vm = this
    // vm.getCompaignList()
  },
  mounted () {
  },
  methods: {
    getCompaignList: function () {
      const vm = this
      vm.$http
        .get('http://memberapi.udn.com:9090/api/forum/list')
        .then(function (data) {
          console.log(data.data.data)
          vm.totalCompaign = data.data.data
          vm.isLoading = false
        })
    },
    toggleClass: function (index) {
      const vm = this
      vm.faceValue = index
    },
    changeimg: function (status) {
      if (status === 'over') {
        return false
      }
      event.currentTarget.children[0].attributes.src.textContent = 'static/img/join-red.png'
    },
    defaultimg: function (status) {
      if (status === 'over') {
        return false
      }
      event.currentTarget.children[0].attributes.src.textContent = 'static/img/join-black.png'
    }
  }
}
</script>
<style scoped>
a.year {
  margin-right: 20px;
  padding: 2px 0;
  text-decoration: none;
  color: #c2c2c2;
  font-size: 15px;
  cursor: pointer;
  clear: both;
}
a.year.active {
  color: #d72c1d;
  border-bottom: 1px solid #d72c1d;
}
ul.compaign {
  left: 40px;
  padding: 0;
  margin: 40px 0 0 0;
  list-style-type: none;
  width: 100%;
  max-width: 830px;
  /* display: none; */
}
ul.compaign.active {
  display: block;
}
.compaign_list {
  margin-bottom: 20px;
}
a.compaign_url {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  color: #000;
}
.compaign_status {
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  margin-right: 20px;
  font-size: 13px;
}
.compaign_status:hover {
  color: #d72c1d;
}
.compaign_status.is-over {
  color: #C2C2C2;
  cursor: auto;
}
img.join {
  width: 20px;
  height: 20px;
  margin-bottom: 2px;
}
.compaign_content {
  flex: 1;
}
.time {
  margin-bottom: 4px;
  font-size: 13px;
}
.compaign_title h5 {
  font-size: 15px;
  margin-bottom: 2px;
}
.compaign_desc {
  font-size: 15px;
  font-weight: 100;
}

/* transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@media screen and (max-width: 767px) {
  .nav {
    justify-content: space-between;
    flex-wrap: nowrap;
    overflow: hidden;
  }
  a.year {
    font-size: 15px;
    margin-right: 0;
    width: 50%;
    text-align: left;
  }
  a.year.active {
    border-bottom: 3px solid #d72c1d;
  }
  a.year ul.compaign {
    left: 0;
    padding: 0 20px;
    margin-top: 60px;
  }
  .compaign_status span {
    font-size: 12px;
  }
  .fa-check-square {
    font-size: 30px;
  }
  .time {
    font-size: 12px;
  }
  .compaign_title h5 {
    font-size: 17.5px;
  }
}
</style>

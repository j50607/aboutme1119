<template>
  <div class="announcement">
    <h6 class="title">服務公告</h6>
    <div class="accordion" id="accordionExample">
      <div class="card" v-for="(cards, index) in totalAnnouncement" :key="index">
        <div class="card-header" :id="`heading${index}`">
          <h2 class="mb-0">
            <button
              class="btn btn-link"
              type="button"
              data-toggle="collapse"
              :data-target="`#collapse${index}`"
              :aria-expanded="showID === index? true : false"
              :aria-controls="`collapse${index}`"
              @click.self="sendID(index, $event)"
            >
              <span class="date">{{cards.date}}</span>
              <span class="content_title">{{cards.title}}</span>
              <div class="symbol">
                <i class="fas fa-plus" ></i>
                <i class="fas fa-minus"></i>
              </div>
            </button>
          </h2>
        </div>

        <div
          :id="`collapse${index}`"
          class="collapse"
          :class="{'show': index === showID}"
          :aria-labelledby="`heading${index}`"
          data-parent="#accordionExample"
        >
          <div class="card-body">
            <p v-html="cards.content"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  metaInfo: {
    title: '服務公告'
  },
  data () {
    return {
      totalAnnouncement: [
        {
          title: '經濟日報股市看盤服務改版公告',
          date: '2020-08-17',
          content: '為提供更便利、更即時的股市看盤服務，經濟日報<a href="https://udn.megatime.com.tw/" target="_blank" style="color:#d72c1d;">舊看盤系統</a>將於8月31日起停止服務。歡迎大家前往<a href="https://money.udn.com/common/systex_login/" target="_blank" style="color:#d72c1d;">新看盤系統</a>繼續使用，原有自選股資料會同步移轉至新看盤系統。'

        }
      ],
      showID: 0
    }
  },
  methods: {
    sendID: function (id, event) {
      const vm = this
      vm.showID = id
    }
  },
  computed: {
    // isExpanded () {
    //   if ( this.showID === )
    // }
  }
}
</script>
<style scoped>
button.btn-link {
  width: 100%;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  color: #000;
  text-decoration: none;
}
.date {
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 5px;
  display: block;
  width: 100%;
  text-align: left;
}
span.content_title {
  font-size: 15px;
  line-height: 1;
  text-align: left;
  display: block;
  width: 100%;
  margin-bottom: 2px;
}
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
  color: #000;
  padding: 5px 60px 0 0;
  font-size: 15px;
  font-weight: 100;
  line-height: 1.5;
}
.symbol {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
.fa-minus, .fa-plus {
  font-size: 16px;
  font-weight: lighter;
  position: absolute;
  right: 0;

}
.fa-minus {
  display: none;
  /* transform: scale(0); */
}
.fa-plus {
  display: block;
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

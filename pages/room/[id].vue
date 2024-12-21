<script setup>
// Auto Imports
const route = useRoute();
const router = useRouter();
// 獲取路由中的動態參數
// 例如 : 路由路徑為 /product/productA ， route.params 為 { id: 'productA'}
// { id: 'productA'}
const { id } = route.params;
const roomObject = ref({});
const apiUrl = `https://nuxr3.zeabur.app/api/v1/rooms/${id}`;

fetch(apiUrl)
  .then(function (response) {
    if (!response.ok) {
      throw new Error("取得房型資料失敗");
    }
    return response.json();
  })
  .then(function (room) {
    const { result } = room;
    roomObject.value = result;
  })
  .catch((error) => {
    console.error("發生錯誤:", error);
  });

const isProvide = function (isProvideBoolean = false) {
  return isProvideBoolean ? "提供" : "未提供";
};

</script>

<template>
  <h2>房型詳細頁面</h2>
  {{ id }}
  <pre>
</pre>
  <div class="container">
    <button @click="router.go(-1)">回上一頁</button>
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="room-page">
          <div class="room-header">
            <h1 class="room-name">{{ roomObject.name }}</h1>
            <p class="room-description">
              {{ roomObject.description }}
            </p>
          </div>

          <div class="room-gallery">
            <img
              :src="roomObject.imageUrl"
              :alt="roomObject.name"
              class="room-main-image"
            />
            <ul class="room-image-list">
              <li v-for="(imageUrl, index) in roomObject.imageUrlList">
                <img
                  :src="imageUrl"
                  :alt="`${roomObject.name}圖片${index + 1}`"
                />
              </li>
            </ul>
          </div>

          <div class="room-info">
            <div class="info-block">
              <h2>房間資訊</h2>
              <p>面積: {{ roomObject.areaInfo }}</p>
              <p>床型: {{ roomObject.bedInfo }}</p>
              <p>最多容納人數: {{ roomObject.maxPeople }}</p>
              <p>價格: {{ roomObject.price }}</p>
            </div>

            <div class="info-block">
              <h2>房間配置</h2>
              <ul>
                <li v-for="layout in roomObject.layoutInfo" :key="layout.title">
                  {{ layout.title }}: {{ isProvide(layout.isProvide) }}
                </li>
              </ul>
            </div>

            <div class="info-block">
              <h2>房內設施</h2>
              <ul>
                <li
                  v-for="facility in roomObject.facilityInfo"
                  :key="facility.title"
                >
                  {{ facility.title }}: {{ isProvide(facility.isProvide) }}
                </li>
              </ul>
            </div>

            <div class="info-block">
              <h2>客房備品</h2>
              <ul>
                <li
                  v-for="amenity in roomObject.amenityInfo"
                  :key="amenity.title"
                >
                  {{ amenity.title }}: {{ isProvide(amenity.isProvide) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
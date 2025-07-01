<template>
    <div>
   <h2 class="text-xl font-bold text-blue-600 mb-1">About This Project</h2>
    <div class="overflow-x-auto">
      <div>
        <h2 class="text-gray-700 mb-4">โปรเจคนี้ ได้ไอเดียมาจากการนั่งหาคำนวณ INR ในคลินิควาร์ฟาริน ผมรู้สึกว่ามันคงจะดีไม่น้อย ถ้าหากเราทำเป็นโปรแกรมให้สามารถเปิดใช้งานได้ในมือถือหรือคอมได้ กดคำนวณปรับ TWD ง่ายๆ ช่วยทั้งลด Med Error ในการจ่ายยา และ DRP ที่อาจเกิดขึ้นได้</h2>
         <h2 class="text-xl font-bold text-blue-600 mb-1">Original Version</h2>
        <h2 class="text-gray-700 mb-4" >
          Version 1 : สามารถเข้าไปใช้งานได้ที่
          <a
            href="https://napatchouli.github.io/Demo/"
            class="font-medium text-blue-600 underline dark:text-blue-600 hover:no-underline"
            target="_blank"
            rel="noopener"
          >
            Quick Warfarin V.1
          </a>
        </h2>
        <h2 class="text-xl font-bold text-blue-600 mb-1">
          <a
            href="https://www.facebook.com/napat.sampatpong"
            target="_blank"
            rel="noopener"
            class="text-blue-600 no-underline hover:underline"
          >
            About Developer
          </a>
        </h2>
        <h2 class="text-gray-700 mb-4" >
            สวัสดีครับ ผม ภก.ณภัทร สัมพัทธ์พงศ์  ผมเป็นเภสัชกรโรงพยาบาลชุมชนแห่งหนึ่งในภาคกลาง ผมเป็นคนที่เบื่อกับงานประจำมากๆ เลยหาอะไรทำไปเรื่อยเปื่อย ผมค่อนข้างชอบการหาอะไรทำเกี่ยวกับโปรเจคด้านเทคโนโลยีและ AI (จริงๆก็ชอบหาอะไรทำไปเรื่อย ถ้าสนใจ 555) ในอนาคต ผมคิดว่า น่าจะมีอีกหลายโปรเจคที่น่าว่าจะทำเพิ่มอยู่ สามารถดูโปรเจคที่ผมเคยทำได้จากข้างล่างนี้ได้เลยครับ
        </h2>
        
        <h2 class="text-xl font-bold text-blue-600 mb-1">Other Projects</h2>
        <ul class="list-disc list-inside text-gray-700 space-y-1">
            <li><a href="https://script.google.com/macros/s/AKfycbwRdXgYAyu1HGD53V39Ste6-uk7MMaxZtB11Blo4aQvQO0ijlx_iyL-ZVhiCUaP8BFqAA/exec" target="_blank" rel="noopener" class="text-blue-600 no-underline hover:underline">Emergency Box Recorder</a></li>
            <li><a href="https://sites.google.com/view/cbd-dis-center/" target="_blank" rel="noopener" class="text-blue-600 no-underline hover:underline">Chaibadan Hospital's DIS center</a></li>
            <li><a href="https://script.google.com/macros/s/AKfycbztTnHUJ4ameOG37Zq-H_5zvR7MFrROQCdmFtzhfHoVzbP_CLT8-RVEebvdm7dungH1pg/exec" target="_blank" rel="noopener" class="text-blue-600 no-underline hover:underline">Norepinephrine Calculator</a></li>
            <li><a href="https://script.google.com/macros/s/AKfycbyIepvlBaArfrAQNtzmmyoBpxAR5D-8meUTGd2l06q7xWK8zzyuaGUI80mUPrkZI8LJew/exec" target="_blank" rel="noopener" class="text-blue-600 no-underline hover:underline">Fluid Calculator</a></li>
        </ul>

        <h2 class="text-xl font-bold text-blue-600 mb-1">Reference</h2>
        <ul class="list-disc list-inside text-gray-700 space-y-1">
            <h2>ขอบคุณข้อมูลตารางปรับขนาดยา Warfarin จาก</h2>
            <li>ฝ่ายเภสัชกรรม โรงพยาบาลชัยบาดาล จ.ลพบุรี</li>
            <li>ฝ่ายเภสัชกรรม โรงพยาบาลสมเด็จพระบรมราชเทวี ณ ศรีราชา สภากาชาดไทย</li>
        </ul>
        <div class="w-full h-auto py-8 flex items-center justify-center gap-4 flex-wrap">
            <!--Facebook-->
            <a href="https://www.facebook.com/napat.sampatpong" target="_blank" rel="noopener">
                <button class="bg-blue-50 cursor-pointer rounded-md shadow-md shadow-transparent transition-all duration-300 hover:shadow-indigo-200">
                    <svg class="" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 92 92" fill="none">
                    <rect x="0.138672" width="" height="" rx="15" fill="#EDF4FF"/>
                    <path d="M56.4927 48.6403L57.7973 40.3588H49.7611V34.9759C49.7611 32.7114 50.883 30.4987 54.4706 30.4987H58.1756V23.4465C56.018 23.1028 53.8378 22.9168 51.6527 22.8901C45.0385 22.8901 40.7204 26.8626 40.7204 34.0442V40.3588H33.3887V48.6403H40.7204V68.671H49.7611V48.6403H56.4927Z" fill="#337FFF"/>
                    </svg>
                </button>
            </a>
            <!--Gmail-->
            <a href="mailto:n.sampatpong@gmail.com" target="_blank" rel="noopener">
                <button class="w-12 h-12 flex items-center justify-center bg-gray-100 cursor-pointer rounded-md shadow-md shadow-transparent transition-all duration-300 hover:shadow-blue-200" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 54 41" fill="none">
                    <path
                    d="M4.00654 40.1236H12.4893V19.5227L0.371094 10.4341V36.4881C0.371094 38.4997 2.00099 40.1236 4.00654 40.1236Z"
                    fill="#4285F4" />
                    <path
                    d="M41.5732 40.1236H50.056C52.0676 40.1236 53.6914 38.4937 53.6914 36.4881V10.4341L41.5732 19.5227"
                    fill="#34A853" />
                    <path
                    d="M41.5732 3.7693V19.5229L53.6914 10.4343V5.58702C53.6914 1.09118 48.5594 -1.47181 44.9663 1.22448"
                    fill="#FBBC04" />
                    <path d="M12.4893 19.5227V3.76904L27.0311 14.6754L41.5729 3.76904V19.5227L27.0311 30.429"
                    fill="#EA4335" />
                    <path
                    d="M0.371094 5.58702V10.4343L12.4893 19.5229V3.7693L9.09617 1.22448C5.49708 -1.47181 0.371094 1.09118 0.371094 5.58702Z"
                    fill="#C5221F" />
                    </svg>
                </button>
            </a>
        </div>
    </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS สำหรับ Transition การแสดงผลลัพธ์ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
<script setup>
import { ref, shallowRef } from 'vue'
import GuidelineTab from './components/GuidelineTab.vue'
import DosingTab from './components/DosingTab.vue'
import TwdDesignTab from './components/TwdDesignTab.vue'
import FollowUpTab from './components/FollowUpTab.vue'
import DosingEntryCard from './components/DosingEntryCard.vue'

const activeTab = shallowRef(GuidelineTab)
const activeTabName = ref('Guideline')

const tabs = {
  'Guideline': GuidelineTab,
  'Dosing': DosingTab,
  'TWD Design': TwdDesignTab,
  'Follow-up': FollowUpTab
}

// --- State ที่จะแชร์ระหว่าง Tabs ---
const sharedOriginalTWD = ref(null);
const sharedRecommendedTWD = ref(null);

function selectTab(tabName) {
  activeTabName.value = tabName;
  activeTab.value = tabs[tabName];
}

// --- ฟังก์ชันสำหรับรับข้อมูลจาก DosingTab ---
function updateSharedTWDs({ originalTWD, recommendedTWD }) {
  sharedOriginalTWD.value = originalTWD;
  sharedRecommendedTWD.value = recommendedTWD;
}
</script>

<template>
  <div class="bg-gray-50 min-h-screen font-sans text-gray-800">
    <header class="sticky top-0 z-40 p-4 text-center bg-gray-800 shadow-sm md:p-6">
      <h1 class="text-2xl font-bold text-blue-600 md:text-3xl">Quick Warfarin V.2</h1>
      <p class="text-sm text-white">
      Developed by Pharmacist Napat Sampatpong
      </p>
      <p class="text-sm text-amber-400 font-light ">
      Last updated : Jun 30,2025
      </p>
    </header>

    <main class="p-4 pb-24 md:pb-4">
      <nav class="hidden md:flex justify-center mb-6 border-b border-gray-200 ">
        <button v-for="(component, tabName) in tabs" :key="tabName" :class="[
          'px-6 py-3 font-bold text-gray-600 border-b-2 transition-colors duration-300',
          activeTabName === tabName ? 'border-blue-500 text-blue-600 font-bold' : 'border-transparent hover:border-gray-300 text-blue-600'
        ]" @click="selectTab(tabName)">
          {{ tabName }}
        </button>
      </nav>

      <div class="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow">
        <Transition name="fade" mode="out-in">
          <KeepAlive>
          <component :is="activeTab" :originalTWD="sharedOriginalTWD" :recommendedTWD="sharedRecommendedTWD"
            @update-shared-twds="updateSharedTWDs"></component>
          </KeepAlive>
          </Transition>
      </div>
    </main>

    <nav
      class="md:hidden fixed bottom-0 left-0 right-0 bg-blue-600 font-bold shadow-lg flex justify-around z-50 border-t border-gray-200">
      <button v-for="(component, tabName) in tabs" :key="tabName + '-mobile'" :class="[
        'flex-1 p-3 text-center transition-colors duration-300 text-sm',
        activeTabName === tabName ? 'text-blue-600 bg-blue-50' : 'text-white hover:bg-gray-100 hover:text-gray-700'
      ]" @click="selectTab(tabName)">
        {{ tabName }}
      </button>
    </nav>
  </div>
</template>

<style>
/* CSS สำหรับ Transition การเปลี่ยน Tab */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
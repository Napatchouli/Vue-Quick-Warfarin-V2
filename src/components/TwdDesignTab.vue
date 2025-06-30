<script setup>
import { ref,  watch } from 'vue';
import warfarinDatabase from '../assets/Warfarin_DB_from_colab_V2.json';

// 1. รับ Props จาก App.vue
const props = defineProps(['originalTWD', 'recommendedTWD']);
// 2. สร้าง "ตัวแปรของตัวเอง" (Local State)
//    แล้วกำหนดค่าเริ่มต้นให้มาจาก props ที่ได้รับ
const localOriginalTWD = ref(props.originalTWD);
const localTargetTWD = ref(props.recommendedTWD);
const manualOriginalTWD = ref(props.originalTWD); // เพิ่มตัวแปรนี้สำหรับ v-model
// 3. สร้าง Watcher เพื่อคอยดูว่าถ้า props จากแม่เปลี่ยน ให้มาอัปเดต "ตัวแปรของตัวเอง"
watch(() => props.originalTWD, (newVal) => {
  localOriginalTWD.value = newVal;
});
watch(() => props.recommendedTWD, (newVal) => {
  localTargetTWD.value = newVal;
});
// ---- Reactive State ----
 // <-- State ใหม่สำหรับช่อง "ขนาดยาเดิม"
const targetTWD = ref(null);
const availableStrengths = ref({ 2: true, 3: true, 5: true });
const foundRegimens = ref([]);
const showResult = ref(false);

// ---- Functions ----
function findRegimens() {
    // ... Logic การค้นหาเหมือนเดิมทุกประการ ...
    const twd = parseFloat(localTargetTWD.value);
  if (isNaN(twd)) {
    foundRegimens.value = [];
    showResult.value = true; // แสดงข้อความ "ไม่พบข้อมูล"
    return;
  }
  const selectedStrengths = Object.keys(availableStrengths.value)
                                .filter(strength => availableStrengths.value[strength])
                                .map(Number);
  if (selectedStrengths.length === 0) {
     foundRegimens.value = 'no_strength_selected';
     showResult.value = true;
     return;
  }
  const results = warfarinDatabase.filter(regimen => {
    const isTwdMatch = regimen.TWD === twd;
    const areStrengthsAvailable = regimen.AvailableStrengths.every(
      requiredStrength => selectedStrengths.includes(requiredStrength)
    );
    return isTwdMatch && areStrengthsAvailable;
  });
  foundRegimens.value = results;
  showResult.value = true;
}
function resetForm() {
  localOriginalTWD.value = null; // เคลียร์ local state
  localTargetTWD.value = null;   // เคลียร์ local state
  manualOriginalTWD.value = null; // เคลียร์ช่องขนาดยาเดิม
  showResult.value = false;
  foundRegimens.value = [];
  availableStrengths.value = { 2: true, 3: true, 5: true };
}


// 5. Computed Property ก็จะทำงานกับ "ตัวแปรของตัวเอง" เช่นกัน
import { computed } from 'vue'; // เพิ่มกลับเข้ามา
const percentChangeText = computed(() => {
  const original = parseFloat(localOriginalTWD.value);
  const target = parseFloat(localTargetTWD.value);

  if (!isNaN(original) && !isNaN(target) && original > 0) {
    const change = ((target - original) / original) * 100;
    const direction = change >= 0 ? 'เพิ่มขึ้น' : 'ลดลง';
    return `(${direction} ${Math.abs(change).toFixed(1)}%)`;
  }
  return '';
});

const resultTitle = computed(() => {
  if (foundRegimens.value === 'no_strength_selected') return 'กรุณาเลือกความแรงยาอย่างน้อย 1 อย่าง';
  if (foundRegimens.value.length > 0) {
    return `พบ ${foundRegimens.value.length} รูปแบบการจัดยาสำหรับ TWD ${localTargetTWD.value} mg ${percentChangeText.value}`;
  }
  return `ไม่พบรูปแบบการจัดยาสำหรับ TWD ${targetTWD.value} mg`;
});

 const resultType = computed(() => {
   if (foundRegimens.value === 'no_strength_selected') return 'warning';
   return foundRegimens.value.length > 0 ? 'success' : 'danger';
});

const alertClasses = computed(() => {
  return {
    'bg-green-100 border-green-500 text-green-700': resultType.value === 'success',
    'bg-yellow-100 border-yellow-500 text-yellow-700': resultType.value === 'warning',
    'bg-red-100 border-red-500 text-red-700': resultType.value === 'danger',
  };
});
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-blue-600 mb-4">TWD Design</h2>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-500 mb-2">Available Strength</label>
       <div class="flex items-center gap-4 sm:gap-6">
            <label v-for="strength in [2, 3, 5]" :key="strength" class="flex items-center space-x-2 cursor-pointer">
                <input 
                  type="checkbox"
                  :id="'w' + strength"
                  v-model="availableStrengths[strength]"
                  class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-gray-700">{{ strength }} mg</span>
            </label>
        </div>
    </div>

    <div class="space-y-4">
        <div>
            <label for="manualOriginalTWD" class="block text-sm font-bold text-gray-700">ขนาดยาเดิม (mg/wk)</label>
            <input
                type="number"
                id="manualOriginalTWD"
                v-model="localOriginalTWD"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="กรอกขนาดยาเดิม"
                step="0.5"
            />
        </div>
        <div>
            <label for="targetTWD" class="block text-sm font-bold text-gray-700">TWD ที่ต้องการ (mg/wk)</label>
            <input
                type="number"
                id="targetTWD"
                v-model="localTargetTWD"
                @keyup.enter="findRegimens"
                class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="กรอกขนาดยาใหม่ที่แนะนำ"
                step="0.5"
            />
        </div>
    </div>

    <div class="flex items-center justify-center gap-4 mt-6">
      <button @click="resetForm" class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Reset</button>
      <button @click="findRegimens" class="px-6 py-2 border border-transparent text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700">Calculate</button>
    </div>

    <Transition name="fade">
      <div v-if="showResult" class="mt-6">
        <div class="p-4 border-l-4 rounded-r-lg mb-4" :class="alertClasses" role="alert">
            <p class="font-bold">{{ resultTitle }}</p>
        </div>
        <div v-if="foundRegimens.length > 0" class="space-y-4">
          <div v-for="(regimen, index) in foundRegimens" :key="index" class="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <h4 class="font-bold text-gray-800 mb-2">Regimen #{{ index + 1 }}</h4>
            <ul class="list-disc list-inside text-gray-600 space-y-1">
              <li v-if="regimen.Warfarin_2_mg && availableStrengths[2]"><strong>Warfarin 2 mg:</strong> {{ regimen.Warfarin_2_mg }}</li>
              <li v-if="regimen.Warfarin_3_mg && availableStrengths[3]"><strong>Warfarin 3 mg:</strong> {{ regimen.Warfarin_3_mg }}</li>
              <li v-if="regimen.Warfarin_5_mg && availableStrengths[5]"><strong>Warfarin 5 mg:</strong> {{ regimen.Warfarin_5_mg }}</li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
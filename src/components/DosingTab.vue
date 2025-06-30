<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['originalTWD', 'recommendedTWD']);
const emit = defineEmits(['update:originalTWD', 'update:recommendedTWD']);

const currentINR = ref(null);
const totalWarfarin = ref(null);
const resultMessage = ref('');
const resultType = ref('info');
const showResult = ref(false);

watch(totalWarfarin, (newVal) => {
  emit('update-shared-twds', {
    originalTWD: newVal,
    recommendedTWD: props.recommendedTWD
  });
});

function calculateInrDosing() {
  const inr = parseFloat(currentINR.value);
  const twd = parseFloat(totalWarfarin.value);

  if (isNaN(inr) || isNaN(twd)) {
    resultMessage.value = 'กรุณากรอกข้อมูล INR และขนาดยาต่อสัปดาห์ให้ถูกต้อง';
    resultType.value = 'danger';
    showResult.value = true;
    return;
  }

  // ---- [โค้ดที่แก้ไข] เพิ่ม 2 บรรทัดนี้กลับเข้ามา ----
  let message = '';
  let alertType = 'info';
  // ---------------------------------------------

  let newDose_1 = twd;
  let newDose_2 = twd;

  // --- Logic การคำนวณ (เหมือนเดิม) ---
  if (inr < 1.5) {
    newDose_1 = twd * 1.10;
    newDose_2 = twd * 1.20;
    message = '<strong>Low INR detected!</strong> แนะนำให้เพิ่มขนาดยาต่อสัปดาห์ 10-20%.';
    alertType = 'warning';
  } else if (inr >= 1.5 && inr < 2.0) {
    newDose_1 = twd * 1.05;
    newDose_2 = twd * 1.10;
    message = '<strong>INR below target range.</strong> แนะนำให้เพิ่มขนาดยาต่อสัปดาห์ 5-10%.';
    alertType = 'warning';
  } else if (inr >= 2.0 && inr <= 3.0) {
    message = '<strong>INR within target range.</strong> ให้ใช้ขนาดยาเดิมต่อไป';
    alertType = 'success';
  } else if (inr > 3.0 && inr < 4.0) {
    newDose_1 = twd * 0.95;
    newDose_2 = twd * 0.90;
    message = '<strong>INR slightly elevated.</strong> แนะนำให้ลดขนาดยาต่อสัปดาห์ 5-10%.';
    alertType = 'warning';
  } else if (inr >= 4.0 && inr < 5.0) {
    newDose_1 = twd * 0.90;
    message = '<strong>High INR detected!</strong> แนะนำให้งดยา 1 วัน จากนั้นลดขนาดยาต่อสัปดาห์ลง 10%.';
    alertType = 'danger';
    newDose_2 = 0;
  } else if (inr >= 5.0 && inr < 9.0) {
    message = '<strong>Critical INR level!</strong> แนะนำให้งดยา 1-2 วัน และพิจารณาให้ Vitamin K1 1 mg ชนิดรับประทาน';
    alertType = 'danger';
  } else if (inr >= 9.0) {
    message = '<strong>Severe INR elevation!</strong> แนะนำให้ Vitamin K1 5-10 mg ชนิดรับประทาน';
    alertType = 'danger';
  }

  newDose_1 = Math.round(newDose_1 * 2) / 2;
  newDose_2 = Math.round(newDose_2 * 2) / 2;

  let resultHTML = `<p>${message}</p>`;
  resultHTML += `<p><strong>ขนาดยาเดิมต่อสัปดาห์:</strong> ${twd} mg</p>`;

  if ((inr < 2.0 && inr > 0) || (inr > 3.0 && inr < 4.0)) {
     const dose1_text = (inr < 2.0) ? newDose_1 : newDose_2;
     const dose2_text = (inr < 2.0) ? newDose_2 : newDose_1;
     resultHTML += `<p><strong>ขนาดยาใหม่ที่แนะนำ:</strong> ${dose1_text} - ${dose2_text} mg</p>`;
  } else if (inr >= 4.0 && inr < 5.0) {
      resultHTML += `<p><strong>ขนาดยาใหม่ที่แนะนำ:</strong> ${newDose_1} mg</p>`;
  }

  emit('update-shared-twds', {
    originalTWD: twd,
    recommendedTWD: newDose_1
  });

  resultMessage.value = resultHTML;
  resultType.value = alertType;
  showResult.value = true;
}

function resetForm() {
    currentINR.value = null;
    totalWarfarin.value = null;
    showResult.value = false;
    emit('update-shared-twds', {
        originalTWD: null,
        recommendedTWD: null
    });
}

const alertClasses = computed(() => {
  return {
    'bg-blue-100 border-blue-500 text-blue-700': resultType.value === 'info',
    'bg-green-100 border-green-500 text-green-700': resultType.value === 'success',
    'bg-yellow-100 border-yellow-500 text-yellow-700': resultType.value === 'warning',
    'bg-red-100 border-red-500 text-red-700': resultType.value === 'danger',
  };
});
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-blue-600 mb-4">Dosing Calculator</h2>

    <div class="space-y-4">
      <div>
        <label for="currentINR" class="block text-sm font-medium text-gray-700">Current INR</label>
        <input
          type="number"
          id="currentINR"
          v-model="currentINR"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="เช่น 1.8"
          step="0.1"
        />
      </div>
      <div>
        <label for="totalWarfarin" class="block text-sm font-medium text-gray-700">Total Warfarin (mg/wk)</label>
        <input
          type="number"
          id="totalWarfarin"
          v-model="totalWarfarin"
          class="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="เช่น 21"
          step="0.5"
          @keyup.enter="calculateInrDosing"
        />
      </div>
    </div>

    <div class="flex items-center justify-center gap-4 mt-6">
      <button
        @click="resetForm"
        class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        Reset
      </button>
      <button
        @click="calculateInrDosing"
        class="px-6 py-2 border border-transparent text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Calculate
      </button>
    </div>

    <Transition name="fade">
      <div
        v-if="showResult"
        class="mt-6 p-4 border-l-4 rounded-r-lg"
        :class="alertClasses"
        role="alert"
        v-html="resultMessage"
      >
      </div>
    </Transition>
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
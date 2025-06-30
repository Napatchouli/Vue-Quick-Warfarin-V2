<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

// รับข้อมูล 'entry' จาก parent และทำให้สามารถส่งข้อมูลกลับได้ (v-model)
const props = defineProps({
  modelValue: Object, // ใช้ modelValue สำหรับ v-model
  index: Number
});
const emit = defineEmits(['update:modelValue', 'remove']);

// Data
const dayLabels = { 0: 'อา', 1: 'จ', 2: 'อ', 3: 'พ', 4: 'พฤ', 5: 'ศ', 6: 'ส' };
const availableDosages = [1, 2, 3, 4, 5];
const entry = ref(props.modelValue);

// Watcher ที่จะทำงาน *ในทุกๆการ์ด*
// 1. เมื่อ 'ทุกวัน' (allDays) ถูกติ๊ก ให้ติ๊กทุกวัน
watch(() => entry.value.allDays, (newValue) => {
  Object.keys(entry.value.days).forEach(dayIndex => {
    entry.value.days[dayIndex] = newValue;
  });
});

// 2. เมื่อ 'วัน' ถูกติ๊กครบ/ไม่ครบ ให้ไปอัปเดต 'ทุกวัน'
watch(() => entry.value.days, () => {
  const areAllDaysSelected = Object.values(entry.value.days).every(val => val === true);
  if (entry.value.allDays !== areAllDaysSelected) {
    entry.value.allDays = areAllDaysSelected;
  }
}, { deep: true });

// เมื่อมีการเปลี่ยนแปลงใน entry ให้ส่งข้อมูลกลับไปหา parent
watch(entry, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

function remove() {
    emit('remove', entry.value.id);
}
</script>

<template>
  <div class="border border-gray-200 rounded-lg p-4 bg-gray-50 relative">
    <h4 class="font-semibold text-gray-700 mb-3">Order {{ index + 1 }}</h4>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
      <div>
        <label class="block text-sm font-medium text-gray-600">Strength (mg)</label>
        <select v-model.number="entry.dosage" class="mt-1 w-full p-2 border rounded-md bg-white">
          <option v-for="dose in availableDosages" :key="dose" :value="dose">{{ dose }} mg</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600">จำนวนเม็ด/วัน</label>
        <input type="number" v-model.number="entry.tabletsPerDay" step="0.25" class="mt-1 w-full p-2 border rounded-md">
      </div>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-600 mb-2">วันที่รับประทาน</label>
      <div class="flex flex-wrap gap-x-4 gap-y-2 items-center">
        <div class="flex-shrink-0">
          <label class="flex items-center space-x-2 cursor-pointer p-1.5 rounded-full bg-blue-100 text-blue-800">
            <input type="checkbox" v-model="entry.allDays" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500">
            <span>ทุกวัน</span>
          </label>
        </div>
        <label v-for="(label, dayIndex) in dayLabels" :key="dayIndex" class="cursor-pointer">
          <input type="checkbox" v-model="entry.days[dayIndex]" class="sr-only peer">
          <div class="px-3 py-1.5 border rounded-full text-sm font-medium transition-colors duration-200 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:bg-gray-100">
            {{ label }}
          </div>
        </label>
      </div>
    </div>
    <button @click="remove" class="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" /></svg>
    </button>
  </div>
</template>
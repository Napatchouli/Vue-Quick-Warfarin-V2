<script setup>
import { ref, computed } from 'vue';
import DosingEntryCard from './DosingEntryCard.vue'; // <-- 1. Import component ลูก

// ---- Reactive State ----
const dosingEntries = ref([
  { id: Date.now(), dosage: 3, tabletsPerDay: 1, days: { 0: false, 1: true, 2: true, 3: true, 4: true, 5: true, 6: false }, allDays: false }
]);
const startDate = ref(new Date().toISOString().split('T')[0]);
const endDate = ref(getEndDatePlus(28));
const dayLabels = { 0: 'อา', 1: 'จ', 2: 'อ', 3: 'พ', 4: 'พฤ', 5: 'ศ', 6: 'ส' };
const followup_date = {0: '1 week',1:'2 week', 2:'3 week', 3:'1 month',4:'3 month',5:'6 month'}
const selectedFollowUp = ref(''); // Add this to reactive state section

// ---- Functions ----
function addEntry() {
  dosingEntries.value.push({
    id: Date.now(),
    dosage: 3,
    tabletsPerDay: 0.5,
    days: { 0: false, 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
    allDays: false
  });
}

function removeEntry(id) {
  dosingEntries.value = dosingEntries.value.filter(entry => entry.id !== id);
}

function getEndDatePlus(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function calculateFollowUpDate(period) {
  if (!startDate.value) return;
  const start = new Date(startDate.value);
  switch (period) {
    case '1 week': start.setDate(start.getDate() + 7); break;
    case '2 week': start.setDate(start.getDate() + 14); break;
    case '3 week': start.setDate(start.getDate() + 21); break;
    case '1 month': start.setDate(start.getDate() + 30); break;
    case '3 month': start.setDate(start.getDate() + 90); break;
    case '6 month': start.setDate(start.getDate() + 180); break;
  }
  endDate.value = start.toISOString().split('T')[0];
}

// ---- Computed Properties (เหมือนเดิม) ----
const totalWeeklyDose = computed(() => {
  // Logic เหมือนเดิม
  return dosingEntries.value.reduce((total, entry) => {
    const weeklyDoseForEntry = Object.keys(entry.days).reduce((sum, dayIndex) => {
      return sum + (entry.days[dayIndex] ? (entry.dosage * entry.tabletsPerDay) : 0);
    }, 0);
    return total + weeklyDoseForEntry;
  }, 0);
});

const dispensingSummary = computed(() => {
  if (!startDate.value || !endDate.value || new Date(endDate.value) < new Date(startDate.value)) {
    return { error: 'กรุณาเลือกช่วงวันที่ให้ถูกต้อง' };
  }
  
  const summary = {};
  let currentDate = new Date(startDate.value);
  let end = new Date(endDate.value);
  
  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay();
    dosingEntries.value.forEach(entry => {
      if (entry.days[dayOfWeek]) {
        const dosage = entry.dosage;
        const tablets = parseFloat(entry.tabletsPerDay) || 0;
        // Create a unique key based on dosage and administration pattern
        const daysPattern = Object.entries(entry.days).map(([day, value]) => value ? '1' : '0').join('');
        const key = `${dosage}-${daysPattern}-${entry.tabletsPerDay}`;
        
        if (!summary[key]) {
          summary[key] = {
            totalTablets: 0,
            dosage: entry.dosage,
            tabletsPerDay: entry.tabletsPerDay,
            days: entry.days,
            allDays: entry.allDays
          };
        }
        summary[key].totalTablets += tablets;
      }
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return Object.values(summary).map(item => ({
    ...item,
    totalTablets: Math.ceil(item.totalTablets)
  }));
});

function getSelectedDaysText(entry) {
    if (entry.allDays) return 'ทุกวัน';
    const selected = Object.keys(entry.days)
                        .filter(dayIndex => entry.days[dayIndex])
                        .map(dayIndex => dayLabels[dayIndex]);
    return selected.length > 0 ? `ทุก ${selected.join(', ')}` : 'ไม่ระบุวัน';
}
</script>

<template>
  <div>
    <h2 class="text-xl font-bold text-blue-600 mb-4">TWD & Follow-up Calculator</h2>

    <div class="space-y-4 mb-6">
      <DosingEntryCard
        v-for="(entry, index) in dosingEntries"
        :key="entry.id"
        v-model="dosingEntries[index]"  
        :index="index"
        @remove="removeEntry"
      />
    </div>

    <div class="text-center mb-8">
        <button @click="addEntry" class="px-5 py-2 border border-dashed border-gray-400 text-gray-600 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-all">
            + เพิ่มรายการยา
        </button>
    </div>

    <div class="border-t pt-6">
        <h3 class="text-lg font-bold text-blue-600 mb-4">สรุปผลการคำนวณ</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
                <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" id="startDate" v-model="startDate" class="mt-1 w-full p-2 border rounded-md">
            </div>
            <div class="space-y-2">
              <div>
                <label for="endDate" class="block text-sm font-medium text-gray-700">End Date (Follow-up)</label>
                <input type="date" id="endDate" v-model="endDate" class="mt-1 w-full p-2 border rounded-md">
              </div>
              <!--Followupperiod
                <div>
                <label for="followupPeriod" class="block text-sm font-medium text-gray-700">Follow-up Period</label>
                <select 
                  id="followupPeriod" 
                  class="mt-1 w-full p-2 border rounded-md"
                  @change="(e) => calculateFollowUpDate(e.target.value)"
                >
                  <option value="">Select follow-up period</option>
                  <option v-for="(label, key) in followup_date" :key="key" :value="label">
                    {{ label }}
                  </option>
                </select>
              </div> -->
              <div class="flex flex-wrap gap-2">
                <label v-for="(label, key) in followup_date" 
                       :key="key" 
                       class="cursor-pointer">
                  <input type="radio" 
                         v-model="selectedFollowUp" 
                         :value="label" 
                         class="sr-only peer"
                         @change="calculateFollowUpDate(label)">
                  <div class="px-3 py-1.5 border rounded-full text-sm font-medium transition-colors duration-200 
                              peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 
                              hover:bg-gray-100">
                    {{ label }}
                  </div>
                </label>
              </div>

            </div>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg space-y-4">
            <div class="flex justify-between items-center pb-3 border-b">
                <span class="font-medium text-gray-700">Total Weekly Dose (TWD):</span>
                <span class="font-bold text-2xl text-blue-700">{{ totalWeeklyDose.toFixed(2) }} mg/wk</span>
            </div>
            <div class="space-y-2">
                <h4 class="font-semibold text-gray-800">จำนวนยาที่ต้องจ่าย:</h4>
                <div v-if="dispensingSummary.error" class="text-red-600">{{ dispensingSummary.error }}</div>
                <div v-else-if="dispensingSummary.length > 0" class="space-y-2">
                     <div v-for="item in dispensingSummary" :key="item.dosage" class="flex justify-between items-baseline">
                         <p class="text-gray-600 text-sm">- Warfarin {{ item.dosage }} mg ({{ item.tabletsPerDay }} เม็ด, {{ getSelectedDaysText(item) }})</p>
                         <p class="font-bold text-gray-800">{{ item.totalTablets }} เม็ด</p>
                     </div>
                </div>
                <div v-else class="text-gray-500 text-sm">ไม่มีรายการยาที่ต้องจ่ายในช่วงวันที่เลือก</div>
            </div>
        </div>
    </div>
  </div>
</template>
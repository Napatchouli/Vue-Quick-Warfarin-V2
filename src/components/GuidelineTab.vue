<template>
  <div>
    <h2 class="text-xl font-bold text-blue-600 mb-4">Warfarin Guideline</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border border-gray-200">
        <thead class="bg-gray-800 text-white">
          <tr>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">INR</th>
            <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Management</th>
          </tr>
        </thead>
        <tbody class="text-gray-700">
          <tr v-for="(item, index) in guidelines" :key="index" class="border-b hover:bg-gray-100">
            <td class="text-left py-3 px-4 font-mono">{{ item.inr }}</td>
            <td class="text-left py-3 px-4">{{ item.management }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// จัดการข้อมูล Guideline ในรูปแบบ Array of Objects เพื่อให้จัดการง่าย
const guidelines = [
  { inr: '< 1.5', management: '+ 10-20 %' },
  { inr: '1.5-1.9', management: '+ 5-10 %' },
  { inr: '2.0-3.0', management: 'continue same dose' },
  { inr: '3.1-3.9', management: '- 5-10 %' },
  { inr: '4.0-4.9', management: 'Hold for 1 day then -10 %' },
  { inr: '5.0-8.9 (no bleeding)', management: 'Hold 1-2 doses, Vit.K1 1 mg orally' },
  { inr: '> 9.0 (no bleeding)', management: 'Vit.K1 5-10 mg Orally' },
  { inr: 'Major Bleeding with Any INR', management: 'Vit.K1 10 mg IV + FFP , repeat Vit.K1 q 12 hr if needed' }
]
</script>
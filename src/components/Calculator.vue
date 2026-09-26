<script setup lang="ts">
import { computed, ref } from "vue";
import type { VehicleType } from "../config/workshop";
const props = defineProps<{
  tariffs: { radius: string; car: number; suv: number }[];
  vehicleTypes: { id: string; label: string }[];
  extras: { id: string; label: string; price: number }[];
  exclusions: string;
  demo: boolean;
}>();
const radius = ref(1);
const vehicle = ref<VehicleType>("car");
const selectedExtras = ref<string[]>([]);
const format = (n: number) => new Intl.NumberFormat("ru-RU").format(n) + " ₽";
const base = computed(() => props.tariffs[radius.value][vehicle.value]);
const extrasTotal = computed(() =>
  props.extras
    .filter((e) => selectedExtras.value.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0),
);
const total = computed(() => base.value + extrasTotal.value);
</script>
<template>
  <div class="calculator-grid">
    <div class="calculator-controls">
      <fieldset>
        <legend>Тип автомобиля</legend>
        <div class="segmented">
          <label
            v-for="type in vehicleTypes"
            :key="type.id"
            :class="{ selected: vehicle === type.id }"
            ><input
              v-model="vehicle"
              type="radio"
              name="vehicle"
              :value="type.id"
            /><span>{{ type.label }}</span></label
          >
        </div>
      </fieldset>
      <fieldset>
        <legend>Диаметр диска</legend>
        <div class="radius-options">
          <label
            v-for="(tariff, index) in tariffs"
            :key="tariff.radius"
            :class="{ selected: radius === index }"
            ><input
              v-model="radius"
              type="radio"
              name="radius"
              :value="index"
            /><span>{{ tariff.radius }}</span></label
          >
        </div>
      </fieldset>
      <fieldset class="extras">
        <legend>Дополнительные работы <span>по желанию</span></legend>
        <label v-for="extra in extras" :key="extra.id"
          ><input
            v-model="selectedExtras"
            type="checkbox"
            :value="extra.id"
          /><span>{{ extra.label }}</span
          ><b>+ {{ format(extra.price) }}</b></label
        >
      </fieldset>
    </div>
    <div class="calculator-result">
      <span class="eyebrow">ВАШ КОМПЛЕКТ · 4 КОЛЕСА</span>
      <div class="total" aria-live="polite" aria-atomic="true">
        <span class="sr-only">Итого: </span>{{ format(total) }}
      </div>
      <dl>
        <div>
          <dt>Смена шин, {{ tariffs[radius].radius }}</dt>
          <dd>{{ format(base) }}</dd>
        </div>
        <div>
          <dt>Дополнительные работы</dt>
          <dd>{{ format(extrasTotal) }}</dd>
        </div>
      </dl>
      <p class="result-note">
        {{
          demo ? "Демонстрационный расчёт." : "Предварительный расчёт."
        }}
        Итоговую стоимость подтверждает мастер.
      </p>
      <a class="button button-orange" href="#callback"
        >Обсудить с мастером <span aria-hidden="true">→</span></a
      >
    </div>
  </div>
  <p class="fineprint calculator-footnote">{{ exclusions }}</p>
</template>

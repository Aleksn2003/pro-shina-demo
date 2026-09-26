<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
const props = defineProps<{
  endpoint: string | null;
  privacyUrl: string | null;
  consentText: string;
  timeoutMs: number;
  demo: boolean;
}>();
const phone = ref("");
const consent = ref(false);
const ready = ref(false);
const state = ref<"idle" | "sending" | "success" | "error" | "demo">("idle");
const message = ref("");
const enabled = computed(
  () =>
    !props.demo &&
    Boolean(
      props.endpoint?.startsWith("/") && !props.endpoint.startsWith("//"),
    ) &&
    Boolean(props.privacyUrl),
);
onMounted(() => {
  ready.value = true;
});
async function submit() {
  if (state.value === "sending") return;
  const digits = phone.value.replace(/\D/g, "");
  if (!/^[78]\d{10}$/.test(digits)) {
    state.value = "error";
    message.value = "Введите российский номер: +7 и ещё 10 цифр.";
    return;
  }
  if (!enabled.value) {
    state.value = "demo";
    message.value =
      "Это демонстрация. Номер проверен, но никуда не отправлен. Заявка не создана.";
    return;
  }
  if (!consent.value) {
    state.value = "error";
    message.value = "Для отправки необходимо согласие на обработку номера.";
    return;
  }
  state.value = "sending";
  message.value = "Отправляем заявку…";
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), props.timeoutMs);
  try {
    const response = await fetch(props.endpoint!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: "+7" + digits.slice(1), consent: true }),
      signal: controller.signal,
    });
    const data: unknown = await response.json();
    if (
      !response.ok ||
      typeof data !== "object" ||
      data === null ||
      !("accepted" in data) ||
      data.accepted !== true ||
      !("requestId" in data) ||
      typeof data.requestId !== "string" ||
      !data.requestId.trim()
    )
      throw new Error("Unconfirmed request");
    state.value = "success";
    message.value =
      "Сервер подтвердил приём заявки. Мастер свяжется с вами по указанному номеру.";
    phone.value = "";
    consent.value = false;
  } catch {
    state.value = "error";
    message.value =
      "Не удалось подтвердить отправку. Попробуйте ещё раз или позвоните самостоятельно.";
  } finally {
    window.clearTimeout(timeout);
  }
}
</script>
<template>
  <form
    class="callback-form"
    @submit.prevent="submit"
    :aria-busy="state === 'sending'"
  >
    <label for="callback-phone">Ваш номер телефона</label>
    <div class="callback-input-row">
      <input
        id="callback-phone"
        v-model="phone"
        type="tel"
        inputmode="tel"
        autocomplete="tel"
        placeholder="+7 (___) ___-__-__"
        required
        maxlength="24"
        :disabled="!ready || state === 'sending'"
        :aria-invalid="state === 'error'"
        aria-describedby="callback-help callback-status"
      /><button
        class="button button-orange"
        type="submit"
        :disabled="!ready || state === 'sending'"
      >
        {{
          state === "sending"
            ? "Отправляем…"
            : state === "error"
              ? "Повторить отправку"
              : "Заказать звонок"
        }}
      </button>
    </div>
    <label v-if="enabled" class="consent"
      ><input v-model="consent" type="checkbox" required />
      <span
        >{{ consentText }}
        <a :href="privacyUrl!">Политика обработки данных</a></span
      ></label
    >
    <p id="callback-help" class="fineprint">
      {{
        enabled
          ? "Используем номер только для связи по вашей заявке."
          : "Демонстрация формы: номер никуда не передаётся, мастер не получит заявку."
      }}
    </p>
    <p
      id="callback-status"
      class="form-status"
      :class="state"
      role="status"
      aria-live="polite"
    >
      {{ message }}
    </p>
  </form>
</template>

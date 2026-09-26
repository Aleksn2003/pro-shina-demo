/** ALL business data below is DEMO. Verify every field before public launch. */
export const workshop = {
  demo: true,
  name: "PRO_ШИНА",
  tagline: "Частный шиномонтаж · один бокс",
  location: "на Уралмаше",
  shortAddress: "Уралмаш · ул. Монтажников, 00",
  address: {
    city: "Екатеринбург",
    street: "ул. Монтажников, 00",
    country: "RU",
  },
  phone: { display: "+7 (000) 000-00-00", href: "tel:+70000000000" },
  hours: {
    label: "Ежедневно, 09:00–20:00",
    opens: "09:00",
    closes: "20:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },
  directions:
    "От основной дороги — к ряду гаражных боксов. Ориентир: заметная вывеска над воротами.",
  // No invented coordinates. Replace with verified workshop deep links.
  routes: [
    {
      name: "Яндекс Навигатор",
      href: "https://yandex.ru/maps/",
      note: "Откроется карта без точки мастерской",
    },
    {
      name: "2ГИС",
      href: "https://2gis.ru/",
      note: "Откроется карта без точки мастерской",
    },
  ],
  duration: "40–60 мин",
  durationNote:
    "Демоориентир. Фактическое время зависит от работ и очереди.",
  vehicleTypes: [
    { id: "car", label: "Легковой" },
    { id: "suv", label: "Кроссовер / SUV" },
  ],
  // Price per set of four wheels, RUB. Every selectable combination is explicit.
  tariffs: [
    { radius: "R13–R14", car: 1800, suv: 2200 },
    { radius: "R15–R16", car: 2200, suv: 2600 },
    { radius: "R17–R18", car: 2800, suv: 3200 },
    { radius: "R19–R20", car: 3600, suv: 4200 },
  ],
  extras: [
    { id: "valves", label: "Замена 4 резиновых вентилей", price: 400 },
    { id: "seal", label: "Герметизация бортов 4 колёс", price: 600 },
  ],
  included: [
    "Снятие и установка 4 колёс",
    "Демонтаж и монтаж шин",
    "Балансировка и стандартные грузы",
    "Проверка давления",
  ],
  exclusions:
    "RunFlat, низкий профиль, датчики давления и повреждения диска — после осмотра и отдельного согласования. В расчёт не включены.",
  // Suggested customer guidance; confirm/adapt this sample wording to the actual workshop.
  customerGuide: {
    heroTitle: "Чтобы назвать ориентир по цене",
    heroText:
      "При звонке назовите тип автомобиля и размер диска. Дополнительные работы мастер обсудит после осмотра.",
    phoneTitle: "Что сказать мастеру",
    phoneNote: "Подсказка для звонка · пример",
    phoneIntro: "Чтобы быстрее сориентировать вас по цене, подготовьте:",
    phoneDetails: [
      "тип автомобиля: легковой или кроссовер / SUV",
      "размер диска, например R16",
      "что нужно сделать: сменить комплект, отбалансировать колесо или устранить прокол",
    ],
    workTitle: "Как проходит работа",
    workSteps: [
      "Обсуждаем задачу и ориентир по цене по телефону.",
      "После осмотра мастер уточняет, нужны ли дополнительные работы.",
      "Допработы выполняются только после согласования стоимости.",
    ],
  },
  services: [
    {
      number: "01",
      title: "Сезонная смена шин",
      text: "Снять зимние. Поставить летние. И наоборот.",
      price: 1800,
      unit: "за комплект",
      icon: "wheel",
      image: { src: "/images/service-tire-change.webp", alt: "Колесо на шиномонтажном станке" },
    },
    {
      number: "02",
      title: "Балансировка",
      text: "Проверка и корректировка дисбаланса колеса.",
      price: 300,
      unit: "за колесо",
      icon: "balance",
      image: { src: "/images/service-wheel-balance.webp", alt: "Колесо на балансировочном стенде" },
    },
    {
      number: "03",
      title: "Ремонт прокола",
      text: "Способ ремонта подбирается после осмотра.",
      price: 500,
      unit: "за колесо",
      icon: "tool",
      image: { src: "/images/service-puncture-repair.webp", alt: "Протектор шины и материалы для ремонта прокола" },
    },
  ],
  benefits: [
    {
      title: "Оборудование",
      text: "Шиномонтажный и балансировочный стенды. Марки и модели оборудования — демонстрационный пример.",
      icon: "tool",
      image: { src: "/images/benefit-equipment.webp", alt: "Шиномонтажное оборудование в боксе" },
    },
    {
      title: "Внимание к деталям",
      text: "Защитные накладки и затяжка динамометрическим ключом — пример подхода к работе.",
      icon: "wheel",
      image: { src: "/images/benefit-detail.webp", alt: "Динамометрический ключ у автомобильного колеса" },
    },
    {
      title: "Понятная гарантия",
      text: "Пример: повторная проверка балансировки в течение 7 дней. Условия подтверждает мастер.",
      icon: "shield",
      image: { src: "/images/benefit-warranty.webp", alt: "Колесо на балансировочном стенде" },
    },
    {
      title: "Место подождать",
      text: "Пример: тёплая зона ожидания рядом с боксом. Наличие и удобства нужно подтвердить.",
      icon: "seat",
      image: { src: "/images/benefit-waiting.webp", alt: "Уголок ожидания у мастерской" },
    },
  ],
  master: {
    name: "Алексей",
    initials: "АМ",
    role: "Мастер и владелец",
    experience: "12 лет",
    quote:
      "Сам встречаю, сам работаю с колёсами. Сначала смотрим, что нужно сделать, и обсуждаем стоимость. После — спокойно работаем, без лишних услуг.",
    note: "Имя, стаж и слова мастера — пример для шаблона.",
  },
  images: {
    hero: {
      src: "/images/workshop-hero.webp",
      small: "/images/workshop-hero-small.webp",
      alt: "Демонстрационное изображение шин и колеса в небольшом шиномонтажном боксе",
      width: 1440,
      height: 810,
    },
    // Generated template placeholder. Replace with verified workshop owner portrait before launch.
    master: "/images/master-demo.webp" as string | null,
    masterAlt: "Демонстрационный портрет мастера шиномонтажа в рабочем боксе",
    // Generated demo asset. Replace with a real, verified workshop entrance photo before launch.
    entrance: "/images/entrance-demo.webp" as string | null,
    entranceAlt: "Демонстрационная фотография въезда в бокс шиномонтажа",
  },
  callback: {
    // Relative same-origin BACKEND endpoint only. Never put Zvonok.ru keys here.
    endpoint: null as string | null,
    timeoutMs: 12000,
    privacyUrl: null as string | null,
    consentText: "Согласен на обработку номера телефона для обратного звонка.",
  },
  legal: {
    companyDetails: null as string | null,
    privacyUrl: null as string | null,
  },
  seo: {
    siteUrl: "https://pro-shina-demo.neon-jelly-9617.chatgpt.site",
    // Keep false until business details, domain, consent and documents are verified.
    indexable: false,
    title: "Шиномонтаж на Уралмаше — PRO_ШИНА | Демонстрационный шаблон",
    description:
      "Демонстрационный шаблон шиномонтажа на Уралмаше: сезонная смена шин, балансировка, пример цен и расчёт стоимости. Все данные мастерской заменяемые.",
  },
};
export type VehicleType = "car" | "suv";
export const money = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value) + " ₽";




export type Locale = "en" | "ru";

export type Translations = {
  theme: {
    toggle: string;
    dark: string;
    light: string;
  };
  lang: {
    toggle: string;
  };
  meta: {
    title: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaFind: string;
    ctaPartner: string;
    photos: Array<{ label: string; meta: string }>;
    highlights: Array<{ title: string; caption: string }>;
    stats: Array<{ value: string; label: string }>;
  };
  featured: {
    badge: string;
    title: string;
    subtitle: string;
    prevStudio: string;
    nextStudio: string;
    metro: string;
    studios: Array<{ name: string; city: string; size: string }>;
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{ title: string; description: string }>;
  };
  proof: {
    title: string;
    subtitle: string;
    stats: Array<{ value: string; label: string }>;
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{ name: string; role: string; content: string }>;
  };
  pricing: {
    title: string;
    subtitle: string;
    month: string;
    year: string;
    perMonth: string;
    perYear: string;
    popular: string;
    choosePlan: string;
    plans: Array<{
      name: string;
      description: string;
      features: string[];
    }>;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{ question: string; answer: string }>;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    phone: string;
    address: string;
    addressValue: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
  };
  footer: {
    tagline: string;
    company: string;
    about: string;
    blog: string;
    careers: string;
    support: string;
    help: string;
    contacts: string;
    faq: string;
    social: string;
    copyright: string;
  };
};

export const translations: Record<Locale, Translations> = {
  en: {
    theme: {
      toggle: "Toggle theme",
      dark: "Dark",
      light: "Light",
    },
    lang: {
      toggle: "Switch language",
    },
    meta: {
      title: "StudioFinder — photo studio aggregator",
    },
    hero: {
      badge: "StudioFinder · 2026",
      title: "StudioFinder connects production teams and studio spaces.",
      subtitle:
        "We capture light and acoustics telemetry, learn patterns from client briefs, and suggest locations that enhance the shoot — not hold it back.",
      ctaFind: "Find a studio",
      ctaPartner: "Become a partner",
      photos: [
        { label: "Loft Lumière", meta: "Moscow · Loft & daylight" },
        { label: "Nordic Light", meta: "Saint Petersburg · Panoramic windows" },
        { label: "Atelier Blanc", meta: "Kazan · White cyclorama" },
      ],
      highlights: [
        {
          title: "Light under control",
          caption: "We measure exposure and time of day",
        },
        {
          title: "AI matching",
          caption: "Algorithm builds a shortlist in seconds",
        },
        {
          title: "Curators 24/7",
          caption: "Producer team supports every shoot",
        },
        {
          title: "Ready set designs",
          caption: "From minimalism to cinematic scenes",
        },
      ],
      stats: [
        { value: "530+", label: "Studios in catalog" },
        { value: "27", label: "Cities in 3 countries" },
        { value: "CRM · Trello", label: "Integrations for teams" },
        { value: "89%", label: "Repeat lighting rate" },
      ],
    },
    featured: {
      badge: "Curated Spaces",
      title: "Studios of the week",
      subtitle:
        "Top spaces with natural light, signature interiors, and ready-to-use equipment",
      prevStudio: "Previous studio",
      nextStudio: "Next studio",
      metro: "5 min from metro",
      studios: [
        { name: "Studio Lumière", city: "Moscow", size: "140 m²" },
        { name: "Nordic Loft", city: "Saint Petersburg", size: "100 m²" },
        { name: "Atelier Blanc", city: "Kazan", size: "95 m²" },
        { name: "Panorama Hall", city: "Yekaterinburg", size: "160 m²" },
        { name: "Glasshouse", city: "Novosibirsk", size: "110 m²" },
      ],
    },
    features: {
      title: "Why StudioFinder?",
      subtitle: "We make finding and booking photo studios simple and convenient",
      items: [
        {
          title: "Wide selection",
          description:
            "Over 500 studios in your city with different interiors and equipment",
        },
        {
          title: "Online booking",
          description: "Book a studio in a few clicks — no calls or waiting",
        },
        {
          title: "Verified studios",
          description:
            "All studios are moderated and have genuine client reviews",
        },
        {
          title: "Best prices",
          description:
            "Compare prices and find the best offers for your budget",
        },
      ],
    },
    proof: {
      title: "Trusted by professionals",
      subtitle: "Numbers that speak for themselves",
      stats: [
        { value: "500+", label: "Studios in database" },
        { value: "10K+", label: "Happy clients" },
        { value: "50K+", label: "Bookings" },
        { value: "4.9", label: "Average rating" },
      ],
    },
    testimonials: {
      title: "Client reviews",
      subtitle: "What photographers and studio owners say about us",
      items: [
        {
          name: "Anna Petrova",
          role: "Photographer",
          content:
            "StudioFinder helped me find the perfect studio for my shoot. Easy interface and fast booking!",
        },
        {
          name: "Dmitry Ivanov",
          role: "Studio owner",
          content:
            "A great platform for attracting clients. Leads come in regularly — everything is transparent and clear.",
        },
        {
          name: "Maria Sidorova",
          role: "Blogger",
          content:
            "I use StudioFinder for all my shoots. A large selection of studios and honest reviews help me choose right.",
        },
      ],
    },
    pricing: {
      title: "Pricing plans",
      subtitle: "Choose the plan that fits your needs",
      month: "Month",
      year: "Year (20% off)",
      perMonth: "mo",
      perYear: "yr",
      popular: "Popular",
      choosePlan: "Choose plan",
      plans: [
        {
          name: "Basic",
          description: "For beginner photographers",
          features: [
            "Up to 10 bookings per month",
            "Access to studio database",
            "Email support",
            "Mobile app",
          ],
        },
        {
          name: "Professional",
          description: "For active photographers",
          features: [
            "Unlimited bookings",
            "Priority support",
            "Up to 15% discounts",
            "Early access to new studios",
            "Booking analytics",
          ],
        },
        {
          name: "Studio",
          description: "For studio owners",
          features: [
            "Studio listing",
            "Booking management",
            "Top placement promotion",
            "Detailed analytics",
            "Personal manager",
          ],
        },
      ],
    },
    faq: {
      title: "FAQ",
      subtitle: "Answers to common questions about our service",
      items: [
        {
          question: "How do I book a studio?",
          answer:
            "Choose a studio, pick date and time, pay online — done! You'll receive a confirmation by email.",
        },
        {
          question: "Can I cancel a booking?",
          answer:
            "Yes, you can cancel up to 24 hours before the shoot and receive a full refund.",
        },
        {
          question: "How do I add my studio?",
          answer:
            "Sign up, choose the Studio plan, fill in your studio details, and upload photos.",
        },
        {
          question: "Is there a mobile app?",
          answer:
            "Yes, our app is available for iOS and Android. Download it from the App Store or Google Play.",
        },
      ],
    },
    contact: {
      title: "Contact us",
      subtitle: "Have questions? We're always happy to help!",
      email: "Email",
      phone: "Phone",
      address: "Address",
      addressValue: "Moscow, Example St, 123",
      nameLabel: "Name",
      namePlaceholder: "Your name",
      emailLabel: "Email",
      messageLabel: "Message",
      messagePlaceholder: "Your message",
      submit: "Send",
    },
    footer: {
      tagline: "Aggregator of the best photo studios in your city",
      company: "Company",
      about: "About",
      blog: "Blog",
      careers: "Careers",
      support: "Support",
      help: "Help",
      contacts: "Contacts",
      faq: "FAQ",
      social: "Social",
      copyright: "© 2026 StudioFinder. All rights reserved.",
    },
  },
  ru: {
    theme: {
      toggle: "Переключить тему",
      dark: "Тёмная",
      light: "Светлая",
    },
    lang: {
      toggle: "Переключить язык",
    },
    meta: {
      title: "StudioFinder — агрегатор фотостудий",
    },
    hero: {
      badge: "StudioFinder · 2026",
      title:
        "StudioFinder соединяет продакшн-команды и студийные пространства.",
      subtitle:
        "Собираем телеметрию света и акустики, отмечаем паттерны из брифов клиентов и предлагаем локации, которые дополняют сценарий съёмки, а не сдерживают его.",
      ctaFind: "Подобрать студию",
      ctaPartner: "Стать партнёром",
      photos: [
        { label: "Loft Lumière", meta: "Москва · Loft & дневной свет" },
        {
          label: "Nordic Light",
          meta: "Санкт-Петербург · Панорамные окна",
        },
        { label: "Atelier Blanc", meta: "Казань · Белая циклорама" },
      ],
      highlights: [
        {
          title: "Свет под контролем",
          caption: "Измеряем экспозицию и время суток",
        },
        {
          title: "AI-подбор",
          caption: "Алгоритм формирует shortlist за секунды",
        },
        {
          title: "Кураторы 24/7",
          caption: "Команда продюсеров сопровождает съёмки",
        },
        {
          title: "Готовые сет-дизайны",
          caption: "От минимализма до кинематографичных сцен",
        },
      ],
      stats: [
        { value: "530+", label: "Студий в каталоге" },
        { value: "27", label: "Городов в 3 странах" },
        { value: "CRM · Trello", label: "Интеграции для команд" },
        { value: "89%", label: "Повторного света" },
      ],
    },
    featured: {
      badge: "Curated Spaces",
      title: "Подборка студий недели",
      subtitle:
        "Лучшие пространства с естественным освещением, авторскими интерьерами и готовым оборудованием",
      prevStudio: "Предыдущая студия",
      nextStudio: "Следующая студия",
      metro: "5 минут от метро",
      studios: [
        { name: "Studio Lumière", city: "Москва", size: "140 м²" },
        { name: "Nordic Loft", city: "Санкт-Петербург", size: "100 m²" },
        { name: "Atelier Blanc", city: "Казань", size: "95 m²" },
        { name: "Panorama Hall", city: "Екатеринбург", size: "160 m²" },
        { name: "Glasshouse", city: "Новосибирск", size: "110 m²" },
      ],
    },
    features: {
      title: "Почему StudioFinder?",
      subtitle:
        "Мы делаем поиск и бронирование фотостудий простым и удобным",
      items: [
        {
          title: "Широкий выбор",
          description:
            "Более 500 студий в вашем городе с различными интерьерами и оборудованием",
        },
        {
          title: "Онлайн бронирование",
          description:
            "Бронируйте студию в несколько кликов без звонков и ожидания",
        },
        {
          title: "Проверенные студии",
          description:
            "Все студии проходят модерацию и имеют реальные отзывы клиентов",
        },
        {
          title: "Лучшие цены",
          description:
            "Сравнивайте цены и находите оптимальные предложения для вашего бюджета",
        },
      ],
    },
    proof: {
      title: "Нам доверяют",
      subtitle: "Цифры, которые говорят сами за себя",
      stats: [
        { value: "500+", label: "Студий в базе" },
        { value: "10K+", label: "Довольных клиентов" },
        { value: "50K+", label: "Бронирований" },
        { value: "4.9", label: "Средний рейтинг" },
      ],
    },
    testimonials: {
      title: "Отзывы наших клиентов",
      subtitle: "Узнайте, что говорят о нас фотографы и владельцы студий",
      items: [
        {
          name: "Анна Петрова",
          role: "Фотограф",
          content:
            "StudioFinder помог мне найти идеальную студию для съемки. Удобный интерфейс и быстрое бронирование!",
        },
        {
          name: "Дмитрий Иванов",
          role: "Владелец студии",
          content:
            "Отличная платформа для привлечения клиентов. Заявки приходят регулярно, все прозрачно и понятно.",
        },
        {
          name: "Мария Сидорова",
          role: "Блогер",
          content:
            "Использую StudioFinder для всех своих съемок. Большой выбор студий и честные отзывы помогают сделать правильный выбор.",
        },
      ],
    },
    pricing: {
      title: "Тарифные планы",
      subtitle: "Выберите подходящий план для ваших задач",
      month: "Месяц",
      year: "Год (скидка 20%)",
      perMonth: "мес",
      perYear: "год",
      popular: "Популярный",
      choosePlan: "Выбрать план",
      plans: [
        {
          name: "Базовый",
          description: "Для начинающих фотографов",
          features: [
            "До 10 бронирований в месяц",
            "Доступ к базе студий",
            "Email поддержка",
            "Мобильное приложение",
          ],
        },
        {
          name: "Профессионал",
          description: "Для активных фотографов",
          features: [
            "Безлимитные бронирования",
            "Приоритетная поддержка",
            "Скидки до 15%",
            "Ранний доступ к новым студиям",
            "Аналитика бронирований",
          ],
        },
        {
          name: "Студия",
          description: "Для владельцев студий",
          features: [
            "Размещение студии",
            "Управление бронированиями",
            "Продвижение в топе",
            "Детальная аналитика",
            "Персональный менеджер",
          ],
        },
      ],
    },
    faq: {
      title: "Частые вопросы",
      subtitle: "Ответы на популярные вопросы о нашем сервисе",
      items: [
        {
          question: "Как забронировать студию?",
          answer:
            "Выберите студию, укажите дату и время, оплатите онлайн — и готово! Вы получите подтверждение на email.",
        },
        {
          question: "Можно ли отменить бронирование?",
          answer:
            "Да, вы можете отменить бронирование за 24 часа до начала съёмки и получить полный возврат средств.",
        },
        {
          question: "Как добавить свою студию?",
          answer:
            "Зарегистрируйтесь, выберите тариф «Студия», заполните информацию о студии и загрузите фотографии.",
        },
        {
          question: "Есть ли мобильное приложение?",
          answer:
            "Да, наше приложение доступно для iOS и Android. Скачайте его в App Store или Google Play.",
        },
      ],
    },
    contact: {
      title: "Свяжитесь с нами",
      subtitle: "Есть вопросы? Мы всегда рады помочь!",
      email: "Email",
      phone: "Телефон",
      address: "Адрес",
      addressValue: "Москва, ул. Примерная, 123",
      nameLabel: "Имя",
      namePlaceholder: "Ваше имя",
      emailLabel: "Email",
      messageLabel: "Сообщение",
      messagePlaceholder: "Ваше сообщение",
      submit: "Отправить",
    },
    footer: {
      tagline: "Агрегатор лучших фотостудий вашего города",
      company: "Компания",
      about: "О нас",
      blog: "Блог",
      careers: "Карьера",
      support: "Поддержка",
      help: "Помощь",
      contacts: "Контакты",
      faq: "FAQ",
      social: "Социальные сети",
      copyright: "© 2026 StudioFinder. Все права защищены.",
    },
  },
};

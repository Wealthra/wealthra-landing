export interface LegalContent {
  title: string
  lastUpdated: string
  sections: {
    title: string
    content: string
  }[]
}

export const legalData: Record<string, Record<string, LegalContent>> = {
  English: {
    'enlightenment-and-consent': {
      title: 'Enlightenment and Explicit Consent Text',
      lastUpdated: 'May 1, 2026',
      sections: [
        {
          title: '1. Data Controller',
          content:
            'As Wealthra Inc. ("Wealthra"), we attach great importance to the security of your personal data. This text is prepared to inform you about how your personal data is collected, processed, and shared.',
        },
        {
          title: '2. Purpose of Processing Personal Data',
          content:
            'Your personal data (email, name, financial transactions) are processed for providing our services, improving user experience, conducting analytics, and ensuring system security.',
        },
        {
          title: '3. Rights of the Data Subject',
          content:
            'You have the right to learn whether your personal data is processed, request information if processed, learn the purpose of processing, and request correction or deletion.',
        },
      ],
    },
    'cookie-policy': {
      title: 'Cookie Policy',
      lastUpdated: 'May 1, 2026',
      sections: [
        {
          title: '1. What are Cookies?',
          content:
            'Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently.',
        },
        {
          title: '2. Types of Cookies We Use',
          content:
            'We use essential cookies for authentication and session management, and preference cookies for language and theme settings.',
        },
      ],
    },
    'terms-and-conditions': {
      title: 'Terms and Conditions',
      lastUpdated: 'May 1, 2026',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content:
            'By accessing and using Wealthra, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.',
        },
        {
          title: '2. User Responsibilities',
          content:
            'Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.',
        },
      ],
    },
    'privacy-policy': {
      title: 'Privacy Policy',
      lastUpdated: 'May 1, 2026',
      sections: [
        {
          title: '1. Information Collection',
          content:
            'We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us.',
        },
        {
          title: '2. Data Security',
          content:
            'We use bank-level encryption and industry-standard security measures to protect your personal and financial information.',
        },
      ],
    },
  },
  Turkish: {
    'enlightenment-and-consent': {
      title: 'Aydınlatma ve Açık Rıza Metni',
      lastUpdated: '1 Mayıs 2026',
      sections: [
        {
          title: '1. Veri Sorumlusu',
          content:
            'Wealthra Inc. ("Wealthra") olarak kişisel verilerinizin güvenliğine büyük önem veriyoruz. Bu metin, kişisel verilerinizin nasıl toplandığı, işlendiği ve paylaşıldığı konusunda sizi bilgilendirmek amacıyla hazırlanmıştır.',
        },
        {
          title: '2. Kişisel Verilerin İşlenme Amacı',
          content:
            'Kişisel verileriniz (e-posta, ad, finansal işlemler), hizmetlerimizin sunulması, kullanıcı deneyiminin iyileştirilmesi, analizlerin yapılması ve sistem güvenliğinin sağlanması amacıyla işlenmektedir.',
        },
        {
          title: '3. Veri Sahibinin Hakları',
          content:
            'Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını öğrenme, düzeltme veya silme talebinde bulunma haklarına sahipsiniz.',
        },
      ],
    },
    'cookie-policy': {
      title: 'Çerez Politikası',
      lastUpdated: '1 Mayıs 2026',
      sections: [
        {
          title: '1. Çerez Nedir?',
          content:
            'Çerezler, bir web sitesini ziyaret ettiğinizde cihazınıza kaydedilen küçük metin dosyalarıdır. Web sitelerinin daha verimli çalışması için yaygın olarak kullanılırlar.',
        },
        {
          title: '2. Kullandığımız Çerez Türleri',
          content:
            'Kimlik doğrulama ve oturum yönetimi için zorunlu çerezleri, dil ve tema ayarları için ise tercih çerezlerini kullanıyoruz.',
        },
      ],
    },
    'terms-and-conditions': {
      title: 'Kullanım Koşulları',
      lastUpdated: '1 Mayıs 2026',
      sections: [
        {
          title: '1. Şartların Kabulü',
          content:
            'Wealthra\'ya erişerek ve kullanarak bu Kullanım Koşullarına bağlı kalmayı kabul etmiş olursunuz. Kabul etmiyorsanız lütfen hizmetlerimizi kullanmayın.',
        },
        {
          title: '2. Kullanıcı Sorumlulukları',
          content:
            'Kullanıcılar, hesap bilgilerinin gizliliğini korumaktan ve hesapları altında gerçekleşen tüm faaliyetlerden sorumludur.',
        },
      ],
    },
    'privacy-policy': {
      title: 'Gizlilik Politikası',
      lastUpdated: '1 Mayıs 2026',
      sections: [
        {
          title: '1. Bilgi Toplama',
          content:
            'Hesap oluşturduğunuzda, hizmetlerimizi kullandığınızda veya bizimle iletişim kurduğunuzda doğrudan bize verdiğiniz bilgileri topluyoruz.',
        },
        {
          title: '2. Veri Güvenliği',
          content:
            'Kişisel ve finansal bilgilerinizi korumak için banka düzeyinde şifreleme ve endüstri standardı güvenlik önlemleri kullanıyoruz.',
        },
      ],
    },
  },
}

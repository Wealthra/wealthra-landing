<template>
  <div class="legal-view-c">
    <div class="navbar-wrapper navbar-scrolled">
      <router-link to="/">
        <img src="../assets/logo.svg" alt="logo" class="logo" />
      </router-link>
      <div class="options">
        <div class="theme-language-wrapper">
          <UIThemeButton @updateTheme="handleThemeUpdate" />
          <UILanguageBUtton @updateLanguage="handleLanguageUpdate" />
        </div>
      </div>
    </div>

    <div class="legal-content-wrapper animate-slide-up" v-if="currentLegalData">
      <h1 class="legal-title">{{ currentLegalData.title }}</h1>
      <p class="last-updated">{{ lastUpdatedLabel[selectedLanguage] }}: {{ currentLegalData.lastUpdated }}</p>

      <div class="legal-sections">
        <div v-for="(section, index) in currentLegalData.sections" :key="index" class="legal-section">
          <h2 class="section-title">{{ section.title }}</h2>
          <p class="section-content">{{ section.content }}</p>
        </div>
      </div>
      
      <router-link to="/" class="back-home">
        {{ backToHomeLabel[selectedLanguage] }}
      </router-link>
    </div>

    <div class="footer-wrapper">
      <div class="footer-copyright">
        © {{ currentYear }} Wealthra. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import UIThemeButton from '../components/UIThemeButton.vue'
import UILanguageBUtton from '../components/UILanguageButton.vue'
import { legalData } from '@/data/legalTexts'

const route = useRoute()
const selectedLanguage = ref<'English' | 'Turkish'>('English')

const lastUpdatedLabel = {
  English: 'Last Updated',
  Turkish: 'Son Güncelleme',
}

const backToHomeLabel = {
  English: 'Back to Home',
  Turkish: 'Ana Sayfaya Dön',
}

const handleThemeUpdate = (theme: string) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme-preference', theme)
}

const handleLanguageUpdate = (language: string) => {
  selectedLanguage.value = language as 'English' | 'Turkish'
  localStorage.setItem('selectedLanguage', selectedLanguage.value)
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('selectedLanguage')
  if (savedLanguage) {
    selectedLanguage.value = savedLanguage as 'English' | 'Turkish'
  }
  
  const savedTheme = localStorage.getItem('theme-preference')
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})

const currentYear = computed(() => new Date().getFullYear())

const currentLegalData = computed(() => {
  const slug = route.params.slug as string
  return legalData[selectedLanguage.value]?.[slug] || null
})
</script>

<style scoped lang="scss">
.legal-view-c {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  padding-top: 8rem;
  background-color: var(--background-color);
  font-family: var(--main-font);

  .navbar-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    padding: 0.9rem 2.5rem;
    background-color: var(--background-color);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
    backdrop-filter: blur(10px);

    .logo {
      max-width: 150px;
    }

    .options {
      display: flex;
      align-items: center;
      gap: 1.5rem;

      .theme-language-wrapper {
        display: flex;
        gap: 1.1rem;
      }
    }
  }

  .legal-content-wrapper {
    width: 100%;
    max-width: 800px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .legal-title {
      font-size: 32px;
      font-weight: bold;
      color: var(--header-text-color);
      text-align: left;
    }

    .last-updated {
      font-size: 14px;
      color: var(--normal-text-color);
      opacity: 0.7;
    }

    .legal-sections {
      display: flex;
      flex-direction: column;
      gap: 2rem;

      .legal-section {
        .section-title {
          font-size: 20px;
          font-weight: 600;
          color: var(--header-text-color);
          margin-bottom: 0.75rem;
        }

        .section-content {
          font-size: 16px;
          color: var(--normal-text-color);
          line-height: 1.6;
        }
      }
    }

    .back-home {
      display: inline-block;
      margin-top: 2rem;
      padding: 0.75rem 1.5rem;
      background-color: var(--primary-green-color);
      color: white;
      text-decoration: none;
      border-radius: 999px;
      font-weight: 500;
      width: max-content;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    }
  }

  .footer-wrapper {
    margin-top: auto;
    width: 100%;
    padding: 2rem;
    border-top: 1px solid var(--border-color);
    display: flex;
    justify-content: center;

    .footer-copyright {
      font-size: 12px;
      color: var(--normal-text-color);
      opacity: 0.6;
    }
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-slide-up {
  animation: slideUp 0.6s ease-out both;
}
</style>

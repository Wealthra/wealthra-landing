<template>
  <div class="screenshot-slider-c">
    <div class="slider-header animate-reveal">
      <h2 class="slider-title">{{ title[selectedLanguage] }}</h2>
      <p class="slider-subtitle">{{ subtitle[selectedLanguage] }}</p>
    </div>

    <div class="slider-container animate-reveal">
      <div
        class="slider-track"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div
          v-for="(slide, index) in sliderData[selectedLanguage]"
          :key="index"
          class="slide"
        >
          <div class="slide-content">
            <img
              :src="getImageUrl(slide.image)"
              :alt="slide.title"
              class="screenshot-image"
            />
            <div class="slide-caption">
              <h3>{{ slide.title }}</h3>
            </div>
          </div>
        </div>
      </div>

      <button
        class="nav-btn prev"
        @click="prevSlide"
        aria-label="Previous slide"
      >
        <font-awesome-icon icon="chevron-left" />
      </button>
      <button class="nav-btn next" @click="nextSlide" aria-label="Next slide">
        <font-awesome-icon icon="chevron-right" />
      </button>

      <div class="slider-dots">
        <span
          v-for="(_, index) in sliderData[selectedLanguage]"
          :key="index"
          class="dot"
          :class="{ active: currentIndex === index }"
          @click="goToSlide(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { sliderData } from "@/data/landingTexts";

const props = defineProps<{
  selectedLanguage: "English" | "Turkish";
}>();

const currentIndex = ref(0);
const autoPlayInterval = ref<number | null>(null);

const title = {
  English: "Take a look inside",
  Turkish: "İçeriye bir göz atın",
};

const subtitle = {
  English:
    "Experience the powerful features of Wealthra through our intuitive interface.",
  Turkish:
    "Sezgisel arayüzümüz aracılığıyla Wealthra'nın güçlü özelliklerini deneyimleyin.",
};

const nextSlide = () => {
  currentIndex.value =
    (currentIndex.value + 1) % sliderData[props.selectedLanguage].length;
  resetAutoPlay();
};

const prevSlide = () => {
  currentIndex.value =
    (currentIndex.value - 1 + sliderData[props.selectedLanguage].length) %
    sliderData[props.selectedLanguage].length;
  resetAutoPlay();
};

const goToSlide = (index: number) => {
  currentIndex.value = index;
  resetAutoPlay();
};

const startAutoPlay = () => {
  autoPlayInterval.value = setInterval(() => {
    nextSlide();
  }, 5000);
};

const resetAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    startAutoPlay();
  }
};

const getImageUrl = (name: string) => {
  return new URL(`../../assets/${name}`, import.meta.url).href;
};

onMounted(() => {
  startAutoPlay();
});

onUnmounted(() => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
  }
});
</script>

<style scoped lang="scss">
.screenshot-slider-c {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 1rem;
  gap: 3rem;

  .slider-header {
    text-align: center;
    max-width: 800px;

    .slider-title {
      font-size: 36px;
      font-weight: 800;
      color: var(--header-text-color);
      margin-bottom: 1.25rem;
      letter-spacing: -1px;

      @media (min-width: 768px) {
        font-size: 56px;
      }
    }

    .slider-subtitle {
      font-size: 18px;
      color: var(--normal-text-color);
      max-width: 700px;
      margin: 0 auto;

      @media (min-width: 768px) {
        font-size: 22px;
      }
    }
  }

  .slider-container {
    width: 100%;
    max-width: 1400px;
    position: relative;
    overflow: hidden;
    border-radius: 24px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
    background: var(--background-color-soft);
    border: 1px solid var(--border-color);

    .slider-track {
      display: flex;
      transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);

      .slide {
        flex: 0 0 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;

        .slide-content {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          aspect-ratio: 16 / 9;
          min-height: 250px;

          .screenshot-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }

          .slide-caption {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 2rem;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
            color: white;
            border-bottom-left-radius: 20px;
            border-bottom-right-radius: 20px;

            h3 {
              font-size: 18px;
              font-weight: 600;

              @media (min-width: 768px) {
                font-size: 24px;
              }
            }
          }
        }
      }
    }

    .nav-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 100;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      @media (min-width: 768px) {
        width: 50px;
        height: 50px;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.4);
        transform: translateY(-50%) scale(1.1);
      }

      &.prev {
        left: 20px;
      }

      &.next {
        right: 20px;
      }
    }

    .slider-dots {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 10px;
      z-index: 10;

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.3s ease;

        &.active {
          background: white;
          width: 24px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>

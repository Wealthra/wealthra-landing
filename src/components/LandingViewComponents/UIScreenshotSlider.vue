<template>
  <div class="screenshot-slider-c">
    <div class="slider-header animate-reveal">
      <h2 class="slider-title">{{ title[selectedLanguage] }}</h2>
      <p class="slider-subtitle">{{ subtitle[selectedLanguage] }}</p>
    </div>

    <div class="slider-container animate-reveal">
      <div
        class="slider-viewport"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend.passive="onTouchEnd"
      >
        <div
          class="slider-track"
          :class="{ 'slider-track--no-motion': prefersReducedMotion }"
          :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
          <div
            v-for="(slide, index) in sliderData[selectedLanguage]"
            :key="index"
            class="slide"
          >
            <div class="slide-content">
              <div class="slide-image-wrap">
                <img
                  :src="getImageUrl(slide.image)"
                  :alt="slide.title"
                  class="screenshot-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="slide-caption">
                <h3>{{ slide.title }}</h3>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="nav-btn prev"
          @click="prevSlide"
          aria-label="Previous slide"
        >
          <font-awesome-icon icon="chevron-left" />
        </button>
        <button
          type="button"
          class="nav-btn next"
          @click="nextSlide"
          aria-label="Next slide"
        >
          <font-awesome-icon icon="chevron-right" />
        </button>
      </div>

      <div
        class="slider-dots"
        role="group"
        aria-label="Slide indicators"
      >
        <button
          v-for="(slide, index) in sliderData[selectedLanguage]"
          :key="index"
          type="button"
          class="dot"
          :class="{ active: currentIndex === index }"
          :aria-label="`Slide ${index + 1}: ${slide.title}`"
          :aria-current="currentIndex === index ? 'true' : undefined"
          @click="goToSlide(index)"
        ></button>
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
const prefersReducedMotion = ref(false);

const touchStartX = ref(0);
const touchStartY = ref(0);
const touchLastX = ref(0);
const isHorizontalSwipe = ref(false);

const SWIPE_THRESHOLD_PX = 48;

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
  if (prefersReducedMotion.value) return;
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
  autoPlayInterval.value = window.setInterval(() => {
    nextSlide();
  }, 5000);
};

const resetAutoPlay = () => {
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
    autoPlayInterval.value = null;
  }
  startAutoPlay();
};

const getImageUrl = (name: string) => {
  return new URL(`../../assets/${name}`, import.meta.url).href;
};

const onTouchStart = (e: TouchEvent) => {
  if (e.touches.length !== 1) return;
  const t = e.touches[0];
  touchStartX.value = t.clientX;
  touchStartY.value = t.clientY;
  touchLastX.value = t.clientX;
  isHorizontalSwipe.value = false;
};

const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length !== 1) return;
  const t = e.touches[0];
  const dx = Math.abs(t.clientX - touchStartX.value);
  const dy = Math.abs(t.clientY - touchStartY.value);
  if (!isHorizontalSwipe.value && dx > 12 && dx > dy * 1.2) {
    isHorizontalSwipe.value = true;
  }
  touchLastX.value = t.clientX;
};

const onTouchEnd = () => {
  if (!isHorizontalSwipe.value) return;
  const delta = touchStartX.value - touchLastX.value;
  if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
  if (delta > 0) {
    nextSlide();
  } else {
    prevSlide();
  }
};

let motionQuery: MediaQueryList | null = null;
const syncReducedMotion = () => {
  prefersReducedMotion.value =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion.value) {
    if (autoPlayInterval.value) {
      clearInterval(autoPlayInterval.value);
      autoPlayInterval.value = null;
    }
  } else if (!autoPlayInterval.value) {
    startAutoPlay();
  }
};

onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", syncReducedMotion);
  syncReducedMotion();
});

onUnmounted(() => {
  if (motionQuery) {
    motionQuery.removeEventListener("change", syncReducedMotion);
  }
  if (autoPlayInterval.value) {
    clearInterval(autoPlayInterval.value);
  }
});
</script>

<style scoped lang="scss">
.screenshot-slider-c {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.25rem 0.5rem;
  gap: 1.75rem;

  @media (min-width: 768px) {
    padding: 4rem 1rem;
    gap: 3rem;
  }

  .slider-header {
    text-align: center;
    max-width: 800px;
    padding: 0 0.35rem;

    .slider-title {
      font-size: clamp(1.65rem, 5vw, 3.5rem);
      font-weight: 800;
      color: var(--header-text-color);
      margin: 0 0 1rem;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }

    .slider-subtitle {
      font-size: clamp(0.95rem, 2.8vw, 1.35rem);
      color: var(--normal-text-color);
      max-width: 700px;
      margin: 0 auto;
      line-height: 1.45;
    }
  }

  .slider-container {
    width: 100%;
    max-width: 1400px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-radius: clamp(12px, 3vw, 24px);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.25);
    background: var(--background-color-soft);
    border: 1px solid var(--border-color);
    overflow: hidden;
  }

  .slider-viewport {
    position: relative;
    width: 100%;
    min-width: 0;
    overflow: hidden;
    touch-action: pan-y pinch-zoom;
  }

  .slider-track {
    display: flex;
    width: 100%;
    min-width: 0;
    transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;

    &.slider-track--no-motion {
      transition: none;
    }

    @media (min-width: 768px) {
      transition-duration: 0.7s;
    }
  }

  .slide {
    flex: 0 0 100%;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: stretch;
    padding: 0;
  }

  .slide-content {
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background: var(--background-color);

    @media (max-width: 767.98px) {
      min-height: 0;
    }

    @media (min-width: 768px) {
      position: relative;
      aspect-ratio: 16 / 9;
      min-height: 280px;
    }
  }

  .slide-image-wrap {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: min(52svh, 420px);
    max-height: min(62svh, 520px);
    padding: 0.5rem 0.35rem 0;
    box-sizing: border-box;
    background: var(--background-color);

    @media (min-width: 768px) {
      min-height: 0;
      max-height: none;
      height: 100%;
      padding: 0;
    }
  }

  .screenshot-image {
    display: block;
    width: 100%;
    height: auto;
    max-width: 100%;
    max-height: min(58svh, 500px);
    object-fit: contain;
    object-position: center top;

    @media (min-width: 768px) {
      width: 100%;
      height: 100%;
      max-height: none;
      object-position: center center;
    }
  }

  .slide-caption {
    flex-shrink: 0;
    padding: 0.85rem 1rem 1rem;
    border-top: 1px solid var(--border-color);
    background: var(--background-color);
    color: var(--header-text-color);
    text-align: center;

    h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.35;
      word-wrap: break-word;
      overflow-wrap: break-word;
    }

    @media (min-width: 768px) {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 2rem;
      text-align: left;
      border-top: none;
      color: #fff;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.82));

      h3 {
        font-size: 1.35rem;
      }
    }

    @media (min-width: 1024px) {
      h3 {
        font-size: 1.5rem;
      }
    }
  }

  .nav-btn {
    position: absolute;
    top: 40%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.22);
    color: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    transition:
      background 0.25s ease,
      transform 0.25s ease;

    @media (min-width: 768px) {
      top: 50%;
      width: 50px;
      height: 50px;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: rgba(255, 255, 255, 0.35);
        transform: translateY(-50%) scale(1.06);
      }
    }

    &:active {
      transform: translateY(-50%) scale(0.96);
    }

    &.prev {
      left: 8px;

      @media (min-width: 768px) {
        left: 20px;
      }
    }

    &.next {
      right: 8px;

      @media (min-width: 768px) {
        right: 20px;
      }
    }
  }

  .slider-dots {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 0.85rem 1rem 1rem;
    background: var(--background-color-soft);
    border-top: 1px solid var(--border-color);

    .dot {
      width: 8px;
      height: 8px;
      padding: 0;
      border: none;
      border-radius: 50%;
      background: var(--normal-text-color);
      opacity: 0.35;
      cursor: pointer;
      transition:
        opacity 0.25s ease,
        width 0.25s ease,
        border-radius 0.25s ease;

      &.active {
        opacity: 1;
        width: 24px;
        border-radius: 4px;
      }

      &:focus-visible {
        outline: 2px solid var(--primary-green-color);
        outline-offset: 2px;
      }
    }
  }
}
</style>

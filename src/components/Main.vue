<template>
  <div class="h-full flex justify-center bg-gray-100 max-lg:flex-col overflow-x-hidden">
    <div class="flex p-4 max-lg:w-full overflow-x-hidden">
      <div class="bg-white p-4 rounded shadow-lg text-center pr-56 max-lg:w-full overflow-x-hidden">
        <div class="text-left text-lg font-semibold mb-8"> Box Shadow CSS Generator </div>
        <div class="mb-8 ">
          <label for="offsetX" class="block text-sm font-medium text-gray-600 text-left overflow-x-hidden">Offset
            X:</label>
          <input type="range" v-model="offsetX" min="-50" max="50" class="mt-1 range-input">
          <span class="text-sm text-gray-500 float-left overflow-x-hidden">{{ offsetX }}</span>
        </div>

        <div class="mb-8">
          <label for="offsetY" class="block text-sm font-medium text-gray-600 text-left">Offset Y:</label>
          <input type="range" v-model="offsetY" min="-50" max="50" class="mt-1 range-input">
          <span class="text-sm text-gray-500 float-left">{{ offsetY }}</span>
        </div>

        <div class="mb-8">
          <label for="blurRadius" class="block text-sm font-medium text-gray-600 text-left">Blur Radius:</label>
          <input type="range" v-model="blurRadius" min="0" max="50" class="mt-1 range-input">
          <span class="text-sm text-gray-500 float-left">{{ blurRadius }}</span>
        </div>

        <div class="mb-8">
          <label for="spreadRadius" class="block text-sm font-medium text-gray-600 text-left">Spread Radius:</label>
          <input type="range" v-model="spreadRadius" min="0" max="50" class="mt-1 range-input">
          <span class="text-sm text-gray-500 float-left">{{ spreadRadius }}</span>
        </div>

        <div class="mb-8">
          <label for="opacity" class="block text-sm font-medium text-gray-600 text-left">Opacity:</label>
          <input type="range" v-model="opacity" min="0" max="1" step="0.1" class="mt-1 range-input">
          <span class="text-sm text-gray-500 float-left">{{ opacity }}</span>
        </div>

        <div class="mb-8">
          <label for="useInset" class="block text-sm font-medium text-gray-600 text-left">Use Inset:</label>
          <input type="checkbox" v-model.lazy="useInset" class="mt-1">
          <span class="text-sm text-gray-500 ml-4">{{ useInset ? 'Yes' : 'No' }}</span>
        </div>

        <div class="mb-8">
          <label for="color" class="block text-sm font-medium text-gray-600 text-left">Color:</label>
          <input type="color" v-model="color" class="p-1 h-10 w-14 rounded-md m-2 inline-table">
          <span class="text-sm text-gray-500 ">{{ color }}</span>
        </div>



      </div>
    </div>
    <div class="flex flex-col p-4 ">
      <div class="rounded-lg shadow-lg text-center mb-4">
        <div
          class="p-4 rounded-tr-lg rounded-tl-lg flex flex-row place-items-center content-around w-full gap-60 gap bg-white">
          <div class="text-left pl-4 text-lg font-semibold"> Preview </div>
          <div class="flex flex-row">
            <div class="border border-gray-300 p-1 h-8 w-12 rounded-md m-2 inline-table">
              <input type="color" v-model="previewColor" class="w-10 h-8">
            </div>
            <div class="border border-gray-300 p-1 h-8 w-12 rounded-md m-2 inline-table">
              <input type="color" v-model="previewBackgroundColor" class="w-10 h-8">
            </div>
          </div>
        </div>
        <div class="flex rounded-br-lg rounded-bl-lg relative" :style="{ backgroundColor: previewColor }">
          <div :style="{ boxShadow, backgroundColor: previewBackgroundColor }"
            class="w-60 h-60 bg-gray-300 shadow float-left pb-8 m-8 " id="resultBox"></div>
        </div>
      </div>
      <div class="bg-white p-8 shadow-lg text-left rounded-lg mb-8 lg:absolute lg:mt-[26rem] lg:pl-1">
        <div class="pb-8 pl-8 text-lg font-semibold">CSS code</div>
        <code class="flex  text-left bg-white overflow-hidden pl-8" :key="boxShadow">
        box-shadow: {{ boxShadow }};
      </code>
      </div>
      <div class="bg-white p-8 shadow-lg text-left rounded-lg lg:mt-44 ">
        <div class="text-left text-lg font-semibold"> Template </div>
        <div class="flex flex-row place-items-center">
          <img src="../assets/1.png" alt="First Image" class="cursor-pointer h-10 w-10 transition-image"
            @click="handleFirstImageClick" />
          <img src="../assets/2.jpg" alt="Second Image" class="cursor-pointer h-20 w-20 transition-image"
            @click="handleSecondImageClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      offsetX: 0,
      offsetY: 0,
      blurRadius: 20,
      spreadRadius: 5,
      color: '#000000',
      opacity: 0.55,
      useInset: false,
      previewBackgroundColor: '#28a7e6',
      previewColor: '#ffffff',

    };
  },
  computed: {
    boxShadow() {
      if (this.useInset) {
        return `${this.offsetX}px 
        ${this.offsetY}px 
        ${this.blurRadius}px 
        ${this.spreadRadius}px  
        rgba(${this.hexToRgb(this.color)}, 
        ${this.opacity})
        inset`;
      } else {
        return `${this.offsetX}px
         ${this.offsetY}px
          ${this.blurRadius}px
           ${this.spreadRadius}px 
           rgba(${this.hexToRgb(this.color)}, 
           ${this.opacity})`;
      }
    },

    backgroundPreview() {
      return {
        backgroundColor: this.previewColor,
      }
    },
    cssCode() {
      return `box-shadow: ${this.boxShadow};`;
    },
    previewStyle() {
      return {
        backgroundColor: this.previewBackgroundColor,
        boxShadow: this.boxShadow,
      };
    },
  },
  methods: {
    hexToRgb(hex) {
      hex = hex.replace(/^#/, '');
      let bigint = parseInt(hex, 16);
      let r = (bigint >> 16) & 255;
      let g = (bigint >> 8) & 255;
      let b = bigint & 255;

      return `${r}, ${g}, ${b}`;
    },
    handleFirstImageClick() {
      this.offsetX = 25;
      this.offsetY = 25;
      this.blurRadius = 0;
      this.spreadRadius = 0;
      this.color = 'rgba(225,238,255,1)';
      this.opacity = 1;
    },
    handleSecondImageClick() {
      this.offsetX = -18;
      this.offsetY = 0;
      this.blurRadius = 40;
      this.spreadRadius = 0;
      this.color = 'rgba(255,255,255,1)';
      this.opacity = 1;
    },
  },

};
</script>

<style lang="scss">
.range-input {
  width: 190%;
  height: 4px;
}

@media screen and (max-width: 1024px) {
  .range-input {
    width: 132%;
    height: 4px;
  }

  .gap {
    gap: 38rem;
  }
}

@media screen and (max-width: 790px) {
  .range-input {
    width: 142%;
    height: 4px;
  }

  .gap {
    gap: 30rem;
  }
}

@media screen and (max-width: 690px) {
  .range-input {
    width: 152%;
    height: 4px;
  }

  .gap {
    gap: 25rem;
  }
}

@media screen and (max-width: 560px) {
  .range-input {
    width: 178%;
    height: 4px;
  }

  .gap {
    gap: 18rem;
  }
}

@media screen and (max-width: 460px) {
  .range-input {
    width: 215%;
    height: 4px;
  }

  .gap {
    gap: 12rem;
  }
}

@media screen and (max-width: 350px) {
  .range-input {
    width: 415%;
    height: 4px;
  }

  .gap {
    gap: 4rem;
  }
}

.color-input {
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  transition: background-color 0.2s, border-color 0.2s;
}

.color-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
}

.transition-image {
  transition: all 10s ease;
}
</style>

<template>
  <BaseLayout>
    <template v-slot:content>
        <div class="flex w-full bg-white gap-8 h-[65vh]">
        <div class="w-4/12 bg-white">

            <div class="">
                <i></i>
                <span>Mes conversations </span>
            </div>

        </div>

        <div class="flex flex-col w-8/12 bg-white p-8 ">
          <div class="chat chat-start">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div class="chat-header">
              Obi-Wan Kenobi
              <time class="text-xs opacity-50">12:45</time>
            </div>
            <div class="chat-bubble">You were the Chosen One!</div>
            <div class="chat-footer opacity-50">Delivered</div>
          </div>
          <div class="chat chat-end">
            <div class="chat-image avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div class="chat-header">
              Anakin
              <time class="text-xs opacity-50">12:46</time>
            </div>
            <div class="chat-bubble">I hate you!</div>
            <div class="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/layouts/base.layout.vue";
</script>

<style lang="css" scoped>
</style>

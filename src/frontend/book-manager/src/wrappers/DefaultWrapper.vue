<script setup lang="ts">
const props = defineProps<{
    title: string
}>()
</script>

<template>
    <div>
        <div class="alert alert-secondary rounded-0 mb-0 border-0" role="alert">
            {{ props.title }}
        </div>
        <div class="bg-light p-3">
            <slot></slot>
        </div>
        <div class="mt-3 text-center">
            NodeJS REST API Development
        </div>
    </div>
</template>

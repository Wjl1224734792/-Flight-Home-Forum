<template>
    <button :class="[size, nom]" class="fh-button">
        <slot></slot>
    </button>
</template>

<script setup>
    import { defineProps } from 'vue'
    const { size, nom } = defineProps({
        size: {
            type: String,
            default: 'max'
        },
        nom: {
            type: String,
            default: 'primary'
        }
    })

</script>

<style lang="scss" scoped>
    .fh-button {
        text-align: center;
        border: none;
        cursor: pointer;
    }

    //size
    .max {
        min-width: 100px;
        height: 48px;
        border-radius: 24px;
        padding: 0 24px;
    }

    .base {
        min-width: 80px;
        height: 36px;
        border-radius: 24px;
        padding: 0 20px;

    }

    .small {
        min-width: 72px;
        height: 32px;
        border-radius: 24px;
        padding: 0 24px;

    }

    //nom
    .primary {
        background: $gray-1;
        color: $gray-10;
    }

    .secondary {
        background: none;
        color: $gray-1;
        border: 2px solid $gray-1;
    }

    .cprimary {
        background: $primary-color;
        color: $gray-10;
        font-weight: 600;
    }

    .csecondary {
        background: $gray-10;
        color: $gray-1;
    }
</style>
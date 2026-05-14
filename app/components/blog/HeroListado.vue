<template>
    <DefaultSection class="relative" inner-class="xxl:max-w-full">
        <picture class="w-full">
            <source media="(min-width: 1080px)" srcset="/images/blog/murallon_blog_hero_1440.webp" />
            <source media="(min-width: 768px)" srcset="/images/blog/murallon_blog_hero_1080.webp" />
            <source media="(min-width: 480px)" srcset="/images/blog/murallon_blog_hero_768.webp" />
            <NuxtImg src="/images/blog/murallon_blog_hero_320.webp" alt="Blog Murallón"
                class="w-full h-50 md:h-50 lg:h-75 xxl:h-75 object-cover" />
        </picture>
        <div
            class="flex justify-center items-center absolute inset-0 bg-linear-to-b from-transparent to-secondary">
            <HeadingH1 class="text-center text-white uppercase drop-shadow-md">Blog Murallón</HeadingH1>
        </div>
    </DefaultSection>
</template>

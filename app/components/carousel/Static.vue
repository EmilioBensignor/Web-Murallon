<template>
    <div class="relative w-full" ref="carouselWrapper">
        <button v-if="showArrowsResolved && showLeftArrow" @click="scrollLeft"
            class="w-12 h-12 flex justify-center items-center absolute z-10 bg-white shadow-md rounded-full"
            :style="leftButtonStyle" :disabled="isAtStart" aria-label="Anterior">
            <Icon name="material-symbols:chevron-left-rounded" size="3rem" class="text-primary-default" />
        </button>

        <div ref="container" class="scrollbar-hide overflow-x-auto cursor-grab lg:cursor-auto select-none"
            :class="isDragging ? 'cursor-grabbing lg:cursor-auto' : ''" @scroll="handleScroll" @mousedown="startDrag"
            @mousemove="drag" @mouseup="endDrag" @mouseleave="endDrag" @touchstart="startDrag" @touchmove="drag"
            @touchend="endDrag">

            <div class="carousel-wrapper flex items-end pb-2 px-1 first:ml-4 md:first:ml-0 first:mr-4 md:first:mr-0"
                :class="wrapperClass" :style="wrapperStyles">
                <slot />
            </div>
        </div>

        <button v-if="showArrowsResolved && showRightArrow" @click="scrollRight"
            class="w-12 h-12 flex justify-center items-center absolute z-10 bg-white shadow-md rounded-full"
            :style="rightButtonStyle" :disabled="isAtEnd" aria-label="Siguiente">
            <Icon name="material-symbols:chevron-right-rounded" size="3rem" class="text-primary-default" />
        </button>

        <div v-if="showDotsResolved && totalPages > 1" class="flex justify-center mt-3 lg:mt-5 overflow-hidden">
            <div ref="dotsContainer" class="max-w-[95%] flex gap-2 overflow-hidden scrollbar-hide">
                <button v-for="(dot, index) in totalPages" :key="index" @click="goToPage(index)"
                    :ref="el => { if (el) dotElements[index] = el }"
                    class="w-4 lg:w-5 h-4 lg:h-5 shrink-0 rounded-full transition-colors duration-300"
                    :class="currentPage === index ? 'bg-primary' : 'bg-gray-mid lg:hover:bg-gray-dark'"
                    :aria-label="`Ir a la página ${index + 1}`">
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    gap: {
        type: [Number, Object],
        default: 8
    },
    slidesPerView: {
        type: Object,
        default: () => ({
            base: 1.5,
            sm: 2.5,
            tab: 2.8,
            md: 3.5,
            lg: 4,
            xl: 5,
            xxl: 5,
        })
    },
    slidesToScroll: { type: Number, default: 1 },
    buttonPosition: {
        type: Object,
        default: () => ({
            top: '50%',
            transform: 'translateY(-50%)',
            left: {
                base: '0.5rem',
                md: '-2rem',
                lg: '-2rem',
                xl: '-2rem',
                xxl: '-2rem',
            },
            right: {
                base: '0.5rem',
                md: '-2rem',
                lg: '-2rem',
                xl: '-2rem',
                xxl: '-2rem',
            }
        })
    },
    scrollBehavior: {
        type: String,
        default: 'smooth',
        validator: (value) => ['smooth', 'auto'].includes(value)
    },
    wrapperClass: {
        type: String,
        default: ''
    },
    showArrows: { type: [Boolean, Object], default: true },
    showDots: { type: [Boolean, Object], default: false },
})

const container = ref(null)
const dotsContainer = ref(null)
const dotElements = ref([])

const isAtStart = ref(true)
const isAtEnd = ref(false)
const isDragging = ref(false)
const containerWidth = ref(0)
const currentBreakpoint = ref('base')
const scrollTrigger = ref(0)
const currentPage = ref(0)
const totalPages = ref(0)
const totalSlides = ref(0)

let startX = 0
let startY = 0
let scrollStart = 0
let resizeObserver = null
let mutationObserver = null
let isDragHorizontal = false
let hasScrollStarted = false

const showArrowsResolved = computed(() => {
    if (typeof props.showArrows === 'boolean') return props.showArrows
    return props.showArrows[currentBreakpoint.value] ?? props.showArrows.base ?? true
})

const showDotsResolved = computed(() => {
    if (typeof props.showDots === 'boolean') return props.showDots
    return props.showDots[currentBreakpoint.value] ?? props.showDots.base ?? false
})

const showLeftArrow = computed(() => {
    scrollTrigger.value
    containerWidth.value
    if (!container.value) return false

    const { scrollLeft, scrollWidth, clientWidth } = container.value
    const hasContent = scrollWidth > clientWidth + 2

    return hasContent && scrollLeft > 2
})

const showRightArrow = computed(() => {
    scrollTrigger.value
    containerWidth.value
    if (!container.value) return false

    const { scrollLeft, scrollWidth, clientWidth } = container.value
    const hasContent = scrollWidth > clientWidth + 2

    return hasContent && scrollLeft < scrollWidth - clientWidth - 2
})


const slidesVisible = computed(() => {
    const value = props.slidesPerView[currentBreakpoint.value] || props.slidesPerView.base
    return Math.floor(value)
})

const slidesVisibleDecimal = computed(() => {
    return props.slidesPerView[currentBreakpoint.value] || props.slidesPerView.base
})

const responsiveGap = computed(() => {
    if (typeof props.gap === 'number') {
        return props.gap
    }
    return props.gap[currentBreakpoint.value] || props.gap.base || 8
})

const scrollAmount = computed(() => {
    if (!containerWidth.value) return 280

    const paddingOffset = 8
    const effectiveWidth = containerWidth.value - paddingOffset

    const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
    const availableWidth = effectiveWidth - totalGapsWidth
    const slideWidth = availableWidth / slidesVisibleDecimal.value

    return slideWidth + responsiveGap.value
})

const wrapperStyles = computed(() => ({
    gap: `${responsiveGap.value}px`,
    width: 'max-content'
}))

const updateBreakpoint = () => {
    if (!process.client) return

    const width = window.innerWidth
    let newBreakpoint = 'base'

    if (width >= 1440) newBreakpoint = 'xxl'
    else if (width >= 1280) newBreakpoint = 'xl'
    else if (width >= 1080) newBreakpoint = 'lg'
    else if (width >= 768) newBreakpoint = 'md'
    else if (width >= 600) newBreakpoint = 'tab'
    else if (width >= 480) newBreakpoint = 'sm'

    if (currentBreakpoint.value !== newBreakpoint) {
        currentBreakpoint.value = newBreakpoint
        nextTick(() => {
            updateContainerWidth()
            setupChildrenClasses()
            updateArrows()
        })
    }
}

const updateContainerWidth = () => {
    if (!container.value) return

    const rect = container.value.getBoundingClientRect()
    containerWidth.value = rect.width
}

const updateArrows = () => {
    if (!container.value) return

    const rect = container.value.getBoundingClientRect()
    const { scrollLeft, scrollWidth, clientWidth } = container.value
    const tolerance = 2

    const hasContentOverflow = scrollWidth > clientWidth + tolerance
    const atStart = !hasContentOverflow || scrollLeft <= tolerance
    const atEnd = !hasContentOverflow || scrollLeft >= scrollWidth - clientWidth - tolerance

    requestAnimationFrame(() => {
        containerWidth.value = rect.width
        isAtStart.value = atStart
        isAtEnd.value = atEnd
        scrollTrigger.value++
    })
}

const scrollDotsToActive = () => {
    if (!dotsContainer.value || !dotElements.value[currentPage.value]) return
    const activeDot = dotElements.value[currentPage.value]
    const dc = dotsContainer.value
    const scrollPosition = activeDot.offsetLeft - (dc.offsetWidth / 2) + (activeDot.offsetWidth / 2)
    requestAnimationFrame(() => {
        dc.scrollTo({ left: scrollPosition, behavior: 'smooth' })
    })
}

const updateCurrentPage = () => {
    if (!container.value) return
    const { scrollLeft, scrollWidth, clientWidth } = container.value
    const slideWidth = scrollWidth / totalSlides.value || 1
    const newPage = Math.min(
        Math.round(scrollLeft / (slideWidth * props.slidesToScroll)),
        totalPages.value - 1
    )
    if (newPage !== currentPage.value) {
        currentPage.value = newPage
        scrollDotsToActive()
    }
}

const handleScroll = () => {
    updateArrows()
    if (showDotsResolved.value) updateCurrentPage()
}

const goToPage = (pageIndex) => {
    if (!container.value || pageIndex < 0 || pageIndex >= totalPages.value) return
    const slideWidth = (container.value.scrollWidth) / totalSlides.value || 0
    const targetScroll = pageIndex * props.slidesToScroll * slideWidth
    container.value.scrollTo({ left: targetScroll, behavior: props.scrollBehavior })
    currentPage.value = pageIndex
    scrollDotsToActive()
}

const scrollLeft = () => {
    if (!container.value) return

    container.value.scrollBy({
        left: -scrollAmount.value,
        behavior: props.scrollBehavior
    })
}

const scrollRight = () => {
    if (!container.value) return

    container.value.scrollBy({
        left: scrollAmount.value,
        behavior: props.scrollBehavior
    })
}

const scrollToSlide = (slideIndex) => {
    if (!container.value) return

    const paddingOffset = 8
    const effectiveWidth = containerWidth.value - paddingOffset

    const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
    const availableWidth = effectiveWidth - totalGapsWidth
    const slideWidth = availableWidth / slidesVisibleDecimal.value
    const targetScroll = (slideWidth + responsiveGap.value) * slideIndex

    container.value.scrollTo({
        left: targetScroll,
        behavior: props.scrollBehavior
    })
}

const getCurrentSlideIndex = () => {
    if (!container.value) return 0

    const paddingOffset = 8
    const effectiveWidth = containerWidth.value - paddingOffset

    const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
    const availableWidth = effectiveWidth - totalGapsWidth
    const slideWidth = availableWidth / slidesVisibleDecimal.value
    return Math.round(container.value.scrollLeft / (slideWidth + responsiveGap.value))
}

const startDrag = (e) => {
    isDragging.value = true
    hasScrollStarted = false
    isDragHorizontal = false

    startX = e.pageX || e.touches[0].pageX
    startY = e.pageY || e.touches[0].pageY
    scrollStart = container.value.scrollLeft

    if (e.type === 'mousedown') {
        e.preventDefault()
    }
}

const drag = (e) => {
    if (!isDragging.value) return

    const x = e.pageX || e.touches[0].pageX
    const y = e.pageY || e.touches[0].pageY

    const deltaX = Math.abs(x - startX)
    const deltaY = Math.abs(y - startY)

    if (!hasScrollStarted && (deltaX > 5 || deltaY > 5)) {
        hasScrollStarted = true
        isDragHorizontal = deltaX > deltaY
    }

    if (hasScrollStarted && isDragHorizontal) {
        e.preventDefault()
        const walk = (x - startX) * 1.2
        container.value.scrollLeft = scrollStart - walk
    } else if (hasScrollStarted && !isDragHorizontal) {
        endDrag()
    }
}

const endDrag = () => {
    isDragging.value = false
    hasScrollStarted = false
    isDragHorizontal = false
}

const setupChildrenClasses = () => {
    nextTick(() => {
        if (!container.value || !containerWidth.value) return

        const wrapper = container.value.querySelector('.carousel-wrapper')
        if (!wrapper) return

        const children = Array.from(wrapper.children)

        if (children.length === 0) return

        const paddingOffset = 8
        const effectiveWidth = containerWidth.value - paddingOffset
        const totalGapsWidth = (slidesVisibleDecimal.value - 1) * responsiveGap.value
        const availableWidth = effectiveWidth - totalGapsWidth
        const slideWidth = availableWidth / slidesVisibleDecimal.value

        requestAnimationFrame(() => {
            children.forEach(child => {
                child.style.width = `${slideWidth}px`
                child.style.flexShrink = '0'
                child.style.minWidth = `${slideWidth}px`
            })
        })
    })
}

const responsiveLeft = computed(() => {
    const leftConfig = props.buttonPosition.left
    if (typeof leftConfig === 'string') {
        return leftConfig
    }
    return leftConfig?.[currentBreakpoint.value] || leftConfig?.base || '0.5rem'
})

const responsiveRight = computed(() => {
    const rightConfig = props.buttonPosition.right
    if (typeof rightConfig === 'string') {
        return rightConfig
    }
    return rightConfig?.[currentBreakpoint.value] || rightConfig?.base || '0.5rem'
})

const leftButtonStyle = computed(() => ({
    top: props.buttonPosition.top,
    transform: props.buttonPosition.transform,
    left: responsiveLeft.value
}))

const rightButtonStyle = computed(() => ({
    top: props.buttonPosition.top,
    transform: props.buttonPosition.transform,
    right: responsiveRight.value
}))

const initialize = async () => {
    await nextTick()

    updateBreakpoint()
    updateContainerWidth()
    setupChildrenClasses()

    updateArrows()

    if (container.value) {
        const images = container.value.querySelectorAll('img')
        let loadedCount = 0
        const totalImages = images.length

        if (totalImages === 0) {
            setTimeout(() => {
                updateArrows()
            }, 50)

            setTimeout(() => {
                updateArrows()
            }, 150)
        } else {
            const checkAllLoaded = () => {
                loadedCount++
                if (loadedCount === totalImages) {
                    updateArrows()
                }
            }

            images.forEach(img => {
                if (img.complete) {
                    checkAllLoaded()
                } else {
                    img.addEventListener('load', checkAllLoaded, { once: true })
                    img.addEventListener('error', checkAllLoaded, { once: true })
                }
            })
        }
    }

    setTimeout(() => {
        updateArrows()
    }, 500)

    setTimeout(() => {
        updateArrows()
    }, 1000)
}

onMounted(() => {
    initialize()

    let resizeTimeout
    const debouncedResize = () => {
        clearTimeout(resizeTimeout)
        resizeTimeout = setTimeout(() => {
            updateBreakpoint()
            updateContainerWidth()
            setupChildrenClasses()
        }, 150)
    }

    window.addEventListener('resize', debouncedResize)

    if (container.value && window.ResizeObserver) {
        resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.target === container.value) {
                    updateContainerWidth()
                    setupChildrenClasses()
                    setTimeout(() => {
                        updateArrows()
                    }, 50)
                }
            }
        })
        resizeObserver.observe(container.value)
    }

    const wrapper = container.value?.querySelector('.carousel-wrapper')
    if (wrapper && window.MutationObserver) {
        let mutationTimeout
        mutationObserver = new MutationObserver(() => {
            clearTimeout(mutationTimeout)
            mutationTimeout = setTimeout(() => {
                updateContainerWidth()
                setupChildrenClasses()

                const images = container.value?.querySelectorAll('img') || []
                let loadedCount = 0

                if (images.length === 0) {
                    updateArrows()
                } else {
                    const checkMutationLoaded = () => {
                        loadedCount++
                        if (loadedCount === images.length) {
                            updateArrows()
                        }
                    }

                    images.forEach(img => {
                        if (img.complete) {
                            checkMutationLoaded()
                        } else {
                            img.addEventListener('load', checkMutationLoaded, { once: true })
                            img.addEventListener('error', checkMutationLoaded, { once: true })
                        }
                    })
                }
            }, 150)
        })
        mutationObserver.observe(wrapper, {
            childList: true,
            subtree: true
        })
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', updateBreakpoint)
    window.removeEventListener('resize', updateContainerWidth)
    window.removeEventListener('resize', setupChildrenClasses)

    if (resizeObserver) {
        resizeObserver.disconnect()
    }

    if (mutationObserver) {
        mutationObserver.disconnect()
    }
})

defineExpose({
    scrollLeft,
    scrollRight,
    scrollToSlide,
    getCurrentSlideIndex,
    updateArrows,
    setupChildrenClasses
})
</script>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.carousel-wrapper {
    min-height: auto;
}
</style>
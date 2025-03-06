<script lang="ts">
  import { flip } from "svelte/animate";
  import { writable, type Writable } from "svelte/store";
  import { fly } from "svelte/transition";

  import { toasts, dismissToast } from "./toast-functions";

  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  const progressStores = new Map<number, Writable<number>>();

  function progressBar(
    node: HTMLElement,
    { id, duration }: { id: number; duration: number }
  ) {
    if (!progressStores.has(id)) {
      progressStores.set(id, writable(100));
    }

    const progress = progressStores.get(id);

    let animationFrame: number;
    const startTime = Date.now();
    const endTime = startTime + duration;

    function updateProgress() {
      const now = Date.now();

      if (now >= endTime) {
        progress?.set(0);

        return;
      }

      const remaining = endTime - now;
      const percent = (remaining / duration) * 100;
      progress?.set(percent);

      node.style.width = `${percent}%`;

      animationFrame = requestAnimationFrame(updateProgress);
    }

    if (duration > 0) {
      animationFrame = requestAnimationFrame(updateProgress);
    }

    return {
      destroy() {
        cancelAnimationFrame(animationFrame);
        progressStores.delete(id);
      },
    };
  }
</script>

<div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-xs">
  {#each $toasts as toast (toast.id)}
    <div
      animate:flip={{ duration: 200 }}
      transition:fly={{ x: 20, duration: 300 }}
      class="p-4 rounded shadow-lg text-white flex flex-col relative overflow-hidden {typeClasses[
        toast.type
      ]}"
      role="alert"
    >
      <div class="flex items-center justify-between">
        <span>{toast.message}</span>
        <button
          class="ml-4 text-white hover:text-gray-200 focus:outline-none"
          on:click={() => {
            dismissToast(toast.id);
          }}
          aria-label="Dismiss notification"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {#if toast.duration > 0}
        <div class="absolute bottom-0 left-0 h-1 bg-white bg-opacity-30 w-full">
          <div
            class="h-full bg-white"
            use:progressBar={{ id: toast.id, duration: toast.duration }}
          ></div>
        </div>
      {/if}
    </div>
  {/each}
</div>

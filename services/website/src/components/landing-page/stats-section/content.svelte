<script>
  export let title;
  export let description;
</script>

<div>
  <h4 class="text-2xl leading-8 font-extrabold text-gray-900 tracking-tight sm:text-3xl sm:leading-9">
    {title}
  </h4>
  <p class="mt-3 text-lg leading-7 text-gray-500">
    {description}
  </p>

  {#if false}
  <ul class="mt-10">
    <li>
      <div class="flex">
        <div class="flex-shrink-0">
          <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        </div>
        <div class="ml-4">
          <h5 class="text-lg leading-6 font-medium text-gray-900">Mobile notifications</h5>
          <p class="mt-2 text-base leading-6 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
          </p>
        </div>
      </div>
    </li>
    <li class="mt-10">
      <div class="flex">
        <div class="flex-shrink-0">
          <div class="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div class="ml-4">
          <h5 class="text-lg leading-6 font-medium text-gray-900">Reminder emails</h5>
          <p class="mt-2 text-base leading-6 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.
          </p>
        </div>
      </div>
    </li>
  </ul>
  {/if}
</div>
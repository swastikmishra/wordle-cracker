<script lang="ts">
  import { onMount } from "svelte";
  onMount(() => {
    let storageTheme = localStorage.getItem("theme")
    if(storageTheme == "dark")
      toggleTheme()
  })
  const bodyElement = document.body;
  let theme: string = "light";
  const toggleTheme = () => {
    if (bodyElement.className.indexOf("dark") == -1) {
      theme = "dark";
      bodyElement.classList.add("dark");
    } else {
      theme = "light";
      bodyElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme)
  };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-missing-attribute -->
<footer class="footer pb-3">
  <div class="content has-text-centered">
    <p>
      <a href="/"><strong>Wordle Cracker</strong></a> by
      <a href="https://github.com/swastikmishra">Swastik Mishra</a>.
    </p>
    <p class="menu">
      <a on:click={toggleTheme}>
        {#if theme == "light"}
          <ion-icon name="moon" />
        {:else}
          <ion-icon name="sunny" />
        {/if}
      </a>
      <a href="https://github.com/swastikmishra">
        <ion-icon name="logo-github" />
      </a>
      <a class="is-hidden">
        <ion-icon name="help-circle-outline" />
      </a>
    </p>
  </div>
</footer>

<script lang="ts">
  import { onMount } from "svelte";
  import { loop_guard } from "svelte/internal";
  import Predictions from "./../utils/predictions";

  let predictions = null
  onMount(() => {
     predictions = new Predictions();
  });

  let greenInput: Array<string> = ["", "", "", "", ""];
  let yellowInput: Array<string> = ["", "", "", "", ""];
  let ignoreArray: Array<string> = [];
  const moveFocus = (target: HTMLInputElement) => {
    if(target.value == "") return;
    if (target.parentElement.nextElementSibling)
      if(target.parentElement.nextElementSibling.firstChild)
        target.parentElement.nextElementSibling.firstChild.focus();
  }
  const handleGreenInput = (e, index) => {
    let value = e.target.value;
    value = value.toUpperCase();
    value = value.substr(0, 1);
    greenInput[index] = value;
    yellowInput[index] = "";
    moveFocus(e.target)
    predict();
  };
  const handleYellowInput = (e, index) => {
    let value = e.target.value;
    value = value.toUpperCase();
    value = value.substr(0, 1);
    yellowInput[index] = value;
    moveFocus(e.target)
    predict();
  };
  let results : Array<string> = []
  const predict = () => {
    results = predictions.predict(greenInput, yellowInput)
  };
  const getSpanString = (letter : string, index) => {
    letter = letter.toUpperCase();
    if(greenInput[index] == letter)
        return `<span class="green">${letter}</span>`
    else if(yellowInput.indexOf(letter) != -1)
     return `<span class="yellow">${letter}</span>`
    else 
     return `<span>${letter}</span>`
  }
</script>

<div data-component="MainApp">
  <div class="section pt-3">
    <div class="conatiner">
      <div class="columns is-centered is-multiline">
        <div class="column is-6">
          <div class="box has-text-centered">
            <h3 class="title is-5 green">Put the green ones here</h3>
            <div class="field is-grouped is-grouped-centered">
              {#each greenInput as input, index (index)}
                <p class="control">
                  <input
                    class="input green"
                    type="text"
                    placeholder="#"
                    bind:value={greenInput[index]}
                    on:input={(e) => handleGreenInput(e, index)}
                  />
                </p>
              {/each}
            </div>
          </div>
        </div>

        <div class="column is-6">
          <div class="box has-text-centered">
            <h3 class="title is-5 yellow">Put the yellow ones here</h3>
            <div class="field is-grouped is-grouped-centered">
              {#each yellowInput as input, index (index)}
                <p class="control">
                  <input
                    class="input yellow"
                    type="text"
                    placeholder="#"
                    disabled={greenInput[index] != ""}
                    bind:value={yellowInput[index]}
                    on:input={(e) => handleYellowInput(e, index)}
                  />
                </p>
              {/each}
            </div>
          </div>
        </div>

        <div class="column is-12">
          <div class="box has-text-centered">
            <h3 class="title is-5 red">Select letters to ignore</h3>
            <div class="field is-grouped is-grouped-centered is-grouped-multiline">
              {#each ["A","B","C","D","E","F","G"] as input, index (index)}
                <p class="control">
                  <input
                    readonly={true}
                    class={`input red`}
                    type="text"
                    placeholder="#"
                    value={input}
                    on:click={(e) => handleIgnoreClick(e)}
                  />
                </p>
              {/each}
            </div>
          </div>
        </div>

        <div class="column is-12">
          <div class="box Predictions has-text-centered">
            <h3 class="title is-5 blue">Predictions</h3>
            {#each results as result, index (index)}
                <p>
                    {@html result.split("").reduce( (pl, cl, i) => {
                        return i == 1 ? getSpanString(pl, 0)+getSpanString(cl, 1) : pl+getSpanString(cl, i)
                    })}
                </p>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

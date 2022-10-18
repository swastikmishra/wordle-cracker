<script lang="ts">
  import { onMount } from "svelte";
  import { loop_guard } from "svelte/internal";
  import Predictions from "./../utils/predictions";

  let predictions = null;
  onMount(() => {
    predictions = new Predictions();
  });

  const letters: Array<string> = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let greenInput: Array<string> = ["", "", "", "", ""];
  let yellowInput: Array<string> = ["", "", "", "", ""];
  let ignoreArray: Array<string> = [];
  const moveFocus = (target: HTMLInputElement) => {
    if (target.value == "") return;
    if (target.parentElement.nextElementSibling)
      if (target.parentElement.nextElementSibling.firstChild)
        target.parentElement.nextElementSibling.firstChild.focus();
  };
  const handleIgnoreClick = (e) => {
    let val = e.target.value;
    if (ignoreArray.indexOf(val) == -1) ignoreArray.push(val);
    else ignoreArray.splice(ignoreArray.indexOf(val), 1);
    cleanIgnoreArray()
    predict();
  };
  const cleanIgnoreArray = () => {
    ignoreArray = ignoreArray.filter((letter: string) => {
      return greenInput.indexOf(letter) == -1 ? true : false;
    });
    ignoreArray = ignoreArray.filter((letter: string) => {
      return yellowInput.indexOf(letter) == -1 ? true : false;
    });
  }
  const handleGreenInput = (e, index) => {
    let value = e.target.value;
    value = value.toUpperCase();
    value = value.substr(0, 1);
    greenInput[index] = value;
    yellowInput[index] = "";
    moveFocus(e.target);
    cleanIgnoreArray()
    predict();
  };
  const handleYellowInput = (e, index) => {
    let value = e.target.value;
    value = value.toUpperCase();
    value = value.substr(0, 1);
    yellowInput[index] = value;
    moveFocus(e.target);
    cleanIgnoreArray()
    predict();
  };
  let results: Array<string> = [];
  const predict = () => {
    results = predictions.predict(greenInput, yellowInput, ignoreArray);
  };
  const getSpanString = (letter: string, index) => {
    letter = letter.toUpperCase();
    if (greenInput[index] == letter)
      return `<span class="green">${letter}</span>`;
    else if (yellowInput.indexOf(letter) != -1)
      return `<span class="yellow">${letter}</span>`;
    else return `<span>${letter}</span>`;
  };
  const toggleFieldsDisplay = (e) => {
    let target = e.target
    if(target.className.indexOf("hydrated") != -1) //this is ion-icon click then
      target = target.parentElement
    let parentEle = target.parentElement
    if(parentEle.className.indexOf("expanded") == -1){
      parentEle.classList.add("expanded")
      target.querySelector("ion-icon").setAttribute("name", "chevron-up-outline")
    }else{
      parentEle.classList.remove("expanded")
      target.querySelector("ion-icon").setAttribute("name", "chevron-down-outline")
    }
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div data-component="MainApp">
  <div class="section pt-3">
    <div class="conatiner">
      <div class="columns is-centered is-multiline">
        <div class="column is-6">
          <div class="box has-text-centered expanded">
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
          <div class="box has-text-centered expanded">
            <h3 class="title is-5 yellow" on:click={toggleFieldsDisplay}>
              Put the yellow ones here
              <ion-icon name="chevron-up-outline"></ion-icon>
            </h3>
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
            <h3 class="title is-5 red" on:click={toggleFieldsDisplay}>
              Select letters to ignore
              <ion-icon name="chevron-down-outline"></ion-icon>
            </h3>
            <div
              class="field is-grouped is-grouped-centered is-grouped-multiline"
            >
              {#each letters as letter, index (index)}
                {#if greenInput.indexOf(letter) == -1 && yellowInput.indexOf(letter) == -1 }
                  <p class="control">
                    <input
                      readonly={true}
                      class={`input red ` +
                        (ignoreArray.indexOf(letter) == -1 ? `` : `selected`)}
                      type="text"
                      placeholder="#"
                      value={letter}
                      on:click={handleIgnoreClick}
                    />
                  </p>
                {/if}
              {/each}
            </div>
          </div>
        </div>

        <div class="column is-12">
          <div class="box Predictions has-text-centered">
            <h3 class="title is-5 blue">Predictions</h3>
            {#each results as result, index (index)}
              <p>
                {@html result.split("").reduce((pl, cl, i) => {
                  return i == 1
                    ? getSpanString(pl, 0) + getSpanString(cl, 1)
                    : pl + getSpanString(cl, i);
                })}
              </p>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

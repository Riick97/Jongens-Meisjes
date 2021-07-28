<script>
    export let letter = ''
    export let show = true;

    let shuffler = 'A'

    function shuffle() {
        shuffler = getRandomLetter()
    }

    setInterval(() => {
        if (show) return
        shuffle()
    }, 50)

    function getRandomLetter() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    function generateString(length) {
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }

    return generateString(1)
}
</script>

{#if !show}
<div class="letter">{shuffler}</div>
{:else}
<div class="letter">{letter}</div>
{/if}

<style>
    .letter {
        font-size: 5rem;
    }
</style>
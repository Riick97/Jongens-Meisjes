<script>
    import page from 'page'

    let location = window.location.pathname

    window.onclick = recalculate
    function recalculate() {
        location = window.location.pathname
    }

</script>


<nav>
    <div class="container">
        {#if location !== '/'}
        <div on:click="{() => page('/')}" class="left">home</div>
        {/if}
        <div class="right"></div>
    </div>
</nav>

<style>
    nav{
        height: 50px;
    }
    .container{
        justify-content: space-between;
        height: 100%;
    }
</style>
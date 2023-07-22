<script>
import Input from '$lib/components/Input.svelte'
</script>

<div class="container">
<h1>Wage calculator</h1>
<p>Let's see how much money you could be making if management bargained fairly.</p>
<Input/>
</div>

<style lang="scss">
    .container {
        background-color: #E5E4E2;
        max-width: 580px;
        margin: 50px auto 0px;
        padding: 10px;
    }
    h1 {
        font-size: 2rem;
        color: black;
    }
</style>

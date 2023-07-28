<script>
// This is how you input a component
import Input from '$lib/components/Input.svelte'
</script>

<!-- All your HTML goes here -->
<div class="container">
<h1 class='text'>Let's make a deal ✨</h1>
<p class='text'>See how much money you could be making if the company agreed to the Guild's proposal.</p>
<Input/>
</div>
<!-- When you're done you can put component specific styling below -->

<style lang="scss">
    .text {
        font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
    .container {
        border: solid 5px rgb(223, 58, 79);
        max-width: 580px;
        margin: 50px auto 0px;
        padding: 40px;
    }
    h1 {
        font-size: 2rem;
        color: black;
        margin-top: 0;
        text-align: center;
        @media screen and (max-width: 583px) {
            text-align: left;
        }
    }
</style>

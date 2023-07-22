<script>
    // Lib for easier selections
    import Select from 'svelte-select'
    // Load guild data
    import data from '$lib/guild_data.json'
    // Load all job categories by key value
    let items = Object.keys(data)
    // Vars can be null by default for logic
    let jobType = null
    let salaryRaw
    // Guild proposed tiers for salary increases
    let tier1 = 80000
    let tier2 = 99999
    let tier3 = 119999
    let tier4 = 120000

    // Utility functions
    const formatCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    const formatSalary = (val) => {
        let int = parseInt(val)
        return `$${formatCommas(int.toFixed(2))}`
    }

    // SVELTE STUFF BELOW read slowly...
    // $: means re-run if values in assignment or codeblock change
    // you can read more about it here: https://svelte.dev/examples/reactive-declarations
    // pull minimum salary from data
    $: guildMin = jobType ? data[jobType.label].guild : null
    $: postMin = jobType ? data[jobType.label].post : null
    // calculate if input salary is less than 
    $: salary = salaryRaw ? parseInt(salaryRaw.replace(/\D/g, "")) : null
    $: lessThanMinimum = salary ? salary < postMin ? true : false : null

    console.log(lessThanMinimum)
</script>

<p>What's your job category?</p>
<Select {items} bind:value={jobType} />
<p>How much do you currently make?</p>
<div class="salary-input-container">
    <!-- This bind is how we handle binding a prop/value -->
    <input bind:value={salaryRaw} placeholder="Enter your salary" />
</div>

<!-- In svelte you use logic blocks like this ... -->
<!-- IF YOU SELECT A JOB TYPE SHOW BELOW -->
{#if jobType}
    <p>As a {jobType.label.toLowerCase()} your minimum would be ...</p>
    <p><strong>Post: </strong>{formatSalary(postMin)}</p>
    <p><strong>Guild: </strong>{formatSalary(guildMin)}</p>
{/if}
<!-- IF YOU ENTERED A SALARY SHOW THE CHANGE -->
{#if salary && jobType}
    <p>Salary section</p>
    <p><strong>{formatSalary(salary)}</strong></p>
    <!-- SALARY LESS THAN POST MINIMUM -->
    {#if salary < postMin}
    <p>Under the guild proposal: You would make {formatSalary(guildMin - salary)} more a year.</p>
    <p>Versus the post's proposal of {formatSalary(postMin - salary)} more a year.</p>
    <!-- SALARY LESS THAN GUILD MINIMUM -->
    {:else if salary < guildMin}
    <p>You would make {formatSalary(guildMin - salary)} more a year.</p>
    <!-- SALARY GREATER THAN GUILD MINIMUM -->
    <!-- SHOW INCREASE AT TIER1 // 4.0%-->
    {:else if salary < tier1}
    <p>You would get a 4.0% raise, which would be {formatSalary(salary * .04)} dollars.</p>
    <!-- SHOW INCREASE AT TIER2 // 3.0%-->
    {:else if salary < tier2}
    <p>You would get a 3.0% raise, which would be {formatSalary(salary * .03)} dollars.</p>
    <!-- SHOW INCREASE AT TIER3 // 2.5%-->
    {:else if salary < tier3}
    <p>You would get a 2.5% raise, which would be {formatSalary(salary * .025)} dollars.</p>
    <!-- SHOW INCREASE AT TIER4 // 2.0%-->
    {:else if salary >= tier4}
    <p>You would get a 2.0% raise, which would be {formatSalary(salary * .02)} dollars.</p>
    {/if}
{/if}

<!-- Styles go down here -->
<style lang=scss>
    .salary-input-container {
        height: 42px;
        width: 50%;
        margin-bottom: 5px;
        input {
            font-size: 16px;
            border: solid 1px lightgray;
            border-radius: 5px;
            padding-left: 16px;
            width: 100%;
            height: 100%;
        }
    }
</style>
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
<Select
    {items}
    bind:value={jobType}
    class='dropdown'
    --placeholder-color='rgb(117, 117, 117)'
    inputStyles="font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;"
/>
<p>How much do you currently make?</p>
<div class="salary-input-container">
    <!-- This bind is how we handle binding a prop/value -->
    <input class='text' bind:value={salaryRaw} placeholder="Enter your salary" />
</div>

<!-- In svelte you use logic blocks like this ... -->
<!-- IF YOU SELECT A JOB TYPE SHOW BELOW -->
{#if jobType}
    <p style='text-align: center; border-top: 1px solid rgb(223, 58, 79); margin-top: 24px; padding-top: 24px'>As {jobType.label.charAt(0) === 'A' || jobType.label.charAt(0) === '#' ? 'an' : 'a'} {jobType.label.toLowerCase()} your minimum would be...</p>
    <div class='salary-min-group'>
        <div class='salary-min'>
            <p class='head'>Post:</p>
            <p class='num'>{formatSalary(postMin)}</p>
            {#if salary && salary < postMin}
                <p class='difference-post'>+{formatSalary(postMin - salary)}/year</p>
            {/if}
        </div>
        <div class='salary-min'>
            <p class='head'>Guild:</p>
            <p class='num'>{formatSalary(guildMin)}</p>
            {#if salary && salary < guildMin}
                <p class='difference'>+{formatSalary(guildMin - salary)}/year!</p>
            {/if}
        </div>
    </div>

{/if}
<!-- IF YOU ENTERED A SALARY SHOW THE CHANGE -->
{#if salary && jobType}
    <!-- <p>Salary section</p> -->
    <!-- <p>As an employee earning {formatSalary(salary)} a year, you would make <strong>{formatSalary(guildMin - salary)}</strong> more a year under the Guild's proposal. </p> -->
    <!-- SALARY LESS THAN POST MINIMUM -->
    {#if salary < postMin}
    <!-- <p>Under the Guild's proposal, you would make <strong>{formatSalary(guildMin - salary)} more</strong> a year.</p>
    <p>Versus the post's proposal of {formatSalary(postMin - salary)} more a year.</p> -->
    <!-- SALARY LESS THAN GUILD MINIMUM -->
    {:else if salary < guildMin}
    <!-- <p>You would make {formatSalary(guildMin - salary)} more a year.</p> -->
    <!-- SALARY GREATER THAN GUILD MINIMUM -->
    <!-- SHOW INCREASE AT TIER1 // 4.0%-->
    {:else if salary < tier1}
    <p class='pct-raise'>Under the Guild's proposal, you would get a <span class='highlight'>4.0% raise</span>, which would be <span class='highlight'>{formatSalary(salary * .04)}</span> dollars.</p>
    <!-- SHOW INCREASE AT TIER2 // 3.0%-->
    {:else if salary < tier2}
    <p class='pct-raise'>Under the Guild's proposal, you would get a <span class='highlight'>3.0% raise</span>, which would be <span class='highlight'>{formatSalary(salary * .03)}</span> dollars.</p>
    <!-- SHOW INCREASE AT TIER3 // 2.5%-->
    {:else if salary < tier3}
    <p class='pct-raise'>Under the Guild's proposal, you would get a <span class='highlight'>2.5% raise</span>, which would be <span class='highlight'>{formatSalary(salary * .025)}</span> dollars.</p>
    <!-- SHOW INCREASE AT TIER4 // 2.0%-->
    {:else if salary >= tier4}
    <p class='pct-raise'>Under the Guild's proposal, you would get a <span class='highlight'>2.0% raise</span>, which would be <span class='highlight'>{formatSalary(salary * .02)}</span> dollars.</p>
    {/if}
{/if}

<!-- Styles go down here -->
<style lang=scss>
    p {
        font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
    }

    .dropdown {
        // background-color: red;
        div {
            background-color: yellow;
        }
    }

    .highlight {
        background-color: rgb(255, 230, 0);
        font-weight: 700;
    }

    .pct-raise {
        margin-top: 24px;
    }

    .salary-min-group {
        display: flex;
        justify-content: space-evenly;
        align-items: flex-start;

        @media screen and (max-width: 400px) {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
    }

    .salary-min {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 120px;
        text-align: center;

        .head {
            padding: 0;
            margin: 0;
            text-align: center;
        }
        .num {
            font-weight: 700;
            padding: 0;
            margin: 0;
        }
        .difference {
            font-size: .9em;
            font-weight: 700;
            background-color: rgb(255, 230, 0);
            margin-top: 8px;
        }
        .difference-post {
            font-size: .9em;
            margin-top: 8px;
        }
    }
    input {
        font-family: BlinkMacSystemFont,-apple-system,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif;
    }
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
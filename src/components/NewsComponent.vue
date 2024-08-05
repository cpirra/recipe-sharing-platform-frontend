<template>
    <div class="news">
        <div class="banner">
            <img class="foto" src="../assets/images/cookingimg.jpg" alt="">
        </div>
        <div class="newscontent">
            <ul>
                <a href="https://www.foodandwine.com/ihop-all-you-can-eat-pancakes-2024-8685691" target="_blank">
                    <li class="content">
                    <img class="newsimg" src="https://www.foodandwine.com/thmb/dfx19sWZlSgqPLGthl9UnN2_KnM=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Eat-All-You-Can-Pancakes-at-IHOP-FT-BLOG0824-01-469fc8eec32d4a239e3ad8519b437b7f.jpg" alt="news photo 1">
                    <h1 class="newstitle">IHOP Is Bringing Back Its $5 All-You-Can-Eat Pancakes Sooner Than Expected</h1>
                </li>
                </a>
                <a href="https://www.foodandwine.com/halloumi-recipes-8661665" target="_blank">
                    <li class="content">
                        <img src="https://www.foodandwine.com/thmb/OPdJ87hr9FZeZx9sS07NVG0RZiI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Saganaki-Halloumi-FT-RECIPE0922-2000-0dda32adc3eb463bbe4511b3b488e5f3.jpg" alt="" class="news-img">
                        <h1 class="newstitle">8 Ways to Fry, Grill, and Sear Halloumi, the Hottest Cheese of Summer</h1>
                    </li>
                </a>
                <a href="https://www.foodandwine.com/manhattan-burgers-taste-better-8684199">
                    <li class="content">
                        <img src="https://www.foodandwine.com/thmb/rzqS0kkfXHQiveSu3Vhl3Y0lonw=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Manhattan-Burger-Pairings-FT-BLOG0724-63da116d2f364206b89e8cf6475434e2.jpg" alt="" class="news-img">
                        <h1 class="newstitle">This Is Why You Should Order a Manhattan With Your Next Burger, According to Bar Science</h1>
                    </li>
                </a>
                <a href="https://www.foodandwine.com/beyond-meat-releases-beyond-sun-sausage-8683272">
                    <li class="content">
                        <img src="https://www.foodandwine.com/thmb/HgnV_dxpw3tLMiAXGwdrOv2LRMA=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Beyond-Meat-Launches-First-of-Its-Kind-Protein-FT-BLOG0724-01-73a85e6723e1432d9f8ee7fdb2080354.jpg" alt="" class="news-img">
                        <h1 class="newstitle">Beyond Meat's Latest Product Doesn't Taste Anything Like Meat — and That's on Purpose</h1>
                    </li>
                </a>
            </ul>
        </div>
    </div>
</template>

<style>
.news{
    margin: 2rem;
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}
.banner{
    padding: 1rem;
    width: 40rem;
}
.news .banner .foto{
    width: 40rem;
    height: auto;
}
.content{
    padding: 0.5rem;
    margin: 1rem;
    display: flex;
    align-content: center ;
    align-items: center;
    
}
.news img{
    width: 6rem;
    height: auto;
}
.newscontent{
    padding: 1rem;
    background-color: rgb(252, 238, 236);
}
a:hover li h1{
    text-decoration-line: underline;
}
.newstitle{
    padding: 1rem;
}
</style>
$(document).ready(function () {
    console.log("👋");

    const location = $('.location h2');
    const description = $('.description p');
    const periods = $('#list-of-periods');
    let periodsDates = ["1853", "1857", "1861-68", "1869-76", "1876-80", "1881", "1882", "1883", "1885", "1886", "1887", "1888", "1889", "1990"]
    const paintingsURL = "https://raw.githubusercontent.com/AimenBenAissa/van-gogh/master/json/vangoghkeyed.json";
    const timelineURL = "https://raw.githubusercontent.com/AimenBenAissa/van-gogh/master/json/vangoghtimeline.json";
    let paintings = [];
    let timeline = [];
    let rWidth; //between 70% and 100%
    let rMargin; // between 100px - 300px

    $('#loadVincent p').click(()=>{
        $('#loadVincent').css("overflow", "visible");
        $('#loadVincent').css("display", "none");
        $('.main-container').css("display", "flex");
    })

    //random number generator 
    let randomInt = (min, max) =>{
        return Math.floor(Math.random() * (max - min + 1))+ min;
    }
    //load paintings data
    const paintingsData = $.getJSON(paintingsURL, () => {
        console.log("paintings success");
    }).done(() => {
        paintings = paintingsData.responseJSON;
    });

    //load timeline data
    const timelineData = $.getJSON(timelineURL, () => {
        console.log("timeline success")
    }).done(() => {
        timeline = timelineData.responseJSON;
        populate();

    });

    //display relevant data when dates are clicked
    let populate = () => {
        
        //display all dates on the side bar
        periodsDates.forEach((li, index) => {
            const liEl = $("<li></li>").text(li);
            if(index === 0){//set the first li to bold
                liEl.addClass('active');
            }
            liEl.attr('id', index);
            periods.append(liEl);
        })

        //display first description
        description.html(timeline[periodsDates[0]].B);

         //toggle active class on date periods
         $('#list-of-periods li').click(function () {
            $('#list-of-periods li').removeClass('active');
            $(this).toggleClass('active');

            renderImages(this.innerHTML);
        })
    }

    //render relevant paintings when dates are clicked
    let renderImages = (period) =>{

        //render description for certain period
        const currentDescription = timeline[period].B;
        description.html(currentDescription);

        //empty columns from previous paintings
        //ready to populate with new ones
        $('.column1').empty();
        $('.column2').empty();

        //fetch paintings for certain period
        for (let i =0; i<paintings[period].length; i++){
            const currentURL = paintings[period][i].url; //link to painting
            const currentTitle = paintings[period][i].title; //title of painting

            //get random numbers for Margin & Width for painting
            rWidth = randomInt(70,100);

            rMargin= randomInt(100,300);
            //create img element
            const img = $("<img></img>");
            //add margin & width
            img.width(rWidth + '%');
            img.css('marginBottom', rMargin + 'px');

            img.attr("src", currentURL);

            img.on('load', () =>{
                //add alt to img
                img.attr("alt", currentTitle)
                //append photos to both columns
                if(i % 2 === 0){//i is even
                    $('.column1').append(img);
                }else{//i is odd
                    $('.column2').append(img);
                }
            })
        }
    }
})


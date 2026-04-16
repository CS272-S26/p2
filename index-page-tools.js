
function checkMajorProgress() {
    console.log('Clicked checkMajorProgress button!');
    const creditInput = document.getElementById('credit-count');
    const credits = creditInput.value;
    const creditText = document.getElementById('credit-text');

    if(/[0-9]{1,3}/.test(credits)){
        console.log('num of credits: '+credits);
        creditText.innerText = "You are about %" + ((credits/120)*100).toFixed(2) 
        + " done with your undergrad degree by credits!";
        if(credits >= 180){
            creditText.innerText += " Dawg why are you still here?? You could have graduated " + Math.floor((credits-120)/15);
            creditText.innerText += " semesters ago";
        } else if (credits >= 120) {
            creditText.innerText += " If your other requirments are fulfilled, you could graduate this semester!";
        } else {
            creditText.innerText += " If your other requirments are fulfilled, and assuming you take 15 credits"
            + " per semester, you could graduate in " + Math.ceil((120-credits)/15) + " semester(s)!";
        }
    } else {
        creditText.innerText = "Not a valid input! Make sure your input is a number between 0-999.";
    }

    
}
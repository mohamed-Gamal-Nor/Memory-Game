// function to get name and copy it

document.querySelector(".controls-buttons span").onclick = function() {
    // prompt for get name
    let yourname = prompt("Wahts Your Name?");
    // check if have name or no
    if (yourname == null || yourname == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = yourname;
    }
    // add audio welcome
    document.getElementById("welcome").play();
    // hide control div
    document.querySelector(".controls-buttons").remove();
};
// set durayion time
let duration = 500;
// get blocks in var
let blocksContainer = document.querySelector(".memory-game-blocks");
// get element in array
let blocks = Array.from(blocksContainer.children);
// get key from array blocks
let orderRange = [...Array(blocks.length).keys()];
// tires car
let triesElement = document.querySelector(".tries span");
// run shuffle function to get random number
shuffle(orderRange);
// added style order to element
blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    // add click event
    block.addEventListener("click", function() {
        // triger the flip block function
        flipBlock(block);
        let storgeblock = blocks.filter((storgeBlock) =>
            storgeBlock.classList.contains("has-match")
        );
        storge(storgeblock.length);
    });

    //block.classList.add("has-match");
});

// flip function block
function flipBlock(selectedBlock) {
    // add class is flipped
    selectedBlock.classList.add("is-flipped");
    // collect all filbed cards
    let allFlippedBlocks = blocks.filter((flippedblock) =>
        flippedblock.classList.contains("is-flipped")
    );
    // if there two select blocks
    if (allFlippedBlocks.length === 2) {
        // stop click event
        stopClicking();
        // check matched block
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}
// stop click function
function stopClicking() {
    // add class no clicking on main cotainer
    blocksContainer.classList.add("no-clicking");
    setTimeout(() => {
        // remove class no clicking after duration
        blocksContainer.classList.remove("no-clicking");
    }, duration);
}

//check matched blocks
function checkMatchedBlocks(firstBlock, seconedBlock) {
    if (firstBlock.dataset.technology === seconedBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped");
        seconedBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        seconedBlock.classList.add("has-match");

        document.getElementById("success").play();
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            seconedBlock.classList.remove("is-flipped");
        }, duration);
        document.getElementById("fail").play();
    }
}
// shuffle function
function shuffle(array) {
    // setting var
    let current = array.length,
        temp,
        random;
    while (current > 0) {
        // get random number
        random = Math.floor(Math.random() * current);
        // decrease lenght by one
        current--;
        //save current in stash
        temp = array[current];
        // current element = random element
        array[current] = array[random];
        // random element = get element from stash
        array[random] = temp;
    }
    return array;
}
// create local storge to get wrong

function storge(statusClass) {
    if (statusClass == 18) {
        let finalyTiers = triesElement.innerHTML;
        if (statusClass == 20) {
            myStorage = window.localStorage;
            localStorage.setItem(
                document.querySelector(".name span").innerHTML,
                finalyTiers
            );
            console.log(localStorage.getItem(finalyTiers));
        }
    }
}

//console.log(localStorage.getItem("myCat"));
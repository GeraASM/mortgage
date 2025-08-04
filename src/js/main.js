
const form = document.getElementById("form");
const options = document.querySelectorAll(".mortgage__option");
function addStyle(e) {
    options.forEach(o => o.classList.remove("mortgage__option--active"));
    e.currentTarget.classList.add("mortgage__option--active");
}

options.forEach(option => option.addEventListener("click", addStyle));

function hasError(input) {
    const storage = input.closest(".mortgage__storage");
    const type = storage.querySelector(".mortgage__type");
    const block = storage.closest(".mortgage__block");
    if (storage.classList.contains("mortgage__storage--error")) {
        storage.classList.remove("mortgage__storage--error");
         type.classList.remove("mortgage__type--error");
        block.querySelector(".error").style.display = "none";
    }
}

function addError(input) {
    const storage = input.closest(".mortgage__storage");
    const type = storage.querySelector(".mortgage__type");
    const block = storage.closest(".mortgage__block");
    storage.classList.add("mortgage__storage--error");
    type.classList.add("mortgage__type--error");
    block.querySelector(".error").style.display = "block";
}

function addErrorYears(input) {
    const storage = input.closest(".mortgage__storage");
    const type = storage.querySelector(".mortgage__years");
    const block = storage.closest(".mortgage__block");
    storage.classList.add("mortgage__storage--error");
    type.classList.add("mortgage__type--error");
    block.querySelector(".error").style.display = "block";
}

function hasErrorYears(input) {
    const storage = input.closest(".mortgage__storage");
    const type = storage.querySelector(".mortgage__years");
    const block = storage.closest(".mortgage__block");
    if (storage.classList.contains("mortgage__storage--error")) {
        storage.classList.remove("mortgage__storage--error");
         type.classList.remove("mortgage__type--error");
        block.querySelector(".error").style.display = "none";
    }
}

function hasErrorRadios(inputs) {
    inputs.forEach(i => {
        const block = i.closest(".mortgage__block");
        block.querySelector(".error").style.display = "none";
        return
    })
}
function addErrorRadios(inputs) {
    inputs.forEach(i => {
        const block = i.closest(".mortgage__block");
        block.querySelector(".error").style.display = "block";
        return
    })
}

const numberOnly = /^\d+\.?(\d+)?$/;
const percentageOnly = /^\d{1,2}$/;
const amount = document.getElementById("amount");
const years = document.getElementById("term");
const interest = document.getElementById("rate");
const radios = document.querySelectorAll("input[name='interest']");
const figure = document.querySelector(".mortgage__figure");
const showResults = document.querySelector(".mortgage__show");
const monthlyShow = document.getElementById("monthly");
const totalShow = document.getElementById("total");
function getData(e) {
    e.preventDefault();
    let isAllOk = true;
    if (amount.value.trim()) {
        if (numberOnly.test(amount.value.trim())) {
            hasError(amount);
        } else {
            isAllOk = false;
            addError(amount);
        }
    } else {
        isAllOk = false;
        addError(amount);
    }
    if (interest.value.trim()) {
        if (numberOnly.test(interest.value.trim())) {
            hasError(interest);
        } else {
            isAllOk = false;
            addError(interest);
        }
    } else {
        isAllOk = false;
        addError(interest);
    }

    if (years.value.trim()) {
        if (percentageOnly.test(years.value.trim())) {
            hasErrorYears(years);
        } else {
            isAllOk = false;
            addErrorYears(years);
        }
    } else {
        isAllOk = false;
        addErrorYears(years);
    }

    if (Array.from(radios).some(r => r.checked)) {
        hasErrorRadios(radios);
    } else {
        isAllOk = false;
        addErrorRadios(radios);
    };

    if (isAllOk) {
        const repaymentInterest = Array.from(radios).find(r => r.checked);
        figure.style.display = "none";
        showResults.style.display = "block";

        const result = getResults(parseFloat(amount.value.trim()), parseFloat(interest.value.trim()), parseInt(years.value.trim()), repaymentInterest.id);
        monthlyShow.textContent = `£${result.monthly.toFixed(2)}`;
        totalShow.textContent = `£${result.total.toFixed(2)}`;
    }
}

function getResults(amount, interest, time, option) {
    console.log(amount, interest, time, option);
    let monthly = 0;
    let total = 0;
    if (option === 'repayment') {
        monthly = amount * (interest / 100);
        total = amount +  monthly * (time * 12);
        return {monthly, total}
    } else if (option === 'interest') {
        monthly = amount * (interest / 100);
        total = monthly * (time * 12);
        return {monthly, total}
    }
}

const btnClear = document.getElementById("btnClear");
function clearAll() {
    form.reset();
    hasError(amount);
    hasError(interest);
    hasErrorYears(years);
    hasErrorRadios(radios);
    options.forEach(o => o.classList.remove("mortgage__option--active"));
    monthlyShow.textContent = `£0`;
    totalShow.textContent = `£0`;
    figure.style.display = "flex";
    showResults.style.display = "none";
}



form.addEventListener("submit", getData);
btnClear.addEventListener("click", clearAll);
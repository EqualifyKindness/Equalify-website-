
// ==========================================
// EQUALIFY WEBSITE - COMPLETE JAVASCRIPT
// ==========================================


// ==========================================
// 1. WORD CHALLENGE
// ==========================================

const questions = [
    {
        hint: "Treating everyone fairly and giving equal opportunities.",
        answer: "equality",
        explanation: "Equality means everyone deserves equal rights, opportunities, and fair treatment."
    },
    {
        hint: "Valuing and accepting other people's differences.",
        answer: "respect",
        explanation: "Respect means recognizing the value of every person regardless of their differences."
    },
    {
        hint: "Welcoming everyone regardless of their background.",
        answer: "inclusion",
        explanation: "Inclusion means making sure everyone feels welcomed, accepted, and involved."
    },
    {
        hint: "A fixed belief about how someone should behave based on gender.",
        answer: "stereotype",
        explanation: "A gender stereotype is an assumption about someone's abilities or behavior based on gender."
    },
    {
        hint: "SDG number 5 focuses on this important goal.",
        answer: "gender equality",
        explanation: "SDG 5 promotes gender equality and empowers all women and girls."
    }
];

let currentQuestion = 0;
let score = 0;
let wordAnswered = false;

function getElement(...ids) {
    for (const id of ids) {
        const element = document.getElementById(id);
        if (element) return element;
    }
    return null;
}

function showWordQuestion() {
    const q = questions[currentQuestion];

    const questionElement = getElement("question", "game-question");
    const feedback = getElement("feedback");
    const answerInput = getElement("answer");
    const scoreElement = getElement("score");
    const checkButton = getElement("checkBtn");
    const nextButton = getElement("nextBtn");
    const progress = getElement("game-progress", "question-number");

    if (questionElement) questionElement.innerText = q.hint;

    if (progress) {
        progress.innerText =
            "QUESTION " + (currentQuestion + 1) + " OF 5";
    }

    if (feedback) feedback.innerHTML = "";

    if (answerInput) {
        answerInput.value = "";
        answerInput.disabled = false;
    }

    if (scoreElement) {
        scoreElement.innerText = "Score: " + score + "/5";
    }

    if (checkButton) checkButton.hidden = false;
    if (nextButton) nextButton.hidden = true;

    wordAnswered = false;
}

function checkAnswer() {
    if (wordAnswered) return;

    const answerInput = getElement("answer");
    const feedback = getElement("feedback");

    if (!answerInput || !feedback) return;

    const userAnswer = answerInput.value.trim().toLowerCase();

    if (!userAnswer) {
        feedback.innerText = "Please enter an answer!";
        return;
    }

    const current = questions[currentQuestion];

    if (userAnswer === current.answer) {
        score++;

        feedback.innerHTML =
            "✅ CORRECT!<br><br>" + current.explanation;

        feedback.style.color = "green";

    } else {
        feedback.innerHTML =
            "❌ INCORRECT!<br><br>" +
            "Correct Answer: " + current.answer.toUpperCase() +
            "<br><br>" + current.explanation;

        feedback.style.color = "#b04455";
    }

    wordAnswered = true;
    answerInput.disabled = true;

    const scoreElement = getElement("score");
    if (scoreElement) {
        scoreElement.innerText = "Score: " + score + "/5";
    }

    const checkButton = getElement("checkBtn");
    const nextButton = getElement("nextBtn");

    if (checkButton) checkButton.hidden = true;
    if (nextButton) nextButton.hidden = false;
}

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showWordQuestion();
    } else {
        finishWordGame();
    }
}

function finishWordGame() {
    const questionElement = getElement("question", "game-question");
    const feedback = getElement("feedback");
    const answerInput = getElement("answer");
    const checkButton = getElement("checkBtn");
    const nextButton = getElement("nextBtn");

    if (questionElement) {
        questionElement.innerText =
            "You completed the Word Challenge!";
    }

    if (feedback) {
        feedback.innerText =
            "Final Score: " + score + "/5. Great job learning about equality!";
    }

    if (answerInput) answerInput.hidden = true;
    if (checkButton) checkButton.hidden = true;

    if (nextButton) {
        nextButton.hidden = false;
        nextButton.innerText = "PLAY AGAIN";
        nextButton.onclick = restartWordGame;
    }
}

function restartWordGame() {
    currentQuestion = 0;
    score = 0;

    const answerInput = getElement("answer");
    if (answerInput) answerInput.hidden = false;

    const nextButton = getElement("nextBtn");
    if (nextButton) {
        nextButton.innerText = "Next Question →";
        nextButton.onclick = nextQuestion;
    }

    showWordQuestion();
}


// ==========================================
// 2. EQUALIFY KNOWLEDGE QUIZ
// ==========================================

const quizQuestions = [
    {
        question: "What is the main goal of gender equality?",
        options: [
            "Giving advantages to one gender",
            "Providing equal rights and opportunities",
            "Making everyone have the same personality",
            "Limiting people's choices"
        ],
        answer: 1,
        explanation: "Gender equality means everyone deserves equal rights, opportunities, and treatment regardless of gender."
    },
    {
        question: "Which Sustainable Development Goal promotes gender equality?",
        options: ["SDG 2", "SDG 4", "SDG 5", "SDG 10"],
        answer: 2,
        explanation: "SDG 5 focuses on achieving gender equality and empowering all women and girls."
    },
    {
        question: "What is gender discrimination?",
        options: [
            "Treating everyone fairly",
            "Giving equal opportunities",
            "Respecting differences",
            "Unfair treatment because of gender"
        ],
        answer: 3,
        explanation: "Gender discrimination happens when someone receives unfair treatment because of their gender."
    },
    {
        question: "Which is an example of breaking gender stereotypes?",
        options: [
            "Allowing everyone to choose their career",
            "Saying only men can become engineers",
            "Saying only women can become nurses",
            "Limiting activities based on gender"
        ],
        answer: 0,
        explanation: "People should be free to choose their careers based on their interests and abilities, not gender stereotypes."
    },
    {
        question: "How can students promote gender equality?",
        options: [
            "Ignore discrimination",
            "Spread harmful stereotypes",
            "Respect everyone and promote inclusion",
            "Exclude people who are different"
        ],
        answer: 2,
        explanation: "Students can promote equality by respecting others, challenging stereotypes, and treating everyone fairly."
    }
];

let quizCurrent = 0;
let quizScore = 0;
let quizAnswered = false;

function showQuizQuestion() {
    const q = quizQuestions[quizCurrent];

    document.getElementById("quiz-progress").innerText =
        "QUESTION " + (quizCurrent + 1) + " OF 5";

    document.getElementById("quiz-question").innerText =
        q.question;

    document.getElementById("quiz-feedback").innerText = "";

    document.getElementById("quiz-score").innerText =
        "Score: " + quizScore + "/5";

    document.getElementById("quiz-next").hidden = true;

    const container = document.getElementById("quiz-options");
    container.innerHTML = "";

    quizAnswered = false;

    q.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "quiz-option";
        button.innerText = option;

        button.onclick = () => checkQuizAnswer(index);

        container.appendChild(button);
    });
}

function checkQuizAnswer(selected) {
    if (quizAnswered) return;

    quizAnswered = true;

    const q = quizQuestions[quizCurrent];
    const feedback = document.getElementById("quiz-feedback");
    const options = document.querySelectorAll(".quiz-option");

    options.forEach((option, index) => {
        option.disabled = true;

        if (index === q.answer) {
            option.classList.add("correct");
        }
    });

    if (selected === q.answer) {
        quizScore++;

        feedback.innerHTML =
            "✅ CORRECT!<br><br>" + q.explanation;

        feedback.style.color = "green";

    } else {
        options[selected].classList.add("wrong");

        feedback.innerHTML =
            "❌ INCORRECT!<br><br>" +
            "Correct answer: " + q.options[q.answer] +
            "<br><br>" + q.explanation;

        feedback.style.color = "#b04455";
    }

    document.getElementById("quiz-score").innerText =
        "Score: " + quizScore + "/5";

    document.getElementById("quiz-next").hidden = false;
}

function nextQuizQuestion() {
    quizCurrent++;

    if (quizCurrent < quizQuestions.length) {
        showQuizQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    document.getElementById("quiz-progress").innerText =
        "QUIZ COMPLETED!";

    document.getElementById("quiz-question").innerText =
        "You scored " + quizScore + " out of 5!";

    document.getElementById("quiz-options").innerHTML = "";

    document.getElementById("quiz-feedback").innerText =
        quizScore === 5
        ? "Perfect! You are an equality champion!"
        : "Great effort! Keep learning about gender equality!";

    const button = document.getElementById("quiz-next");

    button.hidden = false;
    button.innerText = "PLAY AGAIN";
    button.onclick = restartQuiz;
}

function restartQuiz() {
    quizCurrent = 0;
    quizScore = 0;

    const button = document.getElementById("quiz-next");
    button.innerText = "Next Question →";
    button.onclick = nextQuizQuestion;

    showQuizQuestion();
}


// ==========================================
// 3. MYTH VS. FACT
// ==========================================

const mythQuestions = [
    {
        question: "Only men can become engineers.",
        answer: false,
        explanation: "MYTH! People of all genders can become engineers. Skills, education, and dedication determine someone's ability."
    },
    {
        question: "Everyone deserves equal opportunities regardless of gender.",
        answer: true,
        explanation: "FACT! Everyone deserves fair access to education, employment, and opportunities."
    },
    {
        question: "Women can become leaders and decision-makers.",
        answer: true,
        explanation: "FACT! Leadership depends on a person's abilities and qualifications, not gender."
    },
    {
        question: "Men should never express their emotions.",
        answer: false,
        explanation: "MYTH! Everyone experiences emotions and should be allowed to express them in healthy ways."
    },
    {
        question: "Gender stereotypes can limit people's opportunities.",
        answer: true,
        explanation: "FACT! Stereotypes can create unfair expectations and prevent people from pursuing their interests."
    },
    {
        question: "Only women can become nurses.",
        answer: false,
        explanation: "MYTH! Nursing is a profession open to people of all genders."
    },
    {
        question: "Respect should be given to everyone regardless of gender.",
        answer: true,
        explanation: "FACT! Respect is important in creating a fair and inclusive community."
    },
    {
        question: "A person's career should be limited by their gender.",
        answer: false,
        explanation: "MYTH! People should be able to choose careers based on their interests, skills, and goals."
    },
    {
        question: "Education helps promote gender equality.",
        answer: true,
        explanation: "FACT! Education increases awareness and helps challenge harmful stereotypes."
    },
    {
        question: "Gender equality benefits only women.",
        answer: false,
        explanation: "MYTH! Gender equality benefits everyone by creating fairer and more inclusive communities."
    }
];

let mythCurrent = 0;
let mythScore = 0;
let mythAnswered = false;

function showMythQuestion() {
    const q = mythQuestions[mythCurrent];

    document.getElementById("myth-progress").innerText =
        "STATEMENT " + (mythCurrent + 1) + " OF 10";

    document.getElementById("myth-question").innerText =
        q.question;

    document.getElementById("myth-feedback").innerText = "";

    document.getElementById("myth-score").innerText =
        "Score: " + mythScore + "/10";

    document.getElementById("myth-btn").disabled = false;
    document.getElementById("fact-btn").disabled = false;

    document.getElementById("myth-next").hidden = true;

    mythAnswered = false;
}

function checkMythAnswer(userAnswer) {
    if (mythAnswered) return;

    mythAnswered = true;

    const q = mythQuestions[mythCurrent];
    const feedback = document.getElementById("myth-feedback");

    if (userAnswer === q.answer) {
        mythScore++;

        feedback.innerHTML =
            "✅ CORRECT!<br><br>" + q.explanation;

        feedback.style.color = "green";

    } else {
        feedback.innerHTML =
            "❌ INCORRECT!<br><br>" +
            "Correct answer: " +
            (q.answer ? "FACT" : "MYTH") +
            "<br><br>" + q.explanation;

        feedback.style.color = "#b04455";
    }

    document.getElementById("myth-score").innerText =
        "Score: " + mythScore + "/10";

    document.getElementById("myth-btn").disabled = true;
    document.getElementById("fact-btn").disabled = true;

    document.getElementById("myth-next").hidden = false;
}

function nextMythQuestion() {
    mythCurrent++;

    if (mythCurrent < mythQuestions.length) {
        showMythQuestion();
    } else {
        finishMythGame();
    }
}

function finishMythGame() {
    document.getElementById("myth-progress").innerText =
        "GAME COMPLETED!";

    document.getElementById("myth-question").innerText =
        "You scored " + mythScore + " out of 10!";

    document.querySelector(".myth-buttons").hidden = true;

    document.getElementById("myth-feedback").innerText =
        mythScore === 10
        ? "Perfect score! You are an equality champion!"
        : "Great effort! Keep learning and challenging stereotypes!";

    const button = document.getElementById("myth-next");

    button.hidden = false;
    button.innerText = "PLAY AGAIN";
    button.onclick = restartMythGame;
}

function restartMythGame() {
    mythCurrent = 0;
    mythScore = 0;

    document.querySelector(".myth-buttons").hidden = false;

    const button = document.getElementById("myth-next");
    button.innerText = "Next Statement →";
    button.onclick = nextMythQuestion;

    showMythQuestion();
}


// ==========================================
// 4. COMMUNITY STORIES
// ==========================================

const communityStories = [
    {
        title: "The Power of Education",
        text: "Alex believes that education should be available to everyone. Alex encourages classmates to support one another and respect everyone's dreams. Through school activities and discussions, Alex helps promote an environment where everyone can learn and succeed without discrimination."
    },
    {
        title: "Breaking Career Stereotypes",
        text: "Sam dreams of becoming a nurse. Some people believe certain careers belong to only one gender, but Sam disagrees. Sam believes that careers should be based on passion, skills, and dedication. Everyone deserves the freedom to pursue their chosen profession."
    },
    {
        title: "A Community of Respect",
        text: "A group of students starts an awareness campaign in their school. They organize discussions, posters, and activities that encourage fairness and inclusion. Their goal is to remind everyone that respect and equal opportunities help build a better community."
    }
];

function showStory(index) {
    const story = communityStories[index];

    if (!story) return;

    document.getElementById("story-title").textContent =
        story.title;

    document.getElementById("story-full-text").textContent =
        story.text;

    const display = document.getElementById("story-display");
    display.hidden = false;

    display.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function closeStory() {
    document.getElementById("story-display").hidden = true;
}


// ==========================================
// 5. COMMUNITY REFLECTION FORM
// ==========================================

function setupReflectionForm() {
    const form = document.getElementById("reflection-form");

    if (!form) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const input =
            document.getElementById("reflection-input");

        const reflection = input.value.trim();

        if (!reflection) return;

        const result =
            document.getElementById("reflection-result");

        const card = document.createElement("div");
        card.className = "reflection-item";

        const heading = document.createElement("strong");
        heading.textContent = "Community Reflection";

        const paragraph = document.createElement("p");
        paragraph.textContent = reflection;

        card.appendChild(heading);
        card.appendChild(paragraph);

        result.prepend(card);

        input.value = "";
    });
}


// ==========================================
// 6. START ALL WEBSITE FEATURES
// ==========================================

function initializeEqualify() {

    // Start Word Challenge
    if (getElement("answer") && getElement("feedback")) {
        showWordQuestion();

        const checkButton = getElement("checkBtn");
        const nextButton = getElement("nextBtn");

        if (checkButton) {
            checkButton.onclick = checkAnswer;
        }

        if (nextButton) {
            nextButton.onclick = nextQuestion;
        }
    }

    // Start Knowledge Quiz
    if (getElement("quiz-question")) {
        showQuizQuestion();
    }

    // Start Myth vs. Fact
    if (getElement("myth-question")) {
        showMythQuestion();

        const mythButton = getElement("myth-btn");
        const factButton = getElement("fact-btn");
        const nextButton = getElement("myth-next");

        if (mythButton) {
            mythButton.onclick = () => checkMythAnswer(false);
        }

        if (factButton) {
            factButton.onclick = () => checkMythAnswer(true);
        }

        if (nextButton) {
            nextButton.onclick = nextMythQuestion;
        }
    }

    // Start Community Stories
    setupReflectionForm();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeEqualify);
} else {
    initializeEqualify();
}

// ==========================================
// END OF EQUALIFY JAVASCRIPT
// ==========================================

// ==========================================
// 7. EQUALIFY EDUCATIONAL RESOURCES
// ==========================================

const educationalResources = [
    {
        title: "SDG 5 - Gender Equality",
        description: "Sustainable Development Goal 5 aims to achieve gender equality and empower all women and girls. It promotes equal opportunities, participation, and freedom from discrimination."
    },
    {
        title: "Human Rights",
        description: "Human rights belong to every person. Everyone deserves dignity, freedom, respect, and equal protection regardless of gender or background."
    },
    {
        title: "Gender Stereotypes",
        description: "Gender stereotypes are assumptions about how people should behave based on gender. These assumptions can limit opportunities and personal choices."
    },
    {
        title: "Anti-Discrimination",
        description: "Anti-discrimination means preventing unfair treatment. We can promote it by respecting differences, challenging harmful stereotypes, and supporting equal opportunities."
    }
];

function openResource(index) {

    const resource = educationalResources[index];

    if (!resource) return;

    document.getElementById("resource-title").textContent =
        resource.title;

    document.getElementById("resource-description").textContent =
        resource.description;

    const display = document.getElementById("resource-display");

    display.hidden = false;

    display.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function closeResource() {

    document.getElementById("resource-display").hidden = true;

}

// ==========================================
// 8. EQUALIFY SUPPORT SECTION
// ==========================================

const supportTopics = [
    {
        title: "Know Your Rights",
        description: "Every person deserves equal treatment, dignity, and respect. Gender should never determine someone's opportunities or abilities."
    },
    {
        title: "School Support",
        description: "If you experience or witness discrimination, consider speaking with a trusted teacher, school counselor, or school administrator. You deserve to be heard and supported."
    },
    {
        title: "Be an Ally",
        description: "Listen without judging, respect people's differences, challenge harmful stereotypes, and encourage equal opportunities for everyone."
    },
    {
        title: "Reporting Guide",
        description: "Write down what happened, when and where it occurred, and any relevant information. Report concerns to an appropriate trusted adult or authorized school representative. Avoid sharing private information publicly."
    }
];

function showSupport(index) {

    const topic = supportTopics[index];

    if (!topic) return;

    document.getElementById("support-title").textContent =
        topic.title;

    document.getElementById("support-description").textContent =
        topic.description;

    const display = document.getElementById("support-display");

    display.hidden = false;

    display.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

function closeSupport() {

    document.getElementById("support-display").hidden = true;

}

// ==========================================

// ==========================================

// ==========================================
// 9. EQUALIFY INTERACTIVE SURVEY
// ==========================================

const surveyQuestions = [
    "Do you believe everyone deserves equal opportunities?",
    "Can gender stereotypes limit people's choices?",
    "Should schools promote gender equality?",
    "Can everyone pursue any career regardless of gender?",
    "Is respecting everyone's identity important?"
];

let surveyAnswers = [];
let currentSurvey = 0;

// LOAD SURVEY QUESTION
function loadSurvey() {

    const questionNumber =
        document.getElementById("survey-question");

    const questionText =
        document.getElementById("survey-text");

    const options =
        document.getElementById("survey-options");

    const feedback =
        document.getElementById("survey-feedback");

    const nextButton =
        document.getElementById("survey-next");

    const result =
        document.getElementById("survey-result");

    questionNumber.textContent =
        "Question " + (currentSurvey + 1) + " of 5";

    questionText.textContent =
        surveyQuestions[currentSurvey];

    feedback.textContent = "";
    result.textContent = "";

    options.innerHTML = "";
    options.hidden = false;

    nextButton.hidden = true;

    ["Yes", "No"].forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer;

        button.onclick = function() {
            answerSurvey(answer);
        };

        options.appendChild(button);

    });
}


// ANSWER SURVEY
function answerSurvey(answer) {

    if (surveyAnswers[currentSurvey] !== undefined) {
        return;
    }

    surveyAnswers[currentSurvey] = answer;

    document.getElementById("survey-feedback").textContent =
        "Your answer: " + answer +
        ". Thank you for sharing your opinion!";

    document.getElementById("survey-options").hidden = true;

    const nextButton =
        document.getElementById("survey-next");

    nextButton.hidden = false;

    nextButton.textContent =
        currentSurvey === 4
        ? "See Results"
        : "Next Question →";
}


// NEXT QUESTION
function nextSurvey() {

    if (surveyAnswers[currentSurvey] === undefined) {
        return;
    }

    currentSurvey++;

    if (currentSurvey < surveyQuestions.length) {

        loadSurvey();

    } else {

        showSurveyResults();

    }
}


// SHOW FINAL RESULTS
function showSurveyResults() {

    const yesCount =
        surveyAnswers.filter(answer => answer === "Yes").length;

    const noCount =
        surveyAnswers.filter(answer => answer === "No").length;

    document.getElementById("survey-question").textContent =
        "Survey Completed!";

    document.getElementById("survey-text").textContent =
        "Thank you for participating in the EQUALIFY survey.";

    document.getElementById("survey-feedback").textContent = "";

    document.getElementById("survey-options").hidden = true;

    document.getElementById("survey-next").hidden = true;

    document.getElementById("survey-result").textContent =
        "You answered all 5 questions!";

    // RESULTS SUMMARY
    document.getElementById("survey-summary").hidden = false;

    document.getElementById("total-responses").textContent =
        surveyAnswers.length;

    document.getElementById("yes-count").textContent =
        yesCount;

    document.getElementById("no-count").textContent =
        noCount;

    document.getElementById("yes-percent").textContent =
        (yesCount * 20) + "%";

    document.getElementById("no-percent").textContent =
        (noCount * 20) + "%";

    document.getElementById("yes-bar").style.width =
        (yesCount * 20) + "%";

    document.getElementById("no-bar").style.width =
        (noCount * 20) + "%";
}


// RESET SURVEY
function resetSurvey() {

    surveyAnswers = [];

    currentSurvey = 0;

    document.getElementById("survey-summary").hidden = true;

    loadSurvey();
}


// INITIALIZE SURVEY
document.addEventListener("DOMContentLoaded", function() {

    const nextButton =
        document.getElementById("survey-next");

    if (nextButton) {
        nextButton.onclick = nextSurvey;
    }

    loadSurvey();

});

/* ==========================================
   STEP 16 - MOBILE NAVIGATION FUNCTION
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.textContent = isOpen ? "✕" : "☰";
        menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            menuToggle.textContent = "☰";
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
});
/* ==========================================
   STEP 17 - BACK TO TOP FUNCTION
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("back-to-top");

    if (!backToTop) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
/* ==========================================
   STEP 18 - ACTIVE NAVIGATION FUNCTION
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", function () {
        let currentSection = "";

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop - 150;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(function (link) {
            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }
        });
    });
});
/* ==========================================
   STEP 19 - SCROLL REVEAL FUNCTION
========================================== */

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");

    sections.forEach(function (section) {
        section.classList.add("reveal");
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });
});
/* ==========================================
   STEP 20 - LOADING SCREEN FUNCTION
========================================== */

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");

    if (loader) {
        loader.classList.add("hide");
    }
});
const bcrypt = require('bcrypt');

const data = {
    users: [
        {
            firstName: "bini",
            lastName: "bini",
            email: "bini@gmail.com",
            password: bcrypt.hashSync("1234", 10),
        },
        {
            firstName: "eyob",
            lastName: "eyob",
            email: "eyob@gmail.com",
            password: bcrypt.hashSync("1234", 10),
        },
        {
            firstName: "hana",
            lastName: "hana",
            email: "hana@gmail.com",
            password: bcrypt.hashSync("1234", 10),
        }
    ],

    questions: [
        {
            questionType: 'MCQ',
            questionAbout: 'HTML',
            question: "What is html",
            choice: {
                a: "HTML is a markup language",
                b: "HTML used to create serve",
                c: "HTML has its own compiler",
                d: "HTML is enough to create dynamic website",
            },
            answer: "a"
        }
    ]
}

module.exports = data
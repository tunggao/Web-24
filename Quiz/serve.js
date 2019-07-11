const express = require(`express`);
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// routers
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/index.html'));
});

app.get('/',(req,res)=>{
    res.sendFile(path.resolve(__dirname, './public/html/index1.html'));
});

app.get('/ask', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/ask.html'));
});

app.post('/create-question', (req, res) => {
    // save question to database
    // questionContent
    // like
    // dislike
    // createdAt

    // save newQuestion
    fs.readFile('./data.json', (error, data) => {
        if (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        } else {
            const questionList = JSON.parse(data);
            const newQuestionId = new Date().getTime();
            const newQuestion = {
                id: newQuestionId,
                questionContent: req.body.questionContent,
                like: 0,
                dislike: 0,
                createdAt: new Date().toString(),
            };
            questionList.push(newQuestion);

            fs.writeFile('./data.json', JSON.stringify(questionList), (error) => {
                if (error) {
                    res.status(500).json({
                        success: false,
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        success: true,
                        id: newQuestionId,
                    });
                }
            });
        }
    });
});

app.post(`/update`, (req, res) => {
    fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                sucess: false,
                message: error.message,
            });
        } else {
            const questionList1 = JSON.parse(data);
            //const questionUpdate = questionList[req.body.number];
            /*const questionUpdate = {
                id: req.body.id,
                questionContent: req.body.content,
                like: req.body.like,
                dislike: req.body.dislike,
                createAt: req.body.createAt,
            };*/
            for (let i = 0; i < questionList1.length; i++) {
                if (questionList1[i].id === req.body.id) {
                    questionList1[i].like = req.body.like;
                    questionList1[i].dislike = req.body.dislike;
                    break;
                }
            }
            fs.writeFile('./data.json', JSON.stringify(questionList1), { encoding: 'utf8' }, (error) => {
                if (error) {
                    res.status(500).json({
                        message: error.message,
                    });
                } else {
                    res.status(201).json({
                        sucess: true,
                    });
                }
            });

        }

    });

});


app.get(`/ask/:id`, (req, res) => {
    fs.readFile('./data.json', { encoding: 'utf8' }, (error, data) => {
        if (error) {
            res.status(500).json({
                sucess: false,
                message: error.message,
            });
        } else {
            const questionList2 = JSON.parse(data);
            var i = 0;
            while (1) {
                if (req.params.id == questionList2[i].id) {
                    break;
                }
                else i++;
            }
            fs.writeFile('./tmp.json', JSON.stringify(questionList2[i]), { encoding: 'utf8' }, (error) => {
                if (error) {
                    res.status(500).json({
                        message: error.message,
                    });
                }
            });

        }

    });
    res.sendFile(path.resolve(__dirname, './public/html/vote.html'));
});

app.get(`/datatmp`, (req, res) => {
    fs.readFile('./tmp.json', (error, data) => {
        const aloha = JSON.parse(data);
        res.json(aloha);
    });
});


app.get(`/data`, (req, res) => {
    fs.readFile('./data.json', (error, data) => {
        //res.sendFile(path.resolve(__dirname, './data.json'));
        const questionList = JSON.parse(data);
        var random = Math.floor(Math.random() * questionList.length);
        //console.log(questionList[random]);
        res.json(questionList[random]);
    });
});

app.listen(3000);
const data = require("./data.json");

let personInfo = {
    name: "Sung Ah Kim",
    description: "Computer Programmer & Visual Artist",
    aboutURL: "/about",
    img: "static/images/sungah.jpg",
    bio: [
        // "Skilled in computer programing Languages: Java and C#",
        // "Knowledgeable of JS/HTML/CSS, PHP and Database (Oracle Apex, MySQL)",
        "Enthusiastic and flexible individual who enjoys creative collaboration",
        "Extensive knowledge and practice in visual arts",
        "Experience working and creating art including designing, teaching, supporting and management",
        "A highly creative individual with the ability to translate creative concepts into visual works",
        "Languages Skills: English, Korean, and basic Mandarin Chinese",
        "Computer Skills: Word, Excel, PowerPoint, and Photoshop, Illustrator and basic of Zbrush"
    ],
    skills: ["Java", "JavaScript", "HTML", "CSS", "Node.js", "Express", "Pug", "PHP", "C#", "MySQL", "Oracle APex"]
};


const port = process.env.PORT || 3000,
  express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('public'));

app.set('view engine', 'pug');


app.get("/", function (req, res) {

    const projInfos = data.projects;

    var projectName = "Advanced Web Program - JavaScript/AJAX";
    var proDesc = "JavaScrpt, Node.js, React, AJAX";

    res.render('index', {personInfo, projInfos, Heading: projectName, PortfolioDescription: proDesc});
});

app.get("/about", function (req, res) {


    res.render('about', {personInfo});
});

app.get('/project', function (req, res) {

    try{
        console.log(req.query);

        var id = req.query.id;
    
        if(id > 0 && id < data.projects.length + 1){
    
            const projInfo = data.projects[id - 1];
            console.log(projInfo);
    
            res.render('project', {projInfo});
        } 
    } catch(error){
        console.error(error.message);
    }
    
    
});

app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404;
    next(err);
  })

app.use((err, req, res, next) => {
    res.render('error', {error: err});
  });

app.listen(port, function () {
  console.log(
    `The server has started on port number: ${port}`
  );
});

const data = require("./data.json");

let personInfo = {
    name: "Zeno K.",
<<<<<<< HEAD
    description: "Software Engineer & Fine Art Creator",
=======
    description: "Computer Programmer & Visual Artist",
>>>>>>> 1e0c2a614a072e8b8bb0bbde79af4f4b199dd787
    aboutURL: "/about",
    img: "static/images/zenok.jpg",
    bio: [
      "I’m a dedicated Software Engineer with a strong focus on learning, collaboration, and problem-solving. With experience across web and app development, UX/UI design, and coding, I consistently deliver high-quality work on time. My background in Fine Arts brings a creative dimension to my approach, allowing me to tackle projects with fresh, innovative ideas that enhance user experiences.",
      "As an empathetic, entry-level developer, I’m committed to building accessible, user-friendly websites and applications. Proficient in HTML, CSS, JavaScript, and React, I apply strong problem-solving skills, attention to detail, and Agile methodologies to ensure smooth project execution. I’m passionate about using technology to make a positive impact on users and communities, continuously refining my skills to stay current and ready to connect and create meaningful work.",
      "Computer Skills: Microsoft Office, Adobe Photoshop, Adobe Illustrator and basic of Zbrush",
      "Languages: English, Korean"
    ],
    skills: ["Java", "JavaScript", "C#", "Python", "PHP","HTML", "CSS", "React", "Node.js", "Express", "Pug",  "WordPress", "MySQL", "MongoDB"]
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

//app.get('/project/:id', function (req, res) {
app.get('/project', function (req, res) {

  //req.param.id
  //data[req.param.id]
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

const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql2");

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "jobDetails",
});
app.set("view engine", "ejs");

app.get("/", async(req, res) => {

    let a = await dropDown(1, "radio");
    let b = await dropDown(2, "dropdown");
    let c = await dropDown(3, "dropdown");
    let f = await dropDown(4, "", "multiple");
    let d = await dropDown(5, "dropdown");
    let e = await dropDown(6, "checkbox");
    let h = await dropDown(7, "radio");


    res.render("drop", { a, b, c, d, e, f, h });

});

async function dropDown(id, type = " ", multiple = " ") {
    let que = ` select * from option_master where s_m_id = ${id}`;
    let result = await querydb(que);
    let data = '';



    if (multiple == "multiple") {

        let content = "";
        content += `<select multiple>`;
        for (let i = 0; i < result.length; i++) {
            content += `<option>${result[i].op_value}</option>`

        }
        content += `</select>`;
        data = content;
        return data;

    }
    if (type == "dropdown") {

        let content = "";
        content += `<select>`;
        for (let i = 0; i < result.length; i++) {
            content += `<option>${result[i].op_value}</option>`

        }
        content += `</select>`;
        data = content;
        return data;

    }

    if (type == "checkbox") {

        let content = "";

        for (let i = 0; i < result.length; i++) {
            content += `<lable>${result[i].op_value}</lable>
            <input type="checkbox" >`;

        }
        data = content;
        return data;
    } else {

        let content = "";

        for (let i = 0; i < result.length; i++) {
            content += `<lable>${result[i].op_value}</lable>
            <input type="radio" name="keval">`;


        }
        data = content;
        return data;
    }


}



async function querydb(query) {
    return new Promise((resolve, reject) => {
        con.query(query, (err, result) => {
            if (err) {
                console.log(err.message);

            } else {
                resolve(result)
            }
        })
    });
}







app.listen(8081, () => {
    console.log("http://localhost:4040/");
});
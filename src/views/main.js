//import Navbar from "../components/navbar"
import "../styles/genstyles.css";
import Logo from "../assets/logo.jpg";
import ai from "../assets/ai.jpg";
import math from "../assets/math.jpg";
import algorithm from "../assets/algorithm.jpg";
import art from "../assets/art.jpg";
import economics from "../assets/economics.jpg";
import history from "../assets/history.jpg";
import {React, useState, useEffect} from 'react';

let filename = {
    "ai": ai,
    "math":math,
    "algorithm":algorithm,
    "art":art,
    "economics":economics,
    "history":history
}

async function getcourse(){
    return fetch("http://localhost:3001/view/getallcourse", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
        // redirect: 'follow',
    })
}

const LandingPage = () =>{
    var username = sessionStorage.getItem("username");
    var isInstructor = sessionStorage.getItem("isInstructor");
    const [data, setData] = useState();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);

    const [q, setQ] = useState("");

    function filter(filter_tag){
        if(filter_tag=="all"){
            setFilteredResults(data)
        }
        setFilteredResults(()=>
            data.filter(element=>{
               return element.tags[0]==filter_tag
            })
        )
    }
    //logout
    function logout(){
        sessionStorage.clear();
        window.location.href = "./landingpage.html";
    }

    function handleSearch(value){
        setQ(value)
        const filterdata = data.filter((item)=>{
            return item.tags[0].join('').toLowerCase().includes(value.toLowerCase())
        })
        setFilteredResults(filterdata)
    }

    useEffect(() => {
        getcourse().then((response )=>{
            return response.json()   
        }).then(data=>{
            setIsLoaded(true);
            setData(data)
            setFilteredResults(data)
        },(error)=>{
            setIsLoaded(true);
            setError(error);
        })
    }, [])

    if(error){
        return <div>{error.message}</div>
    }else if(!isLoaded){
        return <div>loading...</div>
    }else{
        return(
            <div>
                <header className = "main-header">
                    <div className = "header-column">
                        <img src = {Logo} alt="logo here" width="230" height="60"></img>
                        <h5>Affordable world class knowledge</h5>
                    </div>
                    <div className = "header-column">
                        {
                            username
                            ?
                                isInstructor?
                                    <div>
                                        <a href="/" className="button-index">Dashboard</a>
                                        <a href="#" onClick={logout} className = "button-index">Logout</a>
                                    </div>
                                :<div>
                                    <a href="/" className="button-index">Dashboard</a>
                                    <a href="#"  onClick={logout} className = "button-index">Logout</a>
                                </div>
                            :<div>
                                <a href="/login" className="button-index">Login</a>
                                <a href="/signup" className="button-index">SignUp</a>
                            </div>    
                        }
                        <div>
                            <form id="search">
                                <input type="search" placeholder="Search courses by keyword" name="keyword" className="search" value={q} onChange={e=>handleSearch(e.target.value)}/>
                            </form>
                        </div>
                    </div>
                </header>
                <ul className = "main-nav">
                    <li><a onClick={filter("all")}>All Courses</a></li>
                    <li><a onClick={filter("history")}>History</a></li>
                    <li><a onClick={filter("algorithm")}>Algorithm</a></li>
                    <li><a onClick={filter("math")}>Math</a></li>
                    <li><a onClick={filter("economics")}>Economics</a></li>
                    <li><a onClick={filter("ai")}>AI</a></li>
                </ul>
                <div id="courses">
                    {filteredResults &&
                        filteredResults.map((element,index)=>{
                            return <div className="course-card" key={index}>
                                        <div className="img">
                                            <a target="_blank" href="/course">
                                                <img src={filename[element.tags[0]]} alt="cannot show image" width="300" height="200"/>
                                            </a>
                                            <div className="desc">{element.title}</div>
                                        </div>
                                    </div>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default LandingPage;
import React from "react";
import ReactPlayer from "react-player";
import CyberCoding from "./img/CyberCoding.jpg";
import Password from "./img/Password.jpg";
import Scam from "./img/Scam.jpg";
import Software from "./img/Software.jpg";

/**
 * Home page component
 * 
 * @author Kelsey Andrews
 * @link https://www.npmjs.com/package/react-player
 * @link https://www.pexels.com/photo/crop-cyber-spy-hacking-system-while-typing-on-laptop-5935794/
 * @link https://www.pexels.com/photo/wood-people-art-night-6964171/
 * @link https://www.pexels.com/photo/a-person-looking-at-a-tablet-screen-with-password-9578527/
 */
function HomePage() {
        return (
            <div>
                <div className="name+slogan">
                    <h1>The CyberGuardians</h1>
                    <h4>Helping Older Adults Stay Safe Online</h4>
                    <img src={CyberCoding} alt="person writing code on a computer"/>
                </div>
                <div className="About">
                    <h5>About the CyberGuardians</h5>
                    <p>
                        Welcome to the Cyber Guardians.
                        The CyberGuardians initiative, sponsored by
                        <a href = "https://www.northumbria.ac.uk"> Northumbria University</a>
                        , began in September 2019 under the direction of
                        <a href = "https://www.northumbria.ac.uk/about-us/our-staff/n/james-nicholson/"> Dr.
                            James Nicholson (Northumbria University) </a>
                        and Mike Martin (
                        <a href = "https://www.u3asites.org.uk/whitley-bay/welcome"> U3A Whitley Bay </a> &
                        <a href = "https://oldlowlight.co.uk/"> Old Low Light Heritage Centre</a> ).
                    </p>
                    <p>
                        Members of the community were educated about good cyber security practices, which in turn enabled
                         them to spread the knowledge to their peers and help protect local communities from cyber harm.
                    </p>
                    <p>
                        <b>If you would like to read more about this research project </b>
                        you can access the two published peer-reviewed academic papers. The links to both the short
                        paper and the long paper can be seen below. The short paper describes the organisation of peer
                        workshops and the long one describes the whole initiative, including key findings. A link to a
                        5 minute academic presentation and the BBC news coverage surrounding this project can also be
                        seen below with the links to the papers.
                    </p>
                    <div align = "center">
                        <a href ="https://researchportal.northumbria.ac.uk/ws/portalfiles/portal/31615000/Nicholson.DIS20.CyberGuardians.pdf"
                        >The short paper describing the organisation of peer workshops.</a> <br/>
                        <a href = "https://researchportal.northumbria.ac.uk/ws/portalfiles/portal/53900115/Nicholson.CHI21.CyberGuardians.pdf"
                        >The long paper describing the whole initiative, including key findings.</a> <br/>
                        <a href = "https://www.youtube.com/watch?v=VQNCKhxGJ8Q">The 5 minute academic presentation.</a>
                        <ReactPlayer
                            url="https://www.youtube.com/embed/HJAIOv_xR00"
                        />
                    </div>
                    <p>If you would like more information or assistance of a CyberGuardian please contact: <a href =
                             "mailto:ee.cyberguardians@northumbria.ac.uk">ee.cyberguardians@northumbria.ac.uk</a></p>
                </div>
                <br/>
                <div className = "FAQ">
                    <h5>Frequently asked Security-Related Questions</h5>
                    <p>Why should I not use the same password for different websites?<br/>
                        If your password for one site is found, it can then be used on all the other sites with the same
                        password.<br/><br/>
                        What is the best way to pay for items online?<br/>
                        It is best to use a credit card, as there is consumer protection for items costing between £100
                        and £30,000 if something goes wrong.<br/><br/>
                        If I receive a link to a website in an email, how do i know its safe to click on it?<br/>
                        It may not be safe, so dont click on it. Instead, if its a website you know, access it from your
                        browser.<br/><br/>
                        How safe is it to give personal details Online?<br/>
                        It's not safe. Avoid giving any personal details unless you know you are dealing with a
                        reliable website.<br/><br/>
                        Why do I need to upgrade my software regularly?<br/>
                        Upgrades and updates include fixes for faults in the software, and scammers can use these faults
                        to try to access your system. regular upgrades will prevent such attacks to your system.
                    </p>
                </div>
                <br/>
                <div className = "alt-resources">
                    <h5>Alternative resources</h5>
                    <p>links to pages discussing how to keep safe online will be displayed below. These links will help
                        with passwords, identifying scams, and software additions and updates.
                    </p>
                    <img src={Password} alt="person unlocking a tablet"/><br/>
                    <a href="https://thecyberguardians.co.uk/pages/passwords.html"><h6>Passwords</h6></a>
                    <p>To learn how to create and manage passwords and prevent attacks, click this link.</p>
                    <img src={Scam} alt="scam being shown with computer keys"/><br/>
                    <a href="https://thecyberguardians.co.uk/pages/scams.html"><h6>Scams</h6></a>
                    <p>To learn more about different scams and how to protect yourself, click this link.</p>
                    <img src={Software} alt="person rebooting their computer"/><br/>
                    <a href="https://thecyberguardians.co.uk/pages/software.html"><h6>Software</h6></a>
                    <p>To learn more about using wifi safely, computer software updates, and antivirus, click this link.</p>
                </div>
            </div>

        );
}

export default HomePage;